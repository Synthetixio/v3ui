import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useWallet } from '@snx-v3/useBlockchain';
import { Wei, wei } from '@synthetixio/wei';
import { ethers } from 'ethers';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export function useTransferableSynthetix() {
  const network = useNetwork();
  const account = useWallet();
  const provider = useProvider();
  const { data: snxCollateral } = useCollateralType('SNX');

  const accountAddress = account?.address;
  const snxAddress = snxCollateral?.tokenAddress;

  return useQuery({
    enabled: Boolean(provider && accountAddress && snxAddress),
    queryKey: [network.name, { address: account?.address }, 'transferableSynthetix'],
    queryFn: async function (): Promise<Wei> {
      if (!(provider && accountAddress && snxAddress)) throw 'OMG';
      const contract = new ethers.Contract(
        snxAddress,
        [
          'function balanceOf(address owner) view returns (uint256)',
          'function transferableSynthetix(address account) view returns (uint256 transferable)',
        ],
        provider
      );
      try {
        // Normal case for SNX case
        const transferableSynthetix = await contract.transferableSynthetix(accountAddress);
        return wei(transferableSynthetix);
      } catch (e) {
        // For local deployment we are dealing with a standard mintable token
        const balance = await contract.balanceOf(accountAddress);
        return wei(balance);
      }
    },
  });
}
