import { FormField, FormItem, FormControl } from '@/components/ui/form';
import React from 'react';
import { InputWithIcon, StyledFormMessage } from './CustomForm';
import { TFieldValues, UserPlace } from '@/app/[locale]/types/sharedTypes';
import { Control } from 'react-hook-form';
import { HiDeviceMobile } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa6';
import AddressAutocomplete from '../../general/AddressAutocomplete/AddressAutocomplete';

const Step2RegisterForm = ({
  control,
  onPlaceSelected,
}: {
  control: Control<TFieldValues>;
  onPlaceSelected: (userPlace: UserPlace | null) => void;
}) => {
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
        render={() => (
          <FormItem>
            <FormControl>
              <AddressAutocomplete onPlaceSelected={onPlaceSelected} />
            </FormControl>
            <StyledFormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Step2RegisterForm;
