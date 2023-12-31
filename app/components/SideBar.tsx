import React, { useState } from "react";
import { PiGridFour } from "react-icons/pi";

const CustomSidebar = ({ columnDefs, onToggleColumnVisibility}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-brand-blue p-1 text-white shadow-lg hover:bg-brand-accent1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
      <PiGridFour className="h-7 w-7" aria-hidden="true" />
      </button>

      {isOpen && <SidebarContent columnDefs={columnDefs} onToggleColumnVisibility={onToggleColumnVisibility} />}
    </>
  );
};

// SidebarContent Component
const SidebarContent = ({ columnDefs, onToggleColumnVisibility }) => {
  return (
    <div
      className="absolute z-10 -mr-1 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" // Applied border utilities
    >
      <h4 className="text-md text-center font-bold">Columns</h4>
      {columnDefs.map((col, index) => (
        <div key={index} className="relative rounded-lg p-2 hover:bg-gray-50">
          <label>
            <input
              id={col.headerName}
              aria-describedby={col.headerName}
              type="checkbox"
              checked={!col.hide}
              onChange={() => onToggleColumnVisibility(index)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span className="ml-3 text-sm leading-6">{col.headerName}</span>
          </label>
        </div>
      ))}
    </div>
  );
};


export default CustomSidebar;
