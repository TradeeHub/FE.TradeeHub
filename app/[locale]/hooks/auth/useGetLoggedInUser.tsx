import { UserDbObject, useLoggedInUserQuery } from '@/generatedGraphql';

const useGetLoggedInUser = () => {
  const { data, loading, error } = useLoggedInUserQuery();
  const user = data?.loggedInUser as UserDbObject;
  return { user, loading, error };
};

export { useGetLoggedInUser };
