// Filename: CenteredTitleWithBack.js
import React from 'react';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';

type AuthTitleProps = {
  goBack?: () => void;
  currentStep: number;
  name: string;
};

const AuthTitle = ({ goBack, currentStep, name }: AuthTitleProps) => {
  return (
    <div className='relative text-center'>
      {currentStep > 1 && goBack && (
        <Button
          onClick={goBack}
          variant='ghost'
          className='absolute left-0 top-1/2 -translate-y-1/2 transform text-primary focus:outline-none dark:text-accent'
          aria-label='Go back'
        >
          <IoArrowBack size={24} />
        </Button>
      )}

      <div className='inline-block w-full'>
        <div className='text-3xl font-bold'>
          <span className='text-primary'>Tradee</span>
          <span className='text-secondary'>Hub</span>
        </div>
        <p className='text-md font-medium text-primary'>{name}</p>
      </div>
    </div>
  );
};

export default AuthTitle;
