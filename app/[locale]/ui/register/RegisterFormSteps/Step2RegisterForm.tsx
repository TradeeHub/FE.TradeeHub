import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import React from 'react';
import { Input } from '@/components/ui/input';

const Step2RegisterForm = ({ control }) => {
  return (
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' {...field} />
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

export default Step2RegisterForm;
