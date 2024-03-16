import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { RegisterRequest } from '@/app/[locale]/types/sharedTypes';
import { AuthInputWithIcon } from '../../AuthInputWithIcon/AuthInputWithIcon';

const Step1RegisterForm = ({
  control
}: {
  control: Control<RegisterRequest>;
}) => {
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
                autoFocus={true}
                placeholder='Email Address'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                autoFocus={false}
                placeholder='Password'
                type='password'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                autoFocus={false}
                placeholder='Confirm Password'
                type='password'
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default Step1RegisterForm;
