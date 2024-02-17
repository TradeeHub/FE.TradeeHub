import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import SelectWithInputForm from '../SelectWithInputForm/SelectWithInputForm';
import { AddCustomerFormRequest } from '../../types/sharedTypes';
import { AuthInputWithIcon } from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { Checkbox } from '@/components/ui/checkbox';

const customerTypeOptions = [
  { label: 'Customer Type', value: 'Empty' },
  { label: 'Home Owner', value: 'Home Owner' },
  { label: 'Tenant', value: 'Tenant' },
  { label: 'Landlord', value: 'Landlord' },
  { label: 'Small Business', value: 'Small Business' },
  { label: 'Agency', value: 'Agency' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'City Council', value: 'City Council' },
  { label: 'Property Management Company', value: 'Property Management' },
  { label: 'Construction Firm', value: 'Construction Firm' },
  { label: 'Educational Institution', value: 'Educational Institution' },
  { label: 'Other', value: 'Other' },
];

type CustomerTypeFormProps = {
  form: UseFormReturn<AddCustomerFormRequest>;
};

const CustomerTypeForm: React.FC<CustomerTypeFormProps> = ({ form }) => {
  const { watch, control } = form;
  const customerType = watch('customerType');
  const hiddenCompanyTypes = ['', 'Home Owner', 'Tenant', 'Landlord'];

  return (
    <>
      <FormField
        control={control}
        name='customerType'
        render={({ field }) => (
          <FormItem>
            <SelectWithInputForm<AddCustomerFormRequest, 'customerType'>
              form={form}
              field={field}
              options={customerTypeOptions}
              inputPlaceHolder='Other Customer Type'
              defaultValue='Empty'
            />
          </FormItem>
        )}
      />
      {!hiddenCompanyTypes.includes(customerType ?? '') && (
        <>
          <FormField
            control={control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputWithIcon
                    field={field}
                    autoFocus={false}
                    placeholder='Company Name'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-0 pl-4' style={{ marginTop: 6 }}>
            <FormField
              control={control}
              name='useCompanyName'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel className='text-sm'>
                    Use company name as main display instead of name.
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerTypeForm;
