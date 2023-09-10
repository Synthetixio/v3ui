import { useQuery, useMutation } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork, useWallet, onboard } from '@snx-v3/useBlockchain';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

export function useAccounts() {
  const wallet = useWallet();
  const { data: AccountProxy } = useAccountProxy();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountAddress: wallet?.address }, 'Accounts'],
    queryFn: async function () {
      if (!AccountProxy || !wallet?.address) throw new Error('Should be disabled');
      const numberOfAccountTokens = await AccountProxy.balanceOf(wallet.address);
      if (numberOfAccountTokens.eq(0)) {
        // No accounts created yet
        return [];
      }
      const accountIndexes = Array.from(Array(numberOfAccountTokens.toNumber()).keys());
      const accounts = await Promise.all(
        accountIndexes.map(async (i) => {
          if (!wallet?.address) throw new Error('OMG!');
          return await AccountProxy.tokenOfOwnerByIndex(wallet.address, i);
        })
      );
      return accounts.map((accountId) => accountId.toString());
    },
    enabled: Boolean(AccountProxy?.address && wallet?.address),
    placeholderData: [],
  });
}

export function useCreateAccount() {
  const { data: CoreProxy } = useCoreProxy();

  return useMutation({
    mutationFn: async function () {
      try {
        if (!CoreProxy) throw new Error('CoreProxy undefined');
        const tx = await CoreProxy['createAccount()']();
        const res = await tx.wait();

        let newAccountId: string | undefined;

        res.logs.forEach((log: { topics: any[]; data: any }) => {
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
  });
}

export function useAccountUrlSync() {
  const accounts = useAccounts();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const accountId = queryParams.get('accountId') || undefined;

    if (accounts.isFetched && accounts.data && accounts.data.length > 0) {
      // Accounts fetched and we have some, preselect one
      if (!accountId || !accounts.data.includes(accountId)) {
        queryParams.set('accountId', accounts.data[0]);

        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
      }
      // when accountId param is present, and it also exists in the accounts list, do nothing
      return;
    }

    const { wallets } = onboard.state.get();
    if (
      // Check separately for the case when wallet is not connected
      wallets.length < 1 ||
      (accounts.isFetched && (!accounts.data || accounts.data.length < 1))
    ) {
      // We have fetched accounts but there are none, remove account id from url
      if (accountId) {
        queryParams.delete('accountId');
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
      }
    }
  }, [accounts.data, accounts.isFetched, navigate, location, queryParams]);
}
