/* eslint-disable @typescript-eslint/no-unused-vars */

import { ColDef } from 'ag-grid-community';

export type FetchMoreDataResult = {
  rows: object[];
  pageInfo: PageInfo | null | undefined;
};

type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type CustomGridProps = {
  columnDefs: ColDef[];
  fetchMoreData: (endCursor: string | null) => Promise<FetchMoreDataResult>;
  initialData: object[];
  endCursor: string | null;
};
