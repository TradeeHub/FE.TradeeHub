/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  CustomerByIdQuery,
  CustomerDbObject,
  UserDbObject,
} from '@/generatedGraphql';
import { ApolloError } from '@apollo/client';
import { ColDef } from 'ag-grid-community';
import { ReactNode } from 'react';

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

export type LanguageOption = {
  name: string;
};

export type UseCustomerReturnType = {
  customer: CustomerDbObject | null;
  loading: boolean;
  error: ApolloError | undefined;
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  user: UserDbObject | null;
  setUser: React.Dispatch<React.SetStateAction<UserDbObject | null>>;
  loading: boolean;
  error: ApolloError | undefined;
};

export type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export type AuthenticationGuardProps = {
  children: ReactNode;
};

export type UserState = {
  data: UserDbObject | null;
};

export type LoginState = {
  isConfirmed: boolean;
  isSuccess: boolean;
  user: UserDbObject | null;
};

export type TFieldValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  address: string;
  companyName: string;
  companyPriority: string;
  companySize: string;
  companyType: string;
  marketingPreference: string;
  annualRevenue: string;
};
