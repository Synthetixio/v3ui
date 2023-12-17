#!/usr/bin/env node

const path = require('path');
const os = require('os');
const { readFileSync } = require('fs');
const fs = require('fs/promises');
const debug = require('debug');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');
const { OnChainRegistry, IPFSLoader } = require('@usecannon/builder');
const { LocalRegistry } = require('@usecannon/cli/dist/src/registry');
const { CliLoader } = require('@usecannon/cli/dist/src/loader');

const IPFS_GATEWAY = 'https://ipfs.synthetix.io';
const CANNON_REGISTRY_ADDRESS = '0x8E5C7EFC9636A6A0408A46BB7F617094B81e5dba';
const CANNON_DIRECTORY = path.join(os.homedir(), '.local', 'share', 'cannon');

const prettierOptions = JSON.parse(readFileSync('../.prettierrc', 'utf8'));

async function prettyJson(obj) {
  return await prettier.format(JSON.stringify(obj, null, 2), {
    parser: 'json',
    ...prettierOptions,
  });
}

async function prettyTs(content) {
  return await prettier.format(content, {
    parser: 'typescript',
    ...prettierOptions,
  });
}

function readableAbi(abi) {
  const iface = new ethers.utils.Interface(abi);
  return iface.format(ethers.utils.FormatTypes.full);
}

function getDir({ chainId, preset }) {
  if (preset === 'main') {
    return `${chainId}`;
  }
  return `${chainId}-${preset}`;
}

async function manual({ chainId, preset }) {
  const manualDir = `${__dirname}/manual/${getDir({ chainId, preset })}`;

  const files = await fs.readdir(manualDir, { withFileTypes: true });
  return Object.fromEntries(
    await Promise.all(
      files
        .filter((dirent) => dirent.isFile())
        .map((dirent) => path.basename(dirent.name, '.json'))
        .map(async (name) => {
          const { address, abi } = JSON.parse(await fs.readFile(`${manualDir}/${name}.json`));
          return [name, { address, abi }];
        })
    )
  );
}

async function writeContracts({ name, version, chainId, preset, url, contracts, log }) {
  const tsDir = `${__dirname}/src/${getDir({ chainId, preset })}`;
  await fs.mkdir(tsDir, { recursive: true });

  const deploymentsDir = `${__dirname}/deployments/${getDir({ chainId, preset })}`;
  await fs.mkdir(deploymentsDir, { recursive: true });

  const tmpDir = `${__dirname}/cache/${getDir({ chainId, preset })}`;
  await fs.mkdir(tmpDir, { recursive: true });

  //
  //
  //
  // Generate TS
  //
  //
  //
  const files = await Promise.all(
    Object.entries(contracts).map(async ([name, { abi }]) => {
      const target = `${deploymentsDir}/${name}.json`;
      await fs.writeFile(target, await prettyJson(abi));
      return target;
    })
  );
  files.forEach((file) => log('->', path.relative(__dirname, file)));

  await runTypeChain({
    cwd: process.cwd(),
    filesToProcess: files,
    allFiles: files,
    prettier: prettierOptions,
    outDir: tmpDir,
    target: require.resolve('@typechain/ethers-v5'),
  });
  await fs.copyFile(`${tmpDir}/common.ts`, `${tsDir}/common.ts`);
  log('->', path.relative(__dirname, `${tsDir}/common.ts`));
  const generated = await Promise.all(
    Object.entries(contracts).map(async ([name, { address, abi }]) => {
      const contract = await prettyTs(
        [
          `export const address = ${JSON.stringify(address)}`,
          `export const abi = ${JSON.stringify(readableAbi(abi))}`,
        ].join('\n')
      );
      const types = await fs.readFile(`${tmpDir}/${name}.ts`);
      const target = `${tsDir}/${name}.ts`;
      await fs.writeFile(
        target,
        [
          // Combine contract info and types.
          // Types already prittyfied so we avoid unnecessary work and just concat
          '// !!! DO NOT EDIT !!! Automatically generated file',
          '',
          contract,
          types,
          '',
        ].join('\n')
      );
      return path.relative(__dirname, target);
    })
  );
  generated.forEach((file) => log('->', file));

  //
  //
  //
  // index
  //
  //
  //
  const index = {
    name,
    version,
    preset,
    url,
    chainId,
    addresses: Object.fromEntries(
      Object.entries(contracts).map(([name, { address }]) => [name, address])
    ),
  };
  await fs.writeFile(`${deploymentsDir}/index.json`, await prettyJson(index));
  log('->', path.relative(__dirname, `${deploymentsDir}/index.json`));

  return {
    ...index,
    contracts,
  };
}

