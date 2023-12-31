'use client';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import {
  CustomersPagedQuery,
} from '@/generatedGraphql';

import CustomSidebar from '@/app/components/SideBar';
import { PlusIcon } from '@heroicons/react/20/solid';
import RoundButton from '@/app/components/RoundButton';

const gridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGrid = ({ gridData, columnDefs }: { gridData: any; columnDefs: ColDef[] }) => {

    const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);

    const onToggleColumnVisibility = (index: number) => {
        setColumnDefs((currentDefs) =>
            currentDefs.map((col, idx) => {
                if (idx === index) {
                    // Toggle the hide property of the column at this index
                    return { ...col, hide: !col.hide };
                }
                return col;
            }),
        );
    };

    return (
    <>
        <div className='flex flex-col md:flex-row gap-4 md:gap-4 mr-12'>
        <div className='flex flex-row md:flex-col xs:flex-row items-center sm:items-start md:mr-1 p-2 sm:p-0 gap-5'>
            <CustomSidebar
            columnDefs={gridColumnDef}
            onToggleColumnVisibility={onToggleColumnVisibility}
            />
            <RoundButton
            icon={<PlusIcon className='h-7 w-7' />}
            onClick={() => {}}
            />
        </div>
        <div className='flex-grow'>
            <div className='ag-theme-material w-full' style={{ height: 'calc(100vh - 9rem)' }}>
            <AgGridReact<CustomersPagedQuery>
                rowData={gridData}
                columnDefs={gridColumnDef}
                gridOptions={gridOptions}
                className='h-full'
            />
            </div>
        </div>
        </div>
    </>
    );


};

export default CustomGrid;
