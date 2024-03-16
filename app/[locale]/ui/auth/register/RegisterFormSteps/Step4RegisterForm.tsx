import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel
} from '@/components/ui/form';
import { RegisterRequest } from '@/app/[locale]/types/sharedTypes';
import {
  AuthInputWithIcon,
  StyledFormMessage
} from '../../AuthInputWithIcon/AuthInputWithIcon';
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const Step4RegisterForm = ({
  control
}: {
  control: Control<RegisterRequest>;
}) => {
  return (
    <>
      <FormField
        control={control}
        name='referralSource'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInputWithIcon
                field={field}
                autoFocus={true}
                placeholder='Where did you hear about us?'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='companyPriority'
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='What would you like to gain from us?' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='Streamlined Quoting Process'>
                  Streamlined Quoting Process
                </SelectItem>
                <SelectItem value='Improve Customer Experience'>
                  Improve Customer Management/Experience
                </SelectItem>
                <SelectItem value='Enhanced Time Management'>
                  Enhanced Time Management
                </SelectItem>
                <SelectItem value='New Job Opportunities'>
                  New Job Opportunities
                </SelectItem>
                <SelectItem value='Real-Time Collaboration and Communication'>
                  Real-Time Collaboration and Communication
                </SelectItem>
                <SelectItem value='All Of The Above'>
                  All Of The Above
                </SelectItem>
                <SelectItem value='Other'>Other</SelectItem>
              </SelectContent>
            </Select>
            <StyledFormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='marketingPreference'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <div className='space-y-0.5'>
              <FormLabel>Marketing emails</FormLabel>
              <FormDescription>
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default Step4RegisterForm;
