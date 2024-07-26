import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { motherShipProvider } from '../utils/providers';
import { getCouncilContract } from '../utils/contracts';

// TODO @dev remove
const randomAddresses = [
  '0xAbC1234567890dEf1234567890abcdef12345678',
  '0x1234567890ABCDEF1234567890abcdef12345678',
  '0x9876543210FEDCBA9876543210fedcba98765432',
  '0xAaBbCcDdEeFf00112233445566778899aAbBcCdD',
  '0x00112233445566778899AaBbCcDdEeFf00112233',
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
