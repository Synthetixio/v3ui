import { FC } from 'react';
import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { onboard, useIsConnected } from '@snx-v3/useBlockchain';
import { CollateralIcon } from '@snx-v3/icons';
import { wei } from '@synthetixio/wei';
import { calculateCRatio } from '@snx-v3/calculations';
import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';

function VaultRowUi({
  collateralType,
  liquidityPosition,
  poolId,
  isConnected,
  openConnectModal,
}: {
  collateralType: CollateralType;
  liquidityPosition?: LiquidityPositionType;
  poolId: string;
  isConnected: boolean;
  openConnectModal?: () => void;
}) {
  const location = useLocation();
  const cRatio = calculateCRatio(
    liquidityPosition?.debt || wei(0),
    liquidityPosition?.collateralValue || wei(0)
  );
  const hasLiquidity = liquidityPosition && liquidityPosition.collateralAmount.gt(0);

  return (
    <Tr>
      <Td>
        <Flex flexDir="row" py={4}>
          <CollateralIcon width="40px" height="40px" symbol={collateralType.symbol} />
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Text fontSize="sm" lineHeight="20px" fontWeight="500" data-testid="collateral-value">
              {liquidityPosition?.collateralValue.gt(0) ? (
                <Amount value={liquidityPosition.collateralValue} prefix="$" />
              ) : (
                '-'
              )}
            </Text>
            <Text fontSize="xs" color="gray.500" data-testid="collateral-amount">
              {liquidityPosition?.collateralAmount.gt(0) && (
                <Amount value={liquidityPosition.collateralAmount} />
              )}{' '}
              {collateralType.symbol}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td data-testid="debt">
        {liquidityPosition?.debt.gt(0) ? <Amount value={liquidityPosition.debt} prefix="$" /> : '-'}
      </Td>
      <Td data-testid="c-ratio">
        {cRatio.gt(0) ? <Amount value={cRatio.mul(100)} suffix="%" /> : '-'}
      </Td>
      <Td>
        <Amount
          data-testid="issuance-ratio"
          value={collateralType.issuanceRatioD18.mul(100)}
          suffix="%"
        />
      </Td>
      <Td>
        <Amount
          value={collateralType.liquidationRatioD18.mul(100)}
          data-testid="liquidation-ratio"
          suffix="%"
        />
      </Td>
      <Td textAlign="end">
        {isConnected && hasLiquidity ? (
          <Button
            as={Link}
            to={{
              pathname: generatePath('/positions/:collateralSymbol/:poolId', {
                poolId: poolId,
                collateralSymbol: collateralType.symbol,
              }),
              search: location.search,
            }}
          >
            Manage
          </Button>
        ) : null}

        {isConnected && !hasLiquidity ? (
          <Button
            as={Link}
            to={{
              pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
                poolId: poolId,
                collateralSymbol: collateralType.symbol,
              }),
              search: location.search,
            }}
          >
            Deposit
          </Button>
        ) : null}

        {!isConnected && openConnectModal ? (
          <Button onClick={openConnectModal}>Connect</Button>
        ) : null}
      </Td>
    </Tr>
  );
}

export type VaultRowProps = {
  collateralType: CollateralType;
  poolId: string;
  liquidityPosition?: LiquidityPositionType;
};

export const VaultRow: FC<VaultRowProps> = ({ collateralType, poolId, liquidityPosition }) => {
  const isConnected = useIsConnected();

  return (
    <VaultRowUi
      collateralType={collateralType}
      liquidityPosition={liquidityPosition}
      poolId={poolId}
      isConnected={isConnected}
      openConnectModal={() => onboard.connectWallet()}
    />
  );
};
