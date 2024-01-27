import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../AuthInputWithIcon/AuthInputWithIcon';
import { ChangedForgottenPasswordRequestInput } from '@/generatedGraphql';

const Step1ResetPasswordForm = ({
  control,
  onEnterPress,
}: {
  control: Control<ChangedForgottenPasswordRequestInput>;
  onEnterPress?: () => void;
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

export default Step1ResetPasswordForm;
