export async function importCollateralTokens(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '11155111-main': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '10-main': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '8453-andromeda': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '84532-andromeda': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '42161-main': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '421614-main': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    case '42161-arbthetix': {
      const [{ default: collateralTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/collateralTokens.json'),
      ]);
      return collateralTokens;
    }
    default: {
      throw new Error(`Unsupported deployment ${deployment} for CollateralTokens`);
    }
  }
}
