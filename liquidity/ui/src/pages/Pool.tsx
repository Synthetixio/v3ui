import { Button, Flex, Heading, Link, Tag } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from '@snx-v3/useParams';
import { usePool } from '@snx-v3/usePools';
import { ArrowLeft } from '@snx-v3/icons';
import { NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { CollateralTable, HistoricalTVL, RewardsTable,Rewards } from '../components'
import { useRewards } from '@snx-v3/useRewards';
import { usePoolData } from '@snx-v3/usePoolData';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export const Pool = () => {
  const { poolId, accountId } = useParams();
  const { network } = useNetwork();
  const { data: pool } = usePool(poolId);

export const Pool = () => {
  const params = useParams();
  const { data: pool } = usePool(params.poolId);

  const { accountId, collateralSymbol, poolId } = useParams();

  const { isFetching: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbol);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards(
    poolData?.registered_distributors,
    poolId,
    collateralType?.tokenAddress,
    accountId
  );

  const isLoading = isRewardsLoading || isCollateralLoading || isPoolGraphDataLoading;

  const title = pool ? `Pool #${pool.id} / ${pool.name}` : 'Pool';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <Flex flexDir="column" mt="16" gap="2">
        <Flex gap={6} alignItems="start" mb={10}>
          <Link href="/">
            <Button
              leftIcon={<ArrowLeft color="white" />}
              size="lg"
              variant="outline"
              colorScheme="gray"
              color="white"
            >
              All Pools
            </Button>
          </Link>

          <Flex flexDir="column" gap={1}>
            <Heading fontSize="20px" fontWeight={700} color="white">
              {pool?.name}
            </Heading>
            {network && (
              <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
                <NetworkIcon size="14px" networkId={network.id} />
                {network.label} Network
              </Flex>
            )}
          </Flex>
          <Tag size="sm" bg="purple.500" color="white">
            Borrow Interest-free
          </Tag>
        </Flex>
        <Flex gap="2">
          <Flex flexDir="column" gap="2">
            <CollateralTable accountId={accountId} poolId={poolId!} />
            <RewardsTable accountId={accountId} poolId={poolId!} />
          </Flex>
          <Flex flexDir="column" minW="500px">
            <HistoricalTVL poolId={poolId!} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
