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

export function getSpotMarketId(collateralSymbol?: string) {
  switch (collateralSymbol?.toLowerCase()) {
    case 'usdc':
    case 'susdc':
      return USDC_BASE_MARKET;

    case 'statausdc':
    case 'sstatausdc':
      return STATA_BASE_MARKET;

    default:
      return USDC_BASE_MARKET;
  }
}

export const USDC_BASE_MARKET = '1';
export const STATA_BASE_MARKET = '3';
export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
export const STATA_BASE_ADDRESS = '0x4EA71A20e655794051D1eE8b6e4A3269B13ccaCc';
