export async function importLegacyMarket(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/LegacyMarketProxy.readable.json'),
      ]);
      return { address: meta.contracts.LegacyMarketProxy, abi };
    }
    case '11155111-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/LegacyMarketProxy.readable.json'),
      ]);
      return { address: meta.contracts.LegacyMarketProxy, abi };
    }
    /*case '10-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/LegacyMarketProxy.readable.json'),
      ]);
      return { address: meta.contracts.LegacyMarketProxy, abi };
		}*/
    default: {
      throw new Error(`Unsupported deployment ${deployment} for Extras`);
    }
  }
}
