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
  RowClickedEvent
} from 'ag-grid-community';
import { HiOutlineUserAdd } from 'react-icons/hi';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal';

const gridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    // floatingFilter: true,
    resizable: true
  },
  rowHeight: 70,
  tooltipInteraction: true,
  enableBrowserTooltips: true,
  alwaysShowHorizontalScroll: true,
  suppressScrollOnNewData: true,
  // rowModelType: 'infinite', // Necessary for infinite scrolling
  cacheBlockSize: 30, // Number of rows per block
  cacheOverflowSize: 1, // Number of extra rows to request outside current view
  maxConcurrentDatasourceRequests: -1, // Number of concurrent data requests
  infiniteInitialRowCount: 1 // Initial placeholder count
  // maxBlocksInCache: undefined, // No limit to the number of blocks in cache
  // Additional properties can be set as needed
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewGrid = ({
  columnDefs,
  fetchMoreData,
  refetch,
  initialData,
  initialPageInfo
}: CustomGridProps) => {
  const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
  const pageInfoTrack = useRef<PageInfoSlim>(initialPageInfo); // Using useRef for cursor
  const isFirstLoad = useRef<boolean>(true);
  const gridRowCount = useRef<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridApiRef = useRef<GridApi<any> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newDataRef = useRef<object[]>([]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const router = useRouter();
  const pathname = usePathname();

  const dataSource = (): IDatasource => ({
    getRows: async (params: IGetRowsParams) => {
      try {
        if (isFirstLoad.current || newDataRef.current.length > 0) {
          const dataToUse = isFirstLoad.current
            ? initialData
            : newDataRef.current;
          params.successCallback(
            dataToUse as [],
            pageInfoTrack.current.hasNextPage ? -1 : dataToUse?.length
          );
          if (isFirstLoad.current) {
            gridRowCount.current = initialData.length;
            isFirstLoad.current = false;
          } else {
            gridRowCount.current = newDataRef.current.length;
            newDataRef.current = [];
          }
        } else {
          const { rows, pageInfo } = await fetchMoreData(
            pageInfoTrack.current.endCursor,
            gridOptions.cacheBlockSize
          );
          gridRowCount.current += rows.length;
          pageInfoTrack.current = pageInfo as PageInfoSlim;
          params.successCallback(
            rows as [],
            pageInfoTrack.current.hasNextPage ? -1 : gridRowCount.current
          );
        }
      } catch (error) {
        params.failCallback();
      }
    }
  });

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setGridOption('datasource', dataSource()); // Ensure this is correctly spelled and set
    gridApiRef.current = params.api;
  };

  const onRowClicked = (event: RowClickedEvent) => {
    const target = event?.event?.target as Element;

    // if (target && target.closest('.popover-trigger')) {
    //   return;
    // }

    // router.push(`${pathname}/${event.data.id}`);
  };

  const onToggleColumnVisibility = (index: number) => {
    setColumnDefs((currentDefs) =>
      currentDefs.map((col, idx) => ({
        ...col,
        hide: idx === index ? !col.hide : col.hide
      }))
    );
  };

  const refreshGridData = async () => {
    const { data } = await refetch();
    const newData = data?.customers?.edges?.map((edge) => edge.node);
    newDataRef.current = newData as [];
    const newDataPageInfo = data?.customers?.pageInfo;

    pageInfoTrack.current = (
      newDataPageInfo ? newDataPageInfo : pageInfoTrack.current
    ) as PageInfoSlim;

    if (gridApiRef.current) {
      gridRowCount.current = newDataRef.current.length; // Reset gridRowCount to reflect the new total
      gridApiRef.current.setGridOption('datasource', dataSource()); // Refresh the datasource to reflect new data
    }
  };
  return (
    <>
      <div className='header'>
        {' '}
        {/* Start of the header section */}
        <CustomSidebar
          columnDefs={gridColumnDef}
          onToggleColumnVisibility={onToggleColumnVisibility}
        />
        {/* Include other header content here, like a title or buttons */}
      </div>
      <div className='flex h-screen flex-col'>
        <div className='ag-theme-quartz w-full flex-grow'>
          <AgGridReact
            columnDefs={gridColumnDef}
            gridOptions={gridOptions}
            rowModelType='infinite'
            rowSelection='multiple'
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            className='font-normal'
          />
        </div>
      </div>
    </>
  );
};

export default NewGrid;
