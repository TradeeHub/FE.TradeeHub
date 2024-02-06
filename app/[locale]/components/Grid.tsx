'use client';
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/app/[locale]/components/GridSettingManager';
import RoundButton from '@/app/[locale]/components/RoundButton';
import { CustomGridProps, PageInfoSlim } from '../types/sharedTypes';
import {
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  RowClickedEvent,
} from 'ag-grid-community';
import { HiOutlineUserAdd } from 'react-icons/hi';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal';

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
  refetch,
  initialData,
  initialPageInfo,
}: CustomGridProps) => {
  const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
  const pageInfoTrack = useRef<PageInfoSlim>(initialPageInfo); // Using useRef for cursor
  const isFirstLoad = useRef<boolean>(true);
  const gridRowCount = useRef<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridApiRef = useRef<GridApi<any> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newDataRef = useRef<object[] | undefined>(undefined);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const router = useRouter();
  const pathname = usePathname();

  const dataSource = (): IDatasource => ({
    getRows: async (params: IGetRowsParams) => {
      try {
      console.log('my NEW DATA ', newDataRef.current);
        if (isFirstLoad.current === true) {
          console.log('initialData', initialData, pageInfoTrack.current);
          params.successCallback(
            initialData as [],
            pageInfoTrack.current.hasNextPage ? -1 : initialData.length,
          );
          gridRowCount.current = initialData.length;
          isFirstLoad.current = false;
        } 
        else if(newDataRef.current) {
          console.log('elseeeeeeeeeeeeeeeeeeeeeeeee')
          params.successCallback(
            newDataRef.current as [],
            pageInfoTrack.current.hasNextPage ? -1 : initialData.length,
          );
          gridRowCount.current = initialData.length;
        }
        else {
          console.log('ELSEE', gridOptions.cacheBlockSize, pageInfoTrack.current);

          const { rows, pageInfo } = await fetchMoreData(
            pageInfoTrack.current.endCursor,
            gridOptions.cacheBlockSize,
          );
          gridRowCount.current += rows.length;
          pageInfoTrack.current = pageInfo as PageInfoSlim;
          params.successCallback(
            rows as [],
            pageInfoTrack.current.hasNextPage ? -1 : gridRowCount.current,
          );
        }
      } catch (error) {
        params.failCallback();
      }
    },
  });

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setGridOption('datasource', dataSource()); // Ensure this is correctly spelled and set
    gridApiRef.current = params.api;
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

const refreshGridData = async () => {
      const {data} = await refetch(); 
      const newData = data?.customers?.edges?.map((edge) => edge.node);
      newDataRef.current = newData; // Update the ref instead of state
      if (gridApiRef.current) {
    gridApiRef.current.purgeInfiniteCache(); // Tell AG Grid to re-fetch data
  }
      console.log('refreshGridData', data);
  };


  return (
    <>
      <div className='mt-2 flex flex-col gap-4 rounded-lg md:mr-12  md:flex-row md:gap-4'>
        <div className='xs:flex-row flex flex-row items-center gap-5 p-2 sm:items-start sm:p-0 md:mr-1 md:flex-col'>
          <CustomSidebar
            columnDefs={gridColumnDef}
            onToggleColumnVisibility={onToggleColumnVisibility}
          />
          <RoundButton
            icon={<HiOutlineUserAdd className='h-7 w-7' />}
            onClick={toggleModal}
          />
          <AddCustomerModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            onCustomerAdded={refreshGridData} // Assuming you have such a prop
            modalName='Add New Customer'
          />
        </div>
        <div className='flex-grow'>
          <div className='ag-theme-material h-[calc(100vh-11rem)] w-full md:h-[calc(100vh-7.5rem)]'>
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
