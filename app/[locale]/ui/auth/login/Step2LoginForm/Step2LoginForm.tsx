import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { FaLock } from 'react-icons/fa';
import { LoginRequest } from '@/app/[locale]/types/sharedTypes';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../AuthInputWithIcon/AuthInputWithIcon';

const Step1LoginForm = ({ control }: { control: Control<LoginRequest> }) => {
  return (
    <>
      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                icon={FaLock}
                autoFocus={true}
                placeholder='Password'
                type='password'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Step1LoginForm;
