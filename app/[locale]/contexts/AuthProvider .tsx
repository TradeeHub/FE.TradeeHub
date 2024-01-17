'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetLoggedInUser } from '../hooks/customer/auth/useGetLoggedInUser';

interface AuthContextType {
  user: any; // Replace 'any' with the actual user type from your GraphQL schema if available
  setUser: React.Dispatch<React.SetStateAction<any>>; // Same here
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const {user: loggedInUser, loading } = useGetLoggedInUser();
  const [user, setUser] = useState<any>(loggedInUser);
console.log('my user',user)
  useEffect(() => {
    if(!loading){
     setUser(loggedInUser)

    }
  }, []); // Only runs on initial mount

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
