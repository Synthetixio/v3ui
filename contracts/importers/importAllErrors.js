export async function importAllErrors(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '11155111-main': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '10-main': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '8453-andromeda': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '84532-andromeda': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '42161-main': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '421614-main': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    case '42161-arbthetix': {
      const [{ default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/AllErrors.readable.json'),
      ]);
      return { address: undefined, abi };
    }
    default: {
      throw new Error(`Unsupported deployment ${deployment} for AllErrors`);
    }
  }
}
