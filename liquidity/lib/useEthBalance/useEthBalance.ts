import { useQuery } from '@tanstack/react-query';
import { useWallet, useNetwork, useDefaultProvider } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';

const BalanceSchema = ZodBigNumber.transform((x) => wei(x));

export function useEthBalance(networkId?: number) {
  const { activeWallet } = useWallet();
  const provider = useDefaultProvider();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'EthBalance',
      { accountAddress: activeWallet?.address },
    ],
    queryFn: async () => {
      if (!activeWallet || !provider) throw Error('useEthBalance should not be enabled');
      return BalanceSchema.parse(await provider.getBalance(activeWallet.address));
    },
    enabled: Boolean((networkId ?? network?.id) && activeWallet?.address),
  });
}
