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
      className='absolute z-10 mt-1 rounded-xl bg-card p-3 text-sm text-primary shadow-lg ring-1 ring-black ring-opacity-5 border'
      style={{ minWidth: '200px' }}
    >
      {items.map((item, index) => (
        <div key={index} className='p-1 hover:bg-border rounded-xl'>
          {item || ''}
        </div>
      ))}
    </div>
  );

  return (
<div className='relative inline-block text-sm'>
  <span ref={buttonRef} onClick={handleButtonClick} className='popover-trigger focus:outline-none'>
    <div className='flex items-center gap-2'> {/* Add gap for space */}
      {items.length > 1 && (
      <Button variant='outline' className='rounded-full p-1 w-6 h-6 text-xs font-semibold flex items-center justify-center dark:bg-card-foreground dark:text-card'>
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
