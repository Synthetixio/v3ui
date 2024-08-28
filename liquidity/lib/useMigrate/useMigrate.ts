import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDefaultProvider, useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useLegacyMarket } from '../useLegacyMarket';
import { useCallback, useState } from 'react';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { ZEROWEI } from '../../ui/src/utils/constants';
import { wei } from '@synthetixio/wei';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { parseTxError } from '../parser';

export function useMigrate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { network } = useNetwork();
  const provider = useDefaultProvider();
  const signer = useSigner();
  const { data: legacyMarket } = useLegacyMarket();
  const { gasSpeed } = useGasSpeed();
  const queryClient = useQueryClient();

  const { data: transaction } = useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'MigrateTxn'],
    queryFn: async function () {
      if (!legacyMarket || !signer) {
        return;
      }
      const signerAddress = await signer!.getAddress();
      const accountId = Math.floor(Math.random() * 1000000000000);
      const populateTransaction = await legacyMarket.populateTransaction.migrate(accountId, {
        from: signerAddress,
      });
      try {
        const [gasLimit, feeData] = await Promise.all([
          await provider?.estimateGas(populateTransaction),
          await provider?.getFeeData(),
        ]);
        return { ...populateTransaction, gasLimit, gasPrice: feeData?.gasPrice };
      } catch (error) {
        const parsedError = parseTxError(error);
        const errorResult = legacyMarket.interface.parseError(parsedError as string);
        console.error('error:', errorResult);
        return null;
      }
    },
    enabled: Boolean(signer && !!legacyMarket),
    staleTime: 60 * 1000,
  });

  const migrate = useCallback(async () => {
    try {
      if (!legacyMarket || !transaction) {
        return;
      }
      setIsLoading(true);
      setIsSuccess(false);
      const gasPrices = await getGasPrice({ provider: signer!.provider });
      const signerAddress = await signer!.getAddress();
      const accountId = Math.floor(Math.random() * 1000000000000);
      const populateTransaction = await legacyMarket.populateTransaction.migrate(accountId, {
        from: signerAddress,
      });
      const gasLimit = await provider?.estimateGas(populateTransaction);

      const gasOptionsForTransaction = formatGasPriceForTransaction({
        gasLimit: wei(gasLimit || ZEROWEI).toBN(),
        gasPrices,
        gasSpeed,
      });

      const txn = await legacyMarket
        .connect(signer!)
        .migrate(accountId, { ...gasOptionsForTransaction });
      await txn.wait();

      setIsLoading(false);
      setIsSuccess(true);

      queryClient.invalidateQueries({
        queryKey: [`${network?.id}-${network?.preset}`, 'Accounts'],
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, [
    gasSpeed,
    legacyMarket,
    network?.id,
    network?.preset,
    provider,
    queryClient,
    signer,
    transaction,
  ]);

  return {
    migrate,
    transaction,
    isLoading,
    isSuccess,
  };
}
