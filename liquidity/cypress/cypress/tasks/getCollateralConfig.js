import { importCollateralTokens } from './importCollateralTokens';

export async function getCollateralConfig(symbol) {
  const collateralConfigs = await importCollateralTokens();
  for (const config of collateralConfigs) {
    try {
      if (config.symbol === symbol && config.depositingEnabled) {
        return config;
      }
    } catch (e) {
      // nevermind
    }
  }
  throw new Error(`Collateral config for "${symbol}" does not exist`);
}
