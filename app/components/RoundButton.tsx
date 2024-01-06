import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const RoundButton = ({ icon, onClick }: RoundButtonProps) => (
  <Button variant='default' onClick={onClick} className='focus-visible:outline-6 hover:bg-secondary rounded-full p-1 shadow-md dark:bg-accent'
>
    <Label className=''>{icon}</Label>
  </Button>
  // <button
  //   type='button'
  //   style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} // Custom shadow
  //   className='focus-visible:outline-6 bg-brand-accent1 hover:bg-brand-accent3d rounded-full p-1 text-white shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  //   onClick={onClick}
  // >
  //   {icon}
  // </button>
);

export default RoundButton;
