import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext } from 'react';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { RepayAllDebt } from './';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { TokenIcon } from '../TokenIcon';
import { ZEROWEI } from '../../utils/constants';
import { useTokenPrice } from '../../../../lib/useTokenPrice';
import { useParams } from 'react-router-dom';

export const RepayUi: FC<{
  debtChange: Wei;
  max?: Wei;
  snxUSDBalance?: Wei;
  availableUSDCollateral?: Wei;
  currentDebt?: Wei;
  setDebtChange: (val: Wei) => void;
  symbol: string;
}> = ({
  symbol,
  debtChange,
  setDebtChange,
  max,
  currentDebt,
  snxUSDBalance,
  availableUSDCollateral,
}) => {
  const price = useTokenPrice(symbol);
  return (
    <Flex flexDirection="column">
      <Text color="gray./50" fontSize="sm" fontWeight="700" mb="3">
        Repay Debt
      </Text>
      <BorderBox display="flex" p={3} mb="6">
        <Flex alignItems="flex-start" flexDir="column" gap="1">
          <BorderBox display="flex" py={1.5} px={2.5}>
            <Text display="flex" gap={2} fontSize="16px" alignItems="center" fontWeight="600">
              <TokenIcon symbol={symbol} width={16} height={16} />
              {symbol}
            </Text>
          </BorderBox>
          <Flex fontSize="12px" gap="1">
            <Flex gap="1" mr="3" cursor="pointer">
              <Text>Debt:</Text>
              <Text display="flex" alignItems="center">
                $<Amount value={currentDebt} data-testid="current debt" />
                {currentDebt?.gt(0) && (
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      if (!currentDebt) {
                        return;
                      }
                      setDebtChange(currentDebt.neg());
                    }}
                    color="cyan.500"
                    fontWeight={700}
                  >
                    &nbsp; Max
                  </Text>
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDirection="column" flexGrow={1}>
          <NumberInput
            InputProps={{
              isRequired: true,
              'data-testid': 'repay amount input',
              'data-max': max?.toString(),
              type: 'number',
              min: 0,
            }}
            value={debtChange.abs()}
            onChange={(val) => setDebtChange(val.mul(-1))}
            max={max}
            min={ZEROWEI}
          />
          <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
            {price.gt(0) && <Amount prefix="$" value={debtChange.abs().mul(price)} />}
          </Flex>
        </Flex>
      </BorderBox>
      <Button
        data-testid="repay submit"
        type="submit"
        isDisabled={
          !(max && snxUSDBalance && currentDebt && availableUSDCollateral) || debtChange.gte(0)
        }
      >
        {debtChange.gte(0) ? 'Enter Amount' : 'Repay'}
      </Button>
    </Flex>
  );
};

export const Repay = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { debtChange, setDebtChange } = useContext(ManagePositionContext);
  const { network } = useNetwork();
  const { collateralSymbol } = useParams();

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const availableUSDCollateral = liquidityPosition?.usdCollateral.availableCollateral;
  const { data: systemToken } = useSystemToken();
  const { data: balance } = useTokenBalance(systemToken?.address);

  const debtExists = liquidityPosition?.debt.gt(0);
  const flooredBalance = balance?.gt(0.01) ? balance : wei(0);
  const symbol = isBase ? collateralSymbol : systemToken?.symbol;

  if (liquidityPosition?.debt.gt(0.01) && isBaseAndromeda(network?.id, network?.preset)) {
    return <RepayAllDebt liquidityPosition={liquidityPosition} />;
  }

  return (
    <RepayUi
      symbol={symbol}
      setDebtChange={setDebtChange}
      debtChange={debtChange}
      snxUSDBalance={flooredBalance}
      availableUSDCollateral={availableUSDCollateral}
      currentDebt={debtExists ? liquidityPosition?.debt : wei(0)}
      max={debtExists ? liquidityPosition?.debt : ZEROWEI}
    />
  );
};
