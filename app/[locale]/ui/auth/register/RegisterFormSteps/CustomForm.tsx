import React from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { IconType } from 'react-icons';
import { FormMessage } from '@/components/ui/form';

type InputWithIconProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  icon?: IconType; // Make icon optional
  autoFocus?: boolean;
  placeholder?: string;
  type?: string;
};

const InputWithIcon = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  icon: Icon, // Icon can be undefined now
  autoFocus = false, // Default value for autoFocus is false
  placeholder = '',
  type = 'text',
}: InputWithIconProps<TFieldValues, TName>) => {
  return (
    <div className='relative'>
      {Icon && (
        <Icon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-secondary' />
      )}
      {/* Conditionally render Icon */}
      <Input
        type={type}
        placeholder={placeholder}
        {...field}
        autoFocus={autoFocus} // Pass autoFocus to the Input component
        className={`${Icon ? 'pl-10' : ''}`} // Adjust padding based on icon presence
      />
    </div>
  );
};

const StyledFormMessage = () => {
  return <FormMessage style={{ marginTop: '2px' }} />;
};

export { InputWithIcon, StyledFormMessage };