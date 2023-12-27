"use client";
import React from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { DataGrid } from "@mui/x-data-grid";
import {
  CustomersByNameDocument,
  type CustomersByNameQuery,
  type CustomersByNameQueryVariables,
} from "@/generatedGraphql";

const Customers = () => {
  const { data, error, loading } = useQuery<
    CustomersByNameQuery,
    CustomersByNameQueryVariables
  >(CustomersByNameDocument, {
    variables: { nameContains: "Glen" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "surname", headerName: "Surname", width: 200 },
    { field: "address", headerName: "Address", width: 300 },
  ];

  // Map the data to the format required by DataGrid
  const rows =
    data?.customers?.edges?.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      surname: edge.node.surname,
      address: edge.node.properties
        ?.map((property) => property?.propertyAddress.address)
        .join(", "),
    })) || [];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Customers;
