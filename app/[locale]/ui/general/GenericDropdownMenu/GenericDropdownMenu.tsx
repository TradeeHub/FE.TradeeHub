import React from 'react'; // Import React for JSX syntax
import { MenuItem } from '@/app/[locale]/types/sharedTypes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
        {menuItems.map((item, index) => (
          <React.Fragment key={`item-${index}`}> {/* Assign unique key here */}
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              key={item.label} // This key is still valid but now inside a correctly keyed fragment
              className='cursor-pointer p-0 focus:bg-border focus:text-accent-foreground'
            >
              <MenuItemButton
                name={item.label}
                icon={item.icon}
                onClick={item.onClick}
              />
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenericDropdownMenu;
