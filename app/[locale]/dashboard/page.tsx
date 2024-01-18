'use client';
import { useAuth } from '../contexts/AuthProvider';

const Dashboard = () => {
  const { user, setUser } = useAuth();

  return <div>Dashboard WELCOME {user?.name} </div>;
};

export default Dashboard;
