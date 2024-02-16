import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormField, FormControl, FormItem } from '@/components/ui/form';
import { AddCustomerFormRequest } from '@/app/[locale]/types/sharedTypes';
import SelectWithInputForm from '../../SelectWithInputForm/SelectWithInputForm';
import { AuthInputWithIcon } from '@/app/[locale]/ui/auth/AuthInputWithIcon/AuthInputWithIcon';


const titleOptions = [
  { label: 'No Title', value: 'Empty' },
  { label: 'Mr.', value: 'Mr.' },
  { label: 'Mrs.', value: 'Mrs.' },
  { label: 'Ms.', value: 'Ms.' },
  { label: 'Miss.', value: 'Miss.' },
  { label: 'Dr.', value: 'Dr.' },
  { label: 'Other', value: 'Other' },
];

type CustomerIdentityFormProps = {
  form: UseFormReturn<AddCustomerFormRequest>;
};

const CustomerIdentityForm: React.FC<CustomerIdentityFormProps> = ({ form }) => {
  return (
    <>
      <div className='w-1/4 pr-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <SelectWithInputForm<AddCustomerFormRequest, 'title'>
                form={form}
                field={field}
                options={titleOptions}
                inputPlaceHolder='Other Title'
                defaultValue='Empty'
              />
            </FormItem>
          )}
        />
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='flex-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputWithIcon
                    field={field}
                    autoFocus={true}
                    placeholder='Name'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex-1'>
          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputWithIcon
                    field={field}
                    autoFocus={false}
                    placeholder='Surname'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex-1'>
          <FormField
            control={form.control}
            name='alias'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputWithIcon
                    field={field}
                    autoFocus={false}
                    placeholder='Alias'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerIdentityForm;
