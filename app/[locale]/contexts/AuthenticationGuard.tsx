'use client';
import React, { useEffect } from 'react';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';
import { usePathname, useRouter } from 'next/navigation'; // Updated import for useRouter
import { useLocale } from 'next-intl';
import { useDispatch } from 'react-redux'; // Combined import
import { setUser, resetUser } from '@/lib/features/user/userSlice';
import { useReactiveVar } from '@apollo/client';
import authenticatedVar from '../constants/authenticated';
import { useApolloClient } from '@apollo/client';
import { AuthenticationGuardProps } from '../types/sharedTypes';

const AuthenticationGuard = ({ children }: AuthenticationGuardProps): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { user: loggedInUser, loading, error } = useGetLoggedInUser();
  const authenticated = useReactiveVar(authenticatedVar);
  const client = useApolloClient();
  const pathname = usePathname();

  useEffect(() => {
    if (!authenticated) {
      dispatch(resetUser());
      router.push(`/${locale}/login`); // Redirect to login if no loggedInUser and user is null
      client.clearStore().then((te) => {
        console.log('my xxx', te);
      });
    } else {
      if (!loading && !error && loggedInUser) {
          dispatch(setUser(loggedInUser)); // Update Redux user if loggedInUser is available
      }
    }
  }, [authenticated, pathname, loggedInUser]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthenticationGuard;
