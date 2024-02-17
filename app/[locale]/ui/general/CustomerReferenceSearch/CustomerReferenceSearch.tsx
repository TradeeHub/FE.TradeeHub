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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverContentRef = useRef<HTMLInputElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const { searchCustomerReferences } = useSearchCustomerReferences();

  // Effect to sync input value with the form field value
  useEffect(() => {
    if (field.value && field.value.displayName) {
      setInputValue(field.value.displayName);
    } else {
      setInputValue('');
    }
  }, [field.value]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setInputValue(term);
    setIsPopoverOpen(true);

    if (term.trim() !== '') {
      const request: SearchReferenceRequestInput = {
        searchTerm: term.trim(),
        pageSize: 10,
      };
      const customerReferences = await searchCustomerReferences(request);
      setReferences(customerReferences.references);
    } else {
      setReferences([]);
    }
  };

  const handlerReferenceSelected = (reference: ReferenceResponse) => {
    setInputValue(reference.displayName);
    const referenceObject = {
      id: reference.id.toString(),
      displayName: reference.displayName, // Ensure displayName is stored
      referenceType: reference.referenceType,
    };
    field.onChange(referenceObject);
    setReferences([]);
    setIsPopoverOpen(false);
  };

  const handleInputFocus = () => {
    if (references.length > 0) {
      setIsPopoverOpen(true);
    }
    setLabelFloat(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!popoverContentRef.current?.contains(e.relatedTarget)) {
      setIsPopoverOpen(false);
      setLabelFloat(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, references.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handlerReferenceSelected(references[highlightedIndex]);
    }
  };

  const inputId = `input-${field.name}`;

  return (
    <div className='relative border-b-2 border-gray-300 font-roboto focus-within:border-primary'>
      <Popover open={isPopoverOpen && references.length > 0} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger onClick={(e) => e.preventDefault()} asChild className='rounded-none'>
          <Command>
            <input
              {...field}
              id={inputId}
              ref={popoverContentRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className='text-md w-full bg-transparent px-3 py-1 focus:outline-none'
              value={inputValue}
              onChange={handleInput}
              autoComplete='off'
            />
          </Command>
        </PopoverTrigger>
        <label htmlFor={inputId} className={`absolute transition-all duration-200 ease-in-out ${
            labelFloat || inputValue
              ? 'left-3 top-[-0.7rem] text-xs font-semibold text-primary'
              : 'left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'
          }`}>
          {placeholder}
        </label>
        <PopoverContent ref={popoverContentRef} className='z-50 mt-1 flex w-screen max-w-md flex-col rounded-md bg-white shadow-md' side='bottom' align='start' onOpenAutoFocus={(e) => e.preventDefault()}>
          <Command>
            <CommandList>
              <CommandGroup>
                {references.map((reference, index) => (
                  <CommandItem key={reference.id} highlighted={highlightedIndex === index} onMouseEnter={() => setHighlightedIndex(index)} onSelect={() => handlerReferenceSelected(reference)}>
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
