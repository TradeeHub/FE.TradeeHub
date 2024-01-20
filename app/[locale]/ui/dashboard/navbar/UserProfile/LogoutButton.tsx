import authenticatedVar from '@/app/[locale]/constants/authenticated';
import { useLogout } from '@/app/[locale]/hooks/customer/auth/useAuth';
import { FiLogOut } from 'react-icons/fi';
import MenuItemButton from './MenuItemButton';

const LogoutButton = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    try {
      logout();
      authenticatedVar(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <MenuItemButton name='Sign Out' icon={FiLogOut} onClick={handleLogout} />
  );
};

export default LogoutButton;
