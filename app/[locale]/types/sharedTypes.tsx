/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomerByIdQuery } from '@/generatedGraphql';
import { ApolloError } from '@apollo/client';
import { ColDef } from 'ag-grid-community';

export type FetchMoreDataResult = {
  rows: object[];
  pageInfo: PageInfoSlim | null | undefined;
};

export type PageInfoSlim = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type CustomGridProps = {
  columnDefs: ColDef[];
  fetchMoreData: (
    endCursor: string | null,
    pageSize: number,
  ) => Promise<FetchMoreDataResult>;
  initialData: object[];
  initialPageInfo: PageInfoSlim;
};

export type UseCustomerReturnType = {
  data: CustomerByIdQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};
