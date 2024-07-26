import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';
import { Wallet } from 'ethers';

// TODO @dev remove
const randomAddresses = [
  Wallet.createRandom().address,
  Wallet.createRandom().address,
  Wallet.createRandom().address,
  Wallet.createRandom().address,
];

export function useGetCouncilNominees(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['nominees', council],
    queryFn: async () => {
      return (await getCouncilContract(council).connect(motherShipProvider).getNominees()).concat(
        randomAddresses
      ) as string[];
    },
    enabled: !!council,
    staleTime: 900000,
  });
}
