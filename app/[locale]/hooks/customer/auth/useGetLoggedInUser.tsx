import { useLoggedInUserQuery } from '@/generatedGraphql';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useGetLoggedInUser = () => {
    
  const { data, loading, error } = useLoggedInUserQuery();
  const router = useRouter();
  const locale = useLocale();
  // Optional: Process data to get the user object in a more convenient format
  const user = data?.loggedInUser; // Assuming loggedInUser returns an array of users, and you need the first one

  useEffect(() => {
    console.log('USING EFFECT');
    if (!loading) {
      if (error || !data) {
        router.push(`/${locale}/login`);
      }
    }
  }, [data, loading, error]); // Only runs on initial mount

  return { user, loading, error };
};

export { useGetLoggedInUser };
