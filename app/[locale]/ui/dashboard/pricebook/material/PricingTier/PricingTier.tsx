import React from 'react';
import {
  ArrayPath,
  Controller,
  ControllerRenderProps,
  FieldArray,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';
import { FormControl, FormItem } from '@/components/ui/form';

type SelectWithInputFormProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues>;
  field: ControllerRenderProps<TFieldValues, TFieldName>;
  title?: string;
  currencySymbol?: string;
};

const PricingTier = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  form,
  field,
  title,
  currencySymbol,
}: SelectWithInputFormProps<TFieldValues, TFieldName>) => {
  const { control, watch, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: field.name as ArrayPath<TFieldValues>,
  });

  // New function to update the next row's "Range From"
  const updateNextRowMin = (currentIndex: number, currentMaxValue: number) => {
    if (currentIndex + 1 < fields.length) {
      const nextMinValue = currentMaxValue + 1;
      setValue(
        `${field.name}.${currentIndex + 1}.unitRange.min` as Path<TFieldValues>,
        nextMinValue as PathValue<TFieldValues, Path<TFieldValues>>,
      );

      // Get the current "Range To" of the next line to check if it needs adjustment
      const nextRangeTo = watch(
        `${field.name}.${currentIndex + 1}.unitRange.max` as Path<TFieldValues>,
      );

      // If the "Range To" of the next line is less than or equal to its "Range From", adjust it
      if (nextRangeTo <= nextMinValue) {
        setValue(
          `${field.name}.${currentIndex + 1}.unitRange.max` as Path<TFieldValues>,
          (nextMinValue + 10) as PathValue<TFieldValues, Path<TFieldValues>>,
        );
      }
    }
  };

  const removeAndUpdate = (index: number) => {
    // If not the last item, update the next item's 'Range From' before removing.
    if (index < fields.length - 1) {
      const previousField = fields[index - 1] as TFieldValues;
      const previousRangeTo = index > 0 ? previousField.unitRange.max : 0;
      setValue(
        `${field.name}.${index + 1}.unitRange.min` as Path<TFieldValues>,
        (previousRangeTo + 1) as PathValue<TFieldValues, Path<TFieldValues>>,
      );
    }
    remove(index);
  };

  const handleBlur = (index: number) => {
    const currentRangeTo = watch(
      `${field.name}.${index}.unitRange.max` as Path<TFieldValues>,
    );
    const currentRangeToSet =
      currentRangeTo === '' ? 0 : Number(currentRangeTo);
    const currentRangeFrom = watch(
      `${field.name}.${index}.unitRange.min` as Path<TFieldValues>,
    );

    if (currentRangeToSet <= currentRangeFrom) {
      const correctedValue = currentRangeFrom + 10;
      setValue(
        `${field.name}.${index}.unitRange.max` as Path<TFieldValues>,
        correctedValue as PathValue<TFieldValues, Path<TFieldValues>>,
      );
      updateNextRowMin(index, correctedValue); // Ensure the next row's min is updated accordingly
    } else {
      setValue(
        `${field.name}.${index}.unitRange.max` as Path<TFieldValues>,
        currentRangeToSet as PathValue<TFieldValues, Path<TFieldValues>>,
      );
      updateNextRowMin(index, currentRangeToSet); // Still check and adjust the next row as needed
    }
  };

  const addNewTier = () => {
    const lastTierIndex = fields.length - 1;

    const lastTier = fields[lastTierIndex] as TFieldValues;
    const minValue = lastTier ? Number(lastTier.unitRange?.max) + 1 : 0;
    append({
      cost: 0,
      price: 0,
      unitRange: {
        min: minValue,
        max: minValue + 10,
        overlaps: false, // Assuming this is required based on your type definitions
      },
    } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>);

    if (lastTierIndex + 1 < fields.length) {
      updateNextRowMin(lastTierIndex, minValue + 10);
    }
  };

  return (
    <>
      <span className='text-md pb-0 pl-3 font-roboto font-semibold text-primary'>
        {title}
      </span>
      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
                Range From
              </th>
              <th className='px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
                Range To
              </th>
              <th className='px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
                Cost
              </th>
              <th className='px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
                Price
              </th>
              <th className='text-center text-sm font-semibold uppercase tracking-wider'>
                <button
                  type='button'
                  onClick={addNewTier}
                  className='mx-auto py-1 text-green-700 hover:text-green-900 focus:outline-none'
                  style={{ fontSize: '1.2rem', display: 'block' }}
                >
                  <MdAdd style={{ fontSize: '1.2rem' }} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className='whitespace-nowrap px-2 py-2'>
                  <FormItem>
                    <FormControl>
                      <Controller
                        name={
                          `pricingTiers.${index}.unitRange.min` as Path<TFieldValues>
                        }
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            type='number'
                            className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center text-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
                            readOnly
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </td>

                <td className='whitespace-nowrap px-2 py-2'>
                  <FormItem>
                    <FormControl>
                      <Controller
                        name={
                          `pricingTiers.${index}.unitRange.max` as Path<TFieldValues>
                        }
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type='number'
                            className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                            onChange={(e) => field.onChange(e.target.value)} // Allow any change
                            onBlur={() => handleBlur(index)} // Apply validation on blur
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </td>

                <td className='whitespace-nowrap px-2 py-2'>
                  <FormItem>
                    <FormControl>
                      <Controller
                        control={control}
                        name={
                          `pricingTiers.${index}.cost` as Path<TFieldValues>
                        }
                        render={({
                          field: { ref, value, onChange, ...restField },
                        }) => (
                          <div className='relative'>
                            <input
                              {...restField}
                              ref={ref}
                              value={`${currencySymbol}${value}`}
                              onChange={(e) => {
                                // Allow numbers and decimal point, remove all other characters
                                const newValue = e.target.value.replace(
                                  new RegExp(`[^0-9.]|(?<=\\..*)\\.`, 'g'),
                                  '',
                                );
                                // If the newValue starts with a decimal point, prepend a zero
                                const formattedValue = newValue.startsWith('.')
                                  ? `0${newValue}`
                                  : newValue;
                                onChange(
                                  formattedValue.replace(
                                    currencySymbol ?? '',
                                    '',
                                  ),
                                );
                              }}
                              className='form-input mt-1 block w-full rounded-none border-b border-gray-300 py-1 pl-4 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                              style={{
                                paddingLeft: `${currencySymbol?.length ?? 1}ch`,
                              }}
                            />
                          </div>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                </td>

                <td className='relative whitespace-nowrap px-2 py-2'>
                  <FormItem>
                    <FormControl>
                      <>
                        {/* Absolute positioning for Margin and Profit */}
                        <div className='absolute -top-1 right-1 flex flex-col items-end'>
                          <span className='mt-1 text-xs text-blue-500'>
                            {(() => {
                              const cost = watch(
                                `pricingTiers.${index}.cost` as Path<TFieldValues>,
                              );
                              const price = watch(
                                `pricingTiers.${index}.price` as Path<TFieldValues>,
                              );
                              const profit = price - cost;
                              const profitPercentage =
                                cost > 0
                                  ? ((profit / cost) * 100).toFixed(0)
                                  : 0;
                              const margin =
                                price > 0
                                  ? ((profit / price) * 100).toFixed(0)
                                  : 0;
                              return `M: ${margin}% | P: ${profitPercentage}%`;
                            })()}
                          </span>
                        </div>

                        <Controller
                          control={control}
                          name={
                            `pricingTiers.${index}.price` as Path<TFieldValues>
                          }
                          render={({
                            field: { ref, value, onChange, ...restField },
                          }) => (
                            <div className='relative'>
                              <input
                                {...restField}
                                ref={ref}
                                value={`${currencySymbol}${value}`}
                                onChange={(e) => {
                                  // Remove everything except numbers and the decimal point, and limit to one decimal point
                                  const newValue = e.target.value.replace(
                                    new RegExp(`[^0-9.]|(?<=\\..*)\\.`, 'g'),
                                    '',
                                  );
                                  // If the newValue starts with a decimal point, prepend a zero
                                  const formattedValue = newValue.startsWith(
                                    '.',
                                  )
                                    ? `0${newValue}`
                                    : newValue;
                                  // Update the value after removing the currency symbol
                                  onChange(
                                    formattedValue.replace(
                                      currencySymbol ?? '',
                                      '',
                                    ),
                                  );
                                }}
                                type='text' // Keep as text to display the currency symbol
                                className='form-input mt-1 block w-full rounded-none border-b border-gray-300 py-1 pl-4 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                                style={{
                                  paddingLeft: `${currencySymbol?.length ?? 1}ch`,
                                }}
                              />
                            </div>
                          )}
                        />
                      </>
                    </FormControl>
                  </FormItem>
                </td>

                <td className='px-2 text-sm font-medium'>
                  {index > 0 && (
                    <button
                      onClick={() => removeAndUpdate(index)}
                      className='pt-1 text-red-600 hover:text-red-900 focus:outline-none'
                    >
                      <FaXmark />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PricingTier;