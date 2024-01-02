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
    event.stopPropagation();
    event.preventDefault();
    if (items.length > 1) {
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
      className='absolute z-10 mt-1 rounded-2xl bg-white p-3 text-sm shadow-lg ring-1 ring-black ring-opacity-5'
      style={{ minWidth: '200px' }}
    >
      {items.map((item, index) => (
        <div key={index} className='p-1 hover:bg-gray-100'>
          {item || ''}
        </div>
      ))}
    </div>
  );

  return (
    <div className='relative inline-block text-sm'>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className='focus:outline-none'
      >
        <div className='flex items-center'>
          {items.length > 1 && (
            <span className='mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold'>
              {items.length}
            </span>
          )}
          <span>{firstItem}</span>
        </div>
      </button>
      {showPopover && ReactDOM.createPortal(popoverContent, document.body)}
    </div>
  );
};

export default ArrayDataPopover;
