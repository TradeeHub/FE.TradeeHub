import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './LogoutButton';
import SettingsButton from './SettingsButton';
import UserProfileButton from './UserProfileButton';
import UserHeader from './UserHeader';

const UserDropDownMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src='https://i.pinimg.com/736x/2c/af/e9/2cafe919952a053d85dd664f6649bf45.jpg' />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 gap-2'>
          <DropdownMenuLabel>
            <UserHeader />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground '>
              <UserProfileButton />
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'>
              <SettingsButton />
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'>
              <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropDownMenu;
