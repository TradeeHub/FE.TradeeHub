import authenticatedVar from '@/app/[locale]/constants/authenticated';
import { useLogout } from '@/app/[locale]/hooks/customer/auth/useAuth';

const Logout = () => {
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
    <span onClick={handleLogout} className=''>
      Logout
    </span>
  );
};

export default Logout;
