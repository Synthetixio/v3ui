import { VALID_UUID_API_URL } from '../utils/boardroom';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from './useWallet';

type UUIDResponse = {
  data: {
    success: boolean;
  };
};

export function useGetIsUUIDValidQuery(uuid: string) {
  const { activeWallet } = useWallet();

  return useQuery<boolean>({
    queryKey: ['isUUIDValid'],
    queryFn: async () => {
      const body = { address: activeWallet!.address, uuid };

      const response = await fetch(VALID_UUID_API_URL, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const { data } = (await response.json()) as UUIDResponse;

      return data.success as boolean;
    },

    enabled: activeWallet?.address !== null && uuid !== null,
  });
}