async function codegen({ name, version, chainId, preset }) {
  const log = debug(`codegen:${getDir({ chainId, preset })}`);

  log('Resolving URL', `${name}:${version}`, `${chainId}-${preset}`);
  const onChainRegistry = new OnChainRegistry({
    signerOrProvider: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    address: CANNON_REGISTRY_ADDRESS,
  });
  const url = await onChainRegistry.getUrl(`${name}:${version}`, `${chainId}-${preset}`);

  log('Fetching deployment state', url);
  const ipfsLoader = new IPFSLoader(IPFS_GATEWAY);
  const deployments = await ipfsLoader.read(url);

  const contracts = {};

  const system = deployments.state['provision.system'].artifacts.imports.system;

  contracts.CoreProxy = system.contracts.CoreProxy;
  contracts.AccountProxy = system.contracts.AccountProxy;
  contracts.USDProxy = system.contracts.USDProxy;
  contracts.OracleManagerProxy = system.imports.oracle_manager.contracts.Proxy;

  const spotFactory =
    deployments?.state?.['provision.spotFactory']?.artifacts?.imports?.spotFactory;
  if (spotFactory) {
    contracts.SpotMarketProxy = spotFactory.contracts.SpotMarketProxy;
  }

  const perpsFactory =
    deployments?.state?.['provision.perpsFactory']?.artifacts?.imports?.perpsFactory;
  if (perpsFactory) {
    contracts.PerpsMarketProxy = perpsFactory.contracts.PerpsMarketProxy;
    contracts.PerpsAccountProxy =
      perpsFactory.contracts.PerpsAccountProxy ?? perpsFactory.contracts.AccountProxy;
  }
  const TrustedMulticallForwarder =
    system.imports.trusted_multicall_forwarder?.contracts.TrustedMulticallForwarder;
  if (TrustedMulticallForwarder) {
    // TODO remove if when trusted multicall_forwarder is live on all network
    contracts.TrustedMulticallForwarder = TrustedMulticallForwarder;
  }

  Object.assign(contracts, await manual({ chainId, preset }));
  return await writeContracts({ name, version, chainId, preset, url, contracts, log });
}

async function codegenLocal({ name, version, chainId, preset }) {
  const log = debug(`codegen:${getDir({ chainId, preset })}`);

  log('Resolving URL', `${name}:${version}`, `${chainId}-${preset}`);
  const localRegistry = new LocalRegistry(CANNON_DIRECTORY);
  const url = await await localRegistry.getUrl(`${name}:${version}`, `${chainId}-${preset}`);

  log('Fetching deployment state', url);
  const deployments = JSON.parse(
    await fs.readFile(`${CANNON_DIRECTORY}/ipfs_cache/${CliLoader.getCacheHash(url)}.json`, 'utf8')
  );

  const contracts = {};
  const coreSandbox = deployments.state['import.core_sandbox'].artifacts.imports.core_sandbox;

  const synthetix = coreSandbox.imports.synthetix;
  contracts.CoreProxy = synthetix.contracts.CoreProxy;
  contracts.AccountProxy = synthetix.contracts.AccountProxy;
  contracts.USDProxy = synthetix.contracts.USDProxy;
  contracts.OracleManagerProxy = synthetix.imports.oracle_manager.contracts.Proxy;

  const spotFactory = coreSandbox.imports.spot_factory;
  contracts.SpotMarketProxy = spotFactory.contracts.SpotMarketProxy;

  const boxToken = coreSandbox.imports.box_token;
  contracts.MintableTokenBox = boxToken.contracts.MintableToken;

  const TrustedMulticallForwarder =
    synthetix.imports.trusted_multicall_forwarder?.contracts.TrustedMulticallForwarder;
  if (TrustedMulticallForwarder) {
    // TODO remove if when trusted multicall_forwarder is live on all network
    contracts.TrustedMulticallForwarder = TrustedMulticallForwarder;
  }

  Object.assign(contracts, await manual({ chainId, preset }));
  return await writeContracts({ name, version, chainId, preset, url, contracts, log });
}

