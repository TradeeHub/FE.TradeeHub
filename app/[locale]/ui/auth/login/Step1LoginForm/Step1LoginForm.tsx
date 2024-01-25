import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { FaEnvelope } from 'react-icons/fa';
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
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                icon={FaEnvelope}
                autoFocus={true}
                placeholder='Email Address'
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
