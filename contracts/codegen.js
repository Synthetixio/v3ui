#!/usr/bin/env node

const path = require('path');
const { readFileSync } = require('fs');
const fs = require('fs/promises');
const debug = require('debug');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');
const { extractChain } = require('viem');
const chains = require('viem/chains');

const V3_CONTRACTS = path.dirname(require.resolve(`@synthetixio/v3-contracts`));

const prettierOptions = JSON.parse(readFileSync('../.prettierrc', 'utf8'));

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

async function codegen({ chainId, preset }) {
  const log = debug(`codegen:${chainId}-${preset}`);

  const tsDir = `${__dirname}/src/${chainId}-${preset}`;
  await fs.mkdir(tsDir, { recursive: true });

  const deploymentsDir = `${__dirname}/cache/deployments/${chainId}-${preset}`;
  await fs.mkdir(deploymentsDir, { recursive: true });

  const tmpDir = `${__dirname}/cache/${chainId}-${preset}`;
  await fs.mkdir(tmpDir, { recursive: true });

  const srcDir = `${V3_CONTRACTS}/${chainId}-${preset}`;
  const contracts = [
    'CoreProxy',
    'AccountProxy',
    'USDProxy',
    'OracleManagerProxy',
    'SpotMarketProxy',
    'PerpsMarketProxy',
    'PerpsAccountProxy',
    'AccountProxy',
  ].filter((contractName) => {
    try {
      require.resolve(`${srcDir}/${contractName}.json`);
    } catch {
      return false;
    }
    return true;
  });
  for (const contractName of contracts) {
    await fs.cp(`${srcDir}/${contractName}.json`, `${deploymentsDir}/${contractName}.json`);
  }
  await fs.cp(`${__dirname}/manual/Multicall3.json`, `${deploymentsDir}/Multicall3.json`);
  await fs.cp(
    `${__dirname}/manual/RewardDistributor.json`,
    `${deploymentsDir}/RewardDistributor.json`
  );

  const files = (await fs.readdir(deploymentsDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile() && path.extname(dirent.name) === '.json')
    .map((dirent) => `${dirent.path}/${dirent.name}`);

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

  const meta = require(`${srcDir}/meta.json`);

  async function withTypes({ contractName, address, abi }) {
    const code = await prettyTs(
      [
        `export const address = ${JSON.stringify(address)}`,
        `export const abi = ${JSON.stringify(abi)}`,
      ].join('\n')
    );
    const types = await fs.readFile(`${tmpDir}/${contractName}.ts`);
    return [
      // Combine contract info and types.
      // Types already prittyfied so we avoid unnecessary work and just concat
      '// !!! DO NOT EDIT !!! Automatically generated file',
      '',
      code,
      types,
      '',
    ].join('\n');
  }

  const addresses = {};
  for (const contractName of contracts) {
    addresses[contractName] = meta.contracts[contractName];
    await fs.writeFile(
      `${tsDir}/${contractName}.ts`,
      await withTypes({
        contractName,
        address: meta.contracts[contractName],
        abi: require(`${srcDir}/${contractName}.readable.json`),
      })
    );
    log('->', path.relative(__dirname, `${tsDir}/${contractName}.ts`));
  }

  const chainDef = extractChain({ chains: Object.values(chains), id: chainId });
  addresses['Multicall3'] = chainDef.contracts.multicall3.address;
  await fs.writeFile(
    `${tsDir}/Multicall3.ts`,
    await withTypes({
      contractName: 'Multicall3',
      address: chainDef.contracts.multicall3.address,
      abi: readableAbi(require('./manual/Multicall3.json')),
    })
  );
  log('->', path.relative(__dirname, `${tsDir}/Multicall3.ts`));

  addresses['RewardDistributor'] = null;
  await fs.writeFile(
    `${tsDir}/RewardDistributor.ts`,
    await withTypes({
      contractName: 'RewardDistributor',
      address: null,
      abi: readableAbi(require('./manual/RewardDistributor.json')),
    })
  );
  log('->', path.relative(__dirname, `${tsDir}/RewardDistributor.ts`));

  return {
    chainId,
    preset,
    addresses,
  };
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
              await fs.access(`${__dirname}/src/${chainId}-${preset}/${name}.ts`);
              return { chainId, preset };
            } catch (_e) {
              return null;
            }
          })
        )
      ).filter(Boolean);

      const imports = deployments.map(({ chainId, preset }) => {
        const typeName = makeTypeName({ chainId, preset });
        const importPath = `./${chainId}-${preset}/${name}`;
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
          `     return import('./${chainId}-${preset}/${name}')`,
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
  await fs.mkdir(`${__dirname}/src`, { recursive: true });
  await fs.rm(`${__dirname}/cache`, { force: true, recursive: true });
  await fs.mkdir(`${__dirname}/cache`, { recursive: true });

  const deployments = [];
  deployments.push(await codegen({ chainId: 1, preset: 'main' }));
  deployments.push(await codegen({ chainId: 11155111, preset: 'main' }));
  deployments.push(await codegen({ chainId: 10, preset: 'main' }));
  deployments.push(await codegen({ chainId: 8453, preset: 'andromeda' }));
  deployments.push(await codegen({ chainId: 84532, preset: 'andromeda' }));
  deployments.push(await codegen({ chainId: 42161, preset: 'main' }));
  deployments.push(await codegen({ chainId: 421614, preset: 'main' }));
  deployments.push(await codegen({ chainId: 42161, preset: 'arbthetix' }));
  await generateImporters(deployments.filter(Boolean));
}

run();
