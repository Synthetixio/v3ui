import { getSubgraphUrl } from '@snx-v3/constants';
import { NETWORKS } from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';
import { fetchApr } from '@snx-v3/useApr';
import { useQuery } from '@tanstack/react-query';

export function usePoolsList() {
  return useQuery({
    queryKey: ['poolsList'],
    queryFn: async () => {
      try {
        const [pools, aprs, toros] = await Promise.all([
          fetchPoolsList(),
          fetchAprs(),
          fetchTorosPool(),
        ]);

        const synthetixPools = pools.map((p, i) => ({
          ...p,
          apr: aprs[i],
        }));

        return { synthetixPools, toros };
      } catch (error) {
        throw error;
      }
    },
    staleTime: 60000,
  });
}

export function usePool(networkId: number, poolId: string) {
  const { data, isLoading } = usePoolsList();

  return {
    data: data?.synthetixPools.find(
      (p) => p.network.id === networkId && p.poolInfo[0].pool.id === poolId
    ),
    isLoading,
  };
}

const supportedNetworks = [1, 8453, 42161];

async function fetchTorosPool() {
  return fetch('https://api-v2.dhedge.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          query GetFund($address: String!) {
              fund(address: $address) {
                totalValue
                apy {
                  monthly
                  weekly
                }
              }
            }`,
      variables: { address: '0xc1e02884af4a283ca25ab63c45360d220d69da52' },
    }),
  })
    .then((response) => response.json())
    .then(({ data }) => {
      return {
        tvl: compactInteger(data.fund.totalValue / 1e18, 1),
        apy: data.fund.apy.monthly,
      };
    });
}

export const networksOffline = NETWORKS.filter(
  (n) => supportedNetworks.includes(n.id) && n.isSupported
).map((n) => n);

async function fetchAprs() {
  return Promise.all(networksOffline.map((network) => fetchApr(network.id)));
}

async function fetchPoolsList() {
  const urls = networksOffline.map((network) => getSubgraphUrl(network.name));

  // Fetch all the pools from the subgraphs
  const responses = await Promise.all(
    urls.map((url) =>
      fetch(url, { method: 'POST', body: JSON.stringify({ query: PoolsListData }) }).then((res) =>
        res.json()
      )
    )
  );

  return responses.map((response, i) => ({
    network: networksOffline[i],
    poolInfo: response.data.vaults as PoolInfo[],
  }));
}

const gql = (data: TemplateStringsArray) => data[0];

const PoolsListData = gql`
  query PoolsListData {
    vaults(where: { pool: "1" }) {
      collateral_type {
        id
        oracle_node_id
        name
        decimals
        symbol
        total_amount_deposited
      }
      pool {
        name
        id
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
  }
`;

interface PoolInfo {
  collateral_type: {
    id: string;
    oracle_node_id: string;
    name: string;
    decimals: number;
    symbol: string;
    total_amount_deposited: string;
  };
  pool: {
    name: string;
    id: string;
    registered_distributors: {
      id: string;
      total_distributed: string;
      rewards_distributions: {
        amount: string;
        duration: string;
        created_at: string;
      }[];
    }[];
    total_weight: string;
    configurations: {
      id: string;
      weight: string;
      max_debt_share_value: string;
      market: {
        id: string;
        address: string;
        usd_deposited: string;
        usd_withdrawn: string;
        net_issuance: string;
        reported_debt: string;
        updated_at: string;
        market_snapshots_by_week: {
          id: string;
          usd_deposited: string;
          usd_withdrawn: string;
          net_issuance: string;
          reported_debt: string;
          updated_at: string;
          updates_in_period: string;
        }[];
      };
    }[];
  };
}
