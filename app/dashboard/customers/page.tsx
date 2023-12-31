"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ValueGetterParams
} from "ag-grid-community";
import {
  CustomersPagedDocument,
  PropertyDbObject,
  CustomersPagedQuery,
  CustomersPagedQueryVariables,
  PhoneNumberDbObject,
  CustomerDbObject,
} from "@/generatedGraphql";
import moment from "moment";
import CustomSidebar from "@/app/components/SideBar";
import { PlusIcon } from "@heroicons/react/20/solid";
import RoundButton from "@/app/components/RoundButton";

const gridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
};

const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  let initials = "";

  if (nameParts.length >= 3) {
    // Take the last two words and get their initials
    const lastTwo = nameParts.slice(-2);
    initials = lastTwo.map((name) => name.charAt(0)).join("");
  } else {
    // Take the initials of whatever is there
    initials = nameParts.map((name) => name.charAt(0)).join("");
  }

  return initials.toUpperCase();
};

const initialColumnDefs: ColDef[] = [
  {
    headerName: "Name",
    field: "name",
    valueGetter: (params: ValueGetterParams) => {
      // You may need to assert the type of params.data if TypeScript complains about it
      const data = params.data as CustomerDbObject;
      return `${data.title || ""} ${data.name || ""} ${
        data.surname || ""
      }`.trim();
    },
    cellRenderer: (params: { value: string }) => {
      const initials = getInitials(params.value);
      return (
        <div className="flex items-center">
          <div className="mr-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            {initials}
          </div>
          <span>{params.value}</span>
        </div>
      );
    },
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: false,
    flex: 1,
    cellClass: "items-center font-roboto",
  },
  {
    headerName: "Phone",
    field: "phoneNumbers",
    valueGetter: (params: ValueGetterParams) => {
      return params.data.phoneNumbers
        .map((phone: PhoneNumberDbObject) => phone.phoneNumber)
        .join(", ");
    },
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: false,
    flex: 1,
  },
  {
    headerName: "Properties",
    field: "properties",
    valueGetter: (params: ValueGetterParams) => {
      return params.data.properties
        .map(
          (property: PropertyDbObject) => property.propertyAddress.fullAddress,
        )
        .join(", ");
    },
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: false,
    flex: 1,
  },
  {
    headerName: "Last Activity",
    field: "modifiedAt",
    valueGetter: (params: ValueGetterParams) => {
      return moment(params.data.modifiedAt).format("Do MMM YYYY h:mma");
    },
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: false,
    flex: 1,
  },
  {
    headerName: "Created By",
    field: "createdBy",
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: true,
    flex: 1,
  },
  {
    headerName: "Created Date",
    field: "createdAt",
    valueGetter: (params: ValueGetterParams) => {
      return moment(params.data.createdAt).format("Do MMM YYYY h:mma");
    },
    sortable: true,
    headerClass: "text-base",
    filter: true,
    hide: true,
    flex: 1,
  },
];

const Customers = () => {
  const [columnDefs, setColumnDefs] = useState(initialColumnDefs);

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

  const { data, error, loading } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex">
        <div className="mr-4 flex-col gap-10" style={{ width: "3%" }}>
          <div>
            <CustomSidebar
              columnDefs={columnDefs}
              onToggleColumnVisibility={onToggleColumnVisibility}
            />
          </div>
          <div>
            <RoundButton icon={<PlusIcon className="h-7 w-7" aria-hidden="true" />} onClick={() => {}}/>
          </div>
        </div>
        <div className="flex-grow" style={{ width: "97%" }}>
          <div
            className="ag-theme-material"
            style={{ height: "calc(100vh - 9rem)", width: "100%" }}
          >
            <AgGridReact<CustomersPagedQuery>
              rowData={data?.customers?.edges?.map((edge) => edge.node) ?? []}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              // onGridReady={onGridReady}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
