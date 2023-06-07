import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { DebtChange, ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';
import { constants } from 'ethers';

export const RepayUi: FC<{
  debtChange: DebtChange;
  max?: Wei;
  snxUSDBalance?: Wei;
  currentDebt?: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, max, currentDebt, snxUSDBalance }) => {
  const setBurnToTarget = () => {
    if (!snxUSDBalance) {
      return;
    }
    setDebtChange(snxUSDBalance.neg());
  };

  const setClearDebt = () => {
    if (!currentDebt) {
      return;
    }
    setDebtChange(wei(-constants.MaxUint256));
  };

  return (
    <Flex flexDirection="column" gap={2}>
      <Flex alignItems="center">
        <Text fontSize="md" fontWeight="700" color="white">
          Burn
        </Text>
        <Tooltip
          borderRadius="md"
          padding={2}
          label="Burn your snxUSD debt to increase your Collateralization Ratio and reduce your debt"
        >
          <span>
            <InfoIcon ml={1} mb={0.5} width="12px" height="12px" color="white" />
          </span>
        </Tooltip>
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Button
          variant="outline"
          width="32%"
          fontSize="12px"
          lineHeight="16px"
          height="28px"
          onClick={setBurnToTarget}
        >
          Burn to Target
        </Button>
        <Button
          variant="outline"
          width="32%"
          fontSize="12px"
          lineHeight="16px"
          height="28px"
          onClick={setClearDebt}
        >
          Clear Debt
        </Button>
        <Button
          variant="outline"
          width="32%"
          fontSize="12px"
          lineHeight="16px"
          height="28px"
          onClick={() => setDebtChange(wei(0))}
        >
          Custom
        </Button>
      </Flex>
      <BorderBox display="flex" py={1} px={2}>
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <DollarCircle />
          snxUSD
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'repay amount input',
              'data-max': max?.toString(),
            }}
            value={debtChange.amount.abs()}
            onChange={(val) => setDebtChange(val.mul(-1))}
            max={max}
          />
        </Flex>
      </BorderBox>
      <Button
        data-testid="repay submit"
        type="submit"
        isDisabled={!(max && snxUSDBalance && currentDebt)}
      >
        Repay snxUSD
      </Button>
    </Flex>
  );
};

export const Repay = () => {
  const {
    state: { debtChange },
    dispatch,
  } = useContext(ManagePositionContext);

  const { data: USDProxy } = useUSDProxy();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });

  const { data: balance } = useTokenBalance(USDProxy?.address);

  const debtExists = liquidityPosition?.debt.gt(0.01);
  const flooredBalance = balance?.gt(0.01) ? balance : wei(0);

  return (
    <RepayUi
      setDebtChange={(val) => dispatch({ type: 'setDebtChange', payload: val })}
      debtChange={debtChange}
      snxUSDBalance={flooredBalance}
      currentDebt={debtExists ? liquidityPosition?.debt : wei(0)}
      max={Wei.max(liquidityPosition?.debt || wei(0), balance || wei(0))}
    />
  );
};
