'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useReactiveVar, useApolloClient } from '@apollo/client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation'; // Keep these imports as is
import { resetUser, setUser } from '@/lib/features/user/userSlice';
import authenticatedVar from './constants/authenticated';
import { AuthenticationGuardProps } from './types/sharedTypes';
import { useGetLoggedInUser } from './hooks/auth/useAuth';

const AuthenticationGuard = ({
  children,
}: AuthenticationGuardProps): JSX.Element | null => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { loggedInUser, loggedInUserLoading: isUserLoading } =
    useGetLoggedInUser();
  const isAuthenticated = useReactiveVar(authenticatedVar);
  const client = useApolloClient();
  const pathname = usePathname();

  const isOnAuthPage = () => {
    const authPages = [
      `/${locale}/login`,
      `/${locale}/register`,
      `/${locale}/reset-password`,
    ];
    return authPages.includes(pathname);
  };

  useEffect(() => {
    console.log('isUserLoading', isUserLoading, isAuthenticated, pathname);
    if (isUserLoading) {
      return; // User is still loading, do nothing
    }

    if (isAuthenticated) {
      // User is authenticated
      if (loggedInUser) {
        dispatch(setUser(loggedInUser));
      }

      if (isOnAuthPage()) {
        // Redirect from auth pages to dashboard
        router.replace(`/${locale}/dashboard`);
      }
    } else {
      // Not authenticated or error occurred
      if (!isOnAuthPage()) {
        handleUnauthenticated();
      }
    }
  }, [isUserLoading, isAuthenticated, loggedInUser, pathname]);

  const handleUnauthenticated = async () => {
    dispatch(resetUser());
    await client.clearStore();
    router.replace(`/${locale}/login`);
  };

  // Determine what to render
  if (isUserLoading) {
    return <div>Loading...</div>; // Loading state
  } else if (isAuthenticated) {
    return <>{children}</>; // Authenticated state, render children
  } else {
    // Unauthenticated state, redirect or render loading
    return isOnAuthPage() ? <>{children}</> : <div>Redirecting...</div>;
  }
};

export default AuthenticationGuard;
