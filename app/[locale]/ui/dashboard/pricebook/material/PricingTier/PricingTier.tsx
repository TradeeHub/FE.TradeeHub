import React, { useEffect } from 'react';
import { ArrayPath, Controller, ControllerRenderProps, FieldPath, FieldValues, Path, PathValue, UseFormReturn, useFieldArray } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { PricingTierEntity } from '@/generatedGraphql';

export type PricingTierEntityWithId = PricingTierEntity & {
  id: string;
};

type SelectWithInputFormProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues>;
  field: ControllerRenderProps<TFieldValues, TFieldName>;
  title?: string;
};

const PricingTier = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  form,
  field,
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
          setValue(`pricingTiers.${index + 1}.unitRange.min` as Path<TFieldValues>, nextMinValue as PathValue<TFieldValues, Path<TFieldValues>>);
        }
      }
    });
  }, [pricingTiers, setValue]);

  const addNewTier = () => {
    console.log('addNewTier', form.getValues());
    const lastTier = fields[fields.length - 1];
    append({
      cost: 0,
      price: 0,
      unitRange: {
        min: lastTier ? Number(lastTier.unitRange?.max as Path<TFieldValues>) + 1 : 0,
        max: 0,
      },
    });
  };

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
              Range From
            </th>
            <th className='px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
              Range To
            </th>
            <th className='px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
              Cost
            </th>
            <th className='px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
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
                      name={`pricingTiers.${index}.unitRange.min` as Path<TFieldValues>}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                      name={`pricingTiers.${index}.unitRange.max` as Path<TFieldValues>}
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
                <FormField
                  control={form.control}
                  name={`pricingTiers.${index}.cost`as Path<TFieldValues>}
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-2 space-y-0'>
                      <FormControl>
                        <input
                          {...field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          type='number'
                          className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </td>
              <td className='whitespace-nowrap px-2 py-2'>
                <FormItem>
                  <FormControl>
                    <Controller
                      control={control}
                      name={`pricingTiers.${index}.price` as Path<TFieldValues>}
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
