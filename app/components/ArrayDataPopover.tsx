import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  FunctionComponent,
} from 'react';
import ReactDOM from 'react-dom';

interface ArrayDataPopoverProps {
  items: string[];
}

const ArrayDataPopover: FunctionComponent<ArrayDataPopoverProps> = ({
  items,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (items.length > 1) {
      event.stopPropagation();
      event.preventDefault();
      setShowPopover(!showPopover);
    }
  };

  const positionPopover = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    if (popoverRef.current) {
      popoverRef.current.style.top = `${rect.bottom + window.scrollY}px`;
      popoverRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  };

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    positionPopover();
    window.addEventListener('resize', positionPopover);
    document.addEventListener('mousedown', handleClickOutside as EventListener);
    window.addEventListener('scroll', () => setShowPopover(false), true);

    return () => {
      window.removeEventListener('resize', positionPopover);
      document.addEventListener(
        'mousedown',
        handleClickOutside as EventListener,
      );
      window.removeEventListener('scroll', () => setShowPopover(false), true);
    };
  }, [showPopover]);

  if (!items || items.length === 0) {
    return null;
  }

  const firstItem = items[0] || 'Unavailable';

  const popoverContent = (
    <div
      ref={popoverRef}
      className='absolute z-10 mt-1 rounded-xl border bg-card p-3 text-sm text-primary shadow-lg ring-1 ring-black ring-opacity-5'
      style={{ minWidth: '200px' }}
    >
      {items.map((item, index) => (
        <div key={index} className='rounded-xl p-1 hover:bg-border'>
          {item || ''}
        </div>
      ))}
    </div>
  );

  return (
    <div className='relative inline-block text-sm'>
      <span
        ref={buttonRef}
        onClick={handleButtonClick}
        className='popover-trigger focus:outline-none'
      >
        <div className='flex items-center gap-2'>
          {' '}
          {/* Add gap for space */}
          {items.length > 1 && (
            <Button
              variant='outline'
              className='flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs font-semibold dark:bg-card-foreground dark:text-card'
            >
              {items.length}
            </Button>
          )}
          <span>{firstItem}</span>
        </div>
      </span>

      {showPopover && ReactDOM.createPortal(popoverContent, document.body)}
    </div>
  );
};

export default ArrayDataPopover;
