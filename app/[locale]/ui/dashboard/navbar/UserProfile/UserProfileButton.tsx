import { CgProfile } from 'react-icons/cg';
import MenuItemButton from './MenuItemButton';

const UserProfileButton = () => {
  const handleOpenProfile = async () => {};

  return (
    <MenuItemButton
      name='Profile'
      icon={CgProfile}
      onClick={handleOpenProfile}
    />
  );
};

export default UserProfileButton;
