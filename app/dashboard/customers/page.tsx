'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import {
  CustomersPagedDocument,
  PropertyDbObject,
  CustomersPagedQuery,
  CustomersPagedQueryVariables,
  PhoneNumberDbObject,
  CustomerDbObject,
} from '@/generatedGraphql';
import moment from 'moment';
import CustomGrid from '@/app/components/Grid';

const getInitials = (fullName: string) => {
  const nameParts = fullName.split(' ');
  let initials = '';

  if (nameParts.length >= 3) {
    // Take the last two words and get their initials
    const lastTwo = nameParts.slice(-2);
    initials = lastTwo.map((name) => name.charAt(0)).join('');
  } else {
    // Take the initials of whatever is there
    initials = nameParts.map((name) => name.charAt(0)).join('');
  }

  return initials.toUpperCase();
};

const gridColumnDef: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    valueGetter: (params: ValueGetterParams) => {
      // You may need to assert the type of params.data if TypeScript complains about it
      const data = params.data as CustomerDbObject;
      return `${data.title || ''} ${data.name || ''} ${
        data.surname || ''
      }`.trim();
    },
    cellRenderer: (params: { value: string }) => {
      const initials = getInitials(params.value);
      return (
        <div className='flex items-center'>
          <div className='mr-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
            {initials}
          </div>
          <span>{params.value}</span>
        </div>
      );
    },
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: false,
    flex: 1,
    cellClass: 'items-center font-roboto',
  },
  {
    headerName: 'Phone',
    field: 'phoneNumbers',
    valueGetter: (params: ValueGetterParams) => {
      return params.data.phoneNumbers
        .map((phone: PhoneNumberDbObject) => phone.phoneNumber)
        .join(', ');
    },
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: false,
    flex: 1,
  },
  {
    headerName: 'Properties',
    field: 'properties',
    valueGetter: (params: ValueGetterParams) => {
      return params.data.properties
        .map(
          (property: PropertyDbObject) => property.propertyAddress.fullAddress,
        )
        .join(', ');
    },
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: false,
    flex: 1,
  },
  {
    headerName: 'Last Activity',
    field: 'modifiedAt',
    valueGetter: (params: ValueGetterParams) => {
      return moment(params.data.modifiedAt).format('Do MMM YYYY h:mma');
    },
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: false,
    flex: 1,
    cellClass: 'text-center', // Custom class for centering cell content
  },
  {
    headerName: 'Created By',
    field: 'createdBy',
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: true,
    flex: 1,
  },
  {
    headerName: 'Created Date',
    field: 'createdAt',
    valueGetter: (params: ValueGetterParams) => {
      return moment(params.data.createdAt).format('Do MMM YYYY h:mma');
    },
    sortable: true,
    headerClass: 'text-base',
    filter: true,
    hide: true,
    flex: 1,
  },
];

const Customers = () => {
  const { data, error, loading } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 1000 },
  });

  const rowData = data?.customers?.edges?.map((edge) => edge.node);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CustomGrid gridData={rowData} columnDefs={gridColumnDef} />
    </>
  );
};

export default Customers;
