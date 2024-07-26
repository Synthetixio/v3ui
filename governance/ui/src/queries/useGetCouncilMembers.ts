import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';
import { Wallet } from 'ethers';

// TODO @dev remove
const randomAddresses = [
  Wallet.createRandom().address,
  Wallet.createRandom().address,
  Wallet.createRandom().address,
  Wallet.createRandom().address,
];

export function useGetCouncilMembers(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['members', council],
    queryFn: async () => {
      const members = (await getCouncilContract(council)
        .connect(motherShipProvider)
        .getCouncilMembers()) as string[];
      return members.concat(randomAddresses);
    },
    enabled: !!council,
    staleTime: 900000,
  });
}
