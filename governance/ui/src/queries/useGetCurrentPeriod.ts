import { useQuery } from '@tanstack/react-query';

export function useGetCurrentPeriod() {
  return useQuery({
    queryKey: ['period'],
    queryFn: async () => {
      return '0';
    },
  });
}
