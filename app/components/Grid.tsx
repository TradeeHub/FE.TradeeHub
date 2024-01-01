'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

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
    // rowModelType: 'infinite', // Necessary for infinite scrolling
    cacheBlockSize: 30, // Number of rows per block
    cacheOverflowSize: 1, // Number of extra rows to request outside current view
    maxConcurrentDatasourceRequests: -1, // Number of concurrent data requests
    infiniteInitialRowCount: 1, // Initial placeholder count
    // maxBlocksInCache: undefined, // No limit to the number of blocks in cache
    // Additional properties can be set as needed
};




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGrid = ({ columnDefs, fetchMoreData, initialData, endCursor }) => {
    const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
    const currentEndCursor = useRef(endCursor); // Using useRef for cursor
    const isFirstLoad = useRef(true);
    console.log('IS FIRST LOAD ', isFirstLoad)
    const dataSource  = () => ({
        getRows: async (params) => {
            try {
                if (isFirstLoad.current)
                {
                    params.successCallback(initialData, pageInfo?.hasNextPage ? -1 : null);
                }
                else{
                    const { rows, pageInfo} = await fetchMoreData(currentEndCursor.current);
                    console.log('Fetched Result GRID:', rows, pageInfo);
                    currentEndCursor.current = pageInfo?.endCursor;
                    params.successCallback(rows, pageInfo?.hasNextPage ? -1 : null);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                params.failCallback();
            }
        }
    });

    const onGridReady = (params) => {
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

    isFirstLoad.current = false;
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
            <AgGridReact
                columnDefs={gridColumnDef}
                gridOptions={gridOptions}
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
