import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const MultiDataPopover = ({ properties }) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null); // Reference to the button
  const popoverRef = useRef(null); // Reference to the popover

  // Toggle popover display
  const handleButtonClick = (event) => {
    // Stop propagation and prevent default to ensure grid doesn't handle click
    event.stopPropagation();
    event.preventDefault();
    // Only toggle the popover if there's more than one property
    if (properties?.length > 1) {
      setShowPopover(!showPopover);
    }
  };

  // Position the popover relative to the button
  const positionPopover = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    if (popoverRef.current) {
      popoverRef.current.style.top = `${rect.bottom + window.scrollY}px`;
      popoverRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    // Position popover initially and on resize
    positionPopover();
    window.addEventListener('resize', positionPopover);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', positionPopover);
    };
  }, [showPopover]);

  if (!properties || properties.length === 0) {
    // Return null or a placeholder if no properties are available
    return null;
  }

  const firstPropertyAddress = properties[0]?.propertyAddress?.fullAddress || 'No address';

  const popoverContent = (
    <div
      ref={popoverRef}
      className="absolute z-10 mt-1 bg-white p-3 shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5"
      style={{
        minWidth: '200px', // You can adjust this as needed
      }}
    >
      <div className="flex flex-col text-sm"> {/* Apply smaller text size */}
        {properties.map((property, index) => (
          <div key={index} className="hover:bg-gray-100 p-1">
            {property?.propertyAddress?.fullAddress || 'Address unavailable'}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative inline-block text-sm">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="focus:outline-none"
      >
      {properties.length > 1 ? (
          <div className="flex items-center">
            <span className="text-xs font-semibold mr-2 py-1 px-2 bg-gray-200 rounded-full">
              {properties.length} 
            </span>
      <span>{firstPropertyAddress}</span>
          </div>
  ) : (
    <div className="flex items-center">
      <span>{firstPropertyAddress}</span>
    </div>
  )
}

      </button>

      {showPopover && ReactDOM.createPortal(
        popoverContent,
        document.body // Append the popover to the body of the document
      )}
    </div>
  );
};

export default MultiDataPopover;
