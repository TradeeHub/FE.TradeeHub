import React, { useState, KeyboardEvent, FocusEvent } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type TagsInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
};

const TagsInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  placeholder = 'Add tags'
}: TagsInputProps<TFieldValues, TName>) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState('');

  const hasValue = field.value.length > 0;
  const labelClass = `absolute left-3 top-0 transition-all duration-200 ease-in-out transform ${
    hasValue || isFocused
      ? '-translate-y-4 text-xs text-primary font-semibold'
      : 'translate-y-1 text-sm text-gray-500'
  }`;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && lastKeyPressed === ' ') {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        field.onChange([...field.value, newTag]);
        setInputValue('');
      }
    }
    setLastKeyPressed(event.key);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newTag = event.target.value.trim();
    if (newTag) {
      field.onChange([...field.value, newTag]);
      setInputValue('');
    }
    setIsFocused(false);
  };

  const removeTag = (index: number) => {
    const newTags = [...field.value];
    newTags.splice(index, 1);
    field.onChange(newTags);
  };

  const inputId = `input-${field.name}`; // Unique ID for the input based on the field name

  return (
    <div className='relative border-b-2 border-gray-300 focus-within:border-primary'>
      <label htmlFor={inputId} className={labelClass}>
        {placeholder}
      </label>
      <div
        className='flex flex-wrap items-center gap-2 py-1 pl-3'
        onClick={() => setIsFocused(true)}
        role='button' // Add role attribute
        tabIndex={0} // Add tabIndex attribute
        onKeyDown={handleKeyDown} // Add onKeyDown event listener
      >
        {field.value.map((tag: string, index: number) => (
          <div key={index} className='flex items-center rounded bg-border px-2'>
            <span className='text-sm'>{tag}</span>
            <button
              type='button'
              onClick={() => removeTag(index)}
              className='ml-2 text-gray-500'
            >
              <span className='font-bold text-primary'>×</span>
            </button>
          </div>
        ))}
        <input
          {...field}
          id={inputId}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className='w-full flex-1 bg-transparent text-sm focus:outline-none'
        />
      </div>
    </div>
  );
};

export default TagsInput;
