import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

const subgraphURL = (chianId: number) => {
  switch (chianId) {
    case 11155111:
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-sepolia/api';
    case 8453:
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-base-mainnet-andromeda/api';
    case 84532:
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-base-sepolia-andromeda/version/v1.1/api';
    default:
      return 'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-sepolia/api';
  }
};

export const useGetHistoricalTVL = ({
  poolId,
  collateralTypeAddresses,
}: {
  poolId?: string;
  collateralTypeAddresses?: string[];
}) => {
  const { network } = useNetwork();
  return useQuery({
    queryKey: [
      'useGetHistoricalTVL',
      poolId,
      collateralTypeAddresses?.toString(),
      network?.id,
      network?.preset,
    ],
    queryFn: async () => {
      if (!network?.id || !collateralTypeAddresses?.length) return;
      const responses = await Promise.all(
        collateralTypeAddresses.map((address) =>
          fetch(subgraphURL(network.id), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                      query getTVL($id: ID!){
                        vaultSnapshotByWeek(id: $id) {
                        id
                        collateral_amount
                        collateral_type
                        created_at
                        created_at_block
                        updated_at
                        updated_at_block
                        }
                      }
                    `,
              variables: { id: `${poolId}-${address.toLowerCase()}-2024-20` },
            }),
          })
        )
      );

      const data = await Promise.all(responses.map((response) => response.json()));
      return data;
    },
  });
};
