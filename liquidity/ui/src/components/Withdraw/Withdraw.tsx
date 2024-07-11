import { Alert, AlertIcon, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { NumberInput } from '@snx-v3/NumberInput';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ZEROWEI } from '../../utils/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useWithdrawBaseAndromeda } from '@snx-v3/useWithdrawBaseAndromeda';
import { useTimer } from 'react-timer-hook';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { TokenIcon } from '../TokenIcon';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from 'react-router-dom';

const WithdrawUi: FC<{
  isLoading: boolean;
  onSubmit: () => void;
  setAmount: (val: Wei) => void;
  amount: Wei;
  maWWithdrawable: Wei;
  unlockDate?: Date | null;
  displaySymbol: string;
  symbol: string;
}> = ({
  displaySymbol,
  symbol,
  isLoading,
  onSubmit,
  unlockDate,
  setAmount,
  amount,
  maWWithdrawable,
}) => {
  const { minutes, hours, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(0),
    autoStart: false,
  });

  useEffect(() => {
    if (unlockDate) {
      restart(unlockDate, true);
    }
  }, [restart, unlockDate]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        Withdraw Collateral
      </Text>

      <BorderBox display="flex" py={2} px={3} mb="4">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <TokenIcon symbol={symbol} />
          {displaySymbol}
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'withdraw amount input',
              'data-max': maWWithdrawable.toString(),
            }}
            value={amount}
            onChange={(val) => setAmount(val)}
            max={maWWithdrawable}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!maWWithdrawable) {
                  return;
                }
                setAmount(maWWithdrawable);
              }}
            >
              <Text>Max:</Text>
              <Amount value={maWWithdrawable} /> {displaySymbol}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>

      <Collapse in={isRunning && maWWithdrawable.gt(0)} animateOpacity>
        <Alert colorScheme="blue" mb="4">
          <AlertIcon />
          <Text>
            You will be able to withdraw assets in {hours}:{minutes}. Any account activity will
            reset this timer to 24H.
          </Text>
        </Alert>
      </Collapse>

      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        isLoading={isLoading}
        isDisabled={amount.lte(0) || isRunning || !unlockDate || amount.gt(maWWithdrawable)}
        data-testid="claim submit"
        type="submit"
      >
        {amount.gt(0) ? 'Withdraw' : 'Enter Amount'}
      </Button>
    </Flex>
  );
};

export const Withdraw = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const accountId = liquidityPosition?.accountId;
  const [amount, setAmount] = useState<Wei>(ZEROWEI);
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const queryClient = useQueryClient();
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { data: accountCollaterals } = useAccountCollateral({
    accountId,
  });

  const { mutation: withdrawMain, isLoading } = useWithdraw({
    amount,
    accountId,
    collateralTypeAddress: liquidityPosition?.accountCollateral.tokenAddress,
  });

  const { mutation: withdrawAndromeda, isLoading: isLoadingAndromeda } = useWithdrawBaseAndromeda({
    accountId,
    sUSDCCollateral:
      accountCollaterals && accountCollaterals[0]
        ? accountCollaterals[0].availableCollateral
        : ZEROWEI,
    snxUSDCollateral:
      accountCollaterals && accountCollaterals[1]
        ? accountCollaterals[1].availableCollateral
        : ZEROWEI,
    amountToWithdraw: amount,
  });

  const handleSubmit = useCallback(async () => {
    if (!isBaseAndromeda(network?.id, network?.preset)) {
      await withdrawMain.mutateAsync();
    } else {
      await withdrawAndromeda.mutateAsync();
    }
    queryClient.clear();
  }, [network?.id, network?.preset, queryClient, withdrawAndromeda, withdrawMain]);

  const maWWithdrawable = useMemo(() => {
    if (isBase) {
      return ((accountCollaterals && accountCollaterals[0].availableCollateral) || ZEROWEI).add(
        (accountCollaterals && accountCollaterals[1].availableCollateral) || ZEROWEI
      );
    }
    return liquidityPosition?.accountCollateral.availableCollateral || ZEROWEI;
  }, [accountCollaterals, isBase, liquidityPosition?.accountCollateral.availableCollateral]);

  const { data: accountCollateralUnlockDate, isLoading: isLoadingDate } =
    useAccountCollateralUnlockDate({
      accountId,
    });

  if (!collateralType) {
    return null;
  }
  return (
    <WithdrawUi
      displaySymbol={collateralType.displaySymbol}
      symbol={collateralType.symbol}
      setAmount={setAmount}
      amount={amount}
      onSubmit={handleSubmit}
      isLoading={isBase ? isLoadingAndromeda : isLoading}
      maWWithdrawable={maWWithdrawable}
      unlockDate={!isLoadingDate ? accountCollateralUnlockDate : null}
    />
  );
};
