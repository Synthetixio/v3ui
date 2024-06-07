export async function importCoreProxy(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '11155111-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '10-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '8453-andromeda': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/8453-andromeda/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '84532-andromeda': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/84532-andromeda/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '42161-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/meta.json'),
        import('@synthetixio/v3-contracts/42161-main/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '421614-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/meta.json'),
        import('@synthetixio/v3-contracts/421614-main/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    case '42161-arbthetix': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/meta.json'),
        import('@synthetixio/v3-contracts/42161-arbthetix/CoreProxy.readable.json'),
      ]);
      return { address: meta.contracts.CoreProxy, abi };
    }
    default: {
      throw new Error(`Unsupported chain ${chainId} for CoreProxy`);
    }
  }
}
