import { Alert, AlertIcon, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { NumberInput } from '@snx-v3/NumberInput';
import { FC, useContext, useEffect, useMemo } from 'react';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ZEROWEI } from '../../utils/constants';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTimer } from 'react-timer-hook';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { TokenIcon } from '../TokenIcon';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from 'react-router-dom';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';

const WithdrawUi: FC<{
  setAmount: (val: Wei) => void;
  amount: Wei;
  maWWithdrawable: Wei;
  unlockDate?: Date | null;
  displaySymbol: string;
  symbol: string;
}> = ({ displaySymbol, symbol, unlockDate, setAmount, amount, maWWithdrawable }) => {
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
      <Text color="gray./50" fontSize="sm" fontWeight="700" mb="3">
        Withdraw Collateral
      </Text>

      <BorderBox display="flex" p={3} mb="6">
        <Flex alignItems="flex-start" flexDir="column" gap="1">
          <BorderBox display="flex" py={1.5} px={2.5}>
            <Text display="flex" gap={2} fontSize="16px" alignItems="center" fontWeight="600">
              <TokenIcon symbol={symbol} width={16} height={16} />
              {displaySymbol}
            </Text>
          </BorderBox>
          <Flex fontSize="12px" gap="1">
            <Text>Unlocked:</Text>
            <Amount value={maWWithdrawable} /> {displaySymbol}
            <Text
              cursor="pointer"
              onClick={() => {
                if (!maWWithdrawable) {
                  return;
                }
                setAmount(maWWithdrawable);
              }}
              color="cyan.500"
              fontWeight={700}
            >
              &nbsp; Max
            </Text>
          </Flex>
        </Flex>
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
        </Flex>
      </BorderBox>

      <Collapse in={isRunning && maWWithdrawable.gt(0)} animateOpacity>
        <Alert colorScheme="red" mb="4">
          <AlertIcon />
          <Text>
            You will be able to withdraw assets in {hours}:{minutes}. Any account activity will
            reset this timer to 24H.
          </Text>
        </Alert>
      </Collapse>

      <Button
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
  const { setWithdrawAmount, withdrawAmount } = useContext(ManagePositionContext);
  const accountId = liquidityPosition?.accountId;
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { data: accountCollaterals } = useAccountCollateral({
    accountId,
  });

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
      setAmount={setWithdrawAmount}
      amount={withdrawAmount}
      maWWithdrawable={maWWithdrawable}
      unlockDate={!isLoadingDate ? accountCollateralUnlockDate : null}
    />
  );
};
