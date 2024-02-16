import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path as necessary
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'; // Adjust import path as necessary
import { AddCustomerFormRequest, UserPlace } from '@/app/[locale]/types/sharedTypes'; // Adjust import path as necessary
import AddressAutocomplete from '@/app/[locale]/ui/general/AddressAutocomplete/AddressAutocomplete';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { CustomButton } from '../../CustomButton/CustomButton';

interface MultiPropertyProps {
  form: UseFormReturn<AddCustomerFormRequest>; // Adjust typing as necessary
}

const MultiProperty: React.FC<MultiPropertyProps> = ({ form }) => {
  const { control, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'properties',
  });

  const onPlaceSelectForProperty = (index: number, place: UserPlace | null) => {
    setValue(`properties.${index}.property`, place);
    if (!place) setValue(`properties.${index}.isBillingAddress`, false);
  };

  const onPlaceSelectForBilling = (index: number, place: UserPlace | null) => {
    setValue(`properties.${index}.billing`, place);
  };

  

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className='mb-4'>
          <div className='flex items-end gap-2'>
            <FormItem className='flex-grow'>
              <FormControl>
                <Controller
                  name={`properties.${index}.property`}
                  control={control}
                  render={({ field }) => (
                    <AddressAutocomplete
                      field={field}
                      onPlaceSelected={(place) => onPlaceSelectForProperty(index, place)}
                      placeholder='Search for Property Address'
                    />
                  )}
                />
              </FormControl>
            </FormItem>

            {/* Add and Remove buttons */}
            {index > 0 && (
              <Button
                type='button'
                variant='ghost'
                onClick={() => remove(index)}
                className='remove-button'
              >
                <RxCross2 />
              </Button>
            )}

            {index === 0 && (
              <CustomButton
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => append({ property: null, isBillingAddress: true })}
                className='add-button'
              >
                Add
              </CustomButton>
            )}
          </div>

          <div className='mt-1 pl-4'>
            <FormField
              control={form.control}
              name={`properties.${index}.isBillingAddress`}
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel className='text-sm'>
                    Same address for billing and property.
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          {!watch(`properties.${index}.isBillingAddress`) && (
            <FormItem className='flex-grow mt-5'>
              <FormControl>
                <Controller
                  name={`properties.${index}.billing`}
                  control={control}
                  render={({ field }) => (
                    <AddressAutocomplete
                      field={field}
                      onPlaceSelected={(place) => onPlaceSelectForBilling(index, place)}
                      placeholder='Search for Billing Address'
                    />
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiProperty;
