import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import React from 'react';
import { Input } from '@/components/ui/input';

const Step3RegisterForm = ({ control }) => {
   return (
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
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

export default Step3RegisterForm;
