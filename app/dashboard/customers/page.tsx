"use client";
import React from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import {
  CustomersPagedDocument,
  PropertyDbObject,
  CustomersPagedQuery,
  CustomersPagedQueryVariables,
  PhoneNumberDbObject,
  CustomerDbObject,
} from "@/generatedGraphql";
import moment from "moment";

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

const columnDefs: ColDef<CustomerDbObject>[] = [
  {
    headerName: "Name",
    valueGetter: (params: ValueGetterParams) => {
      // You may need to assert the type of params.data if TypeScript complains about it
      const data = params.data as CustomerDbObject;
      return `${data.title || ''} ${data.name || ''} ${data.surname || ''}`.trim();
    },
    cellRenderer: (params: { value: string }) => {
      const initials = getInitials(params.value);
      return (
        <div className="flex items-center">
          <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            {initials}
          </div>
          <span>{params.value}</span>
        </div>
      );
    },
    sortable: true,
    filter: true,
    flex: 1,
    headerClass: "text-lg",
    cellClass: "items-center font-roboto",
  },
  {
    headerName: "Phone",
    valueGetter: (params: ValueGetterParams) => {
        return params.data.phoneNumbers.map((phone : PhoneNumberDbObject) => phone.phoneNumber).join(", ");
    },
    sortable: true,
    filter: true,
    headerClass: "text-lg",
    flex: 1,
  },
  {
    headerName: "Properties",
    valueGetter: (params: ValueGetterParams) => {
      return params.data.properties.map((property:PropertyDbObject) => property.propertyAddress.fullAddress).join(", ");
    },
    sortable: true,
    filter: true,
    headerClass: "text-lg",
    flex: 1,
  },
  {
    headerName: "Last Activity",
    valueGetter: (params: ValueGetterParams) => {
      return moment(params.data.modifiedAt).format("Do MMM YYYY h:mma");
    },
    sortable: true,
    headerClass: "text-lg",
    filter: true,
  },
];

const Customers = () => {
  const { data, error, loading } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 100 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="ag-theme-material"
      style={{ height: "calc(100vh - 8rem)", width: "100%" }}
    >
      <AgGridReact
    rowData={
      data?.customers?.edges?.map(edge => ({
        ...edge.node,
        title: edge.node.title || '',
        name: edge.node.name || '',
        surname: edge.node.surname || '',
        createdAt: edge.node.createdAt || '',
        createdBy: edge.node.createdBy || '',
        // ... other properties
      })) ?? []
    }      
        columnDefs={columnDefs}
        style={{ height: "100%", width: "100%" }} // Ensure the grid fills the container
      />
    </div>
  );
};

export default Customers;
