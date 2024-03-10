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
  Upload: { input: any; output: any; }
};

export type AccountConfirmationResponse = {
  __typename?: 'AccountConfirmationResponse';
  confirmSignUpResponse?: Maybe<ConfirmSignUpResponse>;
  isConfirmationSuccess: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type AddLaborRateRequestInput = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingTiers?: InputMaybe<Array<PricingTierRequestInput>>;
  rateType?: InputMaybe<Scalars['String']['input']>;
  usePriceRange: Scalars['Boolean']['input'];
};

export type AddMaterialRequestInput = {
  allowOnlineBooking: Scalars['Boolean']['input'];
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  markup?: InputMaybe<MarkupEntityInput>;
  name: Scalars['String']['input'];
  onlineMaterialUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  onlinePrice?: InputMaybe<Scalars['Decimal']['input']>;
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingTiers?: InputMaybe<Array<PricingTierEntityInput>>;
  taxable: Scalars['Boolean']['input'];
  unitType: Scalars['String']['input'];
  usePriceRange: Scalars['Boolean']['input'];
};

export type AddNewCustomerRequestInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  customerType: Scalars['String']['input'];
  emails?: InputMaybe<Array<EmailRequestInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumbers?: InputMaybe<Array<PhoneNumberRequestInput>>;
  properties?: InputMaybe<Array<PropertyRequestInput>>;
  reference?: InputMaybe<LinkReferenceRequestInput>;
  surname?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  useCompanyName: Scalars['Boolean']['input'];
};

export type AddNewExternalReferenceRequestInput = {
  companyName?: InputMaybe<Scalars['String']['input']>;
  compensation?: InputMaybe<CompensationDetailsRequestInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<EmailRequestInput>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<PhoneNumberRequestInput>;
  place?: InputMaybe<PlaceRequestInput>;
  referenceType: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  useCompanyName: Scalars['Boolean']['input'];
};

export type AddNewExternalReferenceResponse = {
  __typename?: 'AddNewExternalReferenceResponse';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AddNewServiceCategoryRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  name: Scalars['String']['input'];
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
};

export type AddServiceBundleRequestInput = {
  additionalCosts?: InputMaybe<Array<AdditionalServiceCostRequestInput>>;
  allowOnlineBooking: Scalars['Boolean']['input'];
  cost: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<ServiceDurationRequestInput>;
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  laborRates?: InputMaybe<Array<ServiceLabourRequestInput>>;
  markup?: InputMaybe<MarkupRequestInput>;
  materials?: InputMaybe<Array<ServiceMaterialRequestInput>>;
  name: Scalars['String']['input'];
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  price: Scalars['Decimal']['input'];
  serviceCreationType: ServiceCreationType;
  serviceId: Scalars['ID']['input'];
  taxRateId: Scalars['ID']['input'];
  unit?: InputMaybe<Scalars['Decimal']['input']>;
  unitType?: InputMaybe<Scalars['String']['input']>;
  useCalculatedPrice: Scalars['Boolean']['input'];
  warrantyIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AddServiceRequestInput = {
  additionalCosts?: InputMaybe<Array<AdditionalServiceCostRequestInput>>;
  allowOnlineBooking: Scalars['Boolean']['input'];
  cost: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<ServiceDurationRequestInput>;
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  laborRates?: InputMaybe<Array<ServiceLabourRequestInput>>;
  markup?: InputMaybe<MarkupRequestInput>;
  materials?: InputMaybe<Array<ServiceMaterialRequestInput>>;
  name: Scalars['String']['input'];
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  price: Scalars['Decimal']['input'];
  serviceCreationType: ServiceCreationType;
  taxRateId: Scalars['ID']['input'];
  unit?: InputMaybe<Scalars['Decimal']['input']>;
  unitType?: InputMaybe<Scalars['String']['input']>;
  useCalculatedPrice: Scalars['Boolean']['input'];
  warrantyIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AddTaxRateRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  percentageRate: Scalars['Decimal']['input'];
};

export type AddWarrantyRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  terms: Scalars['String']['input'];
  warrantyDuration: WarrantyDurationRequestInput;
  warrantyType?: InputMaybe<Scalars['String']['input']>;
};

export type AdditionalServiceCostEntity = {
  __typename?: 'AdditionalServiceCostEntity';
  cost: Scalars['Decimal']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  taxRate?: Maybe<TaxRateEntity>;
  taxRateId?: Maybe<Scalars['ID']['output']>;
  taxRateType?: Maybe<TaxRateType>;
};

