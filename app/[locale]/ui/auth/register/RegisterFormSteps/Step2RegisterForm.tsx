import { FormField, FormItem, FormControl } from '@/components/ui/form';
import React from 'react';
import { RegisterRequest, UserPlace } from '@/app/[locale]/types/sharedTypes';
import { Control } from 'react-hook-form';
import AddressAutocomplete from '../../../general/AddressAutocomplete/AddressAutocomplete';
import {
  AuthInputWithIcon,
  StyledFormMessage,
} from '../../AuthInputWithIcon/AuthInputWithIcon';

const Step2RegisterForm = ({
  control,
  onPlaceSelected,
}: {
  control: Control<RegisterRequest>;
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
              <AuthInputWithIcon
                field={field}
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
              <AuthInputWithIcon
                field={field}
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
        name='userPlace'
        render={(
          { field }, // Destructure to only pass field
        ) => (
          <FormItem>
            <FormControl>
              <AddressAutocomplete
                field={field}
                onPlaceSelected={onPlaceSelected}
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
