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

export type GeneralCompanyInfoDbObject = {
  __typename?: 'GeneralCompanyInfoDbObject';
  annualRevenue: Scalars['String']['output'];
  companyPriority: Scalars['String']['output'];
  companySize: Scalars['String']['output'];
  marketingPreference: Scalars['String']['output'];
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

export type LoginRequestInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRandomUser: UserDbObject;
  confirmRegistration: ConfirmSignUpResponse;
  generateFakeCustomers: Scalars['String']['output'];
  register: SignUpResponse;
  resendConfirmationCode: ResendConfirmationCodeResponse;
};


export type MutationAddRandomUserArgs = {
  request: RegisterRequestInput;
};


export type MutationConfirmRegistrationArgs = {
  confirmationCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationGenerateFakeCustomersArgs = {
  quantity: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  request: RegisterRequestInput;
};


export type MutationResendConfirmationCodeArgs = {
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
  login: TokenResponse;
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


export type QueryLoginArgs = {
  request: LoginRequestInput;
};

export type RegisterRequestInput = {
  address: Scalars['String']['input'];
  annualRevenue: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  companyPriority: Scalars['String']['input'];
  companySize: Scalars['String']['input'];
  companyType: Scalars['String']['input'];
  email: Scalars['String']['input'];
  marketingPreference: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
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

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String']['output'];
  idToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UserDbObject = {
  __typename?: 'UserDbObject';
  address: Scalars['String']['output'];
  awsCognitoUserId: Scalars['UUID']['output'];
  companiesMemberOf?: Maybe<Array<Maybe<UserDbObject>>>;
  companyName: Scalars['String']['output'];
  companyType: Scalars['String']['output'];
  createdDate: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  generalInfo: GeneralCompanyInfoDbObject;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneVerified: Scalars['Boolean']['output'];
  staff?: Maybe<Array<Maybe<UserDbObject>>>;
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
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