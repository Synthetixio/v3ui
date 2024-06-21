import { importCollateralTokens as importer } from '@snx-v3/contracts';

export async function importCollateralTokens() {
  return importer(process.env.CYPRESS_CHAIN_ID, process.env.CYPRESS_PRESET);
}
