import { Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { DollarCircle } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAccountSpecificCollateral } from '@snx-v3/useAccountCollateral';

export const RepayUi: FC<{
  debtChange: Wei;
  max?: Wei;
  snxUSDBalance?: Wei;
  availableUSDCollateral?: Wei;
  currentDebt?: Wei;
  setDebtChange: (val: Wei) => void;
}> = ({ debtChange, setDebtChange, max, currentDebt, snxUSDBalance, availableUSDCollateral }) => {
  const totalUsdBalance =
    snxUSDBalance && availableUSDCollateral ? snxUSDBalance.add(availableUSDCollateral) : undefined;
  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="0.5">
        Repay snxUSD
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Pay down your position’s debt with snxUSD. This decreases your debt and increases your
        C-Ratio.
      </Text>
      <BorderBox display="flex" py={2} px={3} mb="4">
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
            value={debtChange.abs()}
            onChange={(val) => setDebtChange(val.mul(-1))}
            max={max}
          />
          <Flex flexDirection="row" justifyContent="right" fontSize="xs" color="whiteAlpha.700">
            <Flex
              gap="1"
              mr="3"
              cursor="pointer"
              onClick={() => {
                if (!currentDebt) {
                  return;
                }
                setDebtChange(currentDebt.neg());
              }}
            >
              <Text>Debt:</Text>
              <Text display="inline">
                $<Amount value={currentDebt} data-testid="current debt" />
              </Text>
            </Flex>
            <Flex
              gap="1"
              cursor="pointer"
              onClick={() => {
                if (!totalUsdBalance) {
                  return;
                }
                setDebtChange(totalUsdBalance.neg());
              }}
            >
              <Tooltip
                label={
                  <Flex direction="column" alignItems="flex-start">
                    <Flex justifyContent="space-between" width="full" gap={1}>
                      Wallet Balance: <Amount value={snxUSDBalance} suffix=" sUSD" />
                    </Flex>
                    <Flex justifyContent="space-between" width="full" gap={1}>
                      Collateral Balance: <Amount value={availableUSDCollateral} suffix=" sUSD" />
                    </Flex>
                  </Flex>
                }
              >
                <Flex gap={1}>
                  <Text>Balance:</Text>
                  <Text display="inline">
                    <Amount
                      value={totalUsdBalance}
                      data-testid="available snxUSD balance"
                      suffix=" sUSD"
                    />
                  </Text>
                </Flex>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button
        data-testid="repay submit"
        type="submit"
        isDisabled={!(max && snxUSDBalance && currentDebt && availableUSDCollateral)}
      >
        Repay snxUSD
      </Button>
    </Flex>
  );
};
export const Repay = () => {
  const { debtChange, setDebtChange } = useContext(ManagePositionContext);
  const { data: USDProxy } = useUSDProxy();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const { data } = useAccountSpecificCollateral(params.accountId, USDProxy?.address);
  const availableUSDCollateral = data?.availableCollateral;
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
      setDebtChange={setDebtChange}
      debtChange={debtChange}
      snxUSDBalance={flooredBalance}
      availableUSDCollateral={availableUSDCollateral}
      currentDebt={debtExists ? liquidityPosition?.debt : wei(0)}
      max={Wei.max(
        liquidityPosition?.debt || wei(0),
        availableUSDCollateral?.add(balance || wei(0)) || wei(0)
      )}
    />
  );
};
