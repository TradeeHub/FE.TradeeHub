'use client';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import { UserDbObject } from '@/generatedGraphql';
import { useEffect } from 'react';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user.data);

   useEffect(() => {
      console.log('user changed', user)
  }, [user]);

  const myu = user as UserDbObject | null
  return <div>Dashboard WELCOME {myu?.name} </div>;
};

export default Dashboard;
