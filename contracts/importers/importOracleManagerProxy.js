export async function importOracleManagerProxy(chainId, preset) {
  if (!preset) {
    throw new Error(`Missing preset`);
  }
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    case '1-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '11155111-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '10-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '8453-andromeda': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/8453-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/8453-andromeda/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '84532-andromeda': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/84532-andromeda/meta.json'),
        import('@synthetixio/v3-contracts/84532-andromeda/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '42161-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-main/meta.json'),
        import('@synthetixio/v3-contracts/42161-main/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '421614-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/421614-main/meta.json'),
        import('@synthetixio/v3-contracts/421614-main/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    case '42161-arbthetix': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/42161-arbthetix/meta.json'),
        import('@synthetixio/v3-contracts/42161-arbthetix/OracleManagerProxy.readable.json'),
      ]);
      return { address: meta.contracts.OracleManagerProxy, abi };
    }
    default: {
      throw new Error(`Unsupported deployment ${deployment} for OracleManagerProxy`);
    }
  }
}
