'use client';
import { useEffect, useState } from 'react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { BsMoonStars } from 'react-icons/bs';
import { Button } from '@/components/ui/button';


const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Correct the icon when the page loads or when the theme changes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render null or a placeholder until the component mounts
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
