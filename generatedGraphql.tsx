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
  Long: { input: any; output: any; }
  Short: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AccountConfirmationResponse = {
  __typename?: 'AccountConfirmationResponse';
  confirmSignUpResponse?: Maybe<ConfirmSignUpResponse>;
  isConfirmationSuccess: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type AddressDbObject = {
  __typename?: 'AddressDbObject';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type ChangedForgottenPasswordRequestInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  resetConfirmationCode: Scalars['String']['input'];
};

export enum ChecksumValidationStatus {
  Invalid = 'INVALID',
  NotValidated = 'NOT_VALIDATED',
  PendingResponseRead = 'PENDING_RESPONSE_READ',
  Successful = 'SUCCESSFUL'
}

export type CodeDeliveryDetailsType = {
  __typename?: 'CodeDeliveryDetailsType';
  attributeName?: Maybe<Scalars['String']['output']>;
  deliveryMedium?: Maybe<DeliveryMediumType>;
  destination?: Maybe<Scalars['String']['output']>;
};

export type CommentDbObject = {
  __typename?: 'CommentDbObject';
  comment?: Maybe<Scalars['String']['output']>;
  uploadUrls: Array<Scalars['String']['output']>;
};

export type CommentDbObjectFilter = {
  AND?: InputMaybe<Array<CommentDbObjectFilter>>;
  OR?: InputMaybe<Array<CommentDbObjectFilter>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  comment_contains?: InputMaybe<Scalars['String']['input']>;
  comment_ends_with?: InputMaybe<Scalars['String']['input']>;
  comment_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  comment_not?: InputMaybe<Scalars['String']['input']>;
  comment_not_contains?: InputMaybe<Scalars['String']['input']>;
  comment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  comment_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  comment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  comment_starts_with?: InputMaybe<Scalars['String']['input']>;
  uploadUrls_all?: InputMaybe<ISingleFilterOfStringFilter>;
  uploadUrls_any?: InputMaybe<Scalars['Boolean']['input']>;
  uploadUrls_none?: InputMaybe<ISingleFilterOfStringFilter>;
  uploadUrls_some?: InputMaybe<ISingleFilterOfStringFilter>;
};

export type ConfirmForgotPasswordResponse = {
  __typename?: 'ConfirmForgotPasswordResponse';
  contentLength: Scalars['Long']['output'];
  httpStatusCode: HttpStatusCode;
  responseMetadata?: Maybe<ResponseMetadata>;
};

export type ConfirmSignUpResponse = {
  __typename?: 'ConfirmSignUpResponse';
  contentLength: Scalars['Long']['output'];
  httpStatusCode: HttpStatusCode;
  responseMetadata?: Maybe<ResponseMetadata>;
};

export enum CoreChecksumAlgorithm {
  Crc32 = 'CRC32',
  Crc32C = 'CRC32C',
  None = 'NONE',
  Sha1 = 'SHA1',
  Sha256 = 'SHA256'
}

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

export type CustomerDbObjectFilter = {
  AND?: InputMaybe<Array<CustomerDbObjectFilter>>;
  OR?: InputMaybe<Array<CustomerDbObjectFilter>>;
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_contains?: InputMaybe<Scalars['String']['input']>;
  alias_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alias_not?: InputMaybe<Scalars['String']['input']>;
  alias_not_contains?: InputMaybe<Scalars['String']['input']>;
  alias_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alias_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  alias_starts_with?: InputMaybe<Scalars['String']['input']>;
  comments_all?: InputMaybe<CommentDbObjectFilter>;
  comments_any?: InputMaybe<Scalars['Boolean']['input']>;
  comments_none?: InputMaybe<CommentDbObjectFilter>;
  comments_some?: InputMaybe<CommentDbObjectFilter>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAt_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdBy_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_lte?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_not?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdBy_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdBy_not_lte?: InputMaybe<Scalars['UUID']['input']>;
  customerRating?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_gt?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_gte?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  customerRating_lt?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_lte?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_not?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_not_gt?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_not_gte?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_not_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  customerRating_not_lt?: InputMaybe<Scalars['Decimal']['input']>;
  customerRating_not_lte?: InputMaybe<Scalars['Decimal']['input']>;
  customerReferenceNumber?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_contains?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_ends_with?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_in?: InputMaybe<Array<Scalars['String']['input']>>;
  customerReferenceNumber_not?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_contains?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  customerReferenceNumber_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_starts_with?: InputMaybe<Scalars['String']['input']>;
  emails_all?: InputMaybe<EmailDbObjectFilter>;
  emails_any?: InputMaybe<Scalars['Boolean']['input']>;
  emails_none?: InputMaybe<EmailDbObjectFilter>;
  emails_some?: InputMaybe<EmailDbObjectFilter>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  fullName_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_not?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fullName_starts_with?: InputMaybe<Scalars['String']['input']>;
  modifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  modifiedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  modifiedAt_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedAt_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
  modifiedBy?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedBy_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_lte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_not?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedBy_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedBy_not_lte?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumbers_all?: InputMaybe<PhoneNumberDbObjectFilter>;
  phoneNumbers_any?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumbers_none?: InputMaybe<PhoneNumberDbObjectFilter>;
  phoneNumbers_some?: InputMaybe<PhoneNumberDbObjectFilter>;
  properties_all?: InputMaybe<ObjectIdFilter>;
  properties_any?: InputMaybe<Scalars['Boolean']['input']>;
  properties_none?: InputMaybe<ObjectIdFilter>;
  properties_some?: InputMaybe<ObjectIdFilter>;
  referralFeeFixed?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_gt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_gte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  referralFeeFixed_lt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_lte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_not?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_not_gt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_not_gte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  referralFeeFixed_not_lt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeeFixed_not_lte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_gt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_gte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  referralFeePercentage_lt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_lte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_not?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_not_gt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_not_gte?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_not_in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  referralFeePercentage_not_lt?: InputMaybe<Scalars['Decimal']['input']>;
  referralFeePercentage_not_lte?: InputMaybe<Scalars['Decimal']['input']>;
  referredByOther?: InputMaybe<Scalars['String']['input']>;
  referredByOther_contains?: InputMaybe<Scalars['String']['input']>;
  referredByOther_ends_with?: InputMaybe<Scalars['String']['input']>;
  referredByOther_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referredByOther_not?: InputMaybe<Scalars['String']['input']>;
  referredByOther_not_contains?: InputMaybe<Scalars['String']['input']>;
  referredByOther_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referredByOther_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referredByOther_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referredByOther_starts_with?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  status_starts_with?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  surname_contains?: InputMaybe<Scalars['String']['input']>;
  surname_ends_with?: InputMaybe<Scalars['String']['input']>;
  surname_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  surname_not?: InputMaybe<Scalars['String']['input']>;
  surname_not_contains?: InputMaybe<Scalars['String']['input']>;
  surname_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  surname_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  surname_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  surname_starts_with?: InputMaybe<Scalars['String']['input']>;
  tags_all?: InputMaybe<ISingleFilterOfStringFilter>;
  tags_any?: InputMaybe<Scalars['Boolean']['input']>;
  tags_none?: InputMaybe<ISingleFilterOfStringFilter>;
  tags_some?: InputMaybe<ISingleFilterOfStringFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerDbObjectSort = {
  alias?: InputMaybe<SortOperationKind>;
  createdAt?: InputMaybe<SortOperationKind>;
  createdBy?: InputMaybe<SortOperationKind>;
  customerRating?: InputMaybe<SortOperationKind>;
  customerReferenceNumber?: InputMaybe<SortOperationKind>;
  fullName?: InputMaybe<SortOperationKind>;
  modifiedAt?: InputMaybe<SortOperationKind>;
  modifiedBy?: InputMaybe<SortOperationKind>;
  name?: InputMaybe<SortOperationKind>;
  referralFeeFixed?: InputMaybe<SortOperationKind>;
  referralFeePercentage?: InputMaybe<SortOperationKind>;
  referredByOther?: InputMaybe<SortOperationKind>;
  status?: InputMaybe<SortOperationKind>;
  surname?: InputMaybe<SortOperationKind>;
  title?: InputMaybe<SortOperationKind>;
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

export type DeliveryMediumType = {
  __typename?: 'DeliveryMediumType';
  value?: Maybe<Scalars['String']['output']>;
};

export type EmailDbObject = {
  __typename?: 'EmailDbObject';
  email: Scalars['String']['output'];
  emailType: Scalars['String']['output'];
};

export type EmailDbObjectFilter = {
  AND?: InputMaybe<Array<EmailDbObjectFilter>>;
  OR?: InputMaybe<Array<EmailDbObjectFilter>>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailType?: InputMaybe<Scalars['String']['input']>;
  emailType_contains?: InputMaybe<Scalars['String']['input']>;
  emailType_ends_with?: InputMaybe<Scalars['String']['input']>;
  emailType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emailType_not?: InputMaybe<Scalars['String']['input']>;
  emailType_not_contains?: InputMaybe<Scalars['String']['input']>;
  emailType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  emailType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  emailType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  emailType_starts_with?: InputMaybe<Scalars['String']['input']>;
  email_contains?: InputMaybe<Scalars['String']['input']>;
  email_ends_with?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not?: InputMaybe<Scalars['String']['input']>;
  email_not_contains?: InputMaybe<Scalars['String']['input']>;
  email_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  email_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  email_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  codeDeliveryDetails?: Maybe<CodeDeliveryDetailsType>;
  contentLength: Scalars['Long']['output'];
  httpStatusCode: HttpStatusCode;
  responseMetadata?: Maybe<ResponseMetadata>;
};

export enum HttpStatusCode {
  Accepted = 'ACCEPTED',
  AlreadyReported = 'ALREADY_REPORTED',
  BadGateway = 'BAD_GATEWAY',
  BadRequest = 'BAD_REQUEST',
  Conflict = 'CONFLICT',
  Continue = 'CONTINUE',
  Created = 'CREATED',
  EarlyHints = 'EARLY_HINTS',
  ExpectationFailed = 'EXPECTATION_FAILED',
  FailedDependency = 'FAILED_DEPENDENCY',
  Forbidden = 'FORBIDDEN',
  Found = 'FOUND',
  GatewayTimeout = 'GATEWAY_TIMEOUT',
  Gone = 'GONE',
  HttpVersionNotSupported = 'HTTP_VERSION_NOT_SUPPORTED',
  ImUsed = 'IM_USED',
  InsufficientStorage = 'INSUFFICIENT_STORAGE',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  LengthRequired = 'LENGTH_REQUIRED',
  Locked = 'LOCKED',
  LoopDetected = 'LOOP_DETECTED',
  MethodNotAllowed = 'METHOD_NOT_ALLOWED',
  MisdirectedRequest = 'MISDIRECTED_REQUEST',
  MovedPermanently = 'MOVED_PERMANENTLY',
  MultipleChoices = 'MULTIPLE_CHOICES',
  MultiStatus = 'MULTI_STATUS',
  NetworkAuthenticationRequired = 'NETWORK_AUTHENTICATION_REQUIRED',
  NonAuthoritativeInformation = 'NON_AUTHORITATIVE_INFORMATION',
  NotAcceptable = 'NOT_ACCEPTABLE',
  NotExtended = 'NOT_EXTENDED',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  NotModified = 'NOT_MODIFIED',
  NoContent = 'NO_CONTENT',
  Ok = 'OK',
  PartialContent = 'PARTIAL_CONTENT',
  PaymentRequired = 'PAYMENT_REQUIRED',
  PermanentRedirect = 'PERMANENT_REDIRECT',
  PreconditionFailed = 'PRECONDITION_FAILED',
  PreconditionRequired = 'PRECONDITION_REQUIRED',
  Processing = 'PROCESSING',
  ProxyAuthenticationRequired = 'PROXY_AUTHENTICATION_REQUIRED',
  RedirectKeepVerb = 'REDIRECT_KEEP_VERB',
  RequestedRangeNotSatisfiable = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  RequestEntityTooLarge = 'REQUEST_ENTITY_TOO_LARGE',
  RequestHeaderFieldsTooLarge = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  RequestTimeout = 'REQUEST_TIMEOUT',
  RequestUriTooLong = 'REQUEST_URI_TOO_LONG',
  ResetContent = 'RESET_CONTENT',
  SeeOther = 'SEE_OTHER',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
  SwitchingProtocols = 'SWITCHING_PROTOCOLS',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  Unauthorized = 'UNAUTHORIZED',
  UnavailableForLegalReasons = 'UNAVAILABLE_FOR_LEGAL_REASONS',
  UnprocessableEntity = 'UNPROCESSABLE_ENTITY',
  UnsupportedMediaType = 'UNSUPPORTED_MEDIA_TYPE',
  Unused = 'UNUSED',
  UpgradeRequired = 'UPGRADE_REQUIRED',
  UseProxy = 'USE_PROXY',
  VariantAlsoNegotiates = 'VARIANT_ALSO_NEGOTIATES'
}

export type ISingleFilterOfGuidFilter = {
  AND?: InputMaybe<Array<ISingleFilterOfGuidFilter>>;
  OR?: InputMaybe<Array<ISingleFilterOfGuidFilter>>;
  element?: InputMaybe<Scalars['UUID']['input']>;
  element_gt?: InputMaybe<Scalars['UUID']['input']>;
  element_gte?: InputMaybe<Scalars['UUID']['input']>;
  element_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  element_lt?: InputMaybe<Scalars['UUID']['input']>;
  element_lte?: InputMaybe<Scalars['UUID']['input']>;
  element_not?: InputMaybe<Scalars['UUID']['input']>;
  element_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  element_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  element_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  element_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  element_not_lte?: InputMaybe<Scalars['UUID']['input']>;
};

export type ISingleFilterOfStringFilter = {
  AND?: InputMaybe<Array<ISingleFilterOfStringFilter>>;
  OR?: InputMaybe<Array<ISingleFilterOfStringFilter>>;
  element?: InputMaybe<Scalars['String']['input']>;
  element_contains?: InputMaybe<Scalars['String']['input']>;
  element_ends_with?: InputMaybe<Scalars['String']['input']>;
  element_in?: InputMaybe<Array<Scalars['String']['input']>>;
  element_not?: InputMaybe<Scalars['String']['input']>;
  element_not_contains?: InputMaybe<Scalars['String']['input']>;
  element_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  element_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  element_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  element_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type KeyValuePairOfStringAndString = {
  __typename?: 'KeyValuePairOfStringAndString';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LocationDbObject = {
  __typename?: 'LocationDbObject';
  lat: Scalars['Decimal']['output'];
  lng: Scalars['Decimal']['output'];
};

export type LocationDbObjectFilter = {
  AND?: InputMaybe<Array<LocationDbObjectFilter>>;
  OR?: InputMaybe<Array<LocationDbObjectFilter>>;
  lat?: InputMaybe<Scalars['Decimal']['input']>;
  lat_gt?: InputMaybe<Scalars['Decimal']['input']>;
  lat_gte?: InputMaybe<Scalars['Decimal']['input']>;
  lat_in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lat_lt?: InputMaybe<Scalars['Decimal']['input']>;
  lat_lte?: InputMaybe<Scalars['Decimal']['input']>;
  lat_not?: InputMaybe<Scalars['Decimal']['input']>;
  lat_not_gt?: InputMaybe<Scalars['Decimal']['input']>;
  lat_not_gte?: InputMaybe<Scalars['Decimal']['input']>;
  lat_not_in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lat_not_lt?: InputMaybe<Scalars['Decimal']['input']>;
  lat_not_lte?: InputMaybe<Scalars['Decimal']['input']>;
  lng?: InputMaybe<Scalars['Decimal']['input']>;
  lng_gt?: InputMaybe<Scalars['Decimal']['input']>;
  lng_gte?: InputMaybe<Scalars['Decimal']['input']>;
  lng_in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lng_lt?: InputMaybe<Scalars['Decimal']['input']>;
  lng_lte?: InputMaybe<Scalars['Decimal']['input']>;
  lng_not?: InputMaybe<Scalars['Decimal']['input']>;
  lng_not_gt?: InputMaybe<Scalars['Decimal']['input']>;
  lng_not_gte?: InputMaybe<Scalars['Decimal']['input']>;
  lng_not_in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lng_not_lt?: InputMaybe<Scalars['Decimal']['input']>;
  lng_not_lte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type LocationDbObjectSort = {
  lat?: InputMaybe<SortOperationKind>;
  lng?: InputMaybe<SortOperationKind>;
};

export type LocationRequestInput = {
  lat: Scalars['Decimal']['input'];
  lng: Scalars['Decimal']['input'];
};

export type LoginRequestInput = {
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  isConfirmed: Scalars['Boolean']['output'];
  isSuccess: Scalars['Boolean']['output'];
  user?: Maybe<UserDbObject>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ConfirmForgotPasswordResponse;
  confirmAccount: AccountConfirmationResponse;
  forgotPassword: ForgotPasswordResponse;
  generateFakeCustomers: Scalars['String']['output'];
  login: LoginResponse;
  logout: LogoutResponse;
  register: SignUpResponse;
  resendVerificationCode: ResendConfirmationCodeResponse;
};


export type MutationChangePasswordArgs = {
  request: ChangedForgottenPasswordRequestInput;
};


export type MutationConfirmAccountArgs = {
  confirmationCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGenerateFakeCustomersArgs = {
  quantity: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  request: LoginRequestInput;
};


export type MutationRegisterArgs = {
  request: RegisterRequestInput;
};


export type MutationResendVerificationCodeArgs = {
  email: Scalars['String']['input'];
};

export type ObjectIdFilter = {
  AND?: InputMaybe<Array<ObjectIdFilter>>;
  OR?: InputMaybe<Array<ObjectIdFilter>>;
  creationTime?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_gt?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_gte?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  creationTime_lt?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_lte?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_not?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  creationTime_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  creationTime_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  increment_gt?: InputMaybe<Scalars['Int']['input']>;
  increment_gte?: InputMaybe<Scalars['Int']['input']>;
  increment_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  increment_lt?: InputMaybe<Scalars['Int']['input']>;
  increment_lte?: InputMaybe<Scalars['Int']['input']>;
  increment_not?: InputMaybe<Scalars['Int']['input']>;
  increment_not_gt?: InputMaybe<Scalars['Int']['input']>;
  increment_not_gte?: InputMaybe<Scalars['Int']['input']>;
  increment_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  increment_not_lt?: InputMaybe<Scalars['Int']['input']>;
  increment_not_lte?: InputMaybe<Scalars['Int']['input']>;
  machine?: InputMaybe<Scalars['Int']['input']>;
  machine_gt?: InputMaybe<Scalars['Int']['input']>;
  machine_gte?: InputMaybe<Scalars['Int']['input']>;
  machine_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  machine_lt?: InputMaybe<Scalars['Int']['input']>;
  machine_lte?: InputMaybe<Scalars['Int']['input']>;
  machine_not?: InputMaybe<Scalars['Int']['input']>;
  machine_not_gt?: InputMaybe<Scalars['Int']['input']>;
  machine_not_gte?: InputMaybe<Scalars['Int']['input']>;
  machine_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  machine_not_lt?: InputMaybe<Scalars['Int']['input']>;
  machine_not_lte?: InputMaybe<Scalars['Int']['input']>;
  pid?: InputMaybe<Scalars['Short']['input']>;
  pid_gt?: InputMaybe<Scalars['Short']['input']>;
  pid_gte?: InputMaybe<Scalars['Short']['input']>;
  pid_in?: InputMaybe<Array<Scalars['Short']['input']>>;
  pid_lt?: InputMaybe<Scalars['Short']['input']>;
  pid_lte?: InputMaybe<Scalars['Short']['input']>;
  pid_not?: InputMaybe<Scalars['Short']['input']>;
  pid_not_gt?: InputMaybe<Scalars['Short']['input']>;
  pid_not_gte?: InputMaybe<Scalars['Short']['input']>;
  pid_not_in?: InputMaybe<Array<Scalars['Short']['input']>>;
  pid_not_lt?: InputMaybe<Scalars['Short']['input']>;
  pid_not_lte?: InputMaybe<Scalars['Short']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_not_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_not_lte?: InputMaybe<Scalars['Int']['input']>;
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

export type PhoneNumberDbObjectFilter = {
  AND?: InputMaybe<Array<PhoneNumberDbObjectFilter>>;
  OR?: InputMaybe<Array<PhoneNumberDbObjectFilter>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumberType_not?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_not_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumberType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber_not?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PlaceDbObject = {
  __typename?: 'PlaceDbObject';
  address: Scalars['String']['output'];
  location: LocationDbObject;
  placeId: Scalars['String']['output'];
  viewport: ViewPortDbObject;
};

export type PlaceDbObjectFilter = {
  AND?: InputMaybe<Array<PlaceDbObjectFilter>>;
  OR?: InputMaybe<Array<PlaceDbObjectFilter>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationDbObjectFilter>;
  placeId?: InputMaybe<Scalars['String']['input']>;
  placeId_contains?: InputMaybe<Scalars['String']['input']>;
  placeId_ends_with?: InputMaybe<Scalars['String']['input']>;
  placeId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  placeId_not?: InputMaybe<Scalars['String']['input']>;
  placeId_not_contains?: InputMaybe<Scalars['String']['input']>;
  placeId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  placeId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  placeId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  placeId_starts_with?: InputMaybe<Scalars['String']['input']>;
  viewport?: InputMaybe<ViewPortDbObjectFilter>;
};

export type PlaceDbObjectSort = {
  address?: InputMaybe<SortOperationKind>;
  location?: InputMaybe<LocationDbObjectSort>;
  placeId?: InputMaybe<SortOperationKind>;
  viewport?: InputMaybe<ViewPortDbObjectSort>;
};

export type PlaceRequestInput = {
  address: Scalars['String']['input'];
  location: LocationRequestInput;
  placeId: Scalars['String']['input'];
  viewport: ViewportRequestInput;
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
  loggedInUser?: Maybe<UserDbObject>;
  userByAwsCognitoId: Array<UserDbObject>;
  users?: Maybe<UsersConnection>;
};


export type QueryCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<CustomerDbObjectSort>;
  where?: InputMaybe<CustomerDbObjectFilter>;
};


export type QueryUserByAwsCognitoIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<UserDbObjectSort>;
  where?: InputMaybe<UserDbObjectFilter>;
};

export type RegisterRequestInput = {
  companyName: Scalars['String']['input'];
  companyPriority: Scalars['String']['input'];
  companySize: Scalars['String']['input'];
  companyType: Scalars['String']['input'];
  email: Scalars['String']['input'];
  marketingPreference: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  place: PlaceRequestInput;
  referralSource: Scalars['String']['input'];
};

export type ResendConfirmationCodeResponse = {
  __typename?: 'ResendConfirmationCodeResponse';
  codeDeliveryDetails?: Maybe<CodeDeliveryDetailsType>;
  contentLength: Scalars['Long']['output'];
  httpStatusCode: HttpStatusCode;
  responseMetadata?: Maybe<ResponseMetadata>;
};

export type ResponseMetadata = {
  __typename?: 'ResponseMetadata';
  checksumAlgorithm: CoreChecksumAlgorithm;
  checksumValidationStatus: ChecksumValidationStatus;
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  requestId?: Maybe<Scalars['String']['output']>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  codeDeliveryDetails?: Maybe<CodeDeliveryDetailsType>;
  contentLength: Scalars['Long']['output'];
  httpStatusCode: HttpStatusCode;
  responseMetadata?: Maybe<ResponseMetadata>;
  userConfirmed: Scalars['Boolean']['output'];
  userSub?: Maybe<Scalars['String']['output']>;
};

export enum SortOperationKind {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UserDbObject = {
  __typename?: 'UserDbObject';
  companiesMemberOf?: Maybe<Array<Maybe<UserDbObject>>>;
  companyName: Scalars['String']['output'];
  companyPriority: Scalars['String']['output'];
  companySize: Scalars['String']['output'];
  companyType: Scalars['String']['output'];
  createdDate: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  marketingPreference: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneVerified: Scalars['Boolean']['output'];
  place: PlaceDbObject;
  referralSource: Scalars['String']['output'];
  staff?: Maybe<Array<Maybe<UserDbObject>>>;
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
};

export type UserDbObjectFilter = {
  AND?: InputMaybe<Array<UserDbObjectFilter>>;
  OR?: InputMaybe<Array<UserDbObjectFilter>>;
  companiesMemberOf_all?: InputMaybe<ISingleFilterOfGuidFilter>;
  companiesMemberOf_any?: InputMaybe<Scalars['Boolean']['input']>;
  companiesMemberOf_none?: InputMaybe<ISingleFilterOfGuidFilter>;
  companiesMemberOf_some?: InputMaybe<ISingleFilterOfGuidFilter>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyName_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyName_not?: InputMaybe<Scalars['String']['input']>;
  companyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyName_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyPriority?: InputMaybe<Scalars['String']['input']>;
  companyPriority_contains?: InputMaybe<Scalars['String']['input']>;
  companyPriority_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyPriority_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyPriority_not?: InputMaybe<Scalars['String']['input']>;
  companyPriority_not_contains?: InputMaybe<Scalars['String']['input']>;
  companyPriority_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyPriority_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyPriority_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyPriority_starts_with?: InputMaybe<Scalars['String']['input']>;
  companySize?: InputMaybe<Scalars['String']['input']>;
  companySize_contains?: InputMaybe<Scalars['String']['input']>;
  companySize_ends_with?: InputMaybe<Scalars['String']['input']>;
  companySize_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companySize_not?: InputMaybe<Scalars['String']['input']>;
  companySize_not_contains?: InputMaybe<Scalars['String']['input']>;
  companySize_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  companySize_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companySize_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  companySize_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyType?: InputMaybe<Scalars['String']['input']>;
  companyType_contains?: InputMaybe<Scalars['String']['input']>;
  companyType_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyType_not?: InputMaybe<Scalars['String']['input']>;
  companyType_not_contains?: InputMaybe<Scalars['String']['input']>;
  companyType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  companyType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyType_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdDate?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdDate_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdDate_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  emailVerified_not?: InputMaybe<Scalars['Boolean']['input']>;
  email_contains?: InputMaybe<Scalars['String']['input']>;
  email_ends_with?: InputMaybe<Scalars['String']['input']>;
  email_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not?: InputMaybe<Scalars['String']['input']>;
  email_not_contains?: InputMaybe<Scalars['String']['input']>;
  email_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  email_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  email_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  email_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  id_gt?: InputMaybe<Scalars['UUID']['input']>;
  id_gte?: InputMaybe<Scalars['UUID']['input']>;
  id_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  id_lt?: InputMaybe<Scalars['UUID']['input']>;
  id_lte?: InputMaybe<Scalars['UUID']['input']>;
  id_not?: InputMaybe<Scalars['UUID']['input']>;
  id_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  id_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  id_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  id_not_lte?: InputMaybe<Scalars['UUID']['input']>;
  marketingPreference?: InputMaybe<Scalars['Boolean']['input']>;
  marketingPreference_not?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber_not?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_contains?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_starts_with?: InputMaybe<Scalars['String']['input']>;
  phoneVerified?: InputMaybe<Scalars['Boolean']['input']>;
  phoneVerified_not?: InputMaybe<Scalars['Boolean']['input']>;
  place?: InputMaybe<PlaceDbObjectFilter>;
  referralSource?: InputMaybe<Scalars['String']['input']>;
  referralSource_contains?: InputMaybe<Scalars['String']['input']>;
  referralSource_ends_with?: InputMaybe<Scalars['String']['input']>;
  referralSource_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralSource_not?: InputMaybe<Scalars['String']['input']>;
  referralSource_not_contains?: InputMaybe<Scalars['String']['input']>;
  referralSource_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referralSource_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralSource_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referralSource_starts_with?: InputMaybe<Scalars['String']['input']>;
  staff_all?: InputMaybe<ISingleFilterOfGuidFilter>;
  staff_any?: InputMaybe<Scalars['Boolean']['input']>;
  staff_none?: InputMaybe<ISingleFilterOfGuidFilter>;
  staff_some?: InputMaybe<ISingleFilterOfGuidFilter>;
  updatedDate?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedDate_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserDbObjectSort = {
  companyName?: InputMaybe<SortOperationKind>;
  companyPriority?: InputMaybe<SortOperationKind>;
  companySize?: InputMaybe<SortOperationKind>;
  companyType?: InputMaybe<SortOperationKind>;
  createdDate?: InputMaybe<SortOperationKind>;
  email?: InputMaybe<SortOperationKind>;
  emailVerified?: InputMaybe<SortOperationKind>;
  id?: InputMaybe<SortOperationKind>;
  marketingPreference?: InputMaybe<SortOperationKind>;
  name?: InputMaybe<SortOperationKind>;
  phoneNumber?: InputMaybe<SortOperationKind>;
  phoneVerified?: InputMaybe<SortOperationKind>;
  place?: InputMaybe<PlaceDbObjectSort>;
  referralSource?: InputMaybe<SortOperationKind>;
  updatedDate?: InputMaybe<SortOperationKind>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UserDbObject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UserDbObject;
};

export type ViewPortDbObject = {
  __typename?: 'ViewPortDbObject';
  northeast: LocationDbObject;
  southwest: LocationDbObject;
};

export type ViewPortDbObjectFilter = {
  AND?: InputMaybe<Array<ViewPortDbObjectFilter>>;
  OR?: InputMaybe<Array<ViewPortDbObjectFilter>>;
  northeast?: InputMaybe<LocationDbObjectFilter>;
  southwest?: InputMaybe<LocationDbObjectFilter>;
};

export type ViewPortDbObjectSort = {
  northeast?: InputMaybe<LocationDbObjectSort>;
  southwest?: InputMaybe<LocationDbObjectSort>;
};

export type ViewportRequestInput = {
  northeast: LocationRequestInput;
  southwest: LocationRequestInput;
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangedForgottenPasswordRequestInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ConfirmForgotPasswordResponse', httpStatusCode: HttpStatusCode } };

export type ConfirmAccountMutationVariables = Exact<{
  confirmationCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type ConfirmAccountMutation = { __typename?: 'Mutation', confirmAccount: { __typename?: 'AccountConfirmationResponse', isConfirmationSuccess: boolean, message?: string | null, confirmSignUpResponse?: { __typename?: 'ConfirmSignUpResponse', contentLength: any, httpStatusCode: HttpStatusCode, responseMetadata?: { __typename?: 'ResponseMetadata', checksumAlgorithm: CoreChecksumAlgorithm, checksumValidationStatus: ChecksumValidationStatus, requestId?: string | null, metadata?: Array<{ __typename?: 'KeyValuePairOfStringAndString', key: string, value: string }> | null } | null } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', httpStatusCode: HttpStatusCode } };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser?: { __typename?: 'UserDbObject', id: any, name: string, companyName: string, email: string } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', isSuccess: boolean, isConfirmed: boolean, user?: { __typename?: 'UserDbObject', email: string, name: string, companyName: string, emailVerified: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', message: string, success: boolean } };

export type RegisterMutationVariables = Exact<{
  input: RegisterRequestInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'SignUpResponse', httpStatusCode: HttpStatusCode, userConfirmed: boolean, userSub?: string | null } };

export type ResendVerificationCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendVerificationCodeMutation = { __typename?: 'Mutation', resendVerificationCode: { __typename?: 'ResendConfirmationCodeResponse', contentLength: any, httpStatusCode: HttpStatusCode, responseMetadata?: { __typename?: 'ResponseMetadata', checksumAlgorithm: CoreChecksumAlgorithm, checksumValidationStatus: ChecksumValidationStatus, requestId?: string | null, metadata?: Array<{ __typename?: 'KeyValuePairOfStringAndString', key: string, value: string }> | null } | null } };

export type CustomerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CustomerByIdQuery = { __typename?: 'Query', customerById?: { __typename?: 'CustomerDbObject', id: string, customerReferenceNumber: string, title?: string | null, name?: string | null, surname?: string | null, fullName: string, alias?: string | null, status: string, createdAt: any, createdBy: any, modifiedAt?: any | null, modifiedBy?: any | null, referredByCustomer?: string | null, referredByOther?: string | null, referralFeeFixed?: any | null, referralFeePercentage?: any | null, customerRating?: any | null, tags?: Array<string> | null, comments?: Array<{ __typename?: 'CommentDbObject', comment?: string | null, uploadUrls: Array<string> }> | null, emails?: Array<{ __typename?: 'EmailDbObject', email: string, emailType: string }> | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberDbObject', phoneNumber: string, phoneNumberType: string }> | null, properties?: Array<{ __typename?: 'PropertyDbObject', id: string, property: { __typename?: 'AddressDbObject', address?: string | null, fullAddress?: string | null } } | null> | null } | null };

export type CustomersPagedQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type CustomersPagedQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomersConnection', edges?: Array<{ __typename?: 'CustomersEdge', node: { __typename?: 'CustomerDbObject', id: string, title?: string | null, status: string, fullName: string, tags?: Array<string> | null, name?: string | null, surname?: string | null, modifiedAt?: any | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberDbObject', phoneNumber: string }> | null, properties?: Array<{ __typename?: 'PropertyDbObject', property: { __typename?: 'AddressDbObject', address?: string | null, fullAddress?: string | null } } | null> | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangedForgottenPasswordRequestInput!) {
  changePassword(request: $input) {
    httpStatusCode
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmAccountDocument = gql`
    mutation ConfirmAccount($confirmationCode: String!, $email: String!) {
  confirmAccount(confirmationCode: $confirmationCode, email: $email) {
    confirmSignUpResponse {
      contentLength
      httpStatusCode
      responseMetadata {
        checksumAlgorithm
        checksumValidationStatus
        metadata {
          key
          value
        }
        requestId
      }
    }
    isConfirmationSuccess
    message
  }
}
    `;
export type ConfirmAccountMutationFn = Apollo.MutationFunction<ConfirmAccountMutation, ConfirmAccountMutationVariables>;

/**
 * __useConfirmAccountMutation__
 *
 * To run a mutation, you first call `useConfirmAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAccountMutation, { data, loading, error }] = useConfirmAccountMutation({
 *   variables: {
 *      confirmationCode: // value for 'confirmationCode'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmAccountMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmAccountMutation, ConfirmAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmAccountMutation, ConfirmAccountMutationVariables>(ConfirmAccountDocument, options);
      }
export type ConfirmAccountMutationHookResult = ReturnType<typeof useConfirmAccountMutation>;
export type ConfirmAccountMutationResult = Apollo.MutationResult<ConfirmAccountMutation>;
export type ConfirmAccountMutationOptions = Apollo.BaseMutationOptions<ConfirmAccountMutation, ConfirmAccountMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    httpStatusCode
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoggedInUserDocument = gql`
    query LoggedInUser {
  loggedInUser {
    id
    name
    companyName
    email
  }
}
    `;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export function useLoggedInUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserSuspenseQueryHookResult = ReturnType<typeof useLoggedInUserSuspenseQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {
  login(
    request: {username: $username, password: $password, rememberMe: $rememberMe}
  ) {
    user {
      email
      name
      companyName
      emailVerified
    }
    isSuccess
    isConfirmed
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      rememberMe: // value for 'rememberMe'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterRequestInput!) {
  register(request: $input) {
    httpStatusCode
    userConfirmed
    userSub
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResendVerificationCodeDocument = gql`
    mutation ResendVerificationCode($email: String!) {
  resendVerificationCode(email: $email) {
    contentLength
    httpStatusCode
    responseMetadata {
      checksumAlgorithm
      checksumValidationStatus
      metadata {
        key
        value
      }
      requestId
    }
  }
}
    `;
export type ResendVerificationCodeMutationFn = Apollo.MutationFunction<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>;

/**
 * __useResendVerificationCodeMutation__
 *
 * To run a mutation, you first call `useResendVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationCodeMutation, { data, loading, error }] = useResendVerificationCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>(ResendVerificationCodeDocument, options);
      }
export type ResendVerificationCodeMutationHookResult = ReturnType<typeof useResendVerificationCodeMutation>;
export type ResendVerificationCodeMutationResult = Apollo.MutationResult<ResendVerificationCodeMutation>;
export type ResendVerificationCodeMutationOptions = Apollo.BaseMutationOptions<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>;
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