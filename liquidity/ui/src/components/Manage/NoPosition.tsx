import { Box, Flex } from '@chakra-ui/react';
import { FC, useContext, useState } from 'react';
import { BorderBox } from '@snx-v3/BorderBox';
import { DebtStats } from './DebtStats';
import { ZEROWEI } from '../../utils/constants';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { CollateralStats } from './CollateralStats';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { InitialDeposit } from '../InitialDeposit';
import { CRatioBar } from '../CRatioBar/CRatioBar';
import DepositModal from '@snx-v3/DepositModal';
import { useAccounts } from '@snx-v3/useAccounts';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { Rewards } from '../Rewards';
import { RewardsType } from '@snx-v3/useRewards';
import { PositionTitle } from './PositionTitle';

export const NoPosition: FC<{
  collateralSymbol?: string;
  poolName?: string;
  collateralType?: CollateralType;
  accountId: string | undefined;
  liquidityPosition?: LiquidityPosition;
  rewards?: RewardsType;
}> = ({ rewards, liquidityPosition, collateralSymbol, poolName, collateralType, accountId }) => {
  const { refetch } = useAccounts();
  const { collateralChange, setCollateralChange, setDebtChange } =
    useContext(ManagePositionContext);
  const [txnModalOpen, setTxnModalOpen] = useState<'deposit' | null>(null);

  return (
    <Box mb={12} mt={8}>
      <PositionTitle collateralSymbol={collateralSymbol} poolName={poolName} isOpen />

      <Flex mt={6} flexDirection={['column', 'column', 'row']} gap={4}>
        <BorderBox gap={4} flex={1} p={6} flexDirection="column" bg="navy.700" height="fit-content">
          <Flex direction="row" gap={4}>
            <CollateralStats
              liquidityPosition={undefined}
              collateralType={collateralType}
              newCollateralAmount={collateralChange}
              collateralValue={ZEROWEI}
              hasChanges={collateralChange.gt(0)}
            />
            <DebtStats
              liquidityPosition={undefined}
              collateralType={collateralType}
              newDebt={ZEROWEI}
              hasChanges={false}
            />
          </Flex>

          <BorderBox py={4} px={6} flexDirection="column" bg="navy.700">
            <CRatioBar
              hasChanges={collateralChange.gt(0)}
              currentCRatio={0}
              liquidationCratio={(collateralType?.liquidationRatioD18?.toNumber() || 0) * 100}
              newCratio={collateralChange.gt(0) ? Number.MAX_SAFE_INTEGER : 0}
              targetCratio={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
              isLoading={false}
            />
          </BorderBox>
          {rewards && <Rewards isLoading={false} rewards={rewards} />}
        </BorderBox>
        <BorderBox
          flex={1}
          maxW={['100%', '100%', '501px']}
          p={6}
          flexDirection="column"
          bg="navy.700"
          height="fit-content"
        >
          {!txnModalOpen && (
            <InitialDeposit
              submit={() => {
                setTxnModalOpen('deposit');
              }}
              hasAccount={!!accountId}
              liquidityPosition={liquidityPosition}
            />
          )}

          {txnModalOpen === 'deposit' ? (
            <DepositModal
              availableCollateral={
                liquidityPosition?.accountCollateral.availableCollateral || ZEROWEI
              }
              currentCollateral={ZEROWEI}
              collateralChange={collateralChange}
              onClose={() => {
                setCollateralChange(ZEROWEI);
                setDebtChange(ZEROWEI);
                setTxnModalOpen(null);
                refetch();
              }}
              isOpen={txnModalOpen === 'deposit'}
              title="Open Liquidity Position"
            />
          ) : null}
        </BorderBox>
      </Flex>
    </Box>
  );
};
