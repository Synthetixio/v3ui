import { Box, Flex, Heading } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { FC, useContext, useState } from 'react';
import { useCollateralDisplayName } from '../../pages';
import { NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
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

export const NoPosition: FC<{
  collateralSymbol?: string;
  poolName?: string;
  collateralType?: CollateralType;
  accountId: string | undefined;
  liquidityPosition?: LiquidityPosition;
  rewards?: RewardsType;
}> = ({ rewards, liquidityPosition, collateralSymbol, poolName, collateralType, accountId }) => {
  const { refetch } = useAccounts();
  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);
  const { network } = useNetwork();
  const { collateralChange, setCollateralChange, setDebtChange } =
    useContext(ManagePositionContext);
  const [txnModalOpen, setTxnModalOpen] = useState<'deposit' | null>(null);

  return (
    <Box mb={12} mt={8}>
      <Flex px={6} alignItems="center" mb="8px">
        <Flex
          bg="linear-gradient(180deg, #08021E 0%, #1F0777 100%)"
          height="34px"
          width="34px"
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          display="flex"
        >
          <CollateralIcon
            symbol={collateralSymbol}
            width="42px"
            height="42px"
            fill="#0B0B22"
            color="#00D1FF"
          />
        </Flex>
        <Flex direction="column" gap={0.5}>
          <Heading
            ml={4}
            fontWeight={700}
            fontSize="24px"
            color="gray.50"
            display="flex"
            alignItems="center"
            data-cy="manage-position-title"
          >
            Open {collateralDisplayName} Liquidity Position
          </Heading>
          <Heading
            ml={4}
            fontWeight={700}
            fontSize="16px"
            color="gray.50"
            display="flex"
            alignItems="center"
            data-cy="manage-position-subtitle"
          >
            {poolName}
            <Flex
              ml={2}
              alignItems="center"
              fontSize="12px"
              color="gray.500"
              gap={1}
              fontWeight="bold"
            >
              <NetworkIcon size="14px" networkId={network?.id} />
              {network?.label} Network
            </Flex>
          </Heading>
        </Flex>
      </Flex>

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
              currentCRatioPercentage={0}
              liquidationCratioPercentage={
                (collateralType?.liquidationRatioD18?.toNumber() || 0) * 100
              }
              newCratioPercentage={collateralChange.gt(0) ? Number.MAX_SAFE_INTEGER : 0}
              targetCratioPercentage={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
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
              availableCollateral={ZEROWEI}
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
