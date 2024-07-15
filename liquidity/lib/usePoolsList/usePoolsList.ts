import { getSubgraphUrl } from '@snx-v3/constants';
import { ARBITRUM, BASE_ANDROMEDA, NETWORKS } from '@snx-v3/useBlockchain';
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
    staleTime: 60000 * 10,
  });
}

export function usePool(networkId: number, poolId: string) {
  const { data, isLoading } = usePoolsList();

  // TODO: In the future if we have multiple pools per network filter by poolId also
  return {
    data: data?.synthetixPools.find(
      (p) => p.network.id === networkId && p.poolInfo[0].pool.id === poolId
    ),
    isLoading,
  };
}

// TODO: Add 1 and 10 to support Mainnet and Optimism
const supportedNetworks = [BASE_ANDROMEDA.id, ARBITRUM.id];

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
        total_amount_deposited
      }
      pool {
        name
        id
      }
    }
  }
`;

interface PoolInfo {
  collateral_type: {
    id: string;
    oracle_node_id: string;
    total_amount_deposited: string;
  };
  pool: {
    name: string;
    id: string;
  };
}
