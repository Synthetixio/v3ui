import { useEffect } from 'react';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { useTimer } from 'react-timer-hook';

export function useWithdrawTimer(accountId: string) {
  const { data: accountCollateralUnlockDate, isLoading: isLoadingDate } =
    useAccountCollateralUnlockDate({
      accountId,
    });
  const { minutes, hours, seconds, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(0),
    autoStart: false,
  });

  useEffect(() => {
    if (accountCollateralUnlockDate && !isLoadingDate) {
      restart(accountCollateralUnlockDate, true);
    }
  }, [accountCollateralUnlockDate, isLoadingDate, restart]);

  return {
    minutes,
    hours,
    seconds,
    isRunning,
    accountCollateralUnlockDate,
  };
}
