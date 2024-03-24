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
  const pageInfoTrack = useRef<PageInfoSlim>();
  const gridApiRef = useRef<GridApi>();
  const gridDataRef = useRef<T[]>([]);

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
          const rowNode = gridApiRef?.current?.getRowNode(
            (data as { id: string }).id
          );
          if (rowNode) {
            rowNode.setData(data);
            const index = gridDataRef.current.findIndex(
              (item: T) =>
                (item as { id: string }).id === (data as { id: string }).id
            );
            gridDataRef.current[index] = data;
          }
          break;
        }
        case DataOperation.Create: {
          gridDataRef.current = [data, ...gridDataRef.current];
          gridApiRef.current?.setRowCount(gridDataRef.current.length, false);
          gridApiRef.current?.purgeInfiniteCache();
          break;
        }
        case DataOperation.Delete: {
          const idToDelete = (data as { id: string }).id;
          gridDataRef.current = gridDataRef.current.filter(
            (item) => (item as { id: string }).id !== idToDelete
          );

          gridApiRef.current?.setRowCount(gridDataRef.current.length);
          gridApiRef.current?.purgeInfiniteCache();

          // gridApiRef.current?.forEachNode((rowNode) => {
          //   console.log('rowNode.data', rowNode);
          //   // Safely access 'id' with proper checks
          //   const nodeId = (rowNode.data as { id: string | undefined }).id;
          //   if (nodeId && nodeId !== idToDelete) {
          //     gridDataRef.current.push(rowNode.data);
          //   }
          // });
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
          const { rows, pageInfo } = await fetchMoreData(null, pageSize);
          gridDataRef.current = rows;
          pageInfoTrack.current = pageInfo ?? undefined;

          const rowsThisPage = gridDataRef.current.slice(
            startRow,
            Math.min(endRow, gridDataRef.current.length)
          );
          const lastRow = pageInfo?.hasNextPage
            ? -1
            : gridDataRef.current.length;
          params.successCallback(rowsThisPage, lastRow);
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
            const { rows, pageInfo } = await fetchMoreData(
              pageInfoTrack.current?.endCursor ?? null,
              pageSize - rowsThisPage.length
            );
            pageInfoTrack.current = pageInfo ?? undefined;
            gridDataRef.current = [...gridDataRef.current, ...rows];

            rowsThisPage = gridDataRef.current.slice(
              startRow,
              Math.min(endRow, gridDataRef.current.length)
            );
            lastRow = !pageInfo?.hasNextPage ? gridDataRef.current.length : -1;
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
const NewGrid = forwardRef(NewGridInner);

export default NewGrid;
