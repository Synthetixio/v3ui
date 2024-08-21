import { useDefaultProvider, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useLegacyMarket } from '../useLegacyMarket';
import { useCallback, useState } from 'react';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { ZEROWEI } from '../../ui/src/utils/constants';
import Wei, { wei } from '@synthetixio/wei';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { parseTxError } from '../parser';
import { useQueryClient } from '@tanstack/react-query';

export function useMigrateUSD({ amount }: { amount: Wei }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const signer = useSigner();
  const { data: legacyMarket } = useLegacyMarket();
  const { gasSpeed } = useGasSpeed();
  const provider = useDefaultProvider();
  const queryClient = useQueryClient();
  const { network } = useNetwork();

  const migrate = useCallback(async () => {
    try {
      if (!legacyMarket || !signer) {
        return;
      }
      setIsLoading(true);
      setIsSuccess(false);
      const gasPrices = await getGasPrice({ provider: signer!.provider });

      const transaction = await legacyMarket.populateTransaction.convertUSD(amount.toBN());
      const gasLimit = await provider?.estimateGas(transaction);

      const gasOptionsForTransaction = formatGasPriceForTransaction({
        gasLimit: wei(gasLimit || ZEROWEI).toBN(),
        gasPrices,
        gasSpeed,
      });

      const txn = await signer.sendTransaction({ ...transaction, ...gasOptionsForTransaction });

      await txn.wait();

      setIsLoading(false);
      setIsSuccess(true);

      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'TokenBalance'],
      });
    } catch (error) {
      const parsedError = parseTxError(error);
      const errorResult = legacyMarket?.interface.parseError(parsedError as string);
      console.error('error:', errorResult);
      setIsLoading(false);
      throw error;
    }
  }, [amount, gasSpeed, legacyMarket, network?.id, network?.preset, provider, queryClient, signer]);

  return {
    migrate,
    isLoading,
    isSuccess,
  };
}
