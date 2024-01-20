import { Label } from '@/components/ui/label';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const NavBarCompanyName = () => {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <>
      <div className='hidden flex-shrink-0 text-primary md:mr-12 md:block'>
        <Label className='text-lg font-bold'>{user?.companyName}</Label>
      </div>
    </>
  );
};

export default NavBarCompanyName;
