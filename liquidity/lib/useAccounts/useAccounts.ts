import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useConnectWallet } from '@web3-onboard/react';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useGasPrice } from '@snx-v3/useGasPrice';
import { wei } from '@synthetixio/wei';

export function useAccounts() {
  const { activeWallet } = useWallet();
  const { data: AccountProxy } = useAccountProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'Accounts',
      { accountAddress: activeWallet?.address },
    ],
    queryFn: async function () {
      if (!AccountProxy || !activeWallet?.address) throw new Error('Should be disabled');
      const numberOfAccountTokens = await AccountProxy.balanceOf(activeWallet.address);

      if (numberOfAccountTokens.eq(0)) {
        // No accounts created yet
        return [];
      }
      const accountIndexes = Array.from(Array(numberOfAccountTokens.toNumber()).keys());
      const accounts = await Promise.all(
        accountIndexes.map(async (i) => {
          if (!activeWallet?.address) throw new Error('OMG!');
          return await AccountProxy.tokenOfOwnerByIndex(activeWallet.address, i);
        })
      );
      return accounts.map((accountId) => accountId.toString());
    },
    enabled: Boolean(AccountProxy?.address && activeWallet?.address),
    placeholderData: [],
  });
}

export function useCreateAccount() {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const client = useQueryClient();
  const { data: gasPrices } = useGasPrice();
  return {
    getTransactionCost: useQuery({
      enabled: !!gasPrices,
      queryKey: ['Transaction-Cost-Account'],
      queryFn: async () => {
        const gasUnits = await CoreProxy?.estimateGas['createAccount()']();
        if (gasPrices) {
          if ('baseFeePerGas' in gasPrices?.average && gasUnits) {
            const { coins } = await (
              await fetch('https://coins.llama.fi/prices/current/coingecko:ethereum?searchWidth=4h')
            ).json();
            return (
              wei(gasPrices?.average.baseFeePerGas.mul(gasUnits), 18).toNumber() *
              coins['coingecko:ethereum'].price
            ).toFixed(2);
          }
        }
        return '0.00';
      },
    }),
    mutation: useMutation({
      mutationFn: async function () {
        try {
          if (!CoreProxy) throw new Error('CoreProxy undefined');
          const tx = await CoreProxy['createAccount()']();
          const res = await tx.wait();

          await client.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'Accounts'],
          });

          let newAccountId: string | undefined;

          res.logs.forEach((log: any) => {
            if (log.topics[0] === CoreProxy.interface.getEventTopic('AccountCreated')) {
              const accountId = CoreProxy.interface.decodeEventLog(
                'AccountCreated',
                log.data,
                log.topics
              )?.accountId;
              newAccountId = accountId?.toString();
            }
          });

          return [newAccountId];
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  };
}

export function useAccountUrlSync() {
  const accounts = useAccounts();
  const [{ wallet }] = useConnectWallet();

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const accountId = queryParams.get('accountId') || undefined;
    if (accounts.isFetched && accounts.data && accounts.data.length > 0) {
      // Accounts fetched and we have some, preselect one
      if (!accountId || !accounts.data.includes(accountId)) {
        queryParams.set('accountId', accounts.data[0]);

        navigate(
          {
            pathname: location.pathname,
            search: queryParams.toString(),
          },
          { replace: true }
        );
      }
      // when accountId param is present, and it also exists in the accounts list, do nothing
      return;
    }

    const wallets = wallet?.accounts;
    if (
      // Check separately for the case when wallet is not connected
      (wallets && wallets.length < 1) ||
      (accounts.isFetched && (!accounts.data || accounts.data.length < 1))
    ) {
      // We have fetched accounts but there are none, remove account id from url
      if (accountId) {
        navigate(
          {
            pathname: location.pathname,
            search: queryParams.toString(),
          },
          { replace: true }
        );
      }
    }
  }, [navigate, location, accounts.data, accounts.isFetched, wallet?.accounts, queryParams]);
}
