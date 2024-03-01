import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';

const PricingTier = () => {
  const { control, register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pricingTiers',
  });

  const addNewTier = () => {
    const lastTierMaxValue = Number(fields[fields.length - 1]?.range?.max) || 0; // Corrected to ensure numeric addition
    append({
      range: { min: lastTierMaxValue + 1, max: lastTierMaxValue + 1 },
      cost: 0,
      price: 0,
    });
  };

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-2 py-3 text-left text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
              Range From
            </th>
            <th className='px-2 py-3 text-left text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
              Range To
            </th>
            <th className='px-2 py-3 text-left text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
              Cost
            </th>
            <th className='px-2 py-3 text-left text-center text-xs font-medium uppercase tracking-wider text-gray-500'>
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
                <input
                  {...register(`pricingTiers.${index}.range.min`)}
                  type='number'
                  className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                  readOnly
                />
              </td>
              <td className='whitespace-nowrap px-2 py-2'>
                <input
                  {...register(`pricingTiers.${index}.range.max`)}
                  type='number'
                  className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                />
              </td>
              <td className='whitespace-nowrap px-2 py-2'>
                <input
                  {...register(`pricingTiers.${index}.price`)}
                  type='number'
                  className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                />
              </td>
              <td className='whitespace-nowrap px-2 py-2'>
                <input
                  {...register(`pricingTiers.${index}.cost`)}
                  type='number'
                  className='form-input mx-auto mt-1 block w-20 rounded-none border-b border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-0 sm:text-sm'
                />
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
