import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { NumberInput } from '@snx-v3/NumberInput';
import { FC, useContext, useEffect, useState } from 'react';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { TokenIcon } from '../TokenIcon';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from 'react-router-dom';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ZEROWEI } from '../../utils/constants';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { ClosePositionTransactions } from './ClosePositionTransactions';

const ClosePositionUi: FC<{
  debt: Wei;
  collateralAmount: Wei;
  onClose: () => void;
  onSubmit: () => void;
  debtSymbol: string;
  collateralSymbol: string;
}> = ({ onSubmit, debt, collateralAmount, collateralSymbol, onClose, debtSymbol }) => {
  return (
    <Flex flexDirection="column">
      <Text color="gray.50" fontSize="sm" fontWeight="700">
        <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
        Close Position
      </Text>

      <Divider my={5} bg="gray.900" />

      <Text color="gray.50" fontSize="sm" fontWeight="700" mb={2}>
        {debt.gt(0) ? 'Repay Debt' : 'Claim Profit'}
      </Text>
      <BorderBox display="flex" flexDirection="column" p={3} mb="6">
        <Flex alignItems="center">
          <BorderBox display="flex" justifyContent="center" alignItems="center" py={1.5} px={2.5}>
            <Text display="flex" gap={2} alignItems="center" fontWeight="600">
              <TokenIcon symbol={debtSymbol} width={16} height={16} />
              {debtSymbol}
            </Text>
          </BorderBox>
          <NumberInput value={debt.gt(0) ? debt : debt.mul(-1)} disabled />
        </Flex>
      </BorderBox>

      <Text color="gray.50" fontSize="sm" fontWeight="700" mb={2}>
        Unlock Collateral
      </Text>
      <BorderBox display="flex" flexDirection="column" p={3} mb="6">
        <Flex alignItems="center">
          <BorderBox display="flex" justifyContent="center" alignItems="center" py={1.5} px={2.5}>
            <Text display="flex" gap={2} alignItems="center" fontWeight="600">
              <TokenIcon symbol={collateralSymbol} width={16} height={16} />
              {collateralSymbol}
            </Text>
          </BorderBox>
          <NumberInput value={collateralAmount} disabled />
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
          debtSymbol={isBase ? 'USDC' : systemToken.symbol}
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
