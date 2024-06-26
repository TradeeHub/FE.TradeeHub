import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { LoginRequest } from '@/app/[locale]/types/sharedTypes';
import { AuthInputWithIcon } from '../../AuthInputWithIcon/AuthInputWithIcon';

const Step1LoginForm = ({
  control,
  onEnterPress
}: {
  control: Control<LoginRequest>;
  onEnterPress?: () => void;
}) => {
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
                autoFocus={true}
                placeholder='Password'
                type='password'
                onEnterPress={onEnterPress} // Add the onKeyPress event handler here
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default Step1LoginForm;
