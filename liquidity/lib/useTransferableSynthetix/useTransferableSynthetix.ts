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
    queryKey: [
      `${network.id}-${network.preset}`,
      'TransferableSynthetix',
      { address: account?.address },
    ],
    queryFn: async function (): Promise<{ transferable: Wei; collateral?: Wei }> {
      if (!(provider && accountAddress && snxAddress)) {
        throw 'useTransferableSynthetix should not be enabled';
      }
      const contract = new ethers.Contract(
        snxAddress,
        [
          'function balanceOf(address owner) view returns (uint256)',
          'function transferableSynthetix(address account) view returns (uint256 transferable)',
          'function collateral(address account) view returns (uint256 collateral)',
        ],
        provider
      );
      try {
        // Cannon case
        if (network.name === 'cannon') {
          const balanceOf = await contract.balanceOf(accountAddress);
          return {
            transferable: wei(balanceOf),
          };
        }

        // Normal case for SNX case
        const [transferableSynthetix, collateral] = await Promise.all([
          contract.transferableSynthetix(accountAddress),
          contract.collateral(accountAddress),
        ]);

        return {
          transferable: wei(transferableSynthetix),
          collateral: wei(collateral),
        };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  });
}
