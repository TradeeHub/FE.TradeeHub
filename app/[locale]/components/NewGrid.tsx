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

ModuleRegistry.registerModules([InfiniteRowModelModule]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewGridInner = <T,>(
  { pageSize, columnDefs, fetchMoreData }: CustomGridProps<T>,
  ref: React.ForwardedRef<GridRef<T>>
) => {
  const [gridColumnDef, setColumnDefs] = useState<ColDef[]>(columnDefs || []);
  const pageInfoTrack = useRef<PageInfoSlim | null>(); // Using useRef for cursor
  const gridRowCount = useRef<number>(0);
  const operationPerformedRef = useRef<DataOperation | null>();
  const gridDataRef = useRef<T[]>([]);

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
      switch (operation) {
        case DataOperation.Update: {
          operationPerformedRef.current = operation;

          const rowNode = gridApiRef?.current?.getRowNode(
            (data as { id: string }).id
          );
          if (rowNode) {
            rowNode.setData(data);
          }
          break;
        }
        case DataOperation.Create: {
          operationPerformedRef.current = operation;
          // Prepending the new item to maintain the order if that's the intended behavior
          gridDataRef.current = [data, ...gridDataRef.current];

          // Important: Update the grid's knowledge about the total row count
          gridApiRef.current?.setRowCount(gridDataRef.current.length, false);

          // Purge the cache to force the grid to re-query the datasource based on the new total row count
          gridApiRef.current?.purgeInfiniteCache();

          // Optionally, if you need to ensure the new row is visible, you can scroll to it
          // gridApiRef.current?.ensureIndexVisible(0);

          break;
        }
        case DataOperation.Delete: {
          operationPerformedRef.current = operation;
          const idToDelete = (data as { id: string }).id;
          console.log('Deleting ID:', idToDelete);

          // Filter out the deleted item directly
          gridDataRef.current = gridDataRef.current.filter(
            (item) => item.id !== idToDelete
          );

          // Update the row count to reflect the new data length
          gridApiRef.current?.setRowCount(gridDataRef.current.length);
          // Purge cache to force grid to re-fetch visible rows
          gridApiRef.current?.purgeInfiniteCache();

          //           operationPerformedRef.current = operation;

          // const idToDelete = (data as { id: string }).id;

          // console.log('idToDelete', idToDelete);

          // const updatedData: T[] = [];
          // gridApiRef.current?.forEachNode((rowNode) => {
          //   console.log('rowNode.data', rowNode);
          //   // Safely access 'id' with proper checks
          //   const nodeId = (rowNode.data as { id: string | undefined }).id;
          //   if (nodeId && nodeId !== idToDelete) {
          //     updatedData.push(rowNode.data);
          //   }
          // });

          // gridDataRef.current = updatedData;

          // console.log('gridDataRef.current', gridDataRef.current);
          // gridDataRef.current = gridDataRef.current.filter(
          //   (item) => (item as { id: string }).id !== idToDelete
          // );

          // gridApiRef.current?.purgeInfiniteCache();

          // console.log('gridDataRef.current 222', gridDataRef.current);

          break;
        }

        default:
          console.warn('Unhandled data operation:', operation);
      }
    }
  }));

  const datasource = useMemo<IDatasource>(() => {
    return {
      rowCount: undefined,
      getRows: async (params: IGetRowsParams) => {
        const { startRow, endRow } = params;
        if (
          gridDataRef.current.length === 0 ||
          (startRow === 0 && pageInfoTrack.current === null)
        ) {
          try {
            const { rows, pageInfo } = await fetchMoreData(null, pageSize);
            gridDataRef.current = rows;
            pageInfoTrack.current = pageInfo;

            const rowsThisPage = gridDataRef.current.slice(
              startRow,
              Math.min(endRow, gridDataRef.current.length)
            );
            const lastRow = pageInfo?.hasNextPage
              ? -1
              : gridDataRef.current.length;
            params.successCallback(rowsThisPage, lastRow);
          } catch (error) {
            console.error('Error fetching initial data:', error);
            params.failCallback();
          }
        } else {
          let rowsThisPage = gridDataRef.current.slice(
            startRow,
            Math.min(endRow, gridDataRef.current.length)
          );
          let lastRow = -1;

          if (
            rowsThisPage.length < endRow - startRow &&
            pageInfoTrack.current?.hasNextPage
          ) {
            try {
              const { rows, pageInfo } = await fetchMoreData(
                pageInfoTrack.current?.endCursor ?? null,
                pageSize - rowsThisPage.length
              );
              pageInfoTrack.current = pageInfo;
              gridDataRef.current = [...gridDataRef.current, ...rows];

              rowsThisPage = gridDataRef.current.slice(
                startRow,
                Math.min(endRow, gridDataRef.current.length)
              );
              lastRow = !pageInfo?.hasNextPage
                ? gridDataRef.current.length
                : -1;
            } catch (error) {
              console.error('Error fetching more data:', error);
              params.failCallback();
            }
          } else if (!pageInfoTrack.current?.hasNextPage) {
            lastRow = gridDataRef.current.length;
          }

          params.successCallback(rowsThisPage, lastRow);
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
