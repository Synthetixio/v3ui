export async function importMintableTokens(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '11155111-main': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '10-main': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '8453-andromeda': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '84532-andromeda': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '42161-main': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '421614-main': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    case '42161-arbthetix': {
      const [{ default: mintableTokens }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/mintableTokens.json'),
      ]);
      return mintableTokens;
    }
    default: {
      throw new Error(`Unsupported deployment ${deployment} for MintableTokens`);
    }
  }
}
