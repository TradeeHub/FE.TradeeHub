import React from 'react';
import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';
import { AddCustomerFormRequest } from '@/app/[locale]/types/sharedTypes';
import {
  ControllerRenderProps,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';
import SelectWithInputForm from '../../SelectWithInputForm/SelectWithInputForm';
import { AuthInputWithIcon } from '@/app/[locale]/ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { SwitchWithLabel } from '../../SwitchWithLabel/SwitchWithLabel';
import { CustomButton } from '../../CustomButton/CustomButton';
import { FormField } from '@/components/ui/form';

const phoneNumberTypeOptions = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Home', value: 'Home' },
  { label: 'Work', value: 'Work' },
  { label: 'Other', value: 'Other' },
];

type MultiPhoneNumberProps = {
  form: UseFormReturn<AddCustomerFormRequest>;
};

const MultiPhoneNumber: React.FC<MultiPhoneNumberProps> = ({ form }) => {
  const { control } = form;
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  const addPhoneNumber = () => {
    appendPhone({
      phoneNumber: '',
      phoneNumberType: '',
      receiveNotifications: true,
    });
  };

  return (
    <>
      {phoneFields.map((field, index) => (
        <div key={field.id} className='flex items-center'>
          {' '}
          {/* Bottom margin for spacing between rows */}
          <div className='w-1/4 pr-2'>
            {' '}
            {/* Assign width to 1/4 of container and padding to the right */}
            <FormField
              control={form.control}
              name={`phoneNumbers.${index}.phoneNumberType`}
              render={({ field }) => (
                <>
                  <SelectWithInputForm<
                    AddCustomerFormRequest,
                    `phoneNumbers.${typeof index}.phoneNumberType`
                  >
                    form={form as UseFormReturn<AddCustomerFormRequest>}
                    field={
                      field as ControllerRenderProps<
                        AddCustomerFormRequest,
                        `phoneNumbers.${number}.phoneNumberType`
                      >
                    }
                    options={phoneNumberTypeOptions}
                    inputPlaceHolder='Number Type'
                    defaultValue='Mobile'
                  />
                </>
              )}
            />
          </div>
          <div className='flex-1 px-2'>
            {' '}
            {/* Flex grow and padding on both sides */}
            <FormField
              control={form.control}
              name={`phoneNumbers.${index}.phoneNumber`}
              render={({ field }) => (
                <AuthInputWithIcon
                  field={field}
                  placeholder='Phone Number'
                  type='tel'
                />
              )}
            />
          </div>
          <div className='w-20 px-2'>
            {' '}
            {/* Assign fixed width for the switch container and padding */}
            <FormField
              control={form.control}
              name={`phoneNumbers.${index}.receiveNotifications`}
              render={({ field }) => (
                <SwitchWithLabel
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onLabel='ON'
                  offLabel='OFF'
                  aria-label='Notifications'
                  label='Notifications'
                />
              )}
            />
          </div>
          <div className='w-12'>
            {' '}
            {/* Assign fixed width for the button container */}
            {index !== 0 ? (
              <Button
                type='button'
                variant={'ghost'}
                onClick={() => removePhone(index)}
                className='remove-button'
                size='icon'
              >
                <RxCross2 />
              </Button>
            ) : (
              <CustomButton
                type='button'
                variant='ghost'
                size='sm'
                onClick={addPhoneNumber}
              >
                Add
              </CustomButton>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default MultiPhoneNumber;
