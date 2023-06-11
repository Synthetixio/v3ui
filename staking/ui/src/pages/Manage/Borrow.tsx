import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';
import { Action, DebtChange, ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { Dispatch, FC, useContext } from 'react';
import { validatePosition } from '@snx-v3/validatePosition';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon } from '@chakra-ui/icons';

const BorrowUi: FC<{
  debtChange: DebtChange;
  maxDebt: Wei;
  dispatch: Dispatch<Action>;
}> = ({ debtChange, maxDebt, dispatch }) => {
  const mintMax = () => {
    dispatch({ type: 'mintMax', payload: maxDebt });
  };

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Text fontSize="md" fontWeight="700" color="white">
          Borrow/Mint
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
      <Flex width="100%" justifyContent="space-between" my={2}>
        <Button
          variant="outline"
          width="49%"
          fontSize="12px"
          lineHeight="16px"
          height="28px"
          onClick={mintMax}
        >
          Mint max
        </Button>
        <Button
          variant="outline"
          width="49%"
          fontSize="12px"
          lineHeight="16px"
          height="28px"
          onClick={() => dispatch({ type: 'setDebtChange', payload: wei(0) })}
        >
          Custom
        </Button>
      </Flex>
      <BorderBox display="flex" py={2} px={3} mb="4">
        <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
          <DollarCircle />
          snxUSD
        </Text>
        <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'borrow amount input',
              'data-max': maxDebt.toString(),
            }}
            value={debtChange.amount}
            onChange={(val) => dispatch({ type: 'setDebtChange', payload: val })}
            max={maxDebt}
          />
          <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!maxDebt) {
                  return;
                }
                dispatch({ type: 'setDebtChange', payload: maxDebt });
              }}
            >
              <Text>Max:</Text>
              <Amount value={maxDebt} /> snxUSD
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button data-testid="borrow submit" type="submit">
        Borrow snxUSD
      </Button>
    </Flex>
  );
};

export const Borrow = () => {
  const {
    state: { debtChange, collateralChange },
    dispatch,
  } = useContext(ManagePositionContext);

  const params = useParams();

  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });

  const { maxDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  return <BorrowUi dispatch={dispatch} debtChange={debtChange} maxDebt={maxDebt} />;
};
