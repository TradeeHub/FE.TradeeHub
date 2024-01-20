import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/20/solid';
import Sidebar from '../../sidebar/Sidebar';

const MenuToggleButton = () => {
  return (
    <>
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
    </>
  );
};

export default MenuToggleButton;
