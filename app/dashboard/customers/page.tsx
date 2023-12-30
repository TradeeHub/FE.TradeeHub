"use client";
import React from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import {
  CustomersPagedDocument,
  type CustomersPagedQuery,
  type CustomersPagedQueryVariables,
} from "@/generatedGraphql";
import GenericGrid from "@/app/components/GenericGrid";
import { HeaderJoinConfig } from "@/app/components/SharedInterfaces";

const Customers = () => {
  const { data, error, loading } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 1000 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const joiningHeaderArr: HeaderJoinConfig[] = [
    {
      joiningHeaders: ["title", "name", "surname"],
      displayAs: "name",
      hidden: false,
      imageInitials: ["name", "surname"],
    },
  ];

  return (
    <GenericGrid
      data={data?.customers}
      hiddenColumns={["id"]}
      joiningHeaders={joiningHeaderArr}
    />
    // <div className="px-4 sm:px-6 lg:px-8">
    //   <div className="sm:flex sm:items-center">
    //     <div className="sm:flex-auto">
    //     </div>
    //     <div className="sm:ml-16 sm:mt-0 sm:flex-none">
    //       <button
    //         type="button"
    //         className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //       >
    //         Add Customer
    //       </button>
    //     </div>
    //   </div>
    //   <div className="mt-8 flow-root">
    //     <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //       <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
    //         <table className="min-w-full divide-y divide-gray-300">
    //           <thead>
    //             <tr>
    //               <th
    //                 scope="col"
    //                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
    //               >
    //                 Name
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //               >
    //                 Address
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //               >
    //                 Status
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    //               >
    //                 Phone
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="divide-y divide-gray-200 bg-white">
    //             {data?.customers?.edges?.map((customer) => (
    //               <tr key={customer.node.id}>
    //                 <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
    //                   <div className="flex items-center">
    //                     <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300 text-white">
    //                       {customer.node.name && customer.node.surname
    //                         ? `${customer.node.name.charAt(
    //                             0,
    //                           )}${customer.node.surname.charAt(0)}`
    //                         : ""}
    //                     </div>
    //                     <div className="ml-4">
    //                       <div className="mt-1 text-gray-500">
    //                         {customer.node.title} {customer.node.name}{" "}
    //                         {customer.node.surname}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </td>
    //                 <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    //                   {customer.node.properties?.map((property, index) => (
    //                     <div key={index} className="text-gray-900">
    //                       {property?.propertyAddress.fullAddress ?? "N/A"}
    //                     </div>
    //                   ))}
    //                   {/* <div className="text-gray-900">{customer.node.id}</div>
    //                   <div className="mt-1 text-gray-500">{customer.node.surname}</div> */}
    //                 </td>
    //                 <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    //                   <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
    //                     Active
    //                   </span>
    //                 </td>
    //                 <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
    //                    {customer.node.phoneNumbers?.map((phoneNumber, index) => (
    //                     <div key={index} className="text-gray-900">
    //                       {phoneNumber?.phoneNumber ?? "N/A"}
    //                     </div>
    //                   ))}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Customers;
