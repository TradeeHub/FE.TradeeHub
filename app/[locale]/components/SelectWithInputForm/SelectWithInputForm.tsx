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
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (field.value === '') {
      form.setValue(field.name, '' as PathValue<TFieldValues, TFieldName>);
    }
  }, [form, field.name, defaultValue, field.value]);

  const handleSelectChange = (value: string) => {
    if (value === 'Other') {
      setIsEditable(true);
      form.setValue(field.name, '' as PathValue<TFieldValues, TFieldName>);
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
          className='absolute right-3 top-2 cursor-pointer text-xs text-gray-500'
          onClick={handleCancel}
        >
          Cancel
        </span>
      )}
    </div>
  );
};

export default SelectWithInputForm;
