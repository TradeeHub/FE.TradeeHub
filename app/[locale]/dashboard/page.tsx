'use client';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user.data);

  return <div>Dashboard WELCOME {user?.name} </div>;
};

export default Dashboard;
