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
  options: Option[]; // Replace 'const' with the correct type
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
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const currentValue = form.getValues(field.name);
    // Set form value to an empty string if defaultValue is 'Empty'
    const effectiveValue = defaultValue === 'Empty' ? '' : defaultValue;
    if (currentValue === undefined || currentValue === '') {
      form.setValue(
        field.name,
        effectiveValue as PathValue<TFieldValues, TFieldName>,
        { shouldValidate: true },
      );
    }
  }, [form, field.name, defaultValue]);

  const handleSelectChange = (value: string) => {
    if (value.toLowerCase() === 'other') {
      setIsEditable(true);
      form.setValue(field.name, '' as PathValue<TFieldValues, TFieldName>);
    } else if (value.toLowerCase() === 'empty') {
      setIsEditable(false);
      form.setValue(field.name, '' as PathValue<TFieldValues, TFieldName>, {
        shouldDirty: true,
      });
    } else {
      setIsEditable(false);
      form.setValue(field.name, value as PathValue<TFieldValues, TFieldName>);
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    form.setValue(
      field.name,
      defaultValue as PathValue<TFieldValues, TFieldName>,
    );
  };

  return (
    <div className='relative border-gray-300 focus-within:border-primary'>
      {isEditable ? (
        <AuthInputWithIcon
          field={field}
          autoFocus={true}
          placeholder={inputPlaceHolder}
        />
      ) : (
        <Select
          onValueChange={handleSelectChange}
          defaultValue={field.value || defaultValue}
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
