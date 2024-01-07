import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const RoundButton = ({ icon, onClick }: RoundButtonProps) => (
  <Button
    variant='secondary'
    onClick={onClick}
    className='focus-visible:outline-6 rounded-full p-1 shadow-md hover:bg-secondary/90'
  >
    <Label className=''>{icon}</Label>
  </Button>
);

export default RoundButton;
