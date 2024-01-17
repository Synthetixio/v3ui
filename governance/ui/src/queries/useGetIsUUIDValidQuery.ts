import { useWallet } from '@snx-v3/useBlockchain';
import { VALID_UUID_API_URL } from '../utils/boardroom';
import { useQuery } from '@tanstack/react-query';

type UUIDResponse = {
  data: {
    success: boolean;
  };
};

export default function useGetIsUUIDValidQuery(uuid: string) {
  const wallet = useWallet();
  return useQuery<boolean>({
    queryKey: ['isUUIDValid'],
    queryFn: async () => {
      const body = { address: wallet!.address, uuid };

      const response = await fetch(VALID_UUID_API_URL, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      const { data } = (await response.json()) as UUIDResponse;

      return data.success as boolean;
    },

    enabled: wallet?.address !== null && uuid !== null,
  });
}
