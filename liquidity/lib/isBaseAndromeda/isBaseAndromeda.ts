export const isBaseAndromeda = (id?: number | string, preset?: string) =>
  (id?.toString() === '8453' || '84532') && preset === 'andromeda';

export function getRepayerContract(id?: number) {
  switch (id) {
    case 8453:
      return '';
    case 84532:
      return '0x3FC788Fe70ad90A0058Fc3b16808ea09E131A56C';
    default:
      return '';
  }
}

export function getUSDCAddress(id?: number) {
  switch (id) {
    case 8453:
      return BASE_USDC;
    case 84532:
      return BASE_SEPOLIA_fUSDC;
    default:
      return BASE_USDC;
  }
}

export function getsUSDCAddress(id?: number) {
  switch (id) {
    case 8453:
      return sUSDC;
    case 84532:
      return BASE_SEPOLIA_sUSDC;
    default:
      return sUSDC;
  }
}

export const BASE_USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
export const sUSDC = '0xC74eA762cF06c9151cE074E6a569a5945b6302E7';

// Base Sepolia
export const BASE_SEPOLIA_fUSDC = '0xc43708f8987Df3f3681801e5e640667D86Ce3C30';
export const BASE_SEPOLIA_sUSDC = '0x8069c44244e72443722cfb22DcE5492cba239d39';

export const USDC_BASE_MARKET = '1';
