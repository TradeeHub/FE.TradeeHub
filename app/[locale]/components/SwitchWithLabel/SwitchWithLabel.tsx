'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const SwitchWithLabel = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    checked: boolean;
    onLabel?: string;
    offLabel?: string;
    label?: string;
  }
>(
  (
    { className, checked, onCheckedChange, onLabel, offLabel, label, ...props },
    ref,
  ) => (
    <div className='no-block relative font-roboto'>
      <label
        className={
          'absolute -top-2 left-0 -ml-1 text-xs font-semibold text-primary'
        }
      >
        {label}
      </label>
      <SwitchPrimitives.Root
        {...props}
        ref={ref}
        checked={checked} // Controlled state
        onCheckedChange={onCheckedChange} // Handle change
        className={cn(
          'focus-visible:ring-primary-500 mt-2 inline-flex h-6 w-14 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75',
          checked ? 'bg-primary' : 'bg-input',
          className,
        )}
      >
        <span
          className={cn(
            'absolute',
            'left-7',
            'text-accent-playground top-3 text-xs font-bold',
          )}
        >
          {offLabel}
        </span>

        <SwitchPrimitives.Thumb
          className={cn(
            'block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out',
            checked ? 'translate-x-8' : 'translate-x-[0]',
          )}
        />

        <span
          className={cn('absolute', 'left-2', 'top-1 top-3 text-xs text-white')}
        >
          {onLabel}
        </span>
      </SwitchPrimitives.Root>
    </div>
  ),
);

SwitchWithLabel.displayName = 'SwitchWithLabel';

export { SwitchWithLabel };
