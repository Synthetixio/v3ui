import { useQuery } from '@tanstack/react-query';
import { CouncilSlugs } from '../utils/councils';
import { getCouncilContract } from '../utils/contracts';
import { motherShipProvider } from '../utils/providers';

// TODO @dev remove
const randomAddresses = [
  '0xAbC1234567890dEf1234567890abcdef12345678',
  '0x1234567890ABCDEF1234567890abcdef12345678',
  '0x9876543210FEDCBA9876543210fedcba98765432',
  '0xAaBbCcDdEeFf00112233445566778899aAbBcCdD',
  '0x00112233445566778899AaBbCcDdEeFf00112233',
];

export function useGetCouncilMembers(council: CouncilSlugs) {
  return useQuery({
    queryKey: ['members', council],
    queryFn: async () => {
      return (
        await getCouncilContract(council).connect(motherShipProvider).getCouncilMembers()
      ).conat(randomAddresses) as string[] | undefined;
    },
    enabled: !!council,
    staleTime: 900000,
  });
}
