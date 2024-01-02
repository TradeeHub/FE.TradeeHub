'use client';
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/app/components/SideBar';
import { PlusIcon } from '@heroicons/react/20/solid';
import RoundButton from '@/app/components/RoundButton';
import { CustomGridProps } from '../types/sharedTypes';
import {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  RowClickedEvent,
} from 'ag-grid-community';

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
const CustomGrid = ({
  columnDefs,
  fetchMoreData,
  initialData,
  endCursor,
}: CustomGridProps) => {
  const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
  const currentEndCursor = useRef<string | null>(endCursor); // Using useRef for cursor
  const isFirstLoad = useRef<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const dataSource = (): IDatasource => ({
    getRows: async (params: IGetRowsParams) => {
      try {
        if (isFirstLoad.current === true) {
          params.successCallback(initialData as [], -1);
          isFirstLoad.current = false;
        } else {
          const { rows, pageInfo } = await fetchMoreData(
            currentEndCursor.current,
          );
          currentEndCursor.current = pageInfo?.endCursor ?? null;
          params.successCallback(
            rows as [],
            pageInfo?.hasNextPage ? -1 : undefined,
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        params.failCallback();
      }
    },
  });

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setGridOption('datasource', dataSource()); // Ensure this is correctly spelled and set
  };

  const onRowClicked = (event: RowClickedEvent) => {
    const target = event?.event?.target as Element;

    if (target && target.closest('.popover-trigger')) {
      return;
    }

    router.push(`${pathname}/${event.data.id}`);
  };

  const onToggleColumnVisibility = (index: number) => {
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
              onRowClicked={onRowClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomGrid;
