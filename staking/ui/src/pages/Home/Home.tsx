import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { VaultRow } from './VaultRow';
import { PoolsType, usePools } from '@snx-v3/usePools';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { LiquidityPositionType, useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Welcome } from '../../components/Shared/Welcome';
import { Stats, StatsProps } from './Stats';
import { AvailableCollateral } from './AvailableCollateral';

const LoadingRow = () => (
  <Tr>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton w="full" height={8} />
    </Td>
    <Td>
      <Skeleton minWidth={16} height={8} />
    </Td>
  </Tr>
);

export function HomeUi({
  collateralTypes,
  pools,
  navigate,
  liquidityPositions,
  isLoading,
  VaultRow,
  Stats,
  AvailableCollateral,
}: {
  collateralTypes?: CollateralType[];
  pools: PoolsType;
  accountId?: string;
  navigate: NavigateFunction;
  liquidityPositions?: LiquidityPositionType[];
  isLoading: boolean;
  VaultRow: FC<{ collateralType: CollateralType; poolId: string }>;
  Stats: FC<StatsProps>;
  AvailableCollateral: FC;
}) {
  const { totalCollateral, totalDebt } =
    liquidityPositions?.reduce(
      (acc, val) => {
        acc.totalCollateral = acc.totalCollateral + val.collateralValue.toNumber();
        acc.totalDebt = acc.totalDebt + val.debt.toNumber();
        return acc;
      },
      { totalCollateral: 0, totalDebt: 0 }
    ) || {};

  return (
    <Flex height="100%" flexDirection="column">
      <Box mb="8">
        <Welcome />
      </Box>
      <Stats totalDebt={totalDebt} totalCollateral={totalCollateral} />
      {isLoading ? (
        <BorderBox p={4} mt={8} flexDir="column">
          <Flex
            justifyContent="space-between"
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
            alignItems="center"
          >
            <Flex
              alignItems="baseline"
              justifyContent="flex-start"
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Skeleton />
            </Flex>
          </Flex>
        </BorderBox>
      ) : (
        <>
          {pools.map((pool) => (
            <BorderBox key={pool.id} p={4} mt={8} flexDir="column">
              <Flex
                justifyContent="space-between"
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
                alignItems="center"
              >
                <Flex
                  alignItems="baseline"
                  justifyContent="flex-start"
                  flexDirection={{ base: 'column', md: 'row' }}
                >
                  <Fade in>
                    <Heading fontSize="2xl">{pool.name}</Heading>
                  </Fade>
                </Flex>
                {pool.id && (
                  <Fade in>
                    <Button
                      mt={{ base: 2, md: 0 }}
                      size="sm"
                      onClick={() =>
                        navigate({ pathname: generatePath('/pools/:poolId', { poolId: pool.id }) })
                      }
                      variant="outline"
                    >
                      Pool Info
                    </Button>
                  </Fade>
                )}
              </Flex>
              <Box overflowX="auto">
                <Table mt={8} size="sm" variant="unstyled" mb="9">
                  <Thead sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
                    <Tr>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="3"
                        textTransform="initial"
                      >
                        Collateral
                      </Th>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="3"
                        textTransform="initial"
                      >
                        Debt
                      </Th>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="3"
                        textTransform="initial"
                      >
                        C-Ratio
                      </Th>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="3"
                        textTransform="initial"
                      >
                        Issuance Ratio
                      </Th>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="3"
                        textTransform="initial"
                      >
                        Liquidation Ratio
                      </Th>
                      <Th
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                        pb="2"
                        textTransform="initial"
                      ></Th>
                    </Tr>
                  </Thead>
                  <Tbody sx={{ tr: { borderBottomColor: 'gray.900', borderBottomWidth: '1px' } }}>
                    {collateralTypes ? (
                      collateralTypes.map((c) => (
                        <VaultRow key={c.tokenAddress} collateralType={c} poolId={pool.id} />
                      ))
                    ) : (
                      <>
                        <LoadingRow />
                        <LoadingRow />
                      </>
                    )}
                  </Tbody>
                </Table>
              </Box>
            </BorderBox>
          ))}
        </>
      )}
      <AvailableCollateral />
    </Flex>
  );
}

export function Home() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: collateralTypes = [], isLoading: collateralTypesLoading } = useCollateralTypes();
  const { data: pools, isLoading: isPoolsLoading } = usePools();

  const {
    data: liquidityPositionsById,
    isLoading: liquidityPositionLoading,
    isInitialLoading: liquidityInitialLoading,
  } = useLiquidityPositions({
    accountId: params.accountId,
  });

  const isLoading =
    collateralTypesLoading ||
    isPoolsLoading ||
    (liquidityPositionLoading && liquidityInitialLoading);

  return (
    <>
      <Helmet>
        <title>Synthetix V3</title>
        <meta name="description" content="Synthetix V3" />
      </Helmet>
      <HomeUi
        isLoading={isLoading}
        liquidityPositions={
          liquidityPositionsById ? Object.values(liquidityPositionsById) : undefined
        }
        collateralTypes={collateralTypes}
        pools={pools || []}
        navigate={navigate}
        VaultRow={VaultRow}
        AvailableCollateral={AvailableCollateral}
        Stats={Stats}
      />
    </>
  );
}
