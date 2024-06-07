export async function importExtras(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  switch (`${chainId}-${preset}`) {
    case '1-main': {
      const [extras] = await Promise.all([import('@synthetixio/v3-contracts/1-main/extras.json')]);
      return extras;
    }
    case '11155111-main': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/extras.json'),
      ]);
      return extras;
    }
    case '10-main': {
      const [extras] = await Promise.all([import('@synthetixio/v3-contracts/10-main/extras.json')]);
      return extras;
    }
    case '8453-andromeda': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/extras.json'),
      ]);
      return extras;
    }
    case '84532-andromeda': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/extras.json'),
      ]);
      return extras;
    }
    case '42161-main': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/extras.json'),
      ]);
      return extras;
    }
    case '421614-main': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/extras.json'),
      ]);
      return extras;
    }
    case '42161-arbthetix': {
      const [extras] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/extras.json'),
      ]);
      return extras;
    }
    default: {
      throw new Error(`Unsupported chain ${chainId}-${preset} for Extras`);
    }
  }
}
