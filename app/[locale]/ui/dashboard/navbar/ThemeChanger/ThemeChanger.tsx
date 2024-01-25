'use client';
import { useEffect, useState } from 'react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { BsMoonStars } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Switch Theme'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <BsMoonStars className='h-6 w-6' aria-hidden='true' />
          ) : (
            <MdOutlineWbSunny className='h-6 w-6' aria-hidden='true' />
          )}
        </Button>
      </div>
    </>
  );
};

export default ThemeChanger;
