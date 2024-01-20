import { Button } from '@/components/ui/button';
import { BellIcon } from '@heroicons/react/24/outline';

const NavBarCompanyName = () => {
  return (
    <>
      <Button variant='ghost' size='icon' aria-label='Notifications'>
        <BellIcon className='h-6 w-6' aria-hidden='true' />
      </Button>
    </>
  );
};

export default NavBarCompanyName;
