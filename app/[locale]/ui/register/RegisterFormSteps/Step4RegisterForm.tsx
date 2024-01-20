import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { Input } from '@/components/ui/input';

const Step4RegisterForm = ({ control }) => {
  return (
    <FormField
      control={control}
      name='companyName'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <FormControl>
            <Input placeholder='Company Name' {...field} />
          </FormControl>
          <FormDescription>Enter your email.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Step4RegisterForm;
