export async function importUSDProxy(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '11155111-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '10-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '8453-andromeda': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/8453-andromeda/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '84532-andromeda': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/84532-andromeda/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '42161-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/meta.json'),
        import('@synthetixio/v3-contracts/42161-main/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '421614-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/meta.json'),
        import('@synthetixio/v3-contracts/421614-main/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    case '42161-arbthetix': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/meta.json'),
        import('@synthetixio/v3-contracts/42161-arbthetix/USDProxy.readable.json'),
      ]);
      return { address: meta.contracts.USDProxy, abi };
    }
    default: {
      throw new Error(`Unsupported chain ${chainId}-${preset} for USDProxy`);
    }
  }
}
