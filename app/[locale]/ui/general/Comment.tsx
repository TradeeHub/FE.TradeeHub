import React, { useState, useEffect } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons';

type CommentInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  icon?: IconType;
  title?: string;
  placeholder?: string;
};

const CommentInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  icon: Icon,
  title = 'Internal Comment',
  placeholder = 'Add an internal comment...',
}: CommentInputProps<TFieldValues, TName>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputId = `input-${field.name}`;

  useEffect(() => {
    // Check if the textarea has a value on component mount
    setIsFilled(!!field.value);
  }, [field.value]); // Dependency array ensures this runs only when field.value changes

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(!!field.value);
  };

  return (
    <div className='relative rounded-md border border-gray-300 font-roboto shadow-sm focus-within:border-primary'>
      {Icon && (
        <Icon className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
      )}
      <textarea
        {...field}
        id={inputId}
        rows={3}
        className={`form-textarea w-full px-3 py-2 ${Icon ? 'pl-10' : ''} bg-transparent focus:outline-none`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={inputId}
        className={`text-md absolute left-3 top-4 transform text-gray-500 transition-all duration-200 ease-in-out ${
          isFocused || isFilled
            ? '-translate-y-8 text-xs font-semibold text-primary text-primary'
            : 'top-1/2 mt-1 -translate-y-1/2 transform text-sm text-gray-500'
        }`}
      >
        {isFocused || isFilled ? title : placeholder}
      </label>
    </div>
  );
};

export default CommentInput;
