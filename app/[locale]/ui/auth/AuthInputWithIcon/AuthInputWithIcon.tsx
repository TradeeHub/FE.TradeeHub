import React, { useState, useEffect } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FormMessage } from '@/components/ui/form';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

type InputWithIconProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  icon?: IconType; // Make icon optional
  autoFocus?: boolean;
  placeholder?: string;
  type?: string;
  onEnterPress?: () => void;
};

const AuthInputWithIcon = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  icon: Icon,
  autoFocus = false,
  placeholder = '',
  type = 'text',
  onEnterPress = () => {}
}: InputWithIconProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [labelFloat, setLabelFloat] = useState(false);
  const user = useSelector((state: RootState) => state.user.data);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      event.preventDefault();
      onEnterPress();
    }
  };

  const handleInputFocus = () => {
    setLabelFloat(true);
    // If it's a telephone input and the field is empty and user has a calling code,
    // set the input value to the calling code when the user focuses on the input field.
    if (type === 'tel' && user?.place?.callingCode && !field.value) {
      field.onChange(`+${user.place.callingCode}`);
    }
  };

  //  useEffect(() => {
  //     if (user && type === 'tel' && user.place?.callingCode && !field.value) {
  //       field.onChange(`+${user.place.callingCode}`);
  //     }
  //   }, [user, field, type]);

  useEffect(() => {
    setLabelFloat(!!field.value);
  }, [field.value]);

  const isPasswordType = type === 'password';
  const inputId = `input-${field.name}`; // Create a unique ID for the input based on the field name

  return (
    <>
      <div className='relative border-b-2 border-gray-300 font-roboto focus-within:border-primary'>
        {Icon && (
          <Icon className='absolute left-3 top-3 h-5 w-5 text-gray-500' />
        )}
        <input
          {...field}
          id={inputId} // Set the ID for the input
          type={isPasswordType && !showPassword ? 'password' : 'text'}
          autoFocus={autoFocus}
          className={`text-md w-full px-3 py-1 ${Icon ? 'pl-10' : ''} ${isPasswordType ? 'pr-10' : ''} bg-transparent focus:outline-none`}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={() => setLabelFloat(!!field.value)}
        />
        <label
          htmlFor={inputId} // Set the htmlFor attribute to match the input's ID
          className={`absolute left-3 transition-all duration-200 ease-in-out ${
            labelFloat || field.value
              ? 'top-[-0.7rem] mb-1 text-xs font-semibold text-primary'
              : 'top-1/2 -translate-y-1/2 transform text-sm text-gray-500'
          }`}
        >
          {placeholder}
        </label>
        {isPasswordType && (
          <button
            type='button' // Add the type attribute to make it an interactive element
            className='absolute right-3 top-2 cursor-pointer text-xs text-gray-500'
            onClick={handleToggleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      <StyledFormMessage />
    </>
  );
};

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

export { AuthInputWithIcon, StyledFormMessage };
