import { UserDTO } from '@lofhen/types';
import { getCurrentUser } from 'lib/user/getCurrentUser';
import { useQuery } from 'react-query';

interface UseUserResponse {
  user: UserDTO | null | undefined;
  isLoading: boolean;
}

export default function useUser(): UseUserResponse {
  const { data: user, isLoading } = useQuery(
    ['user_auth'],
    async () => {
      const userData = await getCurrentUser();

      return userData;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  return { user, isLoading };
}
