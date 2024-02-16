import React from 'react';
import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';
import {
  ControllerRenderProps,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';
import { AddCustomerFormRequest } from '@/app/[locale]/types/sharedTypes';
import { FormField } from '@/components/ui/form';
import SelectWithInputForm from '../../SelectWithInputForm/SelectWithInputForm';
import { AuthInputWithIcon } from '@/app/[locale]/ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import { CustomButton } from '../../CustomButton/CustomButton';
import { SwitchWithLabel } from '../../SwitchWithLabel/SwitchWithLabel';

const emailTypeOptions = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Work', value: 'Work' },
  { label: 'Other', value: 'Other' },
];

type MultiEmailProps = {
  form: UseFormReturn<AddCustomerFormRequest>;
};

const MultiEmail: React.FC<MultiEmailProps> = ({ form }) => {
  const { control } = form;
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const addEmail = () => {
    appendEmail({
      email: '',
      emailType: '',
      receiveNotifications: true,
    });
  };

  return (
    <>
      {emailFields.map((field, index) => (
        <div key={field.id} className='flex items-center'>
          <div className='w-1/4 pr-2'>
            <FormField
              control={form.control}
              name={`emails.${index}.emailType`}
              render={({ field }) => (
                <SelectWithInputForm<
                  AddCustomerFormRequest,
                  `emails.${typeof index}.emailType`
                >
                  form={form as UseFormReturn<AddCustomerFormRequest>}
                  field={
                    field as ControllerRenderProps<
                      AddCustomerFormRequest,
                      `emails.${typeof index}.emailType`
                    >
                  }
                  options={emailTypeOptions}
                  inputPlaceHolder='Email Type'
                  defaultValue='Personal'
                />
              )}
            />
          </div>
          <div className='flex-1 px-2'>
            {' '}
            {/* Flex grow and padding on both sides */}
            <FormField
              control={form.control}
              name={`emails.${index}.email`}
              render={({ field }) => (
                <AuthInputWithIcon
                  field={field}
                  placeholder='Email Address'
                  type='email'
                />
              )}
            />
          </div>
          <div className='w-20 px-2'>
            {' '}
            {/* Assign fixed width for the switch container and padding */}
            <FormField
              control={form.control}
              name={`emails.${index}.receiveNotifications`}
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
                onClick={() => removeEmail(index)}
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
                onClick={addEmail}
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

export default MultiEmail;
