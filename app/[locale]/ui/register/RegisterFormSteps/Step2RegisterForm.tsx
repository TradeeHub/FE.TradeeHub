import { FormField, FormItem, FormControl } from '@/components/ui/form';
import React from 'react';
import { InputWithIcon, StyledFormMessage } from './CustomForm';
import { TFieldValues } from '@/app/[locale]/types/sharedTypes';
import { Control } from 'react-hook-form';
import { HiDeviceMobile } from 'react-icons/hi';
import { IoLocation } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';

const Step2RegisterForm = ({ control }: { control: Control<TFieldValues> }) => {
  return (
    <>
      <FormField
        control={control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
                field={field}
                icon={FaUser}
                autoFocus={true}
                placeholder='Full Name'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='phoneNumber'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
                field={field}
                icon={HiDeviceMobile}
                autoFocus={false}
                placeholder='Phone Number'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithIcon
                field={field}
                icon={IoLocation}
                autoFocus={false}
                placeholder='Address'
              />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Step2RegisterForm;
