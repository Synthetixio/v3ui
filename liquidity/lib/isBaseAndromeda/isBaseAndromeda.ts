export const isBaseAndromeda = (id?: number | string, preset?: string) =>
  (id?.toString() === '8453' || '84532') && preset === 'andromeda';

export function getRepayerContract(id?: number) {
  switch (id) {
    case 8453:
      return '0xBD8004ea5c73E33d405d35d594221Efc733F7E37';
    case 84532:
      return '0xD00a601eafC2C131F46105827AFB02b925Adf62A';
    default:
      return '';
  }
}

export function getStataUSDCAddress() {
  return '0x4EA71A20e655794051D1eE8b6e4A3269B13ccaCc';
}

export function getsStataUSDCAddress() {
  return '0x729Ef31D86d31440ecBF49f27F7cD7c16c6616d2';
}

export function getSpotMarketId(collateralSymbol?: string) {
  switch (collateralSymbol) {
    case 'USDC':
      return USDC_BASE_MARKET;

    case 'stataUSDC':
      return STATA_BASE_MARKET;

    default:
      return USDC_BASE_MARKET;
  }
}

export const USDC_BASE_MARKET = '1';
export const STATA_BASE_MARKET = '3';
