import { useQuery } from '@tanstack/react-query';
import { getSubgraphUrl } from '@snx-v3/constants';
import { z } from 'zod';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';

const GraphBigIntSchema = z.string().transform((src) => wei(src, 18, true));
const GraphBigDecimalSchema = z.string().transform((src) => wei(src, 18, true));

const calculateMarketPnl = (netIssuance: Wei, reportedDebt: Wei) =>
  reportedDebt.add(netIssuance).mul(-1);

export const MarketSnapshotByWeekSchema = z
  .object({
    id: z.string(),
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    updated_at: z.string(),
    updates_in_period: z.string(),
  })
  .transform((market) => ({
    ...market,
    pnl: calculateMarketPnl(market.net_issuance, market.reported_debt),
  }));

const MarketSchema = z
  .object({
    id: z.string(),
    address: z.string(),
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    updated_at: z.string(),
    market_snapshots_by_week: z.array(MarketSnapshotByWeekSchema),
  })
  .transform((market) => ({
    ...market,
    pnl: calculateMarketPnl(market.net_issuance, market.reported_debt),
  }));

const MarketConfigurationSchema = z.object({
  id: z.string(), //PoolId-MarketId
  market: MarketSchema,
  weight: GraphBigIntSchema,
  max_debt_share_value: GraphBigDecimalSchema,
});

const RewardDistributorSchema = z.object({
  id: z.string(),
  total_distributed: z.string(),
  rewards_distributions: z
    .array(
      z.object({
        amount: z.string(),
        duration: z.string(),
        created_at: z.string(),
      })
    )
    .default([]),
});

export const PoolSchema = z.object({
  id: z.string(),
  name: z.union([z.string(), z.null()]).transform((name) => (name ? name : 'Unnamed Pool')),
  total_weight: z.union([z.null(), GraphBigIntSchema]),
  configurations: z.array(MarketConfigurationSchema),
  registered_distributors: z.array(RewardDistributorSchema).default([]),
});

export type PoolType = z.infer<typeof PoolSchema>;

export const PoolDataResultSchema = z.object({
  data: z.object({
    pool: z.union([PoolSchema, z.null()]),
  }),
});

const gql = (data: TemplateStringsArray) => data[0];

const PoolsDataDocument = gql`
  query pool($id: String) {
    pool(id: $id) {
      id
      name
      registered_distributors(where: { isActive: true }) {
        id
        total_distributed
        rewards_distributions(orderBy: created_at, orderDirection: desc) {
          amount
          duration
          created_at
        }
      }
      total_weight
      configurations {
        id
        weight
        max_debt_share_value
        market {
          id
          address
          usd_deposited
          usd_withdrawn
          net_issuance
          reported_debt
          updated_at
          market_snapshots_by_week(first: 2, orderBy: updated_at, orderDirection: desc) {
            id
            usd_deposited
            usd_withdrawn
            net_issuance
            reported_debt
            updated_at
            updates_in_period
          }
        }
      }
    }
  }
`;

const getPoolData = async (chainName: string, id: string) => {
  const url = getSubgraphUrl(chainName);

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: PoolsDataDocument, variables: { id } }),
  });

  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return PoolDataResultSchema.parse(json);
};

export const usePoolData = (poolId?: string, networkId?: string) => {
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'PoolData', { pool: poolId }],
    queryFn: async () => {
      if (!poolId || !networkId) throw Error('No poolId or networkId');
      const poolData = await getPoolData(networkId, poolId);

      if (!poolData.data.pool) {
        throw Error(`Pool ${poolId} not found`);
      }

      return poolData.data.pool;
    },
    enabled: Boolean(poolId && parseInt(poolId) > 0),
  });
};
