/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomerEntity,
  CustomersPagedQuery,
  Exact,
  InputMaybe,
  PricingTierEntity,
  UserEntity
} from '@/generatedGraphql';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { ColDef } from 'ag-grid-community';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export type FetchMoreDataResult<T> = {
  rows: T[];
  pageInfo: PageInfoSlim | null | undefined;
};

export type PageInfoSlim = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type GridData<T> = {
  rows: T[];
  pageInfo: PageInfoSlim;
};

export type CustomGridProps<T> = {
  columnDefs: ColDef<T>[];
  fetchMoreData: (
    endCursor: string | null,
    pageSize: number
  ) => Promise<FetchMoreDataResult<T>>;
  gridData: GridData<T>;
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
  user: UserEntity | null;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
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
  data: UserEntity | null;
};

export type LoginState = {
  isConfirmed: boolean;
  isSuccess: boolean;
  user: UserEntity | null;
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
  title: string | null;
  name: string | null;
  surname: string | null;
  alias: string | null;
  customerType: string | null;
  companyName: string | null;
  useCompanyName: boolean;
  emails: {
    email: string | null;
    emailType: string | null;
    receiveNotifications: boolean;
  }[];
  phoneNumbers: {
    phoneNumber: string | null;
    phoneNumberType: string | null;
    receiveNotifications: boolean;
  }[];
  properties: {
    isBillingAddress: boolean;
    billing?: UserPlace | null; // Optional to align with your GraphQL input that allows this to be nullable
    property?: UserPlace | null;
  }[]; // Adjusted to reflect multiple properties handling
  tags: string[];
  reference?: Reference | null; // Assuming `Reference` is already defined elsewhere
  comment?: string | null;
  multiValidation?: string | null;
};

type Reference = {
  id: string;
  referenceType: string;
};

export type PricingTierEntityWithId = PricingTierEntity & {
  id: string;
};

export type MenuItem = {
  label: string;
  icon: IconType;
  onClick: () => void;
};

export type GridRef<T> = {
  handleGetSelectedItems: () => T[];
  refreshGridData: (data: GridData<T>) => void;
};

export enum ModalAction {
  Update = 'UPDATE',
  Create = 'CREATE'
}
