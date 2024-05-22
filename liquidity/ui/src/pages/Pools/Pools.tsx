import { Flex, Heading } from '@chakra-ui/react';
import { usePools } from '@snx-v3/usePools';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useApr } from '@snx-v3/useApr';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { BasePoolCard, BaseInfoCard } from '../../components/Pools';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';

export function Pools() {
  const { network } = useNetwork();
  const { data: pools, isLoading: isPoolsLoading } = usePools();
  const { data: apr, isLoading: isAprLoading } = useApr();
  const { data: vaultDebt, isLoading: isVaultsLoading } = useVaultsData(1);
  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();

  const isLoading = isPoolsLoading || isAprLoading || isVaultsLoading || isCollateralTypesLoading;

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const hydratedCollateralTypes = isBase
    ? collateralTypes?.map((item) => {
        if (item.symbol === 'sUSDC') {
          return {
            ...item,
            symbol: 'USDC',
            name: 'USD Coin',
          };
        }
        return item;
      })
    : collateralTypes;

  return (
    <Flex flexDir="column">
      <Heading mt={10} color="gray.50" fontSize="1.5rem" data-cy="liquidity-dashboard">
        All Pools
      </Heading>
      <Flex gap="4" flexWrap={pools && pools.length > 1 ? 'wrap' : 'nowrap'} mt="6">
        {pools?.map((pool) => (
          <BasePoolCard
            key={pool.id}
            isLoading={isLoading}
            pool={pool}
            apr={apr?.combinedApr}
            vaultDebt={vaultDebt}
            collateralTypes={hydratedCollateralTypes}
          />
        ))}
        <BaseInfoCard />
      </Flex>
    </Flex>
  );
}
