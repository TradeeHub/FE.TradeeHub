const CustomSidebar = ({
  columnDefs,
  onToggle,
  isOpen,
  buttonRef,
}: {
  columnDefs: Array<{ field: string; headerName: string; hide: boolean }>;
  onToggle: (field: string) => void;
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => {
  if (!isOpen || !buttonRef.current) return null;

  const buttonRect = buttonRef.current.getBoundingClientRect();

  return (
    <div
      className="w-screen max-w-sm flex-auto rounded-3xl bg-white p-2 text-sm leading-6 shadow-lg ring-1 ring-gray-900/50"
      style={{
        position: "absolute",
        top: `${buttonRect.bottom + 5}px`, // Position below the button
        left: `${buttonRect.left - 5}px`, // Align with the left side of the button
        width: "200px",
        background: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        padding: "10px",
        zIndex: 20,
      }}
    >
      <h4 className="text-center text-md font-bold">Columns</h4>
      {columnDefs.map((col, index) => (
        <div key={index} className="relative rounded-lg p-2 hover:bg-gray-50">
          <label>
            <input
              id={col.headerName}
              aria-describedby={col.headerName}
              type="checkbox"
              checked={!col.hide}
              onChange={() => onToggle(col.field)}
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
