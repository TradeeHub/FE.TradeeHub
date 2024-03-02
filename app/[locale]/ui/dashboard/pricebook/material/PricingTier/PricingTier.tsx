import React, { useEffect } from 'react';
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
import { PricingTierEntity } from '@/generatedGraphql';

type SelectWithInputFormProps<
  PricingTierEntityWithId extends FieldValues,
  TFieldName extends FieldPath<PricingTierEntityWithId>,
> = {
  form: UseFormReturn<PricingTierEntityWithId>;
  field: ControllerRenderProps<PricingTierEntityWithId, TFieldName>;
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

  const pricingTiers = watch(field.name);

  console.log('pricingTiers', fields);

  useEffect(() => {
    pricingTiers?.forEach((tier: PricingTierEntity, index: number) => {
      console.log('tier', tier);
      if (index < pricingTiers.length - 1) {
        const nextMinValue = Number(pricingTiers[index]?.unitRange?.max) + 1;
        if (Number(pricingTiers[index + 1]?.unitRange?.min) !== nextMinValue) {
          setValue(
            `pricingTiers.${index + 1}.unitRange.min` as Path<TFieldValues>,
            nextMinValue as PathValue<TFieldValues, Path<TFieldValues>>,
          );
        }
      }
    });
  }, [pricingTiers, setValue]);

  const addNewTier = () => {
    console.log('addNewTier', form.getValues());
    const lastTier = fields[fields.length - 1] as TFieldValues;
    append({
      cost: 0,
      price: 0,
      unitRange: {
        min: lastTier ? Number(lastTier.unitRange?.max) + 1 : 0,
        max: 0,
        overlaps: false, // Assuming this is required based on your type definitions
      },
    } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>);
  };

  return (
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
                className='py-1 pr-6 text-green-700 hover:text-green-900 focus:outline-none'
                style={{ fontSize: '1.2rem' }}
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
                          className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          type='number'
                          className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
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
                      name={`pricingTiers.${index}.cost` as Path<TFieldValues>}
                      render={({
                        field: { ref, value, onChange, ...restField },
                      }) => (
                        <div className='relative'>
                          <input
                            {...restField}
                            ref={ref}
                            value={`${currencySymbol}${value}`}
                            onChange={(e) => {
                              // Ensure we strip out the currency symbol before updating the value
                              const newValue = e.target.value.replace(
                                currencySymbol ?? '',
                                '',
                              );
                              onChange(newValue);
                            }}
                            className='form-input mt-1 block w-full rounded-none border-b border-gray-300 py-1 pl-4 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                            style={{
                              paddingLeft: `${currencySymbol?.length ?? '' + 1}ch`,
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
                              cost > 0 ? ((profit / cost) * 100).toFixed(0) : 0;
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
                                // Ensure we strip out the currency symbol before updating the value
                                const newValue = e.target.value.replace(
                                  currencySymbol ?? '',
                                  '',
                                );
                                onChange(newValue);
                              }}
                              type='text' // changed to text to handle the currency symbol
                              className='form-input mt-1 block w-full rounded-none border-b border-gray-300 py-1 pl-4 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                              style={{
                                paddingLeft: `${currencySymbol?.length ?? '' + 1}ch`,
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
                    onClick={() => remove(index)}
                    className='pr-5 pt-1 text-red-600 hover:text-red-900 focus:outline-none'
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
  );
};

export default PricingTier;
