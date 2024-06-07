export async function importAccountProxy(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '11155111-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '10-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '8453-andromeda': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/8453-andromeda/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '84532-andromeda': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/84532-andromeda/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '42161-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/meta.json'),
        import('@synthetixio/v3-contracts/42161-main/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '421614-main': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/meta.json'),
        import('@synthetixio/v3-contracts/421614-main/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    case '42161-arbthetix': {
      const [meta, abi] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/meta.json'),
        import('@synthetixio/v3-contracts/42161-arbthetix/AccountProxy.readable.json'),
      ]);
      return { address: meta.contracts.AccountProxy, abi };
    }
    default: {
      throw new Error(`Unsupported chain ${chainId} for AccountProxy`);
    }
  }
}
