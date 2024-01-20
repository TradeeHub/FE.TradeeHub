import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { MdSearch } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '../sidebar/Sidebar';
import ThemeChanger from '@/app/[locale]/components/ThemeChanger';
import UserDropDownMenu from './UserProfile/UserDropDownMenu';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-1 items-center gap-x-4 bg-card p-4'>
        {/* Menu Icon, visible only on small (sm) screens */}
        <div className='flex text-primary lg:hidden'>
          <Sheet>
            <SheetTrigger>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </SheetTrigger>
            <SheetContent
              side='left'
              style={{ maxWidth: '280px' }}
              className='pl-0 pr-0'
            >
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Input with icon */}
        <div className='relative flex-grow text-primary'>
          <MdSearch className='absolute left-3 top-1/2 -translate-y-1/2 transform text-primary' />
          <Input
            placeholder='Search...'
            className='border-border bg-background pl-10'
          />
        </div>

        {/* Theme Toggle and Notifications Button */}
        <div className='flex items-center gap-4'>
          <div className='text-primary'>
            <ThemeChanger />
          </div>
          <div className='text-primary'>
            <Button variant='ghost' size='icon' aria-label='Notifications'>
              <BellIcon className='h-6 w-6' aria-hidden='true' />
            </Button>
          </div>

          {/* Avatar and Dropdown Menu */}
          <UserDropDownMenu />

          {/* Rd HandyPro Label */}
          <div className='hidden flex-shrink-0 text-primary md:mr-12 md:block'>
            <Label className='text-lg font-bold'>Rd HandyPro</Label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
