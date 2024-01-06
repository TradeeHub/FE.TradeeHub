import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AddressDbObject = {
  __typename?: 'AddressDbObject';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
};

export type CommentDbObject = {
  __typename?: 'CommentDbObject';
  comment?: Maybe<Scalars['String']['output']>;
  uploadUrls: Array<Scalars['String']['output']>;
};

export type CommentDbObjectFilterInput = {
  and?: InputMaybe<Array<CommentDbObjectFilterInput>>;
  comment?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CommentDbObjectFilterInput>>;
  uploadUrls?: InputMaybe<ListStringOperationFilterInput>;
};

export type CustomerDbObject = {
  __typename?: 'CustomerDbObject';
  alias?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<CommentDbObject>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  customerRating?: Maybe<Scalars['Decimal']['output']>;
  customerReferenceNumber: Scalars['String']['output'];
  emails?: Maybe<Array<EmailDbObject>>;
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumbers?: Maybe<Array<PhoneNumberDbObject>>;
  properties?: Maybe<Array<Maybe<PropertyDbObject>>>;
  referralFeeFixed?: Maybe<Scalars['Decimal']['output']>;
  referralFeePercentage?: Maybe<Scalars['Decimal']['output']>;
  referredByCustomer?: Maybe<Scalars['ID']['output']>;
  referredByOther?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  surname?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CustomerDbObjectFilterInput = {
  alias?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<CustomerDbObjectFilterInput>>;
  comments?: InputMaybe<ListFilterInputTypeOfCommentDbObjectFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<UuidOperationFilterInput>;
  customerRating?: InputMaybe<DecimalOperationFilterInput>;
  customerReferenceNumber?: InputMaybe<StringOperationFilterInput>;
  emails?: InputMaybe<ListFilterInputTypeOfEmailDbObjectFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ObjectIdOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  modifiedBy?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerDbObjectFilterInput>>;
  phoneNumbers?: InputMaybe<ListFilterInputTypeOfPhoneNumberDbObjectFilterInput>;
  properties?: InputMaybe<ListObjectIdOperationFilterInput>;
  referralFeeFixed?: InputMaybe<DecimalOperationFilterInput>;
  referralFeePercentage?: InputMaybe<DecimalOperationFilterInput>;
  referredByCustomer?: InputMaybe<ObjectIdOperationFilterInput>;
  referredByOther?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<StringOperationFilterInput>;
  surname?: InputMaybe<StringOperationFilterInput>;
  tags?: InputMaybe<ListStringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type CustomerDbObjectSortInput = {
  alias?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdBy?: InputMaybe<SortEnumType>;
  customerRating?: InputMaybe<SortEnumType>;
  customerReferenceNumber?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  modifiedBy?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  referralFeeFixed?: InputMaybe<SortEnumType>;
  referralFeePercentage?: InputMaybe<SortEnumType>;
  referredByCustomer?: InputMaybe<SortEnumType>;
  referredByOther?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  surname?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CustomersConnection = {
  __typename?: 'CustomersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CustomerDbObject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CustomersEdge = {
  __typename?: 'CustomersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomerDbObject;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type EmailDbObject = {
  __typename?: 'EmailDbObject';
  email: Scalars['String']['output'];
  emailType: Scalars['String']['output'];
};

export type EmailDbObjectFilterInput = {
  and?: InputMaybe<Array<EmailDbObjectFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<EmailDbObjectFilterInput>>;
};

export type ListFilterInputTypeOfCommentDbObjectFilterInput = {
  all?: InputMaybe<CommentDbObjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommentDbObjectFilterInput>;
  some?: InputMaybe<CommentDbObjectFilterInput>;
};

export type ListFilterInputTypeOfEmailDbObjectFilterInput = {
  all?: InputMaybe<EmailDbObjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EmailDbObjectFilterInput>;
  some?: InputMaybe<EmailDbObjectFilterInput>;
};

export type ListFilterInputTypeOfPhoneNumberDbObjectFilterInput = {
  all?: InputMaybe<PhoneNumberDbObjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PhoneNumberDbObjectFilterInput>;
  some?: InputMaybe<PhoneNumberDbObjectFilterInput>;
};

export type ListObjectIdOperationFilterInput = {
  all?: InputMaybe<ObjectIdOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ObjectIdOperationFilterInput>;
  some?: InputMaybe<ObjectIdOperationFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  generateFakeCustomers: Scalars['String']['output'];
};


export type MutationGenerateFakeCustomersArgs = {
  quantity: Scalars['Int']['input'];
};

export type ObjectIdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ObjectId']['input']>;
  gt?: InputMaybe<Scalars['ObjectId']['input']>;
  gte?: InputMaybe<Scalars['ObjectId']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  lt?: InputMaybe<Scalars['ObjectId']['input']>;
  lte?: InputMaybe<Scalars['ObjectId']['input']>;
  neq?: InputMaybe<Scalars['ObjectId']['input']>;
  ngt?: InputMaybe<Scalars['ObjectId']['input']>;
  ngte?: InputMaybe<Scalars['ObjectId']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  nlt?: InputMaybe<Scalars['ObjectId']['input']>;
  nlte?: InputMaybe<Scalars['ObjectId']['input']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PhoneNumberDbObject = {
  __typename?: 'PhoneNumberDbObject';
  phoneNumber: Scalars['String']['output'];
  phoneNumberType: Scalars['String']['output'];
};

export type PhoneNumberDbObjectFilterInput = {
  and?: InputMaybe<Array<PhoneNumberDbObjectFilterInput>>;
  or?: InputMaybe<Array<PhoneNumberDbObjectFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberType?: InputMaybe<StringOperationFilterInput>;
};

export type PropertyDbObject = {
  __typename?: 'PropertyDbObject';
  billing?: Maybe<AddressDbObject>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['UUID']['output'];
  /** The customers associated with this property. */
  customers?: Maybe<Array<Maybe<CustomerDbObject>>>;
  id: Scalars['ID']['output'];
  jobs?: Maybe<Array<Scalars['ID']['output']>>;
  location?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['UUID']['output']>;
  property: AddressDbObject;
  quotes?: Maybe<Array<Scalars['ID']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  customerById?: Maybe<CustomerDbObject>;
  customers?: Maybe<CustomersConnection>;
};


export type QueryCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CustomerDbObjectSortInput>>;
  where?: InputMaybe<CustomerDbObjectFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type CustomerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CustomerByIdQuery = { __typename?: 'Query', customerById?: { __typename?: 'CustomerDbObject', id: string, customerReferenceNumber: string, title?: string | null, name?: string | null, surname?: string | null, fullName: string, alias?: string | null, status: string, createdAt: any, createdBy: any, modifiedAt?: any | null, modifiedBy?: any | null, referredByCustomer?: string | null, referredByOther?: string | null, referralFeeFixed?: any | null, referralFeePercentage?: any | null, customerRating?: any | null, tags?: Array<string> | null, comments?: Array<{ __typename?: 'CommentDbObject', comment?: string | null, uploadUrls: Array<string> }> | null, emails?: Array<{ __typename?: 'EmailDbObject', email: string, emailType: string }> | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberDbObject', phoneNumber: string, phoneNumberType: string }> | null, properties?: Array<{ __typename?: 'PropertyDbObject', id: string, property: { __typename?: 'AddressDbObject', address?: string | null, fullAddress?: string | null } } | null> | null } | null };

export type CustomersPagedQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type CustomersPagedQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomersConnection', edges?: Array<{ __typename?: 'CustomersEdge', node: { __typename?: 'CustomerDbObject', id: string, title?: string | null, status: string, fullName: string, tags?: Array<string> | null, name?: string | null, surname?: string | null, modifiedAt?: any | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberDbObject', phoneNumber: string }> | null, properties?: Array<{ __typename?: 'PropertyDbObject', property: { __typename?: 'AddressDbObject', address?: string | null, fullAddress?: string | null } } | null> | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


export const CustomerByIdDocument = gql`
    query CustomerById($id: ID!) {
  customerById(id: $id) {
    id
    customerReferenceNumber
    title
    name
    surname
    fullName
    alias
    status
    createdAt
    createdBy
    modifiedAt
    modifiedBy
    referredByCustomer
    referredByOther
    referralFeeFixed
    referralFeePercentage
    customerRating
    comments {
      comment
      uploadUrls
    }
    emails {
      email
      emailType
    }
    phoneNumbers {
      phoneNumber
      phoneNumberType
    }
    properties {
      id
      property {
        address
        fullAddress
      }
    }
    tags
  }
}
    `;

/**
 * __useCustomerByIdQuery__
 *
 * To run a query within a React component, call `useCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<CustomerByIdQuery, CustomerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerByIdQuery, CustomerByIdQueryVariables>(CustomerByIdDocument, options);
      }
export function useCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerByIdQuery, CustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerByIdQuery, CustomerByIdQueryVariables>(CustomerByIdDocument, options);
        }
export function useCustomerByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerByIdQuery, CustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerByIdQuery, CustomerByIdQueryVariables>(CustomerByIdDocument, options);
        }
export type CustomerByIdQueryHookResult = ReturnType<typeof useCustomerByIdQuery>;
export type CustomerByIdLazyQueryHookResult = ReturnType<typeof useCustomerByIdLazyQuery>;
export type CustomerByIdSuspenseQueryHookResult = ReturnType<typeof useCustomerByIdSuspenseQuery>;
export type CustomerByIdQueryResult = Apollo.QueryResult<CustomerByIdQuery, CustomerByIdQueryVariables>;
export const CustomersPagedDocument = gql`
    query CustomersPaged($pageSize: Int!, $cursor: String) {
  customers(first: $pageSize, after: $cursor) {
    edges {
      node {
        id
        title
        status
        fullName
        tags
        name
        surname
        modifiedAt
        phoneNumbers {
          phoneNumber
        }
        properties {
          property {
            address
            fullAddress
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useCustomersPagedQuery__
 *
 * To run a query within a React component, call `useCustomersPagedQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomersPagedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomersPagedQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCustomersPagedQuery(baseOptions: Apollo.QueryHookOptions<CustomersPagedQuery, CustomersPagedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(CustomersPagedDocument, options);
      }
export function useCustomersPagedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomersPagedQuery, CustomersPagedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(CustomersPagedDocument, options);
        }
export function useCustomersPagedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomersPagedQuery, CustomersPagedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(CustomersPagedDocument, options);
        }
export type CustomersPagedQueryHookResult = ReturnType<typeof useCustomersPagedQuery>;
export type CustomersPagedLazyQueryHookResult = ReturnType<typeof useCustomersPagedLazyQuery>;
export type CustomersPagedSuspenseQueryHookResult = ReturnType<typeof useCustomersPagedSuspenseQuery>;
export type CustomersPagedQueryResult = Apollo.QueryResult<CustomersPagedQuery, CustomersPagedQueryVariables>;