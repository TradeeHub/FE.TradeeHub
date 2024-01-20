import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import React from 'react';
import { Input } from '@/components/ui/input';

const Step1RegisterForm = ({ control }) => {
  return (
    <FormField
      control={control}
      name='email'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder='Email' {...field} />
          </FormControl>
          <FormDescription>
            Enter your email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Step1RegisterForm;
