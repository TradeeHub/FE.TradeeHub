import React, { memo, useCallback, useState } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FormMessage } from '@/components/ui/form';

type InputWithIconProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  icon?: IconType;
  autoFocus?: boolean;
  title?: string;
  placeholder?: string;
  type?: string;
  onEnterPress?: () => void;
  currencySymbol?: string;
};

const SimpleInput = memo(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    field,
    icon: Icon,
    autoFocus = false,
    title = '',
    placeholder = '',
    type = 'text',
    onEnterPress = () => {},
    currencySymbol
  }: InputWithIconProps<TFieldValues, TName>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [labelFloat, setLabelFloat] = useState(field.value ? true : false);
    const [isFocused, setIsFocused] = useState(false);

    const handleToggleShowPassword = useCallback(
      () => setShowPassword((prev) => !prev),
      []
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
          event.preventDefault();
          onEnterPress();
        }
      },
      [onEnterPress]
    );

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
      setLabelFloat(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setLabelFloat(!!field.value); // Use !! to convert to boolean ensuring empty strings, null, or undefined set to false
    }, [field.value]);

    const inputId = `input-${field.name}`;
    const isPasswordType = type === 'password';

    return (
      <>
        <div className='relative rounded-md border shadow-sm focus-within:border-primary'>
          {Icon && (
            <Icon className='absolute left-3 top-3 h-5 w-5 text-gray-500' />
          )}
          {currencySymbol && (
            <div className='pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center font-semibold text-primary'>
              {currencySymbol}
            </div>
          )}
          <input
            {...field}
            id={inputId}
            step={currencySymbol ? '1.00' : undefined}
            value={field.value === null ? '' : field.value}
            type={isPasswordType && !showPassword ? 'password' : type}
            autoFocus={autoFocus}
            className={`text-md w-full rounded-md border-gray-300 bg-white py-2 focus:border-primary focus:outline-none focus:ring-0 focus:ring-primary ${
              currencySymbol ? 'pl-8 pr-4' : 'px-4'
            } ${isPasswordType ? 'pr-12' : ''}`}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onChange={(e) => {
              const value = e.target.value;
              // Check if the input is not empty and it's a numeric field
              if (type === 'number') {
                const numericValue = value === '' ? '' : Number(value);
                field.onChange(numericValue);
              } else {
                // If the input is empty or not a number, directly pass the value without converting
                field.onChange(value);
              }
            }}
            onBlur={handleInputBlur}
          />
          <label
            htmlFor={inputId}
            className={`absolute left-3 bg-white px-1 transition-all duration-200 ease-in-out ${
              labelFloat || field.value || isFocused
                ? 'top-[-0.7rem] mb-1 font-roboto text-sm font-semibold text-primary'
                : 'text-md top-1/2 -translate-y-1/2 text-gray-500'
            }`}
          >
            {labelFloat || field.value || isFocused ? title : placeholder}
          </label>
          {isPasswordType && (
            <button
              type='button'
              className='absolute right-3 top-3 cursor-pointer text-xs text-gray-500'
              onClick={handleToggleShowPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}
        </div>

        <StyledFormMessage />
      </>
    );
  }
);

const StyledFormMessage = () => {
  return (
    <FormMessage
      style={{
        marginTop: '0',
        marginLeft: '0.75rem',
        fontSize: '0.75rem',
        color: '#ef4444'
      }}
      className='text-red-500' // You can keep this if you still want to apply Tailwind's red color
    />
  );
};

export { SimpleInput, StyledFormMessage };
