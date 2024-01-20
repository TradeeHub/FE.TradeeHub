'use client';
import { resetUser, setUser } from '@/lib/features/user/userSlice';
import { useReactiveVar, useApolloClient } from '@apollo/client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authenticatedVar from '../constants/authenticated';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';
import { AuthenticationGuardProps } from '../types/sharedTypes';

const AuthenticationGuard = ({
  children,
}: AuthenticationGuardProps): JSX.Element => {
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
      client.clearStore().then(() => {});
    } else {
      console.log('loggedInUser', loggedInUser, error, loading);
      if (!loading && !error && loggedInUser) {
        dispatch(setUser(loggedInUser)); // Update Redux user if loggedInUser is available
      }
    }
  }, [authenticated, pathname, loggedInUser]);

  return <>{children}</>;
};

export default AuthenticationGuard;
