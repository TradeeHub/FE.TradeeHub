import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { TFieldValues } from '@/app/[locale]/types/sharedTypes';
import { InputWithIcon, StyledFormMessage } from './CustomForm';

const Step1RegisterForm = ({ control }: { control: Control<TFieldValues> }) => {
  return (
    <>
      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
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
      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
                field={field}
                icon={FaLock}
                autoFocus={false}
                placeholder='Password'
                type='password'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
                field={field}
                icon={FaLock}
                autoFocus={false}
                placeholder='Confirm Password'
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

export default Step1RegisterForm;
