import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useMemo,
  useCallback
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomSidebar from '@/app/[locale]/components/GridSettingManager';
import {
  CustomGridProps,
  DataOperation,
  GridRef,
  PageInfoSlim
} from '../types/sharedTypes';
import {
  ColDef,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  ModuleRegistry,
  RowClickedEvent
} from 'ag-grid-community';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import page from '../reset-password/page';

ModuleRegistry.registerModules([InfiniteRowModelModule]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewGridInner = <T,>(
  { pageSize, columnDefs, fetchMoreData }: CustomGridProps<T>,
  ref: React.ForwardedRef<GridRef<T>>
) => {
  const [gridColumnDef, setColumnDefs] = useState<ColDef[]>(columnDefs || []);
  const pageInfoTrack = useRef<PageInfoSlim | null>(); // Using useRef for cursor
  const gridRowCount = useRef<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridApiRef = useRef<GridApi<any> | null>(null);

  const gridOptions = useMemo(
    () => ({
      rowHeight: 70,
      tooltipInteraction: true,
      enableBrowserTooltips: true,
      alwaysShowHorizontalScroll: true,
      suppressScrollOnNewData: true,
      cacheBlockSize: pageSize,
      rowBuffer: 1,
      cacheOverflowSize: 1, // Number of extra rows to request outside current view
      maxConcurrentDatasourceRequests: 2, // Number of concurrent data requests
      infiniteInitialRowCount: 1 // Initial placeholder count
    }),
    [pageSize]
  );

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true
    };
  }, []);

  useImperativeHandle(ref, () => ({
    handleGetSelectedItems: (): T[] => {
      const selectedNodes = gridApiRef.current?.getSelectedNodes();
      const selectedData = selectedNodes?.map((node) => node.data) ?? [];
      return selectedData;
    },
    refreshGridData: (operation: DataOperation, data: T) => {
      console.log('HHHHHHHHHHHHHHH ');

      if (gridApiRef.current) {
        // const rowCount = gridApiRef.current.getInfiniteRowCount();
        // console.log('ROW COUNT ', rowCount);

        // // Assuming you want to refetch based on the current row count or some other size
        // const newGridData = await dataRefetch(rowCount);

        // // Assuming newDataRef and pageInfoTrack are refs to keep track of your data
        // newDataRef.current = newGridData.rows;
        // pageInfoTrack.current = newGridData.pageInfo;

        // // Refresh the grid to reflect the new data
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ');

        const maxRowFound = gridApiRef.current.isLastRowIndexKnown();

        if (maxRowFound && operation === DataOperation.Create) {
          const rowCount = gridApiRef.current!.getInfiniteRowCount() || 0;
          gridRowCount.current += 1;
          gridApiRef.current!.setRowCount(rowCount + 1);
        }
        const rowNode = gridApiRef.current.getRowNode(
          (data as { id: string })?.id
        );

        if (rowNode) {
          rowNode.setData(data);
        }

        // console.log('ROW NODE ', rowNode);

        // gridApiRef.current.purgeInfiniteCache();

        // pageInfoTrack.current = null;
        // // gridRowCount.current = 0;
        // // gridApiRef.current!.setRowCount(0);
        // gridApiRef.current.purgeInfiniteCache();
        // gridApiRef.current.refreshInfiniteCache();
      }
    }
  }));

  const datasource = useMemo<IDatasource>(() => {
    return {
      rowCount: undefined,
      getRows: async (params: IGetRowsParams) => {
        console.log('INFINITE CACHE REFRESH ', params);
        try {
          const { rows, pageInfo } = await fetchMoreData(
            pageInfoTrack?.current?.endCursor ?? null,
            gridOptions.cacheBlockSize
          );

          console.log('ROWS ', rows, pageInfo, params);

          gridRowCount.current += rows.length;
          pageInfoTrack.current = pageInfo as PageInfoSlim;

          // console.log('ROWS ', rows, pageInfo, gridRowCount.current);
          console.log('ROW COUNTSSSS ', gridRowCount.current);
          params.successCallback(
            rows as [],
            pageInfoTrack.current.hasNextPage ? -1 : gridRowCount.current
          );
        } catch (error) {
          console.error('Error fetching data: ', error);
          params.failCallback();
        }
      }
    };
  }, []);

  const onRowClicked = useCallback((event: RowClickedEvent) => {
    const target = event?.event?.target as Element;

    // if (target && target.closest('.popover-trigger')) {
    //   return;
    // }

    // router.push(`${pathname}/${event.data.id}`);
  }, []);

  const onToggleColumnVisibility = (index: number) => {
    setColumnDefs((currentDefs) =>
      currentDefs.map((col, idx) => ({
        ...col,
        hide: idx === index ? !col.hide : col.hide
      }))
    );
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApiRef.current = params.api;
    // gridApiRef.current.refreshInfiniteCache();
  }, []);

  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.id.toString();
  }, []);

  return (
    <>
      <div className='flex flex-col'>
        <div className='header'>
          <CustomSidebar
            columnDefs={gridColumnDef}
            onToggleColumnVisibility={onToggleColumnVisibility}
          />
        </div>
        <div className='flex-grow overflow-y-auto'>
          <div className='ag-theme-quartz h-[calc(100vh-450px)] w-full'>
            <AgGridReact
              containerStyle={{ width: '100%', height: '100%' }}
              columnDefs={gridColumnDef}
              datasource={datasource}
              defaultColDef={defaultColDef}
              gridOptions={gridOptions}
              rowModelType='infinite'
              rowSelection='multiple'
              getRowId={getRowId}
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
