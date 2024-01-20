import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const UserHeader = () => {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <div className='flex flex-col items-center p-2 text-primary'>
      <div className='flex w-full items-center'>
        <Avatar className='shrink-0'>
          <AvatarImage src='https://i.pravatar.cc/300' alt='User' />
          <AvatarFallback>{user?.companyName[0]}</AvatarFallback>
        </Avatar>
        <div className='ml-3'>
          <div className='text-md w-full whitespace-normal break-words font-bold text-secondary'>
            {user?.companyName}
          </div>
        </div>
      </div>
      <div className='mt-2 w-full whitespace-normal break-words text-center text-xs text-primary'>
        {user?.email}
      </div>
    </div>
  );
};

export default UserHeader;
