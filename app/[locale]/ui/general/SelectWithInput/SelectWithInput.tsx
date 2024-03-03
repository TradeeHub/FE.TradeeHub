import { useEffect, useState } from 'react';
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { SimpleInput } from '../SimpleInput/SimpleInput';
import {
  SimpleSelect,
  SimpleSelectContent,
  SimpleSelectItem,
  SimpleSelectTrigger,
  SimpleSelectValue,
} from '../SimpleSelect/SimpleSelect';

type Option = {
  label: string;
  value: string;
};

type SelectWithInputFormProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues>;
  field: ControllerRenderProps<TFieldValues, TFieldName>;
  title: string;
  options: Option[];
  defaultValue: string;
  inputPlaceHolder: string;
};

const SelectWithInput = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  form,
  field,
  title,
  options,
  defaultValue,
  inputPlaceHolder,
}: SelectWithInputFormProps<TFieldValues, TFieldName>) => {
  // Determine if the current value is a custom value not found in the options
  const initialValue = form.getValues(field.name);
  const isInitialValueCustom =
    initialValue && !options.some((option) => option.value === initialValue);
  const [isEditable, setIsEditable] = useState(isInitialValueCustom);

  useEffect(() => {
    // This effect now also updates `isEditable` based on the current value
    const currentValue = form.getValues(field.name);
    const isCustomValue =
      currentValue && !options.some((option) => option.value === currentValue);
    setIsEditable(isCustomValue);

    const effectiveValue = defaultValue === 'Empty' ? '' : defaultValue;
    if (currentValue === undefined || currentValue === '') {
      form.setValue(
        field.name,
        effectiveValue as PathValue<TFieldValues, TFieldName>,
        { shouldValidate: true },
      );
    }
  }, [form, field.name, defaultValue, options]);

  const handleSelectChange = (value: string) => {
    if (value.toLowerCase() === 'other') {
      setIsEditable(true);
      form.setValue(field.name, '' as PathValue<TFieldValues, TFieldName>, {
        shouldDirty: true,
      });
    } else {
      setIsEditable(false);
      form.setValue(field.name, value as PathValue<TFieldValues, TFieldName>, {
        shouldDirty: true,
      });
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    form.setValue(
      field.name,
      defaultValue as PathValue<TFieldValues, TFieldName>,
      { shouldDirty: true },
    );
  };

  return (
    <div className='relative border-gray-300 focus-within:border-primary'>
      {isEditable ? (
        <SimpleInput
          field={field}
          title={title}
          autoFocus={true}
          placeholder={'Input ' + title}
        />
      ) : (
        <SimpleSelect
          onValueChange={handleSelectChange}
          defaultValue={form.getValues(field.name) || defaultValue}
        >
          <SimpleSelectTrigger label={title}>
            <SimpleSelectValue placeholder={inputPlaceHolder} />
          </SimpleSelectTrigger>
          <SimpleSelectContent>
            {options.map((option, index) => (
              <SimpleSelectItem key={index} value={option.value}>
                {option.label}
              </SimpleSelectItem>
            ))}
          </SimpleSelectContent>
        </SimpleSelect>
      )}
      {isEditable && (
        <span
          className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-xs font-bold text-gray-500 text-secondary'
          onClick={handleCancel}
        >
          <RxCross2 /> {/* Assuming this is the red 'x' cross icon */}
        </span>
      )}
    </div>
  );
};

export default SelectWithInput;
