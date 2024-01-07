'use client';
import { useEffect } from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { MdOutlineWbSunny, MdSearch } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { BsMoonStars } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '../sidebar/sidebar';

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Correct the icon when the page loads or when the theme changes
  useEffect(() => {
    console.log('THEME', theme, resolvedTheme);
    setTheme(resolvedTheme as string);
  }, [setTheme, resolvedTheme]);

  return (
    <>
      <div className='flex flex-1 items-center gap-x-4 p-4'>
        {/* Menu Icon, visible only on small (sm) screens */}
        <div className='flex lg:hidden'>
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
        <div className='relative flex-grow'>
          <MdSearch className='absolute left-3 top-1/2 -translate-y-1/2 transform text-primary' />
          <Input placeholder='Search...' className='pl-10' />
        </div>

        {/* Theme Toggle and Notifications Button */}
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Switch Theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <BsMoonStars className='h-6 w-6' aria-hidden='true' />
            ) : (
              <MdOutlineWbSunny className='h-6 w-6' aria-hidden='true' />
            )}
          </Button>

          <Button variant='ghost' size='icon' aria-label='Notifications'>
            <BellIcon className='h-6 w-6' aria-hidden='true' />
          </Button>

          {/* Avatar and Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src='https://i.pinimg.com/736x/2c/af/e9/2cafe919952a053d85dd664f6649bf45.jpg' />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rd HandyPro Label */}
          <div className='flex-shrink-0 md:mr-16'>
            <Label>Rd HandyPro</Label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
