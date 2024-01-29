import { useEffect, useState } from 'react';
import { AuthInputWithIcon } from '../../ui/auth/AuthInputWithIcon/AuthInputWithIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type CustomSelectInputProps = {
  form: UseFormReturn; // This should be more specific to your form's shape
  field: any; // This should be the type returned by `useController` or `useFormContext`
  options: Option[];
  defaultValue: string;
  inputPlaceHolder: string; // Assuming this is the placeholder for the editable input
};

const SelectWithInputForm: React.FC<CustomSelectInputProps> = ({
  form,
  field,
  options,
  defaultValue,
  inputPlaceHolder,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (field.value === '') {
      form.setValue(field.name, '');
    }
  }, [form, field.name, defaultValue, field.value]);

  const handleSelectChange = (value: string) => {
    if (value === 'Other') {
      setIsEditable(true);
      form.setValue(field.name, '');
    } else {
      setIsEditable(false);
      form.setValue(field.name, value);
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    form.setValue(field.name, defaultValue);
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
