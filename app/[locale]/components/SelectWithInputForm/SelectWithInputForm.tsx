import { useEffect, useState } from 'react';
import { AuthInputWithIcon } from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';

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
  options: Option[];
  defaultValue: string;
  inputPlaceHolder: string;
};

const SelectWithInputForm = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  form,
  field,
  options,
  defaultValue,
  inputPlaceHolder,
}: SelectWithInputFormProps<TFieldValues, TFieldName>) => {
  // Determine if the current value is a custom value not found in the options
  const initialValue = form.getValues(field.name);
  const isInitialValueCustom = initialValue && !options.some(option => option.value === initialValue);
  const [isEditable, setIsEditable] = useState(isInitialValueCustom);

  useEffect(() => {
    // This effect now also updates `isEditable` based on the current value
    const currentValue = form.getValues(field.name);
    const isCustomValue = currentValue && !options.some(option => option.value === currentValue);
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
        <AuthInputWithIcon
          field={field}
          // Removed autoFocus to prevent automatic focusing
          placeholder={inputPlaceHolder}
          value={form.getValues(field.name) as string}
        />
      ) : (
        <Select
          onValueChange={handleSelectChange}
          defaultValue={form.getValues(field.name) || defaultValue}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {isEditable && (
        <span
          className='absolute right-0 top-2 cursor-pointer text-xs font-bold text-gray-500 text-secondary'
          onClick={handleCancel}
        >
          <RxCross2 />
        </span>
      )}
    </div>
  );
};

export default SelectWithInputForm;
