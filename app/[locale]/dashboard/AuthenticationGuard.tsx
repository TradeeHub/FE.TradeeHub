'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReactiveVar, useApolloClient } from '@apollo/client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation'; // Note: use 'next/router' instead of 'next/navigation' for useRouter
import { resetUser, setUser } from '@/lib/features/user/userSlice';
import authenticatedVar from '../constants/authenticated';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';
import { AuthenticationGuardProps } from '../types/sharedTypes';

const AuthenticationGuard = ({ children }: AuthenticationGuardProps): JSX.Element | null => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { user: loggedInUser, loading, error } = useGetLoggedInUser();
  const authenticated = useReactiveVar(authenticatedVar);
  const client = useApolloClient();
  const [isUserLoadingComplete, setIsUserLoadingComplete] = useState(false);

  useEffect(() => {
    // If not loading and no error, consider the user loading process complete
    if (!loading && !error) {
      setIsUserLoadingComplete(true);

      if (authenticated && loggedInUser) {
        dispatch(setUser(loggedInUser)); // Update Redux user if loggedInUser is available
      }
    }

    if (!loading && error) {
      dispatch(resetUser());
      client.clearStore().then(() => {
        router.push(`/${locale}/login`); // Redirect to login
      });
    }
  }, [authenticated, loading, loggedInUser, error, dispatch]);

  useEffect(() => {
    if (isUserLoadingComplete && !authenticated) {
      dispatch(resetUser());
      client.clearStore().then(() => {
        router.push(`/${locale}/login`); // Redirect to login
      });
    }
  }, [dispatch, client, router, locale, authenticated, isUserLoadingComplete]);

  // Show a loading indicator while waiting for the user loading to complete
  if (!isUserLoadingComplete) {
    return <div></div>; // Replace with your loading indicator as needed
  }

  // Render children if the user loading process has completed
  return <>{children}</>;
};

export default AuthenticationGuard;
