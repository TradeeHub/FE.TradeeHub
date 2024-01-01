'use client';
import React, { useEffect, useRef, useState } from 'react';
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
    // rowModelType: 'infinite', // Necessary for infinite scrolling
    cacheBlockSize: 30, // Number of rows per block
    cacheOverflowSize: 1, // Number of extra rows to request outside current view
    maxConcurrentDatasourceRequests: -1, // Number of concurrent data requests
    infiniteInitialRowCount: 1, // Initial placeholder count
    // maxBlocksInCache: undefined, // No limit to the number of blocks in cache
    // Additional properties can be set as needed
};




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGrid = ({ columnDefs }) => {
   const { customerData, loading, error, fetchMoreData } = useCustomerData();
    const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
    const customerDataRef = useRef(customerData);
    const [endCursor, setEndCursor] = useState(null);

    useEffect(() => {
        customerDataRef.current = customerData; // Update the ref whenever customerData changes
    }, [customerData]);

    const dataSource  = () => ({
        getRows: async (params) => {
            params.context = null;
            console.log('MY PARAMS', params.context)
            params.context
            try {
                console.log('#########', customerDataRef.current, customerDataRef.current?.pageInfo?.endCursor); // Access the latest data via ref
                console.log('?????????', endCursor); // Access the latest data via ref
                const { rows, pageInfo} = await fetchMoreData(endCursor);
                setEndCursor(pageInfo?.endCursor ? pageInfo?.endCursor : null)
                console.log('Fetched Result GRID:', rows, pageInfo);
                params.successCallback(rows, pageInfo?.hasNextPage ? -1 : null);
            } catch (error) {
                console.error('Error fetching data:', error);
                params.failCallback();
            }
        }
    });

    const onGridReady = (params) => {
        console.log('ON GRID READY ', customerData)
        params.api.setGridOption('datasource', dataSource()); // Ensure this is correctly spelled and set
    };

    const onToggleColumnVisibility = (index) => {
        setColumnDefs(currentDefs =>
            currentDefs.map((col, idx) => ({
                ...col,
                hide: idx === index ? !col.hide : col.hide,
            })),
        );
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
            />
            </div>
        </div>
        </div>
    </>
    );


};

export default CustomGrid;
