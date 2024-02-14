import { UserEntity, useLoggedInUserQuery } from '@/generatedGraphql';

const useGetLoggedInUser = () => {
  const { data, loading, error } = useLoggedInUserQuery();
  const user = data?.loggedInUser as UserEntity;
  return { user, loading, error };
};

export { useGetLoggedInUser };
