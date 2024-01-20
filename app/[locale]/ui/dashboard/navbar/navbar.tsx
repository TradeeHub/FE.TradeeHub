import ThemeChanger from '@/app/[locale]/ui/dashboard/navbar/ThemeChanger/ThemeChanger';
import UserDropDownMenu from './UserProfile/UserDropDownMenu';
import NavBarCompanyName from './CompanyName/NavBarCompanyName';
import Notifications from './Notifications/Notifications';
import SearchBar from './SearchBar/SearchBar';
import MenuToggleButton from './MenuToggleButton/MenuToggleButton';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-1 items-center gap-x-4 bg-card p-4'>
        <div className='flex text-primary lg:hidden'>
          <MenuToggleButton />
        </div>

        <div className='relative flex-grow text-primary'>
          <SearchBar />
        </div>

        <div className='flex items-center gap-4 text-primary'>
          <ThemeChanger />
          <Notifications />
          <UserDropDownMenu />
          <NavBarCompanyName />
        </div>
      </div>
    </>
  );
};

export default Navbar;
