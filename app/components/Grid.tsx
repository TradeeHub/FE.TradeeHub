'use client';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import {
  CustomersPagedQuery,
} from '@/generatedGraphql';

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
  blockLoadDebounceMillis: 100,
  cacheBlockSize: 100,
  maxBlocksInCache: 100,
  infiniteInitialRowCount: 50, // Adjust as per your need
  cacheOverflowSize: 2, 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomGrid = ({ initialRowData, fetchMoreDataQuery, columnDefs }) => {

    const [gridColumnDef, setColumnDefs] = useState(columnDefs || []);

    const [gridApi, setGridApi] = useState(null);
    console.log("inittiall data", initialRowData    )

    const onToggleColumnVisibility = (index: number) => {
        setColumnDefs((currentDefs) =>
            currentDefs.map((col, idx) => {
                if (idx === index) {
                    // Toggle the hide property of the column at this index
                    return { ...col, hide: !col.hide };
                }
                return col;
            }),
        );
    };
    //  const dataSource = {
    //         getRows: (params) => {
    //             // Load initial data
    //             console.log("HEREEEE")
    //             let initialDataLoaded = false;

    //             // if (!initialDataLoaded && initialRowData) {
    //             //     console.log("Loading initial data");
    //             //     params.successCallback(initialRowData, initialRowData.length);
    //             //     initialDataLoaded = true;
    //             //     return;
    //             // }

    //             // Fetch more data
    //              fetchMoreDataQuery()
    //                 .then(data => {
    //                     console.log("Data fetched:", data);
    //                     params.successCallback(data.rows, data.lastRow);
    //                 })
    //                 .catch(() => {
    //                     params.failCallback();
    //                 });
    //         }
    //     };
    const dataSource = {
        getRows: (params) => {
            console.log("Fetching more data:", params.startRow, params.endRow);

            fetchMoreDataQuery(params.startRow, params.endRow)
                .then(data => {
                    const lastRow = data.lastRow ? data.lastRow : -1;
                    params.successCallback(data.rows, lastRow);
                })
                .catch(() => {
                    params.failCallback();
                });
        }
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
        console.log("APIII", params.api)

       

        params.api.setGridOption('datasource',dataSource); // Corrected method to set datasource
    };

    // Determine if more rows should be fetched based on the current scroll position
    const shouldFetchMoreRows = (params) => {
        console.log("CHECK IF SHOULD GET DATA")
        const currentLastRow = params.endRow;
        console.log("CHECK IF SHOULD GET DATA2222", currentLastRow)

        const totalRows = gridApi?.getDisplayedRowCount();

        console.log("CHECK IF SHOULD GET data33333", totalRows)
        console.log("CHECK IF SHOULD GET data44444", currentLastRow >= totalRows - 1)

        // Fetch more rows if the current last row is near the total displayed rows
        return currentLastRow >= totalRows - 1;
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
                // domLayout='autoHeight'
                className='h-full'
            />
            </div>
        </div>
        </div>
    </>
    );


};

export default CustomGrid;
