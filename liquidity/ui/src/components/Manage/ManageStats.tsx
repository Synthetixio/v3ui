import { FC, useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei, { wei } from '@synthetixio/wei';
import { calculateCRatio } from '@snx-v3/calculations';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CRatioBar } from '../CRatioBar/CRatioBar';
import { PnlStats } from './PnlStats';
import { DebtStats } from './DebtStats';
import { CollateralStats } from './CollateralStats';
import { ZEROWEI } from '../../utils/constants';

export const ManageStatsUi: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newCollateralAmount: Wei;
  newDebt: Wei;
  newCratio: Wei;
  collateralValue: Wei;
  debt: Wei;
  cRatio: Wei;
  hasChanges: boolean;
}> = ({
  liquidityPosition,
  collateralType,
  collateralValue,
  cRatio,
  newCollateralAmount,
  newCratio,
  newDebt,
  hasChanges,
  debt,
}) => {
  const { network } = useNetwork();

  return (
    <Flex direction="column" gap={4}>
      <Text color="white" fontSize="lg" fontFamily="heading" fontWeight="bold" lineHeight="16px">
        Overview
      </Text>
      <Flex flexWrap="wrap" direction={['column', 'row']} gap={4}>
        <CollateralStats
          liquidityPosition={liquidityPosition}
          collateralType={collateralType}
          newCollateralAmount={newCollateralAmount}
          collateralValue={collateralValue}
          hasChanges={hasChanges}
        />

        {isBaseAndromeda(network?.id, network?.preset) && (
          <PnlStats
            liquidityPosition={liquidityPosition}
            collateralType={collateralType}
            newDebt={newDebt}
            hasChanges={hasChanges}
          />
        )}
        {!isBaseAndromeda(network?.id, network?.preset) && (
          <DebtStats
            liquidityPosition={liquidityPosition}
            collateralType={collateralType}
            newDebt={newDebt}
            hasChanges={hasChanges}
          />
        )}
      </Flex>
      {!isBaseAndromeda(network?.id, network?.preset) && (
        <BorderBox py={4} px={6} flexDirection="column" bg="navy.700">
          <CRatioBar
            hasChanges={hasChanges}
            currentCRatio={
              collateralValue.gt(0) && debt.eq(0)
                ? Number.MAX_SAFE_INTEGER
                : cRatio.toNumber() * 100
            }
            liquidationCratio={(collateralType?.liquidationRatioD18?.toNumber() || 0) * 100}
            newCratio={
              newCollateralAmount.gt(0) && newDebt.eq(0)
                ? Number.MAX_SAFE_INTEGER
                : newCratio.toNumber() * 100
            }
            targetCratio={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
            isLoading={false}
          />
        </BorderBox>
      )}
    </Flex>
  );
};

export const ManageStats = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralSymbol } = useParams();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(collateralSymbol);

  const collateralValue = liquidityPosition?.collateralValue || wei(0);

  const cRatio = calculateCRatio(liquidityPosition?.debt || wei(0), collateralValue);

  const { newCRatio, newCollateralAmount, newDebt, hasChanges } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={collateralType}
      cRatio={cRatio}
      collateralValue={collateralValue}
      debt={liquidityPosition?.debt || ZEROWEI}
    />
  );
};
