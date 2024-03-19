export const isBaseAndromeda = (id?: number | string, preset?: string) =>
  (id?.toString() === '8453' || '84532') && preset === 'andromeda';

export function getUSDCAddress(id?: number | string) {
  switch (id) {
    case '8453':
      return BASE_USDC;
    case '84532':
      return BASE_SEPOLIA_fUSDC;
    default:
      return BASE_USDC;
  }
}

export const BASE_USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
export const BASE_SEPOLIA_fUSDC = '0x10e55D2110C71AfAb55244fcaFdA71D01B387F4c';
export const BASE_SEPOLIA_sUSDC = '0x434Aa3FDb11798EDaB506D4a5e48F70845a66219';

export const USDC_BASE_MARKET = '1';

export const sUSDC = '0xC74eA762cF06c9151cE074E6a569a5945b6302E7';
