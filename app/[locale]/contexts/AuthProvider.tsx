'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';
import { AuthContextType } from '../types/sharedTypes';
import { useRouter } from 'next/navigation'; // Updated import for useRouter
import { useLocale } from 'next-intl';
import { useSelector, useDispatch } from 'react-redux'; // Combined import
import { RootState } from '@/lib/store';
import { setUser , resetUser} from '@/lib/features/user/userSlice';
import { useReactiveVar } from '@apollo/client';
import authenticatedVar from '../constants/authenticated';
import { useApolloClient } from '@apollo/client';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { user: loggedInUser, loading, error } = useGetLoggedInUser();
  const authenticated = useReactiveVar(authenticatedVar);
  const client = useApolloClient();

  useEffect(() => {
    console.log('HERE 111', loggedInUser, user, loading)

    if (!loading && !error) {
      if (loggedInUser) {
         console.log('WHY DONT I RUN  333')
        dispatch(setUser(loggedInUser)); // Update Redux user if loggedInUser is available
      } 
    }
  }, [loading, loggedInUser, user]);

  
  useEffect(() => {
      console.log('AUTH PROVIDER AUTHENTICATED VAR CHANGED ', authenticated)
      if(!authenticated){
        router.push(`/${locale}/login`); // Redirect to login if no loggedInUser and user is null
        dispatch(resetUser());
        client.clearStore().then((te) => {
          console.log('my xxx' ,te)
        });      
        }
    }, [authenticated, router]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
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
