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
            <div className='flex'>
                <div className='mr-1 flex-col gap-10' style={{ width: '3%' }}>
                    <div>
                        <CustomSidebar
                            columnDefs={gridColumnDef}
                            onToggleColumnVisibility={onToggleColumnVisibility}
                        />
                    </div>
                    <div>
                        <RoundButton
                            icon={<PlusIcon className='h-7 w-7' aria-hidden='true' />}
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <div className='flex-grow' style={{ width: '97%' }}>
                    <div className='ag-theme-material' style={{ height: 'calc(100vh - 9rem)', width: '100%' }}>
                        {<AgGridReact<CustomersPagedQuery>
                            rowData={gridData}
                            columnDefs={gridColumnDef}
                            gridOptions={gridOptions}
                            className='h-full'
                        />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomGrid;
