import { useQuery } from '@tanstack/react-query';
import { useNetwork, useSigner, useWallet } from '@snx-v3/useBlockchain';
import { Wei, wei } from '@synthetixio/wei';
import { ethers } from 'ethers';

import type { Synthetix } from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import type { Synthetix as SynthetixOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix';

export async function importSynthetix(chainName: string) {
  switch (chainName) {
    case 'mainnet':
      return import('@synthetixio/contracts/build/mainnet/deployment/Synthetix');
    case 'goerli':
      return import('@synthetixio/contracts/build/goerli/deployment/Synthetix');
    case 'optimism-mainnet':
      return import('@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix');
    case 'optimism-goerli':
      return import('@synthetixio/contracts/build/goerli-ovm/deployment/Synthetix');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useV2TransferrableBalance() {
  const network = useNetwork();
  const account = useWallet();
  const signer = useSigner();

  return useQuery({
    queryKey: [network.name, { address: account?.address }],
    enabled: Boolean(account?.address),
    queryFn: async function (): Promise<Wei> {
      const { address, abi } = await importSynthetix(network.name);
      const contract = new ethers.Contract(address, abi, signer) as SynthetixOvm | Synthetix;
      const amount = await contract.transferableSynthetix(account?.address || '');

      return wei(amount);
    },
  });
}
