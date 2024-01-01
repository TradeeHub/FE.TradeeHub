'use client';
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

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

  const dataSource = () => ({
    getRows: async (params) => {
      try {
        if (isFirstLoad.current === true) {
          params.successCallback(initialData, endCursor ? -1 : null);
          isFirstLoad.current = false;
        } else {
          const { rows, pageInfo } = await fetchMoreData(
            currentEndCursor.current,
          );
          currentEndCursor.current = pageInfo?.endCursor;
          params.successCallback(rows, pageInfo?.hasNextPage ? -1 : null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        params.failCallback();
      }
    },
  });

  const onGridReady = (params) => {
    params.api.setGridOption('datasource', dataSource()); // Ensure this is correctly spelled and set
  };

  const onToggleColumnVisibility = (index) => {
    setColumnDefs((currentDefs) =>
      currentDefs.map((col, idx) => ({
        ...col,
        hide: idx === index ? !col.hide : col.hide,
      })),
    );
  };

  return (
    <>
      <div className='flex flex-col gap-4 md:mr-12 md:flex-row md:gap-4'>
        <div className='xs:flex-row flex flex-row items-center gap-5 p-2 sm:items-start sm:p-0 md:mr-1 md:flex-col'>
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
          <div
            className='ag-theme-material w-full'
            style={{ height: 'calc(100vh - 9rem)' }}
          >
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
