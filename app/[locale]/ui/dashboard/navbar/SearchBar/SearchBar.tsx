import { Input } from '@/components/ui/input';
import { MdSearch } from 'react-icons/md';

const SearchBar = () => {
  return (
    <>
      <MdSearch className='absolute left-3 top-1/2 -translate-y-1/2 transform text-primary' />
      <Input
        placeholder='Search...'
        className='border-border bg-background pl-10'
      />
    </>
  );
};

export default SearchBar;