async function generateImporters(allDeployments) {
  const contracts = new Set();
  allDeployments.forEach((deployment) =>
    Object.keys(deployment.addresses).forEach((name) => contracts.add(name))
  );

  await Promise.all(
    Array.from(contracts).map(async (name) => {
      const makeTypeName = ({ chainId, preset }) =>
        `${name}${chainId}${preset[0].toUpperCase()}${preset.slice(1)}`;

      const deployments = (
        await Promise.all(
          allDeployments.map(async ({ chainId, preset }) => {
            try {
              await fs.access(`${__dirname}/src/${getDir({ chainId, preset })}/${name}.ts`);
              return { chainId, preset };
            } catch (_e) {
              return null;
            }
          })
        )
      ).filter(Boolean);

      const imports = deployments.map(({ chainId, preset }) => {
        const typeName = makeTypeName({ chainId, preset });
        const importPath = `./${getDir({ chainId, preset })}/${name}`;
        return `import type { ${name} as ${typeName} } from '${importPath}';`;
      });

      const exportType = [
        `export type ${name}Type = ${deployments
          .map(({ chainId, preset }) => makeTypeName({ chainId, preset }))
          .join(' | ')};`,
      ];

      const importer = [
        `export async function import${name}(chainId: number, preset: string = 'main') {`,
        '  switch (`${chainId}-${preset}`) {',
        ...deployments.flatMap(({ chainId, preset }) => [
          `  case '${chainId}-${preset}':`,
          `     return import('./${getDir({ chainId, preset })}/${name}')`,
        ]),
        '    default:',
        `      throw new Error(\`Unsupported chain $\{chainId} for ${name}\`)`,
        '  }',
        '}',
      ];

      await fs.writeFile(
        `${__dirname}/src/import${name}.ts`,
        await prettyTs(
          [
            '// !!! DO NOT EDIT !!! Automatically generated file',
            '',
            ...imports,
            '',
            ...exportType,
            '',
            ...importer,
            '',
          ].join('\n')
        )
      );
    })
  );

  await fs.writeFile(
    `${__dirname}/src/index.ts`,
    await prettyTs(
      Array.from(contracts)
        .map((name) => `export * from './import${name}'`)
        .join('\n')
    )
  );
}

async function run() {
  await fs.rm(`${__dirname}/src`, { force: true, recursive: true });
  await fs.rm(`${__dirname}/deployments`, { force: true, recursive: true });
  await fs.rm(`${__dirname}/cache`, { force: true, recursive: true });

  const deployments = await Promise.all([
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 1, preset: 'main' }),
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 5, preset: 'main' }),
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 10, preset: 'main' }),
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 420, preset: 'main' }),
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 11155111, preset: 'main' }),
    codegen({ name: 'synthetix-omnibus', version: 'latest', chainId: 84531, preset: 'main' }),
    codegen({
      name: 'synthetix-omnibus',
      version: 'latest',
      chainId: 84531,
      preset: 'competition',
    }),
    codegen({
      name: 'synthetix-omnibus',
      version: 'latest',
      chainId: 84531,
      preset: 'andromeda',
    }),
    codegenLocal({ name: 'synthetix-local', version: 'latest', chainId: 13370, preset: 'main' }),
  ]);

  await generateImporters(deployments);
}

run();
