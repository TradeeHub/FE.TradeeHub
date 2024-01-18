'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';
import { AuthContextType } from '../types/sharedTypes';
import { UserDbObject } from '@/generatedGraphql';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const locale = useLocale();

  const { user: loggedInUser, loading, error } = useGetLoggedInUser();
  const [user, setUser] = useState<UserDbObject | null>(loggedInUser);

  useEffect(() => {
    console.log('I MIGHT HAVE ERRORS ', error);
    if (!loading && !error) {
      setUser(loggedInUser);
    } else {
      if (!loading) {
        setUser(null);
        router.push(`/${locale}/login`);
      }
    }
  }, [loading, loggedInUser, error]);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, loading, error }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
