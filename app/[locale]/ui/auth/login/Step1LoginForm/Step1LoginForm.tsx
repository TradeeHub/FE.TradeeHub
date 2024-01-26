import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { FaEnvelope } from 'react-icons/fa';
import { LoginRequest } from '@/app/[locale]/types/sharedTypes';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../AuthInputWithIcon/AuthInputWithIcon';

const Step1LoginForm = ({ control, onEnterPress }: { control: Control<LoginRequest>, onEnterPress?: () => void}) => {


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
                onEnterPress={onEnterPress} // Add the onKeyPress event handler here
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
