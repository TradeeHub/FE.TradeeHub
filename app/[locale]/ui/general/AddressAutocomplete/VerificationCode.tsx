import React, { useState, createRef, RefObject } from 'react';
import { Input } from '@/components/ui/input';

export function VerificationCodeInput({
  length,
  onComplete
}: {
  length: number;
  onComplete: (code: string) => void;
}) {
  const [inputs, setInputs] = useState(Array(length).fill(''));
  const inputRefs: RefObject<HTMLInputElement>[] = Array(length)
    .fill(null)
    .map(() => createRef());

  const handleChange = (value: string, index: number) => {
    // Check if value is a digit or empty (for deletion)
    if (value !== '' && !/^\d$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Move to the next input if the entered value is a digit
    if (value && index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    // Call onComplete when all inputs are filled with digits
    if (newInputs.every((input) => input.length === 1)) {
      onComplete(newInputs.join(''));
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace') {
      if (inputs[index] === '' && index > 0) {
        // Prevent default action to avoid deleting the digit twice
        event.preventDefault();
        // Move focus to the previous input and clear its value
        inputRefs[index - 1].current?.focus();
        handleChange('', index - 1);
      }
    }
  };

  return (
    <div className='flex w-full justify-center'>
      {inputs.map((input, index) => (
        <Input
          key={index}
          type='text'
          value={input}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={inputRefs[index]}
          className='mx-1 h-10 flex-grow rounded-md border border-input bg-transparent text-center text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring'
          inputMode='numeric'
          pattern='[0-9]*'
        />
      ))}
    </div>
  );
}

export default VerificationCodeInput;
