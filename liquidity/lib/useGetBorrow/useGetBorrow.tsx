import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export const useGetBorrow = ({
  accountId,
  poolId,
  collateralTypeAddress,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
}) => {
  const { network } = useNetwork();

  return useQuery({
    enabled: !isBaseAndromeda(network?.id, network?.preset),
    queryKey: ['useGetBorrow', accountId, poolId, collateralTypeAddress],
    queryFn: async () => {
      const response = await fetch(
        'https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetix-sepolia/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
                      query getPosition($id: ID!){
                        position(id: $id) {
                          net_issuance
                        }
                      }
                    `,
            variables: { id: `${accountId}-${poolId}-${collateralTypeAddress?.toLowerCase()}` },
          }),
        }
      );

      const { data } = await response.json();
      return data;
    },
  });
};
