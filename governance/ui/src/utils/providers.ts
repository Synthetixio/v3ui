import { providers } from 'ethers';

export const motherShipProvider = new providers.JsonRpcProvider(
  process.env.DEV ? 'http://127.0.0.1:19000/' : ''
);

export const satellite1Provider = new providers.JsonRpcProvider(
  process.env.DEV ? 'http://127.0.0.1:19001/' : ''
);

export const satellite2Provider = new providers.JsonRpcProvider(
  process.env.DEV ? 'http://127.0.0.1:19002/' : ''
);
