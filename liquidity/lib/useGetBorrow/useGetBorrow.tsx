import { getSubgraphUrl } from '@snx-v3/constants';
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
    enabled: Boolean(!isBaseAndromeda(network?.id, network?.preset) && network),
    queryKey: ['useGetBorrow', accountId, poolId, collateralTypeAddress],
    queryFn: async () => {
      if (!network) throw new Error('useGetBorrow requires network');

      const url = getSubgraphUrl(network.name);
      const response = await fetch(url, {
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
          variables: {
            id: `${accountId}-${poolId}-${collateralTypeAddress?.toLowerCase()}`,
          },
        }),
      });

      const { data } = await response.json();

      return data;
    },
  });
};
