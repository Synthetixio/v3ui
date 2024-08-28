import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useV2xSynthetix } from '@snx-v3/useV2xSynthetix';
import { wei } from '@synthetixio/wei';
import { utils } from 'ethers';

export function useV2Position(customNetwork?: Network | null) {
  const { data: v2xSynthetix } = useV2xSynthetix(customNetwork);
  const { network } = useNetwork();
  const { activeWallet } = useWallet();
  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'V2Position',
      {
        wallet: activeWallet?.address,
      },
    ],
    queryFn: async function () {
      if (!v2xSynthetix) {
        return;
      }
      const [collateral, balance, debt, cratio, transferableSynthetix] = await Promise.all([
        wei(await v2xSynthetix.collateral(activeWallet?.address)),
        wei(await v2xSynthetix.balanceOf(activeWallet?.address)),
        wei(
          await v2xSynthetix.debtBalanceOf(activeWallet?.address, utils.formatBytes32String('sUSD'))
        ),
        wei(await v2xSynthetix.collateralisationRatio(activeWallet?.address)),
        wei(await v2xSynthetix.transferableSynthetix(activeWallet?.address)),
      ]);

      return {
        collateral,
        balance,
        debt,
        cratio,
        transferableSynthetix,
      };
    },
    enabled: Boolean(v2xSynthetix && activeWallet?.address),
    staleTime: Infinity,
  });
}
