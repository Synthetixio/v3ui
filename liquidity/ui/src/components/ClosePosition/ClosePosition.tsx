import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { useTokenPrice } from '@snx-v3/useTokenPrice';
import Wei from '@synthetixio/wei';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZEROWEI } from '@snx-v3/constants';
import { TokenIcon } from '../TokenIcon';
import { ClosePositionTransactions } from './ClosePositionTransactions';

const ClosePositionUi: FC<{
  debt: Wei;
  collateralAmount: Wei;
  onClose: () => void;
  onSubmit: () => void;
  debtSymbol?: string;
  collateralSymbol: string;
}> = ({ onSubmit, debt, collateralAmount, collateralSymbol, onClose, debtSymbol }) => {
  const debtPrice = useTokenPrice(debtSymbol);
  const collateralPrice = useTokenPrice(collateralSymbol);

  return (
    <Flex flexDirection="column">
      <Text color="gray.50" fontSize="20px" fontWeight={700}>
        <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
        Close Position
      </Text>

      <Divider my={5} bg="gray.900" />

      <Text color="gray.50" fontSize="sm" fontWeight="700" mb={2}>
        {debt.gt(0) ? 'Repay Debt' : 'Claim Profit'}
      </Text>
      <BorderBox display="flex" flexDirection="column" p={3} mb="6">
        <Flex alignItems="center">
          <Flex alignItems="flex-start" flexDir="column" gap={1}>
            <BorderBox display="flex" justifyContent="center" alignItems="center" py={1.5} px={2.5}>
              <Text display="flex" gap={2} alignItems="center" fontWeight="600">
                <TokenIcon symbol={debtSymbol} width={16} height={16} />
                {debtSymbol}
              </Text>
            </BorderBox>
            <Flex fontSize="12px" gap="1" mr="3">
              <Text>{debt.gt(0) ? 'Debt:' : 'Max Claim'}</Text>
              <Amount value={debt.abs()} />
              <Text ml={0.5} color="gray.600" fontWeight={700}>
                Max
              </Text>
            </Flex>
          </Flex>
          <Flex flexGrow={1} flexDir="column">
            <NumberInput value={debt.abs()} disabled />
            <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
              {debtPrice.gt(0) && <Amount prefix="$" value={debt.abs().mul(debtPrice)} />}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>

      <Text color="gray.50" fontSize="sm" fontWeight="700" mb={2}>
        Unlock Collateral
      </Text>
      <BorderBox display="flex" flexDirection="column" p={3} mb="6">
        <Flex alignItems="center">
          <Flex alignItems="flex-start" flexDir="column" gap={1}>
            <BorderBox display="flex" justifyContent="center" alignItems="center" py={1.5} px={2.5}>
              <Text display="flex" gap={2} alignItems="center" fontWeight="600">
                <TokenIcon symbol={collateralSymbol} width={16} height={16} />
                {collateralSymbol}
              </Text>
            </BorderBox>
            <Flex fontSize="12px" gap="1" mr="3">
              <Text>Locked:</Text>
              <Amount value={collateralAmount} />
              <Text ml={0.5} color="gray.600" fontWeight={700}>
                Max
              </Text>
            </Flex>
          </Flex>
          <Flex flexGrow={1} flexDir="column">
            <NumberInput value={collateralAmount} disabled />
            <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
              {collateralPrice.gt(0) && (
                <Amount prefix="$" value={collateralAmount.abs().mul(collateralPrice)} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </BorderBox>
      <Button onClick={onSubmit} type="submit">
        Close Position
      </Button>
    </Flex>
  );
};

export const ClosePosition = ({
  liquidityPosition,
  onClose,
}: {
  liquidityPosition?: LiquidityPosition;
  onClose: () => void;
}) => {
  const [transactionStep, setTransactions] = useState(false);
  const { setCollateralChange, setDebtChange } = useContext(ManagePositionContext);
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: systemToken } = useSystemToken();

  useEffect(() => {
    if (liquidityPosition) {
      setDebtChange(liquidityPosition.debt.mul(-1));
      setCollateralChange(liquidityPosition.collateralAmount.mul(-1));
    }

    return () => {
      setDebtChange(ZEROWEI);
      setCollateralChange(ZEROWEI);
    };
  }, [liquidityPosition, setCollateralChange, setDebtChange]);

  if (!collateralType) {
    return null;
  }

  return (
    <>
      {!transactionStep && (
        <ClosePositionUi
          debt={liquidityPosition?.debt || ZEROWEI}
          collateralAmount={liquidityPosition?.collateralAmount || ZEROWEI}
          onClose={onClose}
          debtSymbol={isBase ? params.collateralSymbol : systemToken?.symbol}
          collateralSymbol={collateralType.displaySymbol}
          onSubmit={() => setTransactions(true)}
        />
      )}
      {transactionStep && (
        <ClosePositionTransactions
          onBack={() => setTransactions(false)}
          onClose={onClose}
          collateralType={collateralType}
          liquidityPosition={liquidityPosition}
          poolId={params.poolId}
        />
      )}
    </>
  );
};
