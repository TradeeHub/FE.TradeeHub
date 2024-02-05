import { Button } from '@/components/ui/button';
import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

// Update RoundButton to be a forwardRef component
const RoundButton = React.forwardRef<HTMLButtonElement, RoundButtonProps>(
  ({ icon, onClick }, ref) => (
    <Button
      variant='secondary'
      onClick={onClick}
      ref={ref} // Forward the ref to the Button component
      className='focus-visible:outline-6 rounded-full p-1 shadow-md hover:bg-secondary/90'
    >
      {icon}
    </Button>
  )
);

RoundButton.displayName = 'RoundButton';

export default RoundButton;