export type AdditionalServiceCostRequestInput = {
  cost: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  taxRateId?: InputMaybe<Scalars['ID']['input']>;
  taxRateType?: InputMaybe<TaxRateType>;
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

export type CommentEntity = Node & {
  __typename?: 'CommentEntity';
  archived: Scalars['Boolean']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  commentType: CommentType;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  customer?: Maybe<CustomerEntity>;
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  owner: UserEntity;
  uploads?: Maybe<Array<UploadEntity>>;
  userOwnerId: Scalars['UUID']['output'];
};

export enum CommentType {
  Appointment = 'APPOINTMENT',
  General = 'GENERAL',
  Invoice = 'INVOICE',
  Job = 'JOB',
  Quote = 'QUOTE'
}

export type CompensationDetailsEntity = {
  __typename?: 'CompensationDetailsEntity';
  amount: Scalars['Decimal']['output'];
  compensationType: CompensationType;
  currency?: Maybe<Scalars['String']['output']>;
};

export type CompensationDetailsRequestInput = {
  amount: Scalars['Decimal']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  type: CompensationType;
};

export enum CompensationType {
  Monthly = 'MONTHLY',
  OneTimeFixed = 'ONE_TIME_FIXED',
  OneTimePercentage = 'ONE_TIME_PERCENTAGE',
  RecurringFixed = 'RECURRING_FIXED',
  RecurringPercentage = 'RECURRING_PERCENTAGE',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

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

export type CustomerEntity = Node & {
  __typename?: 'CustomerEntity';
  alias?: Maybe<Scalars['String']['output']>;
  archived: Scalars['Boolean']['output'];
  commentIds?: Maybe<Array<Scalars['ID']['output']>>;
  comments: Array<CommentEntity>;
  companyName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  customerRating?: Maybe<Scalars['Decimal']['output']>;
  customerReferenceNumber?: Maybe<Scalars['String']['output']>;
  customerType: Scalars['String']['output'];
  emails?: Maybe<Array<EmailEntity>>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name?: Maybe<Scalars['String']['output']>;
  owner: UserEntity;
  phoneNumbers?: Maybe<Array<PhoneNumberEntity>>;
  properties: Array<PropertyEntity>;
  propertyIds?: Maybe<Array<Scalars['ID']['output']>>;
  reference?: Maybe<ReferenceInfoEntity>;
  status: CustomerStatus;
  surname?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  useCompanyName: Scalars['Boolean']['output'];
  userOwnerId: Scalars['UUID']['output'];
};

export type CustomerEntityFilter = {
  AND?: InputMaybe<Array<CustomerEntityFilter>>;
  OR?: InputMaybe<Array<CustomerEntityFilter>>;
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
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  archived_not?: InputMaybe<Scalars['Boolean']['input']>;
  commentIds_all?: InputMaybe<ObjectIdFilter>;
  commentIds_any?: InputMaybe<Scalars['Boolean']['input']>;
  commentIds_none?: InputMaybe<ObjectIdFilter>;
  commentIds_some?: InputMaybe<ObjectIdFilter>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyName_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  companyName_not?: InputMaybe<Scalars['String']['input']>;
  companyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  companyName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  companyName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  companyName_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  createdById?: InputMaybe<Scalars['UUID']['input']>;
  createdById_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdById_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_lte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdById_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_lte?: InputMaybe<Scalars['UUID']['input']>;
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
  customerReferenceNumber_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  customerReferenceNumber_not?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_contains?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  customerReferenceNumber_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  customerReferenceNumber_starts_with?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<Scalars['String']['input']>;
  customerType_contains?: InputMaybe<Scalars['String']['input']>;
  customerType_ends_with?: InputMaybe<Scalars['String']['input']>;
  customerType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  customerType_not?: InputMaybe<Scalars['String']['input']>;
  customerType_not_contains?: InputMaybe<Scalars['String']['input']>;
  customerType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  customerType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  customerType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  customerType_starts_with?: InputMaybe<Scalars['String']['input']>;
  emails_all?: InputMaybe<EmailEntityFilter>;
  emails_any?: InputMaybe<Scalars['Boolean']['input']>;
  emails_none?: InputMaybe<EmailEntityFilter>;
  emails_some?: InputMaybe<EmailEntityFilter>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  fullName_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullName_not?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  modifiedById?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedById_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_lte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedById_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_lte?: InputMaybe<Scalars['UUID']['input']>;
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
  phoneNumbers_all?: InputMaybe<PhoneNumberEntityFilter>;
  phoneNumbers_any?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumbers_none?: InputMaybe<PhoneNumberEntityFilter>;
  phoneNumbers_some?: InputMaybe<PhoneNumberEntityFilter>;
  propertyIds_all?: InputMaybe<ObjectIdFilter>;
  propertyIds_any?: InputMaybe<Scalars['Boolean']['input']>;
  propertyIds_none?: InputMaybe<ObjectIdFilter>;
  propertyIds_some?: InputMaybe<ObjectIdFilter>;
  reference?: InputMaybe<ReferenceInfoEntityFilter>;
  status?: InputMaybe<CustomerStatus>;
  status_gt?: InputMaybe<CustomerStatus>;
  status_gte?: InputMaybe<CustomerStatus>;
  status_in?: InputMaybe<Array<CustomerStatus>>;
  status_lt?: InputMaybe<CustomerStatus>;
  status_lte?: InputMaybe<CustomerStatus>;
  status_not?: InputMaybe<CustomerStatus>;
  status_not_gt?: InputMaybe<CustomerStatus>;
  status_not_gte?: InputMaybe<CustomerStatus>;
  status_not_in?: InputMaybe<Array<CustomerStatus>>;
  status_not_lt?: InputMaybe<CustomerStatus>;
  status_not_lte?: InputMaybe<CustomerStatus>;
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
  useCompanyName?: InputMaybe<Scalars['Boolean']['input']>;
  useCompanyName_not?: InputMaybe<Scalars['Boolean']['input']>;
  userOwnerId?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_gt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_gte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  userOwnerId_lt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_lte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  userOwnerId_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_lte?: InputMaybe<Scalars['UUID']['input']>;
};

export type CustomerEntitySort = {
  alias?: InputMaybe<SortOperationKind>;
  archived?: InputMaybe<SortOperationKind>;
  companyName?: InputMaybe<SortOperationKind>;
  createdAt?: InputMaybe<SortOperationKind>;
  createdById?: InputMaybe<SortOperationKind>;
  customerRating?: InputMaybe<SortOperationKind>;
  customerReferenceNumber?: InputMaybe<SortOperationKind>;
  customerType?: InputMaybe<SortOperationKind>;
  fullName?: InputMaybe<SortOperationKind>;
  modifiedAt?: InputMaybe<SortOperationKind>;
  modifiedById?: InputMaybe<SortOperationKind>;
  name?: InputMaybe<SortOperationKind>;
  reference?: InputMaybe<ReferenceInfoEntitySort>;
  status?: InputMaybe<SortOperationKind>;
  surname?: InputMaybe<SortOperationKind>;
  title?: InputMaybe<SortOperationKind>;
  useCompanyName?: InputMaybe<SortOperationKind>;
  userOwnerId?: InputMaybe<SortOperationKind>;
};

export enum CustomerStatus {
  AppointmentSet = 'APPOINTMENT_SET',
  ClosedLost = 'CLOSED_LOST',
  Completed = 'COMPLETED',
  FollowUpRequired = 'FOLLOW_UP_REQUIRED',
  InvoiceSent = 'INVOICE_SENT',
  Lead = 'LEAD',
  PaymentReceived = 'PAYMENT_RECEIVED',
  QuoteAccepted = 'QUOTE_ACCEPTED',
  QuoteProvided = 'QUOTE_PROVIDED',
  WorkCompleted = 'WORK_COMPLETED',
  WorkInProgress = 'WORK_IN_PROGRESS',
  WorkScheduled = 'WORK_SCHEDULED'
}

/** A connection to a list of items. */
export type CustomersConnection = {
  __typename?: 'CustomersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CustomerEntity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CustomersEdge = {
  __typename?: 'CustomersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomerEntity;
};

export type DeliveryMediumType = {
  __typename?: 'DeliveryMediumType';
  value?: Maybe<Scalars['String']['output']>;
};

export enum DurationType {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Months = 'MONTHS',
  Weeks = 'WEEKS'
}

export type EmailEntity = {
  __typename?: 'EmailEntity';
  email: Scalars['String']['output'];
  emailType: Scalars['String']['output'];
  receiveNotifications: Scalars['Boolean']['output'];
};

export type EmailEntityFilter = {
  AND?: InputMaybe<Array<EmailEntityFilter>>;
  OR?: InputMaybe<Array<EmailEntityFilter>>;
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
  receiveNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  receiveNotifications_not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EmailRequestInput = {
  email: Scalars['String']['input'];
  emailType: Scalars['String']['input'];
  receiveNotifications: Scalars['Boolean']['input'];
};

export type ExternalReferenceEntity = Node & {
  __typename?: 'ExternalReferenceEntity';
  companyName?: Maybe<Scalars['String']['output']>;
  compensation?: Maybe<CompensationDetailsEntity>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<EmailEntity>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: UserEntity;
  phoneNumber?: Maybe<PhoneNumberEntity>;
  place?: Maybe<PlaceRequestEntity>;
  referenceType: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  useCompanyName: Scalars['Boolean']['output'];
  userOwnerId: Scalars['UUID']['output'];
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

export type IOperationResult = {
  errors?: Maybe<Array<Scalars['String']['output']>>;
  messages?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
};

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

export type ImageEntity = {
  __typename?: 'ImageEntity';
  byteSize?: Maybe<Scalars['Long']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndString = {
  __typename?: 'KeyValuePairOfStringAndString';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LaborRateEntity = Node & {
  __typename?: 'LaborRateEntity';
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  pricingTiers?: Maybe<Array<PricingTierEntity>>;
  rateType?: Maybe<Scalars['String']['output']>;
  serviceCategory?: Maybe<ServiceCategoryEntity>;
  usePriceRange: Scalars['Boolean']['output'];
  userOwnerId: Scalars['UUID']['output'];
};

export type LinkReferenceRequestInput = {
  id: Scalars['ID']['input'];
  referenceType: ReferenceType;
};

export type LocationEntity = {
  __typename?: 'LocationEntity';
  lat: Scalars['Decimal']['output'];
  lng: Scalars['Decimal']['output'];
};

export type LocationEntityFilter = {
  AND?: InputMaybe<Array<LocationEntityFilter>>;
  OR?: InputMaybe<Array<LocationEntityFilter>>;
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

export type LocationEntitySort = {
  lat?: InputMaybe<SortOperationKind>;
  lng?: InputMaybe<SortOperationKind>;
};

export type LocationRequest = {
  __typename?: 'LocationRequest';
  lat: Scalars['Decimal']['output'];
  lng: Scalars['Decimal']['output'];
};

export type LocationRequestFilter = {
  AND?: InputMaybe<Array<LocationRequestFilter>>;
  OR?: InputMaybe<Array<LocationRequestFilter>>;
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

export type LocationRequestInput = {
  lat: Scalars['Decimal']['input'];
  lng: Scalars['Decimal']['input'];
};

export type LocationRequestSort = {
  lat?: InputMaybe<SortOperationKind>;
  lng?: InputMaybe<SortOperationKind>;
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
  user?: Maybe<UserEntity>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type MarkupEntity = {
  __typename?: 'MarkupEntity';
  type: MarkupType;
  value: Scalars['Decimal']['output'];
};

export type MarkupEntityInput = {
  type: MarkupType;
  value: Scalars['Decimal']['input'];
};

export type MarkupRequestInput = {
  type: MarkupType;
  value: Scalars['Decimal']['input'];
};

export enum MarkupType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export type MaterialEntity = Node & {
  __typename?: 'MaterialEntity';
  allowOnlineBooking: Scalars['Boolean']['output'];
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<ImageEntity>>;
  markup?: Maybe<MarkupEntity>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  onlineMaterialUrls?: Maybe<Array<Scalars['String']['output']>>;
  onlinePrice?: Maybe<Scalars['Decimal']['output']>;
  owner: UserEntity;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  pricingTiers?: Maybe<Array<PricingTierEntity>>;
  serviceCategory?: Maybe<ServiceCategoryEntity>;
  taxable: Scalars['Boolean']['output'];
  unitType: Scalars['String']['output'];
  usePriceRange: Scalars['Boolean']['output'];
  userOwnerId: Scalars['UUID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLaborRate: LaborRateEntity;
  addMaterial: MaterialEntity;
  addNewCustomer: CustomerEntity;
  addNewExternalReference: AddNewExternalReferenceResponse;
  addNewServiceCategory: ServiceCategoryEntity;
  addService: ServiceEntity;
  addServiceBundle: ServiceBundleEntity;
  addTaxRate: TaxRateEntity;
  addWarranty: WarrantyEntity;
  changePassword: ConfirmForgotPasswordResponse;
  confirmAccount: AccountConfirmationResponse;
  deleteServiceCategory: IOperationResult;
  forgotPassword: ForgotPasswordResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  register: SignUpResponse;
  resendVerificationCode: ResendConfirmationCodeResponse;
  updateServiceCategory: OperationResultOfServiceCategoryEntity;
};


export type MutationAddLaborRateArgs = {
  request: AddLaborRateRequestInput;
};


export type MutationAddMaterialArgs = {
  request: AddMaterialRequestInput;
};


export type MutationAddNewCustomerArgs = {
  request: AddNewCustomerRequestInput;
};


export type MutationAddNewExternalReferenceArgs = {
  request: AddNewExternalReferenceRequestInput;
};


export type MutationAddNewServiceCategoryArgs = {
  request: AddNewServiceCategoryRequestInput;
};


export type MutationAddServiceArgs = {
  request: AddServiceRequestInput;
};


export type MutationAddServiceBundleArgs = {
  request: AddServiceBundleRequestInput;
};


export type MutationAddTaxRateArgs = {
  request: AddTaxRateRequestInput;
};


export type MutationAddWarrantyArgs = {
  request: AddWarrantyRequestInput;
};


export type MutationChangePasswordArgs = {
  request: ChangedForgottenPasswordRequestInput;
};


export type MutationConfirmAccountArgs = {
  confirmationCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationDeleteServiceCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
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


export type MutationUpdateServiceCategoryArgs = {
  request: UpdateServiceCategoryRequestInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
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

export type OperationResult = IOperationResult & {
  __typename?: 'OperationResult';
  addError: OperationResult;
  addMessage: OperationResult;
  errors?: Maybe<Array<Scalars['String']['output']>>;
  messages?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
};


export type OperationResultAddErrorArgs = {
  error: Scalars['String']['input'];
};


export type OperationResultAddMessageArgs = {
  error: Scalars['String']['input'];
};

export type OperationResultOfServiceCategoryEntity = IOperationResult & {
  __typename?: 'OperationResultOfServiceCategoryEntity';
  addError: OperationResult;
  addMessage: OperationResult;
  data?: Maybe<ServiceCategoryEntity>;
  errors?: Maybe<Array<Scalars['String']['output']>>;
  messages?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
};


export type OperationResultOfServiceCategoryEntityAddErrorArgs = {
  error: Scalars['String']['input'];
};


export type OperationResultOfServiceCategoryEntityAddMessageArgs = {
  error: Scalars['String']['input'];
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

export type PhoneNumberEntity = {
  __typename?: 'PhoneNumberEntity';
  phoneNumber: Scalars['String']['output'];
  phoneNumberType: Scalars['String']['output'];
  receiveNotifications: Scalars['Boolean']['output'];
};

export type PhoneNumberEntityFilter = {
  AND?: InputMaybe<Array<PhoneNumberEntityFilter>>;
  OR?: InputMaybe<Array<PhoneNumberEntityFilter>>;
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
  receiveNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  receiveNotifications_not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PhoneNumberRequestInput = {
  phoneNumber: Scalars['String']['input'];
  phoneNumberType: Scalars['String']['input'];
  receiveNotifications: Scalars['Boolean']['input'];
};

export type PlaceEntity = {
  __typename?: 'PlaceEntity';
  address: Scalars['String']['output'];
  callingCode: Scalars['String']['output'];
  country: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  location: LocationEntity;
  placeId: Scalars['String']['output'];
  viewport: ViewportEntity;
};

export type PlaceEntityFilter = {
  AND?: InputMaybe<Array<PlaceEntityFilter>>;
  OR?: InputMaybe<Array<PlaceEntityFilter>>;
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
  callingCode?: InputMaybe<Scalars['String']['input']>;
  callingCode_contains?: InputMaybe<Scalars['String']['input']>;
  callingCode_ends_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callingCode_not?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callingCode_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_starts_with?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  countryCode_contains?: InputMaybe<Scalars['String']['input']>;
  countryCode_ends_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_in?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCode_not?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCode_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_starts_with?: InputMaybe<Scalars['String']['input']>;
  country_contains?: InputMaybe<Scalars['String']['input']>;
  country_ends_with?: InputMaybe<Scalars['String']['input']>;
  country_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_not?: InputMaybe<Scalars['String']['input']>;
  country_not_contains?: InputMaybe<Scalars['String']['input']>;
  country_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  country_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  country_starts_with?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationEntityFilter>;
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
  viewport?: InputMaybe<ViewportEntityFilter>;
};

export type PlaceEntitySort = {
  address?: InputMaybe<SortOperationKind>;
  callingCode?: InputMaybe<SortOperationKind>;
  country?: InputMaybe<SortOperationKind>;
  countryCode?: InputMaybe<SortOperationKind>;
  location?: InputMaybe<LocationEntitySort>;
  placeId?: InputMaybe<SortOperationKind>;
  viewport?: InputMaybe<ViewportEntitySort>;
};

export type PlaceRequestEntity = {
  __typename?: 'PlaceRequestEntity';
  address: Scalars['String']['output'];
  callingCode: Scalars['String']['output'];
  country: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  location: LocationRequest;
  placeId: Scalars['String']['output'];
  viewport: ViewportRequest;
};

export type PlaceRequestEntityFilter = {
  AND?: InputMaybe<Array<PlaceRequestEntityFilter>>;
  OR?: InputMaybe<Array<PlaceRequestEntityFilter>>;
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
  callingCode?: InputMaybe<Scalars['String']['input']>;
  callingCode_contains?: InputMaybe<Scalars['String']['input']>;
  callingCode_ends_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callingCode_not?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callingCode_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  callingCode_starts_with?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  countryCode_contains?: InputMaybe<Scalars['String']['input']>;
  countryCode_ends_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_in?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCode_not?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCode_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  countryCode_starts_with?: InputMaybe<Scalars['String']['input']>;
  country_contains?: InputMaybe<Scalars['String']['input']>;
  country_ends_with?: InputMaybe<Scalars['String']['input']>;
  country_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_not?: InputMaybe<Scalars['String']['input']>;
  country_not_contains?: InputMaybe<Scalars['String']['input']>;
  country_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  country_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  country_starts_with?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationRequestFilter>;
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
  viewport?: InputMaybe<ViewportRequestFilter>;
};

export type PlaceRequestEntitySort = {
  address?: InputMaybe<SortOperationKind>;
  callingCode?: InputMaybe<SortOperationKind>;
  country?: InputMaybe<SortOperationKind>;
  countryCode?: InputMaybe<SortOperationKind>;
  location?: InputMaybe<LocationRequestSort>;
  placeId?: InputMaybe<SortOperationKind>;
  viewport?: InputMaybe<ViewportRequestSort>;
};

export type PlaceRequestInput = {
  address: Scalars['String']['input'];
  callingCode: Scalars['String']['input'];
  country: Scalars['String']['input'];
  countryCode: Scalars['String']['input'];
  location: LocationRequestInput;
  placeId: Scalars['String']['input'];
  viewport: ViewportRequestInput;
};

export type PricingTierEntity = {
  __typename?: 'PricingTierEntity';
  cost?: Maybe<Scalars['Decimal']['output']>;
  price: Scalars['Decimal']['output'];
  unitRange: RangeOfDecimal;
};

export type PricingTierEntityInput = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  price: Scalars['Decimal']['input'];
  unitRange: RangeOfDecimalInput;
};

export type PricingTierRequestInput = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  price: Scalars['Decimal']['input'];
  unitRange: RangeOfDecimalInput;
};

/** A connection to a list of items. */
export type PropertiesConnection = {
  __typename?: 'PropertiesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PropertiesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PropertyEntity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PropertiesEdge = {
  __typename?: 'PropertiesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PropertyEntity;
};

export type PropertyEntity = Node & {
  __typename?: 'PropertyEntity';
  billing?: Maybe<PlaceRequestEntity>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  customerIds: Array<Scalars['ID']['output']>;
  customers: Array<CustomerEntity>;
  id: Scalars['ID']['output'];
  jobIds?: Maybe<Array<Scalars['ID']['output']>>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  owner: UserEntity;
  property: PlaceRequestEntity;
  quoteIds?: Maybe<Array<Scalars['ID']['output']>>;
  userOwnerId: Scalars['UUID']['output'];
};

export type PropertyEntityFilter = {
  AND?: InputMaybe<Array<PropertyEntityFilter>>;
  OR?: InputMaybe<Array<PropertyEntityFilter>>;
  billing?: InputMaybe<PlaceRequestEntityFilter>;
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
  createdById?: InputMaybe<Scalars['UUID']['input']>;
  createdById_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdById_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_lte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  createdById_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  createdById_not_lte?: InputMaybe<Scalars['UUID']['input']>;
  customerIds_all?: InputMaybe<ObjectIdFilter>;
  customerIds_any?: InputMaybe<Scalars['Boolean']['input']>;
  customerIds_none?: InputMaybe<ObjectIdFilter>;
  customerIds_some?: InputMaybe<ObjectIdFilter>;
  jobIds_all?: InputMaybe<ObjectIdFilter>;
  jobIds_any?: InputMaybe<Scalars['Boolean']['input']>;
  jobIds_none?: InputMaybe<ObjectIdFilter>;
  jobIds_some?: InputMaybe<ObjectIdFilter>;
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
  modifiedById?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedById_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_lte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  modifiedById_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  modifiedById_not_lte?: InputMaybe<Scalars['UUID']['input']>;
  property?: InputMaybe<PlaceRequestEntityFilter>;
  quoteIds_all?: InputMaybe<ObjectIdFilter>;
  quoteIds_any?: InputMaybe<Scalars['Boolean']['input']>;
  quoteIds_none?: InputMaybe<ObjectIdFilter>;
  quoteIds_some?: InputMaybe<ObjectIdFilter>;
  userOwnerId?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_gt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_gte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  userOwnerId_lt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_lte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_gt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_gte?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  userOwnerId_not_lt?: InputMaybe<Scalars['UUID']['input']>;
  userOwnerId_not_lte?: InputMaybe<Scalars['UUID']['input']>;
};

export type PropertyEntitySort = {
  billing?: InputMaybe<PlaceRequestEntitySort>;
  createdAt?: InputMaybe<SortOperationKind>;
  createdById?: InputMaybe<SortOperationKind>;
  modifiedAt?: InputMaybe<SortOperationKind>;
  modifiedById?: InputMaybe<SortOperationKind>;
  property?: InputMaybe<PlaceRequestEntitySort>;
  userOwnerId?: InputMaybe<SortOperationKind>;
};

export type PropertyRequestInput = {
  billing?: InputMaybe<PlaceRequestInput>;
  isBillingAddress: Scalars['Boolean']['input'];
  property?: InputMaybe<PlaceRequestInput>;
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<CommentEntity>;
  customer?: Maybe<CustomerEntity>;
  customerById?: Maybe<CustomerEntity>;
  customers?: Maybe<CustomersConnection>;
  externalReference?: Maybe<ExternalReferenceEntity>;
  laborRate?: Maybe<LaborRateEntity>;
  loggedInUser?: Maybe<UserEntity>;
  material?: Maybe<MaterialEntity>;
  properties?: Maybe<PropertiesConnection>;
  property?: Maybe<PropertyEntity>;
  propertyById?: Maybe<PropertyEntity>;
  searchCustomerReferences: ReferenceTrackingResponse;
  service?: Maybe<ServiceEntity>;
  serviceBundle?: Maybe<ServiceBundleEntity>;
  serviceCategories: Array<ServiceCategoryEntity>;
  serviceCategory?: Maybe<ServiceCategoryEntity>;
  taxRate?: Maybe<TaxRateEntity>;
  user?: Maybe<UserEntity>;
  userByAwsCognitoId: Array<UserEntity>;
  users?: Maybe<UsersConnection>;
  warranty?: Maybe<WarrantyEntity>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<CustomerEntitySort>;
  where?: InputMaybe<CustomerEntityFilter>;
};


export type QueryExternalReferenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLaborRateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPropertiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<PropertyEntitySort>;
  where?: InputMaybe<PropertyEntityFilter>;
};


export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPropertyByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchCustomerReferencesArgs = {
  request: SearchReferenceRequestInput;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceBundleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaxRateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByAwsCognitoIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<UserEntitySort>;
  where?: InputMaybe<UserEntityFilter>;
};


export type QueryWarrantyArgs = {
  id: Scalars['ID']['input'];
};

export type RangeOfDecimal = {
  __typename?: 'RangeOfDecimal';
  max: Scalars['Decimal']['output'];
  min: Scalars['Decimal']['output'];
  overlaps: Scalars['Boolean']['output'];
};


export type RangeOfDecimalOverlapsArgs = {
  other?: InputMaybe<RangeOfDecimalInput>;
};

export type RangeOfDecimalInput = {
  max: Scalars['Decimal']['input'];
  min: Scalars['Decimal']['input'];
};

export type RangeTierUnitEntity = {
  __typename?: 'RangeTierUnitEntity';
  quantity: Scalars['Decimal']['output'];
  range: RangeOfDecimal;
};

export type RangeTierUnitRequestInput = {
  quantity: Scalars['Decimal']['input'];
  range: RangeOfDecimalInput;
};

export type ReferenceInfoEntity = {
  __typename?: 'ReferenceInfoEntity';
  customer?: Maybe<CustomerEntity>;
  customerId?: Maybe<Scalars['ID']['output']>;
  externalReference?: Maybe<ExternalReferenceEntity>;
  externalReferenceId?: Maybe<Scalars['ID']['output']>;
  referenceType: ReferenceType;
};

export type ReferenceInfoEntityFilter = {
  AND?: InputMaybe<Array<ReferenceInfoEntityFilter>>;
  OR?: InputMaybe<Array<ReferenceInfoEntityFilter>>;
  referenceType?: InputMaybe<ReferenceType>;
  referenceType_gt?: InputMaybe<ReferenceType>;
  referenceType_gte?: InputMaybe<ReferenceType>;
  referenceType_in?: InputMaybe<Array<ReferenceType>>;
  referenceType_lt?: InputMaybe<ReferenceType>;
  referenceType_lte?: InputMaybe<ReferenceType>;
  referenceType_not?: InputMaybe<ReferenceType>;
  referenceType_not_gt?: InputMaybe<ReferenceType>;
  referenceType_not_gte?: InputMaybe<ReferenceType>;
  referenceType_not_in?: InputMaybe<Array<ReferenceType>>;
  referenceType_not_lt?: InputMaybe<ReferenceType>;
  referenceType_not_lte?: InputMaybe<ReferenceType>;
};

export type ReferenceInfoEntitySort = {
  referenceType?: InputMaybe<SortOperationKind>;
};

export type ReferenceResponse = {
  __typename?: 'ReferenceResponse';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  referenceType: ReferenceType;
};

export type ReferenceTrackingResponse = {
  __typename?: 'ReferenceTrackingResponse';
  customerHasNextPage: Scalars['Boolean']['output'];
  customerNextCursor?: Maybe<Scalars['String']['output']>;
  externalHasNextPage: Scalars['Boolean']['output'];
  externalNextCursor?: Maybe<Scalars['String']['output']>;
  references: Array<ReferenceResponse>;
};

export enum ReferenceType {
  Customer = 'CUSTOMER',
  External = 'EXTERNAL'
}

export type RegisterRequestInput = {
  companyName: Scalars['String']['input'];
  companyPriority: Scalars['String']['input'];
  companySize: Scalars['String']['input'];
  companyType: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  currencySymbol: Scalars['String']['input'];
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

export type SearchReferenceRequestInput = {
  customerHasNextPage?: InputMaybe<Scalars['Boolean']['input']>;
  customerNextCursor?: InputMaybe<Scalars['String']['input']>;
  externalHasNextPage?: InputMaybe<Scalars['Boolean']['input']>;
  externalNextCursor?: InputMaybe<Scalars['String']['input']>;
  pageSize: Scalars['Int']['input'];
  searchTerm: Scalars['String']['input'];
};

export type ServiceBundleEntity = Node & {
  __typename?: 'ServiceBundleEntity';
  additionalCosts?: Maybe<Array<AdditionalServiceCostEntity>>;
  allowOnlineBooking: Scalars['Boolean']['output'];
  cost: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<ServiceDurationEntity>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ImageEntity>>;
  laborRates?: Maybe<Array<ServiceLabourEntity>>;
  markup?: Maybe<MarkupEntity>;
  materials?: Maybe<Array<ServiceMaterialEntity>>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  price: Scalars['Decimal']['output'];
  serviceCategory?: Maybe<ServiceCategoryEntity>;
  serviceCreationType: ServiceCreationType;
  serviceId: Scalars['ID']['output'];
  taxRate?: Maybe<TaxRateEntity>;
  unit?: Maybe<Scalars['Decimal']['output']>;
  unitType?: Maybe<Scalars['String']['output']>;
  useCalculatedPrice: Scalars['Boolean']['output'];
  warranties: Array<WarrantyEntity>;
  warrantyIds?: Maybe<Array<Scalars['ID']['output']>>;
};

export type ServiceCategoryEntity = Node & {
  __typename?: 'ServiceCategoryEntity';
  createdAt: Scalars['DateTime']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ImageEntity>>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  parentServiceCategory?: Maybe<ServiceCategoryEntity>;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  serviceCategories: Array<ServiceCategoryEntity>;
  services: Array<ServiceEntity>;
};

export enum ServiceCreationType {
  Dynamic = 'DYNAMIC',
  Fixed = 'FIXED'
}

export type ServiceDurationEntity = {
  __typename?: 'ServiceDurationEntity';
  durationRangeFrom: Scalars['Decimal']['output'];
  durationRangeTo?: Maybe<Scalars['Decimal']['output']>;
  ranges?: Maybe<Array<RangeTierUnitEntity>>;
  ratio?: Maybe<Scalars['Decimal']['output']>;
  type: DurationType;
};

export type ServiceDurationRequestInput = {
  durationRangeFrom: Scalars['Decimal']['input'];
  durationRangeTo?: InputMaybe<Scalars['Decimal']['input']>;
  ranges?: InputMaybe<Array<RangeTierUnitRequestInput>>;
  ratio?: InputMaybe<Scalars['Decimal']['input']>;
  type: DurationType;
};

export type ServiceEntity = Node & {
  __typename?: 'ServiceEntity';
  additionalCosts?: Maybe<Array<AdditionalServiceCostEntity>>;
  allowOnlineBooking: Scalars['Boolean']['output'];
  bundles: Array<ServiceBundleEntity>;
  cost: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<ServiceDurationEntity>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ImageEntity>>;
  laborRates?: Maybe<Array<ServiceLabourEntity>>;
  markup?: Maybe<MarkupEntity>;
  materials?: Maybe<Array<ServiceMaterialEntity>>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  price: Scalars['Decimal']['output'];
  serviceCategory?: Maybe<ServiceCategoryEntity>;
  serviceCreationType: ServiceCreationType;
  taxRate?: Maybe<TaxRateEntity>;
  unit?: Maybe<Scalars['Decimal']['output']>;
  unitType?: Maybe<Scalars['String']['output']>;
  useCalculatedPrice: Scalars['Boolean']['output'];
};

export type ServiceLabourEntity = {
  __typename?: 'ServiceLabourEntity';
  laborRate?: Maybe<LaborRateEntity>;
  quantity?: Maybe<Scalars['Decimal']['output']>;
  ranges?: Maybe<Array<RangeTierUnitEntity>>;
  ratio?: Maybe<Scalars['Decimal']['output']>;
};

export type ServiceLabourRequestInput = {
  labourRateId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  ranges?: InputMaybe<Array<RangeTierUnitRequestInput>>;
  ratio?: InputMaybe<Scalars['Decimal']['input']>;
};

export type ServiceMaterialEntity = {
  __typename?: 'ServiceMaterialEntity';
  material?: Maybe<MaterialEntity>;
  quantity?: Maybe<Scalars['Decimal']['output']>;
  ranges?: Maybe<Array<RangeTierUnitEntity>>;
  ratio?: Maybe<Scalars['Decimal']['output']>;
};

export type ServiceMaterialRequestInput = {
  materialId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  ranges?: InputMaybe<Array<RangeTierUnitRequestInput>>;
  ratio?: InputMaybe<Scalars['Decimal']['input']>;
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

export type TaxRateEntity = Node & {
  __typename?: 'TaxRateEntity';
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  percentageRate: Scalars['Decimal']['output'];
  userOwnerId: Scalars['UUID']['output'];
};

export enum TaxRateType {
  Except = 'EXCEPT',
  Inclusive = 'INCLUSIVE',
  SpecificRate = 'SPECIFIC_RATE'
}

export type UpdateServiceCategoryRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  newImage?: InputMaybe<Scalars['Upload']['input']>;
  parentServiceCategoryId?: InputMaybe<Scalars['ID']['input']>;
  s3KeyToDelete?: InputMaybe<Scalars['String']['input']>;
};

export type UploadEntity = {
  __typename?: 'UploadEntity';
  byteSize?: Maybe<Scalars['Long']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UserEntity = Node & {
  __typename?: 'UserEntity';
  companiesMemberOf?: Maybe<Array<Maybe<UserEntity>>>;
  companyName: Scalars['String']['output'];
  companyPriority: Scalars['String']['output'];
  companySize: Scalars['String']['output'];
  companyType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  currencySymbol: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  marketingPreference: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneVerified: Scalars['Boolean']['output'];
  place: PlaceEntity;
  referralSource: Scalars['String']['output'];
  staff?: Maybe<Array<Maybe<UserEntity>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserEntityFilter = {
  AND?: InputMaybe<Array<UserEntityFilter>>;
  OR?: InputMaybe<Array<UserEntityFilter>>;
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
  currency?: InputMaybe<Scalars['String']['input']>;
  currencySymbol?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_contains?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencySymbol_not?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencySymbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currencySymbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_contains?: InputMaybe<Scalars['String']['input']>;
  currency_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not?: InputMaybe<Scalars['String']['input']>;
  currency_not_contains?: InputMaybe<Scalars['String']['input']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currency_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  place?: InputMaybe<PlaceEntityFilter>;
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
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_not_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_not_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt_not_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt_not_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserEntitySort = {
  companyName?: InputMaybe<SortOperationKind>;
  companyPriority?: InputMaybe<SortOperationKind>;
  companySize?: InputMaybe<SortOperationKind>;
  companyType?: InputMaybe<SortOperationKind>;
  createdAt?: InputMaybe<SortOperationKind>;
  currency?: InputMaybe<SortOperationKind>;
  currencySymbol?: InputMaybe<SortOperationKind>;
  email?: InputMaybe<SortOperationKind>;
  emailVerified?: InputMaybe<SortOperationKind>;
  id?: InputMaybe<SortOperationKind>;
  marketingPreference?: InputMaybe<SortOperationKind>;
  name?: InputMaybe<SortOperationKind>;
  phoneNumber?: InputMaybe<SortOperationKind>;
  phoneVerified?: InputMaybe<SortOperationKind>;
  place?: InputMaybe<PlaceEntitySort>;
  referralSource?: InputMaybe<SortOperationKind>;
  updatedAt?: InputMaybe<SortOperationKind>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UserEntity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UserEntity;
};

export type ViewportEntity = {
  __typename?: 'ViewportEntity';
  northeast: LocationEntity;
  southwest: LocationEntity;
};

export type ViewportEntityFilter = {
  AND?: InputMaybe<Array<ViewportEntityFilter>>;
  OR?: InputMaybe<Array<ViewportEntityFilter>>;
  northeast?: InputMaybe<LocationEntityFilter>;
  southwest?: InputMaybe<LocationEntityFilter>;
};

export type ViewportEntitySort = {
  northeast?: InputMaybe<LocationEntitySort>;
  southwest?: InputMaybe<LocationEntitySort>;
};

export type ViewportRequest = {
  __typename?: 'ViewportRequest';
  northeast: LocationRequest;
  southwest: LocationRequest;
};

export type ViewportRequestFilter = {
  AND?: InputMaybe<Array<ViewportRequestFilter>>;
  OR?: InputMaybe<Array<ViewportRequestFilter>>;
  northeast?: InputMaybe<LocationRequestFilter>;
  southwest?: InputMaybe<LocationRequestFilter>;
};

export type ViewportRequestInput = {
  northeast: LocationRequestInput;
  southwest: LocationRequestInput;
};

export type ViewportRequestSort = {
  northeast?: InputMaybe<LocationRequestSort>;
  southwest?: InputMaybe<LocationRequestSort>;
};

export type WarrantyDurationEntity = {
  __typename?: 'WarrantyDurationEntity';
  duration: Scalars['Int']['output'];
  durationType: WarrantyDurationType;
};

export type WarrantyDurationRequestInput = {
  duration: Scalars['Int']['input'];
  durationType: WarrantyDurationType;
};

export enum WarrantyDurationType {
  Days = 'DAYS',
  Lifetime = 'LIFETIME',
  Months = 'MONTHS',
  Weeks = 'WEEKS',
  Years = 'YEARS'
}

export type WarrantyEntity = Node & {
  __typename?: 'WarrantyEntity';
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  creator: UserEntity;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedById?: Maybe<Scalars['UUID']['output']>;
  modifier?: Maybe<UserEntity>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  parentServiceCategoryId?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  terms: Scalars['String']['output'];
  userOwnerId: Scalars['UUID']['output'];
  warrantyDuration: WarrantyDurationEntity;
  warrantyType?: Maybe<Scalars['String']['output']>;
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


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser?: { __typename?: 'UserEntity', id: string, name: string, companyName: string, email: string, currency?: string | null, currencySymbol: string, place: { __typename?: 'PlaceEntity', country: string, countryCode: string, callingCode: string, location: { __typename?: 'LocationEntity', lat: any, lng: any } } } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', isSuccess: boolean, isConfirmed: boolean, user?: { __typename?: 'UserEntity', email: string, name: string, companyName: string, emailVerified: boolean } | null } };

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

export type AddNewCustomerMutationVariables = Exact<{
  input: AddNewCustomerRequestInput;
}>;


export type AddNewCustomerMutation = { __typename?: 'Mutation', addNewCustomer: { __typename?: 'CustomerEntity', id: string, customerReferenceNumber?: string | null } };

export type CustomerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CustomerQuery = { __typename?: 'Query', customer?: { __typename?: 'CustomerEntity', id: string, customerReferenceNumber?: string | null, title?: string | null, name?: string | null, surname?: string | null, fullName?: string | null, alias?: string | null, customerType: string, companyName?: string | null, useCompanyName: boolean, status: CustomerStatus, createdAt: any, modifiedAt?: any | null, archived: boolean, customerRating?: any | null, tags?: Array<string> | null, creator: { __typename?: 'UserEntity', id: string, name: string }, modifier?: { __typename?: 'UserEntity', id: string, name: string } | null, reference?: { __typename?: 'ReferenceInfoEntity', referenceType: ReferenceType, customer?: { __typename?: 'CustomerEntity', id: string, fullName?: string | null, customerReferenceNumber?: string | null, companyName?: string | null, useCompanyName: boolean } | null, externalReference?: { __typename?: 'ExternalReferenceEntity', id: string, useCompanyName: boolean, companyName?: string | null, name: string } | null } | null, comments: Array<{ __typename?: 'CommentEntity', comment?: string | null, commentType: CommentType }>, emails?: Array<{ __typename?: 'EmailEntity', email: string, emailType: string, receiveNotifications: boolean }> | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberEntity', phoneNumber: string, phoneNumberType: string, receiveNotifications: boolean }> | null, properties: Array<{ __typename?: 'PropertyEntity', id: string, createdAt: any, modifiedAt?: any | null, property: { __typename?: 'PlaceRequestEntity', placeId: string, address: string }, billing?: { __typename?: 'PlaceRequestEntity', placeId: string, address: string } | null, creator: { __typename?: 'UserEntity', name: string }, modifier?: { __typename?: 'UserEntity', name: string } | null }> } | null };

export type CustomersPagedQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type CustomersPagedQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomersConnection', edges?: Array<{ __typename?: 'CustomersEdge', node: { __typename?: 'CustomerEntity', id: string, customerReferenceNumber?: string | null, title?: string | null, status: CustomerStatus, fullName?: string | null, tags?: Array<string> | null, name?: string | null, surname?: string | null, modifiedAt?: any | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberEntity', phoneNumber: string }> | null, properties: Array<{ __typename?: 'PropertyEntity', property: { __typename?: 'PlaceRequestEntity', address: string } }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type SearchCustomerReferencesQueryVariables = Exact<{
  request: SearchReferenceRequestInput;
}>;


export type SearchCustomerReferencesQuery = { __typename?: 'Query', searchCustomerReferences: { __typename?: 'ReferenceTrackingResponse', customerNextCursor?: string | null, customerHasNextPage: boolean, externalNextCursor?: string | null, externalHasNextPage: boolean, references: Array<{ __typename?: 'ReferenceResponse', id: string, displayName: string, phoneNumber?: string | null, referenceType: ReferenceType }> } };

export type AddLaborRateMutationVariables = Exact<{
  input: AddLaborRateRequestInput;
}>;


export type AddLaborRateMutation = { __typename?: 'Mutation', addLaborRate: { __typename?: 'LaborRateEntity', name: string, id: string } };

export type AddMaterialMutationVariables = Exact<{
  input: AddMaterialRequestInput;
}>;


export type AddMaterialMutation = { __typename?: 'Mutation', addMaterial: { __typename?: 'MaterialEntity', name: string, id: string } };

export type AddNewServiceCategoryMutationVariables = Exact<{
  input: AddNewServiceCategoryRequestInput;
}>;


export type AddNewServiceCategoryMutation = { __typename?: 'Mutation', addNewServiceCategory: { __typename?: 'ServiceCategoryEntity', id: string, name: string, description?: string | null, parentServiceCategoryId?: string | null, images?: Array<{ __typename?: 'ImageEntity', url: string }> | null } };

export type DeleteServiceCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteServiceCategoryMutation = { __typename?: 'Mutation', deleteServiceCategory: { __typename?: 'OperationResult', success: boolean, messages?: Array<string> | null, errors?: Array<string> | null } | { __typename?: 'OperationResultOfServiceCategoryEntity', success: boolean, messages?: Array<string> | null, errors?: Array<string> | null } };

export type GetAllServiceCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServiceCategoriesQuery = { __typename?: 'Query', serviceCategories: Array<{ __typename?: 'ServiceCategoryEntity', id: string, name: string, description?: string | null, parentServiceCategoryId?: string | null, images?: Array<{ __typename?: 'ImageEntity', url: string, s3Key: string }> | null }> };

export type UpdateServiceCategoryMutationVariables = Exact<{
  input: UpdateServiceCategoryRequestInput;
}>;


export type UpdateServiceCategoryMutation = { __typename?: 'Mutation', updateServiceCategory: { __typename?: 'OperationResultOfServiceCategoryEntity', success: boolean, errors?: Array<string> | null, messages?: Array<string> | null, data?: { __typename?: 'ServiceCategoryEntity', name: string, id: string, description?: string | null, parentServiceCategoryId?: string | null, images?: Array<{ __typename?: 'ImageEntity', url: string, s3Key: string }> | null } | null } };


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
    currency
    currencySymbol
    place {
      country
      countryCode
      callingCode
      location {
        lat
        lng
      }
    }
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
export const AddNewCustomerDocument = gql`
    mutation AddNewCustomer($input: AddNewCustomerRequestInput!) {
  addNewCustomer(request: $input) {
    id
    customerReferenceNumber
  }
}
    `;
export type AddNewCustomerMutationFn = Apollo.MutationFunction<AddNewCustomerMutation, AddNewCustomerMutationVariables>;

/**
 * __useAddNewCustomerMutation__
 *
 * To run a mutation, you first call `useAddNewCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewCustomerMutation, { data, loading, error }] = useAddNewCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNewCustomerMutation(baseOptions?: Apollo.MutationHookOptions<AddNewCustomerMutation, AddNewCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewCustomerMutation, AddNewCustomerMutationVariables>(AddNewCustomerDocument, options);
      }
export type AddNewCustomerMutationHookResult = ReturnType<typeof useAddNewCustomerMutation>;
export type AddNewCustomerMutationResult = Apollo.MutationResult<AddNewCustomerMutation>;
export type AddNewCustomerMutationOptions = Apollo.BaseMutationOptions<AddNewCustomerMutation, AddNewCustomerMutationVariables>;
export const CustomerDocument = gql`
    query Customer($id: ID!) {
  customer(id: $id) {
    id
    customerReferenceNumber
    title
    name
    surname
    fullName
    alias
    customerType
    companyName
    useCompanyName
    status
    createdAt
    modifiedAt
    archived
    customerRating
    creator {
      id
      name
    }
    modifier {
      id
      name
    }
    reference {
      referenceType
      customer {
        id
        fullName
        customerReferenceNumber
        companyName
        useCompanyName
      }
      externalReference {
        id
        useCompanyName
        companyName
        name
      }
    }
    comments {
      comment
      commentType
    }
    emails {
      email
      emailType
      receiveNotifications
    }
    phoneNumbers {
      phoneNumber
      phoneNumberType
      receiveNotifications
    }
    properties {
      id
      property {
        placeId
        address
      }
      billing {
        placeId
        address
      }
      createdAt
      modifiedAt
      creator {
        name
      }
      modifier {
        name
      }
    }
    tags
  }
}
    `;

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerQuery(baseOptions: Apollo.QueryHookOptions<CustomerQuery, CustomerQueryVariables> & ({ variables: CustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
      }
export function useCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
        }
export function useCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerSuspenseQueryHookResult = ReturnType<typeof useCustomerSuspenseQuery>;
export type CustomerQueryResult = Apollo.QueryResult<CustomerQuery, CustomerQueryVariables>;
export const CustomersPagedDocument = gql`
    query CustomersPaged($pageSize: Int!, $cursor: String) {
  customers(first: $pageSize, after: $cursor) {
    edges {
      node {
        id
        customerReferenceNumber
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
export function useCustomersPagedQuery(baseOptions: Apollo.QueryHookOptions<CustomersPagedQuery, CustomersPagedQueryVariables> & ({ variables: CustomersPagedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const SearchCustomerReferencesDocument = gql`
    query SearchCustomerReferences($request: SearchReferenceRequestInput!) {
  searchCustomerReferences(request: $request) {
    references {
      id
      displayName
      phoneNumber
      referenceType
    }
    customerNextCursor
    customerHasNextPage
    externalNextCursor
    externalHasNextPage
  }
}
    `;

/**
 * __useSearchCustomerReferencesQuery__
 *
 * To run a query within a React component, call `useSearchCustomerReferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCustomerReferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCustomerReferencesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSearchCustomerReferencesQuery(baseOptions: Apollo.QueryHookOptions<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables> & ({ variables: SearchCustomerReferencesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>(SearchCustomerReferencesDocument, options);
      }
export function useSearchCustomerReferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>(SearchCustomerReferencesDocument, options);
        }
export function useSearchCustomerReferencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>(SearchCustomerReferencesDocument, options);
        }
export type SearchCustomerReferencesQueryHookResult = ReturnType<typeof useSearchCustomerReferencesQuery>;
export type SearchCustomerReferencesLazyQueryHookResult = ReturnType<typeof useSearchCustomerReferencesLazyQuery>;
export type SearchCustomerReferencesSuspenseQueryHookResult = ReturnType<typeof useSearchCustomerReferencesSuspenseQuery>;
export type SearchCustomerReferencesQueryResult = Apollo.QueryResult<SearchCustomerReferencesQuery, SearchCustomerReferencesQueryVariables>;
export const AddLaborRateDocument = gql`
    mutation AddLaborRate($input: AddLaborRateRequestInput!) {
  addLaborRate(request: $input) {
    name
    id
  }
}
    `;
export type AddLaborRateMutationFn = Apollo.MutationFunction<AddLaborRateMutation, AddLaborRateMutationVariables>;

/**
 * __useAddLaborRateMutation__
 *
 * To run a mutation, you first call `useAddLaborRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLaborRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLaborRateMutation, { data, loading, error }] = useAddLaborRateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLaborRateMutation(baseOptions?: Apollo.MutationHookOptions<AddLaborRateMutation, AddLaborRateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLaborRateMutation, AddLaborRateMutationVariables>(AddLaborRateDocument, options);
      }
export type AddLaborRateMutationHookResult = ReturnType<typeof useAddLaborRateMutation>;
export type AddLaborRateMutationResult = Apollo.MutationResult<AddLaborRateMutation>;
export type AddLaborRateMutationOptions = Apollo.BaseMutationOptions<AddLaborRateMutation, AddLaborRateMutationVariables>;
export const AddMaterialDocument = gql`
    mutation AddMaterial($input: AddMaterialRequestInput!) {
  addMaterial(request: $input) {
    name
    id
  }
}
    `;
export type AddMaterialMutationFn = Apollo.MutationFunction<AddMaterialMutation, AddMaterialMutationVariables>;

/**
 * __useAddMaterialMutation__
 *
 * To run a mutation, you first call `useAddMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMaterialMutation, { data, loading, error }] = useAddMaterialMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMaterialMutation(baseOptions?: Apollo.MutationHookOptions<AddMaterialMutation, AddMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMaterialMutation, AddMaterialMutationVariables>(AddMaterialDocument, options);
      }
export type AddMaterialMutationHookResult = ReturnType<typeof useAddMaterialMutation>;
export type AddMaterialMutationResult = Apollo.MutationResult<AddMaterialMutation>;
export type AddMaterialMutationOptions = Apollo.BaseMutationOptions<AddMaterialMutation, AddMaterialMutationVariables>;
export const AddNewServiceCategoryDocument = gql`
    mutation AddNewServiceCategory($input: AddNewServiceCategoryRequestInput!) {
  addNewServiceCategory(request: $input) {
    id
    name
    description
    parentServiceCategoryId
    images {
      url
    }
  }
}
    `;
export type AddNewServiceCategoryMutationFn = Apollo.MutationFunction<AddNewServiceCategoryMutation, AddNewServiceCategoryMutationVariables>;

/**
 * __useAddNewServiceCategoryMutation__
 *
 * To run a mutation, you first call `useAddNewServiceCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewServiceCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewServiceCategoryMutation, { data, loading, error }] = useAddNewServiceCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNewServiceCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddNewServiceCategoryMutation, AddNewServiceCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewServiceCategoryMutation, AddNewServiceCategoryMutationVariables>(AddNewServiceCategoryDocument, options);
      }
export type AddNewServiceCategoryMutationHookResult = ReturnType<typeof useAddNewServiceCategoryMutation>;
export type AddNewServiceCategoryMutationResult = Apollo.MutationResult<AddNewServiceCategoryMutation>;
export type AddNewServiceCategoryMutationOptions = Apollo.BaseMutationOptions<AddNewServiceCategoryMutation, AddNewServiceCategoryMutationVariables>;
export const DeleteServiceCategoryDocument = gql`
    mutation DeleteServiceCategory($id: ID!) {
  deleteServiceCategory(id: $id) {
    success
    messages
    errors
  }
}
    `;
export type DeleteServiceCategoryMutationFn = Apollo.MutationFunction<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>;

/**
 * __useDeleteServiceCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteServiceCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceCategoryMutation, { data, loading, error }] = useDeleteServiceCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>(DeleteServiceCategoryDocument, options);
      }
export type DeleteServiceCategoryMutationHookResult = ReturnType<typeof useDeleteServiceCategoryMutation>;
export type DeleteServiceCategoryMutationResult = Apollo.MutationResult<DeleteServiceCategoryMutation>;
export type DeleteServiceCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>;
export const GetAllServiceCategoriesDocument = gql`
    query GetAllServiceCategories {
  serviceCategories {
    id
    name
    description
    parentServiceCategoryId
    images {
      url
      s3Key
    }
  }
}
    `;

/**
 * __useGetAllServiceCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllServiceCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllServiceCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllServiceCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllServiceCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>(GetAllServiceCategoriesDocument, options);
      }
export function useGetAllServiceCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>(GetAllServiceCategoriesDocument, options);
        }
export function useGetAllServiceCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>(GetAllServiceCategoriesDocument, options);
        }
export type GetAllServiceCategoriesQueryHookResult = ReturnType<typeof useGetAllServiceCategoriesQuery>;
export type GetAllServiceCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllServiceCategoriesLazyQuery>;
export type GetAllServiceCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllServiceCategoriesSuspenseQuery>;
export type GetAllServiceCategoriesQueryResult = Apollo.QueryResult<GetAllServiceCategoriesQuery, GetAllServiceCategoriesQueryVariables>;
export const UpdateServiceCategoryDocument = gql`
    mutation UpdateServiceCategory($input: UpdateServiceCategoryRequestInput!) {
  updateServiceCategory(request: $input) {
    data {
      name
      id
      description
      parentServiceCategoryId
      images {
        url
        s3Key
      }
    }
    success
    errors
    messages
  }
}
    `;
export type UpdateServiceCategoryMutationFn = Apollo.MutationFunction<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>;

/**
 * __useUpdateServiceCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateServiceCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceCategoryMutation, { data, loading, error }] = useUpdateServiceCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>(UpdateServiceCategoryDocument, options);
      }
export type UpdateServiceCategoryMutationHookResult = ReturnType<typeof useUpdateServiceCategoryMutation>;
export type UpdateServiceCategoryMutationResult = Apollo.MutationResult<UpdateServiceCategoryMutation>;
export type UpdateServiceCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>;