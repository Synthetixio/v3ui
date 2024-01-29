import { SSX, SSXClientSession } from '@spruceid/ssx';
import { providers } from 'ethers';

let ssx: SSX;
let session: SSXClientSession;

export const getSSX = async (provider: providers.JsonRpcProvider) => {
  if (!ssx) {
    ssx = new SSX({
      enableDaoLogin: true,
      providers: {
        web3: {
          driver: provider,
        },
      },
    });
  }
  session = await ssx.signIn();

  return session;
};
