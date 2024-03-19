'use client';
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomSidebar from '@/app/[locale]/components/GridSettingManager';
import {
  CustomGridProps,
  GridData,
  GridRef,
  PageInfoSlim
} from '../types/sharedTypes';
import {
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  RowClickedEvent
} from 'ag-grid-community';

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
  cacheBlockSize: 30, // Number of rows per block
  cacheOverflowSize: 1, // Number of extra rows to request outside current view
  maxConcurrentDatasourceRequests: -1, // Number of concurrent data requests
  infiniteInitialRowCount: 1 // Initial placeholder count
  // maxBlocksInCache: undefined, // No limit to the number of blocks in cache
  // Additional properties can be set as needed
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewGridInner = <T,>(
  { columnDefs, fetchMoreData, gridData }: CustomGridProps<T>,
  ref: React.ForwardedRef<GridRef<T>>
) => {
  console.log('columnDefs', gridData);
  const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);
  const pageInfoTrack = useRef<PageInfoSlim>(gridData?.pageInfo); // Using useRef for cursor
  const isFirstLoad = useRef<boolean>(true);
  const gridRowCount = useRef<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridApiRef = useRef<GridApi<any> | null>(null);
  const newDataRef = useRef<T[]>([]);

  useImperativeHandle(ref, () => ({
    handleGetSelectedItems: (): T[] => {
      const selectedNodes = gridApiRef.current?.getSelectedNodes();
      const selectedData = selectedNodes?.map((node) => node.data) ?? [];
      return selectedData;
    },
    refreshGridData: (gridData: GridData<T>) => {
      newDataRef.current = gridData.rows;
      if (gridApiRef.current) {
        gridApiRef.current.setGridOption('datasource', dataSource());
      }
    }
  }));

  const dataSource = (): IDatasource => ({
    getRows: async (params: IGetRowsParams) => {
      try {
        if (isFirstLoad.current || newDataRef.current.length > 0) {
          console.log('is first load ', gridData);
          const dataToUse = isFirstLoad.current
            ? gridData.rows
            : newDataRef.current;

          console.log('dataToUse', dataToUse);
          params.successCallback(
            dataToUse as [],
            pageInfoTrack.current.hasNextPage ? -1 : dataToUse?.length
          );
          if (isFirstLoad.current) {
            gridRowCount.current = gridData.rows.length;
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

  // useEffect(() => {
  //   if (gridApiRef.current) {
  //     gridApiRef.current.setRowData(gridData.rows);
  //   }
  // }, [gridData]);
  // const refreshGridData = async () => {
  //   const { data } = await refetch();
  //   const newData = data?.customers?.edges?.map((edge) => edge.node);
  //   newDataRef.current = newData as [];
  //   const newDataPageInfo = data?.customers?.pageInfo;

  //   pageInfoTrack.current = (
  //     newDataPageInfo ? newDataPageInfo : pageInfoTrack.current
  //   ) as PageInfoSlim;

  //   if (gridApiRef.current) {
  //     gridRowCount.current = newDataRef.current.length; // Reset gridRowCount to reflect the new total
  //     gridApiRef.current.setGridOption('datasource', dataSource()); // Refresh the datasource to reflect new data
  //   }
  // };
  return (
    <>
      <div className='flex flex-col'>
        <div className='header'>
          {' '}
          {/* Start of the header section */}
          <CustomSidebar
            columnDefs={gridColumnDef}
            onToggleColumnVisibility={onToggleColumnVisibility}
          />
          {/* Include other header content here, like a title or buttons */}
        </div>{' '}
        {/* Providing a fixed portion of the screen to the grid container */}
        <div className='flex-grow overflow-y-auto'>
          <div className='ag-theme-quartz h-[calc(100vh-450px)] w-full'>
            <AgGridReact
              containerStyle={{ width: '100%', height: '100%' }}
              columnDefs={gridColumnDef}
              gridOptions={gridOptions}
              rowModelType='infinite'
              rowSelection='multiple'
              onGridReady={onGridReady}
              onRowClicked={onRowClicked}
              className='w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
};

const NewGrid = forwardRef(NewGridInner) as <T>(
  props: CustomGridProps<T> & { ref?: React.ForwardedRef<GridRef<T>> }
) => ReturnType<typeof NewGridInner>;

export default NewGrid;
