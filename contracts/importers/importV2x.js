export async function importV2x(chainId, preset = 'main') {
  const deployment = `${Number(chainId).toFixed(0)}-${preset}`;
  switch (deployment) {
    /*case '1-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/1-main/meta.json'),
        import('@synthetixio/v3-contracts/1-main/V2x.readable.json'),
      ]);
      return { address: meta.contracts.V2x, abi };
		}*/
    case '11155111-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/11155111-main/meta.json'),
        import('@synthetixio/v3-contracts/11155111-main/V2x.readable.json'),
      ]);
      return { address: meta.contracts.V2x, abi };
    }
    /*case '10-main': {
      const [{ default: meta }, { default: abi }] = await Promise.all([
        import('@synthetixio/v3-contracts/10-main/meta.json'),
        import('@synthetixio/v3-contracts/10-main/V2x.readable.json'),
      ]);
      return { address: meta.contracts.V2x, abi };
		}*/
  }
}
