import React, { useState, useRef, useEffect } from 'react';
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { useSearchCustomerReferences } from '@/app/[locale]/hooks/customer/useCustomers';
import {
  ReferenceResponse,
  SearchReferenceRequestInput,
} from '@/generatedGraphql';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type ReferenceProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
};

const CustomerReferenceSearch = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  placeholder,
}: ReferenceProps<TFieldValues, TName>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [references, setReferences] = useState<ReferenceResponse[]>([]);
  const [labelFloat, setLabelFloat] = useState(false);
  const popoverContentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabelFloat(!!field.value?.Address);
  }, [field.value]);

  const {
    searchCustomerReferences, // Function from the custom hook to execute the search
  } = useSearchCustomerReferences();

  // Handle input change
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setInputValue(term);
    if (term !== '') {
      const request: SearchReferenceRequestInput = {
        searchTerm: term,
        pageSize: 10, // Example pageSize, adjust as needed
        // Omitting the cursor and hasNextPage fields means they'll be undefined, which is fine if they're optional
      };
      const customerReferences = await searchCustomerReferences(request); // Call the search function with the term
      console.log('customerReferences', customerReferences);
      setReferences(customerReferences.references);
      console.log('ttttttttttt', customerReferences, popoverContentRef.current);
    } else {
      setReferences([]);
    }
  };

  const handlerReferenceSelected = (reference: ReferenceResponse) => {
    setInputValue(reference.displayName);
    setReferences([]);
    const referenceObject = {
      id: reference.id.toString(),
      referenceType: reference.referenceType,
    };

    field.onChange(referenceObject);

    console.log('reference', referenceObject, field.value);
  };

  const handleInputFocus = () => {
    setLabelFloat(true);
  };

  const handleInputBlur = () => {
    setLabelFloat(!!inputValue);
  };

  const inputId = `input-${field.name}`;

  return (
    <div className='relative border-b-2 border-gray-300 font-roboto focus-within:border-primary'>
      <Popover>
        <PopoverTrigger
          onClick={(e) => e.preventDefault()}
          asChild
          className='rounded-none'
        >
          <Command>
            <input
              {...field}
              id={inputId}
              ref={popoverContentRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='text-md w-full bg-transparent px-3 py-1 focus:outline-none'
              value={inputValue}
              onChange={handleInput}
              autoComplete='off'
            />
          </Command>
        </PopoverTrigger>
        <label
          htmlFor={inputId} // Set the htmlFor attribute to match the input's ID
          className={`absolute transition-all duration-200 ease-in-out ${
            labelFloat || inputValue
              ? 'left-3 top-[-0.7rem] text-xs font-semibold text-primary'
              : 'left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'
          }`}
        >
          {labelFloat || inputValue ? placeholder : 'Search for ' + placeholder}
        </label>
        <PopoverContent
          ref={popoverContentRef}
          className='z-50 mt-1 flex w-screen max-w-md flex-col overflow-auto rounded-md bg-white shadow-md'
          side='bottom'
          align='start'
          onOpenAutoFocus={(e) => e.preventDefault()}
          forceMount={references.length > 0 ? true : undefined}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {references.map((reference) => (
                  <CommandItem
                    key={reference.id}
                    onSelect={() => {
                      handlerReferenceSelected(reference);
                    }}
                  >
                    {reference.displayName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerReferenceSearch;
