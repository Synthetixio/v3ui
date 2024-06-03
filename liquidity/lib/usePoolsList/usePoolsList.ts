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

async function fetchAprs() {
  const networks = NETWORKS.filter((n) => supportedNetworks.includes(n.id)).map((n) => n);
  return Promise.all(networks.map((network) => fetchApr(network.id)));
}

async function fetchPoolsList() {
  const networks = NETWORKS.filter((n) => supportedNetworks.includes(n.id)).map((n) => n);
  const urls = networks.map((network) => getSubgraphUrl(network.name));

  // Fetch all the pools from the subgraphs
  const responses = await Promise.all(
    urls.map((url) =>
      fetch(url, { method: 'POST', body: JSON.stringify({ query: PoolsListData }) }).then((res) =>
        res.json()
      )
    )
  );

  return responses.map((response, i) => ({
    network: networks[i],
    poolInfo: response.data.vaults as PoolInfo[],
  }));
}

const gql = (data: TemplateStringsArray) => data[0];

const PoolsListData = gql`
  query PoolsListData {
    vaults(where: { pool: "1" }) {
      collateral_type {
        oracle_node_id
        name
        decimals
        symbol
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
    oracle_node_id: string;
    name: string;
    decimals: number;
    symbol: string;
    total_amount_deposited: string;
  };
  pool: {
    name: string;
    id: string;
  };
}
