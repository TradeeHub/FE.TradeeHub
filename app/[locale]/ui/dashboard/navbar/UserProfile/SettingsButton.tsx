import { IoSettingsOutline } from 'react-icons/io5';
import MenuItemButton from './MenuItemButton';

const SettingsButton = () => {
  const handleOpenSettings = async () => {};

  return (
    <MenuItemButton
      name='Settings'
      icon={IoSettingsOutline}
      onClick={handleOpenSettings}
    />
  );
};

export default SettingsButton;
