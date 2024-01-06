import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const RoundButton = ({ icon, onClick }: RoundButtonProps) => (
  <Button variant='default' onClick={onClick} className='focus-visible:outline-6 hover:bg-secondary rounded-full p-1 shadow-md dark:bg-accent dark:hover:bg-accent/80'
>
    <Label className=''>{icon}</Label>
  </Button>
);

export default RoundButton;
