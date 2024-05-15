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
    case 1:
      return '0xb2F30A7C980f052f02563fb518dcc39e6bf38175';
    case 11155111:
      return '0x1b791d05E437C78039424749243F5A79E747525e';
    case 8453:
      return sUSDC;
    case 84532:
      return BASE_SEPOLIA_sUSDC;
    default:
      return sUSDC;
  }
}

export function getSNXUSDAddress(id?: number) {
  switch (id) {
    case 1:
      return '0xb2F30A7C980f052f02563fb518dcc39e6bf38175';
    case 11155111:
      return '0x1b791d05E437C78039424749243F5A79E747525e';
    case 84532:
      return '0x682f0d17feDC62b2a0B91f8992243Bf44cAfeaaE';
    case 8453:
      return '0x09d51516F38980035153a554c26Df3C6f51a23C3';
    default:
      return '0xb2F30A7C980f052f02563fb518dcc39e6bf38175';
  }
}

export function getPythWrapper(id?: number) {
  switch (id) {
    case 8453:
      return '0x3FC194FA6C26BE94Fc404E69b51793c199c3BF52';
    case 84532:
      return '0xF9e9e905d3745F5E0B803a179E17328CFe03B56d';
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
