import { MenuItem } from '@/app/[locale]/types/sharedTypes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MenuItemButton from '../../dashboard/navbar/UserProfile/MenuItemButton';
import { Button } from '@/components/ui/button';

const GenericDropdownMenu = ({
  triggerIcon,
  menuItems,
}: {
  triggerIcon: React.ReactNode;
  menuItems: MenuItem[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-full p-3'>
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-30 gap-2'>
        {menuItems.map((item: MenuItem, index: number) => (
          <>
            {index > 0 && <DropdownMenuSeparator />}{' '}
            {/* Separator shown after the first item */}
            <DropdownMenuItem
              key={item.label}
              className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'
            >
              <MenuItemButton
                name={item.label} // Assuming this is static; replace with {item.name} if it's dynamic
                icon={item.icon}
                onClick={item.onClick}
              />
            </DropdownMenuItem>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenericDropdownMenu;
