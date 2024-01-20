import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const UserHeader = () => {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <div className='flex flex-col items-center p-2 text-primary'>
      <div className='flex items-center w-full'>
        <Avatar className='shrink-0'>
          <AvatarImage src={user?.avatar || 'https://i.pravatar.cc/300'} alt='User' />
          <AvatarFallback>{user?.companyName[0]}</AvatarFallback>
        </Avatar>
        <div className='ml-3'>
          <div className='text-md font-bold break-words whitespace-normal w-full text-secondary'>{user?.companyName}</div>
        </div>
      </div>
      <div className='text-xs text-primary break-words whitespace-normal w-full text-center mt-2'>
        {user?.email}
      </div>
    </div>
  );
};

export default UserHeader;
