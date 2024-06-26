import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { RegisterRequest } from '@/app/[locale]/types/sharedTypes';
import { AuthInputWithIcon } from '../../AuthInputWithIcon/AuthInputWithIcon';
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem
} from '@/components/ui/select';

const Step3RegisterForm = ({
  control
}: {
  control: Control<RegisterRequest>;
}) => {
  return (
    <>
      <FormField
        control={control}
        name='companyName'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                autoFocus={true}
                placeholder='Company Name'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='companyType'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                autoFocus={false}
                placeholder='Company Type'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='companySize'
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Company Size' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='Just Me'>Just Me</SelectItem>
                <SelectItem value='2-5'>2-5</SelectItem>
                <SelectItem value='6-10'>6-10</SelectItem>
                <SelectItem value='10+'>10+</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </>
  );
};

export default Step3RegisterForm;
