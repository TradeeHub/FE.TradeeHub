import React, { useState } from 'react';
import { PiGridFour } from 'react-icons/pi';
import RoundButton from './RoundButton';
import { ColDef } from 'ag-grid-community';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const GridSettingManager = ({
  columnDefs,
  onToggleColumnVisibility,
}: {
  columnDefs: ColDef[];
  onToggleColumnVisibility: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Add a container div with relative positioning
  return (
    <div className='relative'>
      <RoundButton
        icon={<PiGridFour className='h-7 w-7' aria-hidden='true' />}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <SidebarContent
          columnDefs={columnDefs}
          onToggleColumnVisibility={onToggleColumnVisibility}
        />
      )}
    </div>
  );
};

// SidebarContent Component
const SidebarContent = ({
  columnDefs,
  onToggleColumnVisibility,
}: {
  columnDefs: ColDef[];
  onToggleColumnVisibility: (index: number) => void;
}) => {
  return (
    <>
      <div
        className='absolute left-0 z-10 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        style={{ top: '100%' }} // Ensures that the sidebar opens right below the button
      >
        <Card className='bg-background'>
          <CardHeader className='flex'>
            <CardTitle className='text-center text-lg font-bold'>
              Columns
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col'>
            {columnDefs.map((col: ColDef, index: number) => (
              <div
                key={index}
                className='flex items-center space-x-2 rounded-xl p-2 hover:bg-border'
              >
                <Checkbox
                  id={col.headerName}
                  checked={!col.hide}
                  onClick={() => onToggleColumnVisibility(index)}
                  aria-describedby={col.headerName}
                  className={col.hide ? 'dark:bg-background' : 'dark:bg-accent'}
                />
                <Label htmlFor={col.headerName} className='text-sm'>
                  {col.headerName}
                </Label>
              </div>
            ))}{' '}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default GridSettingManager;
