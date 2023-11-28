import { useQuery } from '@tanstack/react-query';

export function useGetVotingCandidates() {
  return useQuery({
    queryKey: ['voting-candidates'],
    queryFn: () => {
      const selection = localStorage.getItem('voteSelection');
      const parsedSelection = JSON.parse(selection ? selection : '{}');
      return parsedSelection as Record<string, string>;
    },
    staleTime: 900000,
  });
}
