#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const debug = require('debug');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');
const { OnChainRegistry, IPFSLoader } = require('@usecannon/builder');

const IPFS_GATEWAY = 'https://ipfs.synthetix.io';
const CANNON_REGISTRY_ADDRESS = '0x8E5C7EFC9636A6A0408A46BB7F617094B81e5dba';
const PACKAGE_NAME = 'synthetix-omnibus';
const PACKAGE_VERSION = 'latest';

const prettierOptions = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'es5',
};

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

async function codegen({ chainId, preset, registry, loader }) {
  const log = debug(`codegen:${getDir({ chainId, preset })}`);

  const tsDir = `${__dirname}/src/${getDir({ chainId, preset })}`;
  await fs.rm(tsDir, { force: true, recursive: true });
  await fs.mkdir(tsDir, { recursive: true });

  const deploymentsDir = `${__dirname}/deployments/${getDir({ chainId, preset })}`;
  await fs.rm(deploymentsDir, { force: true, recursive: true });
  await fs.mkdir(deploymentsDir, { recursive: true });

  const tmpDir = `${__dirname}/cache/${getDir({ chainId, preset })}`;
  await fs.rm(tmpDir, { force: true, recursive: true });
  await fs.mkdir(tmpDir, { recursive: true });

  const contracts = {};

  log('Resolving IPFS', `${PACKAGE_NAME}:${PACKAGE_VERSION}`, `${chainId}-${preset}`);
  const ipfs = await registry.getUrl(`${PACKAGE_NAME}:${PACKAGE_VERSION}`, `${chainId}-${preset}`);
  log('Fetching deployment state', ipfs);
  const deployments = await loader.read(ipfs);

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

  Object.assign(contracts, await manual({ chainId, preset }));

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
  await fs.writeFile(
    `${deploymentsDir}/index.json`,
    await prettyJson({
      name: PACKAGE_NAME,
      version: PACKAGE_VERSION,
      preset,
      ipfs,
      chainId,
      addresses: Object.fromEntries(
        Object.entries(contracts).map(([name, { address }]) => [name, address])
      ),
    })
  );
  log('->', path.relative(__dirname, `${deploymentsDir}/index.json`));
}

async function run() {
  const registry = new OnChainRegistry({
    signerOrProvider: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    address: CANNON_REGISTRY_ADDRESS,
  });
  const loader = new IPFSLoader(IPFS_GATEWAY);

  await Promise.all([
    codegen({ chainId: 1, preset: 'main', registry, loader }),
    codegen({ chainId: 5, preset: 'main', registry, loader }),
    codegen({ chainId: 10, preset: 'main', registry, loader }),
    codegen({ chainId: 420, preset: 'main', registry, loader }),
    codegen({ chainId: 11155111, preset: 'main', registry, loader }),
    codegen({ chainId: 84531, preset: 'competition', registry, loader }),
    // codegen({ chainId: 13370, preset: 'main', registry, loader }),
  ]);
}

run();
