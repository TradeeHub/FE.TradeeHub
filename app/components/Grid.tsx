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
import useCustomerData from '../hooks/useCustomerData';

const gridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
  blockLoadDebounceMillis: 100,
  cacheBlockSize: 100,
  maxBlocksInCache: 100,
  infiniteInitialRowCount: 50, // Adjust as per your need
  cacheOverflowSize: 2, 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGrid = ({ columnDefs }) => {
    const { rowData, loading, error, fetchMoreData } = useCustomerData();
    console.log('INITIAL ROW DATA', rowData)
    const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
    // const [gridApi, setGridApi] = useState(null);

    const onToggleColumnVisibility = (index) => {
        setColumnDefs(currentDefs =>
            currentDefs.map((col, idx) => ({
                ...col,
                hide: idx === index ? !col.hide : col.hide,
            })),
        );
    };

const dataSource = {
  getRows: async (params) => {
    try {
      const { startRow, endRow } = params;
      const fetchedData = await fetchMoreData();
      console.log('Fetched Result:', fetchedData);
      params.successCallback(fetchedData.rows, fetchedData.lastRow);
    } catch (error) {
      console.error('Error fetching data:', error);
      params.failCallback();
    }
  }
};

    const onGridReady = (params) => {
        // setGridApi(params.api);
        params.api.setGridOption('datasource',dataSource); // Ensure this is correctly spelled and set
    };

    return (
    <>
        <div className='flex flex-col md:flex-row gap-4 md:gap-4 md:mr-12'>
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
                columnDefs={gridColumnDef}
                gridOptions={gridOptions}
                pagination={true}
                rowModelType='infinite'
                onGridReady={onGridReady}
                // domLayout='autoHeight'
                // className='h-full'
            />
            </div>
        </div>
        </div>
    </>
    );


};

export default CustomGrid;
