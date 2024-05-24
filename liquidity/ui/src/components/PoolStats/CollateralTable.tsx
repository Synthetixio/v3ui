import { Button, Fade, Flex, Td, Text, Th, Tr } from '@chakra-ui/react';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { ZEROWEI } from '../../utils/constants';
import { TokenIcon } from '../TokenIcon';
import { useWallet } from '@snx-v3/useBlockchain';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tooltip } from '@snx-v3/Tooltip';
import { InfoIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { CustomTable } from '../CustomTable';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { useApr } from '@snx-v3/useApr';
import { compactInteger } from 'humanize-plus';

const TableHeader = [
  <Th
    key="asset-header"
    py={5}
    textTransform="unset"
    color="gray.600"
    border="none"
    fontFamily="heading"
    fontSize="12px"
    lineHeight="16px"
  >
    Asset
  </Th>,
  <Th key="tvl-header" border="none" textTransform="unset" py={5}>
    <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
      TVL
    </Text>
  </Th>,
  <Th key="pnl-header" border="none" textTransform="unset" py={5}>
    <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
      PnL
    </Text>
  </Th>,
  <Th key="debt-header" border="none" textTransform="unset" py={5}>
    <Flex alignItems="center">
      <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
        Debt
      </Text>
      <Tooltip
        label={
          <Flex flexDirection="column" alignItems="start">
            <Text fontWeight="bold" fontSize="14px">
              Debt.
            </Text>
            <Text textAlign="left" fontSize="14px">
              Represents Pool PNL - Borrowed.
            </Text>
            <Text fontWeight="bold" mt={2} fontSize="14px">
              Claim Credit:
            </Text>
            <Text fontSize="14px" textAlign="left">
              When your position is performing well, it pays back the borrowed assets (if any) and
              turns into Credit available to Claim.
            </Text>

            <Text fontWeight="bold" mt={2} fontSize="14px">
              Repay debt:
            </Text>
            <Text fontSize="14px" textAlign="left">
              You have debt if the Pool PNL has not yet paid back your borrowed assets, or if the
              Pool PNL is Negative.
            </Text>
          </Flex>
        }
      >
        <InfoIcon w="10px" h="10px" />
      </Tooltip>
    </Flex>
  </Th>,
  <Th key="cratio-header" border="none" textTransform="unset" py={5}>
    <Flex alignItems="center">
      <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
        C-Ratio
      </Text>
      <Tooltip
        label={
          <Flex flexDirection="column" alignItems="start">
            <Text fontWeight="bold" fontSize="14px">
              C-ratio:
            </Text>
            <Text textAlign="left" fontSize="14px">
              Manage your Position by Adding or Removing collateral to this position. BorrowIs a
              dynamic number that represents a ratio between the collateral Delegated for your
              position and the Borrowed assets for this position - the Pool PNL.
            </Text>
          </Flex>
        }
      >
        <InfoIcon w="10px" h="10px" />
      </Tooltip>
    </Flex>
  </Th>,
  <Th
    key="button-placeholder-header"
    py={5}
    textTransform="unset"
    color="gray.600"
    border="none"
    fontFamily="heading"
    fontSize="12px"
    lineHeight="16px"
  >
    {' '}
  </Th>,
];

export function CollateralTable({ accountId, poolId }: { accountId?: string; poolId: string }) {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { connect, activeWallet } = useWallet();
  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();
  const { data: vaultsData, isLoading: vaultsDataIsLoading } = useVaultsData(Number(poolId));
  const { data: apr, isLoading: aprIsLoading } = useApr();
  const { data: liquidityPositions, isLoading: isLiquidityPositionsLoading } =
    useLiquidityPositions({ accountId });

  const isLoading =
    isCollateralTypesLoading && isLiquidityPositionsLoading && vaultsDataIsLoading && aprIsLoading;

  const positionsAndCollaterals = useMemo(
    () =>
      collateralTypes?.map((collateral) => {
        const liquidityPostion =
          liquidityPositions && liquidityPositions[`${poolId}-${collateral.symbol}`];
        return {
          accountId: accountId || '',
          tokenAddress: collateral.tokenAddress,
          symbol: collateral.symbol,
          displaySymbol: collateral.displaySymbol,
          cRatio: liquidityPostion?.cRatio || ZEROWEI,
          collateralAmount: liquidityPostion?.collateralAmount || ZEROWEI,
          collateralPrice: liquidityPostion?.collateralPrice || ZEROWEI,
          collateralType: collateral,
          collateralValue: liquidityPostion?.collateralValue || ZEROWEI,
          debt: liquidityPostion?.debt || ZEROWEI,
          id: '',
          isPreferred: true,
          poolId,
          poolName: '',
        };
      }),
    [collateralTypes, liquidityPositions, accountId, poolId]
  );

  return (
    <CustomTable
      loadingState={{ isLoading: isLoading, headerLength: TableHeader.length, numberOfRows: 1 }}
      headerColumns={TableHeader}
      rows={
        !positionsAndCollaterals
          ? []
          : positionsAndCollaterals.map((pc, index) => (
              <Tr
                key={pc.tokenAddress.concat('collateral-table')}
                borderBottomWidth={index === positionsAndCollaterals.length - 1 ? 'none' : '1px'}
              >
                <Td border="none">
                  <Fade in>
                    <Flex alignItems="center">
                      <TokenIcon symbol={pc.symbol} />
                      <Flex flexDirection="column" ml={3}>
                        <Text
                          color="white"
                          fontWeight={700}
                          lineHeight="1.25rem"
                          fontFamily="heading"
                        >
                          {pc.symbol}
                        </Text>
                        <Text
                          color="gray.500"
                          fontFamily="heading"
                          fontSize="0.75rem"
                          lineHeight="1rem"
                        >
                          {pc.displaySymbol}
                        </Text>
                      </Flex>
                    </Flex>
                  </Fade>
                </Td>
                <Td border="none">
                  <Fade in>
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {vaultsData
                        ? compactInteger(vaultsData[index].collateral.amount.toNumber())
                        : '-'}
                    </Text>
                  </Fade>
                </Td>
                <Td border="none">
                  <Fade in>
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {apr?.cumulativePnl ? '$' + compactInteger(apr.cumulativePnl, 1) : '-'}
                    </Text>
                  </Fade>
                </Td>
                <Td border="none">
                  <Fade in>
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {pc.collateralAmount.eq(0)
                        ? '-'
                        : '$' +
                          pc.debt.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </Text>
                  </Fade>
                </Td>
                <Td border="none">
                  <Fade in>
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {pc.collateralAmount.eq(0)
                        ? '-'
                        : pc.cRatio
                            .abs()
                            .toNumber()
                            .toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%'}
                    </Text>
                  </Fade>
                </Td>
                <Td border="none">
                  <Fade in>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (activeWallet?.address) {
                          queryParams.set('manageAction', 'deposit');
                          navigate({
                            pathname: `/positions/${pc.symbol}/${poolId}`,
                            search: queryParams.toString(),
                          });
                        } else {
                          connect();
                        }
                      }}
                    >
                      {activeWallet?.address ? 'Deposit' : 'Connect'}
                    </Button>
                  </Fade>
                </Td>
              </Tr>
            ))
      }
    />
  );
}
