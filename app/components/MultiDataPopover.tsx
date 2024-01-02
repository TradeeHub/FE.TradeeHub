import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ArrayDataPopover = ({ items }) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (items?.length > 1) {
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
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    const handleScroll = () => {
      setShowPopover(false);
    };

    positionPopover();
    window.addEventListener('resize', positionPopover);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true); // Use capture phase to handle scroll events early

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', positionPopover);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showPopover]);

  if (!items || items.length === 0) {
    return null;
  }

  const firstItem = items[0] || 'Unavailable';

  const popoverContent = (
    <div
      ref={popoverRef}
      className='absolute z-10 mt-1 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5'
      style={{ minWidth: '200px' }}
    >
      <div className='flex flex-col text-sm'>
        {items.map((item, index) => (
          <div key={index} className='p-1 hover:bg-gray-100'>
            {item || 'Unavailable'}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className='relative inline-block text-sm'>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className='focus:outline-none'
      >
        {items.length > 1 ? (
          <div className='flex items-center'>
            <span className='mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold'>
              {items.length}
            </span>
            <span>{firstItem}</span>
          </div>
        ) : (
          <div className='flex items-center'>
            <span>{firstItem}</span>
          </div>
        )}
      </button>
      {showPopover && ReactDOM.createPortal(popoverContent, document.body)}
    </div>
  );
};

export default ArrayDataPopover;
