import { getSubgraphUrl } from '@snx-v3/constants';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export const useGetHistoricalTVL = ({
  poolId,
  collateralTypeAddresses,
}: {
  poolId?: string;
  collateralTypeAddresses?: string[];
}) => {
  const { network } = useNetwork();
  return useQuery({
    queryKey: ['useGetHistoricalTVL', poolId, collateralTypeAddresses?.toString(), network?.name],
    queryFn: async () => {
      if (!network?.name || !collateralTypeAddresses?.length) return;
      const responses = await Promise.all(
        collateralTypeAddresses.map(() =>
          fetch(getSubgraphUrl(network?.name), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                      query {
                        vaultSnapshotByYears(first:1000) {
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
              // variables: { id: `${poolId}-${address.toLowerCase()}-2024-20` },
            }),
          })
        )
      );

      const data = await Promise.all(responses.map((response) => response.json()));
      return data;
    },
  });
};

// query getTVL($id: ID!){
//   vaultSnapshotByWeek(id: $id) {
//   id
//   collateral_amount
//   collateral_type
//   created_at
//   created_at_block
//   updated_at
//   updated_at_block
//   }
// }
