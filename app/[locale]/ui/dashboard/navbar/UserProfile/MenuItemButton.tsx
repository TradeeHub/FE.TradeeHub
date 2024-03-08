import { Button } from '@/components/ui/button';
import { IconType } from 'react-icons';

interface MenuItemButtonProps {
  icon: IconType; // This is a component, not an element.
  name: string;
  onClick?: () => void;
  className?: string;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  icon: Icon,
  name,
  onClick,
  className,
}) => {
  // Destructure and rename to Icon
  return (
    <Button
      variant='ghost'
      onClick={onClick}
      className={`text-md w-full justify-start gap-4 text-left ${className}`}
    >
      <div className='flex items-center'>
        <div className='mr-5 h-6 w-6 shrink-0 text-primary'>
          <Icon className='h-6 w-6' aria-hidden='true' />{' '}
          {/* Instantiate the Icon component */}
        </div>
        <span className='font-roboto text-primary'>{name}</span>
      </div>
    </Button>
  );
};

export default MenuItemButton;
