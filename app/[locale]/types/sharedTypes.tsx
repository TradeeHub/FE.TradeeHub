/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomerByIdQuery,
  CustomerEntity,
  CustomersPagedQuery,
  Exact,
  InputMaybe,
  UserDbObject,
} from '@/generatedGraphql';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
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
   refetch: (
    variables?: Partial<Exact<{
      pageSize: number;
      cursor?: InputMaybe<string> | undefined;
    }>>
  ) => Promise<ApolloQueryResult<CustomersPagedQuery>>;
  initialData: object[];
  initialPageInfo: PageInfoSlim;
};

export type LanguageOption = {
  name: string;
};

export type UseCustomerReturnType = {
  customer: CustomerEntity | null;
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

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  userPlace: UserPlace | null;
  companyName: string;
  companyType: string;
  companySize: string;
  referralSource: string;
  companyPriority: string;
  marketingPreference: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type Location = {
  lat: number;
  lng: number;
};

type Viewport = {
  northeast: Location;
  southwest: Location;
};

export type UserPlace = {
  PlaceId: string;
  Address: string;
  Location: Location;
  Viewport: Viewport;
  Country: string;
  CountryCode: string;
  CallingCode: string;
};

export type AddCustomerFormRequest = {
  title: string;
  name: string;
  surname: string;
  alias: string;
  emails: { email: string; emailType: string; receiveNotifications: boolean }[];
  phoneNumbers: {
    phoneNumber: string;
    phoneNumberType: string;
    receiveNotifications: boolean;
  }[];
  property: UserPlace;
  isBillingAddress: boolean;
  billing?: UserPlace | null;
  tags: string[];
  reference?: string | null;
  comment?: string | null;
};
