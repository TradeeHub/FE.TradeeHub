import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { HiOutlinePhone } from 'react-icons/hi2';
import { AiOutlineMail } from 'react-icons/ai';
import { FaBatteryEmpty } from 'react-icons/fa6';
import { PiHouseLineLight } from 'react-icons/pi';
import moment from 'moment';
import {
  CustomerEntity,
  PropertyEntity,
  ReferenceInfoEntity,
} from '@/generatedGraphql';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/[locale]/components/TabsCustom/TabsCustom';
import Link from 'next/link';
import { CiTimer } from 'react-icons/ci';
import { FaPeoplePulling } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { CustomButton } from '@/app/[locale]/components/CustomButton/CustomButton';
import { Transition } from '@headlessui/react';

function sortProperties(properties: (PropertyEntity | null)[]) {
  return properties
    .filter((property): property is PropertyEntity => property !== null)
    .sort((a, b) => {
      const dateA = a.modifiedAt
        ? new Date(a.modifiedAt).getTime()
        : new Date(a.createdAt).getTime();
      const dateB = b.modifiedAt
        ? new Date(b.modifiedAt).getTime()
        : new Date(b.createdAt).getTime();
      return dateB - dateA; // Sort in descending order, newest first
    });
}

const CustomerDetailsCard = ({ customer }: { customer: CustomerEntity }) => {
  // Type assertion to ensure we have a non-null array for properties
  const sortedProperties = customer.properties
    ? sortProperties(customer.properties as (PropertyEntity | null)[])
    : [];

  const customerWithSortedProperties = {
    ...customer,
    properties: sortedProperties,
  };

  return (
    <>
      <Card
        className={
          customer.useCompanyName
            ? `h-[390px] w-[480px]`
            : `h-[360px] w-[480px]`
        }
      >
        <CardHeader className='pb-0'>
          <CardTitle className='border-b border-gray-800/10 pb-2'>
            {' '}
            {/* Consistent border */}
            <div className='flex items-center gap-x-4'>
              <UserCircleIcon
                className='h-12 w-12 text-gray-600'
                aria-hidden='true'
              />
              <div>
                <h3 className='text-lg font-semibold'>
                  {customer.useCompanyName
                    ? customer?.companyName
                    : customer?.fullName}
                </h3>
                <span className='text-sm text-gray-500'>
                  {customer?.customerReferenceNumber}
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='details'>
            <TabsList className='flex w-full items-center justify-between px-0'>
              <TabsTrigger value='details'>Contact Details</TabsTrigger>
              <TabsTrigger value='properties'>Properties</TabsTrigger>
              <TabsTrigger value='additionalInfo'>Additional Info</TabsTrigger>
            </TabsList>
            <TabsContent value='details'>
              <DetailsTab customer={customerWithSortedProperties} />
            </TabsContent>
            <TabsContent value='properties'>
              <PropertiesTab customer={customerWithSortedProperties} />
            </TabsContent>
            <TabsContent value='additionalInfo'>
              <AdditionalInfoTab customer={customerWithSortedProperties} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

const ReferenceDetails = ({
  reference,
  plForDd,
}: {
  reference: ReferenceInfoEntity | undefined;
  plForDd: string;
}) => {
  const pathname = usePathname();
  const newPath = pathname.replace(/[^/]*$/, reference?.customer?.id || '');

  const generateReferenceString = () => {
    if (reference?.customer) {
      const { customer } = reference;
      const baseInfo =
        customer.useCompanyName && customer.companyName
          ? `${customer.customerReferenceNumber} | ${customer.companyName}`
          : `${customer.customerReferenceNumber} | ${customer.fullName}`;
      return (
        <Link
          href={`${newPath}`}
          className='text-blue-600 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          {baseInfo}
        </Link>
      );
    } else if (reference?.externalReference) {
      const { externalReference, referenceType } = reference;
      return `${referenceType} | ${
        externalReference.useCompanyName && externalReference.companyName
          ? externalReference.companyName
          : externalReference.name
      }`;
    }
    return '';
  };

  return <dd className={`text-sm ${plForDd}`}>{generateReferenceString()}</dd>;
};

const DetailsTab = ({ customer }: { customer: CustomerEntity }) => {
  // const mainPhone = customer?.phoneNumbers?.[0]?.phoneNumber || '';
  const recentProperty = customer?.properties?.[0] || null;
  // const mainEmail = customer?.emails?.[0]?.email || '';

  const modifiedAtFormatted = customer?.modifiedAt
    ? moment(customer?.modifiedAt).local().format('Do MMM YYYY HH:mm')
    : '';

  const renderPhoneNumbers = () => (
    <Popover>
      <PopoverTrigger asChild>
        <CustomButton variant='outline' size='sm'>
          More Info
        </CustomButton>
      </PopoverTrigger>
      <PopoverContent className='w-auto max-w-xs space-y-3 p-4'>
        <h3 className='text-lg font-medium'>Phone Numbers</h3>
        {customer.phoneNumbers?.map((phone, index) => (
          <div
            key={index}
            className='space-y-1 rounded-md bg-gray-50 p-2 dark:bg-card'
          >
            <div className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2'>
              <dt className='text-sm font-medium'>Type:</dt>
              <dd className='text-sm'>{phone.phoneNumberType}</dd>
              <dt className='text-sm font-medium'>Notifications:</dt>
              <dd className='text-sm font-bold'>
                <span
                  className={`${phone.receiveNotifications ? 'text-green-600' : 'text-red-600'}`}
                >
                  {phone.receiveNotifications ? 'ON' : 'OFF'}
                </span>
              </dd>
              <dt className='col-span-2'>
                <div className='flex items-center gap-1'>
                  <HiOutlinePhone className='h-4 w-4 text-gray-500' />
                  <span className='text-base'>{phone.phoneNumber}</span>
                </div>
              </dt>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );

  const renderEmails = () => (
    <Popover>
      <PopoverTrigger asChild>
        <CustomButton variant='outline' size='sm'>
          More Info
        </CustomButton>
      </PopoverTrigger>
      <PopoverContent className='w-auto max-w-xs space-y-3 p-4'>
        <h3 className='text-lg font-medium'>Email Addresses</h3>
        {customer.emails?.map((email, index) => (
          <div
            key={index}
            className='space-y-1 rounded-md bg-gray-50 p-2 dark:bg-card'
          >
            <div className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2'>
              <dt className='text-sm font-medium'>Type:</dt>
              <dd className='text-sm'>{email.emailType}</dd>
              <dt className='text-sm font-medium'>Notifications:</dt>
              <dd className='text-sm font-bold'>
                <span
                  className={`${email.receiveNotifications ? 'text-green-600' : 'text-red-600'}`}
                >
                  {email.receiveNotifications ? 'ON' : 'OFF'}
                </span>
              </dd>
              <dt className='col-span-2'>
                <div className='flex items-center gap-1'>
                  <AiOutlineMail className='h-4 w-4 text-gray-500' />
                  <span className='text-base'>{email.email}</span>
                </div>
              </dt>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );

  const plForDd = 'pl-4';
  return (
    <>
      <div className='grid grid-cols-[auto,auto,1fr] items-center gap-x-1 gap-y-2'>
        <FaBatteryEmpty className='h-5 w-5 text-green-500' aria-hidden='true' />
        <dt className='text-sm font-medium'>Status:</dt>
        <dd className={`text-sm ${plForDd}`}>
          <span className='rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800'>
            {customer?.status}
          </span>
        </dd>

        <HiOutlinePhone
          className='mr-2 h-5 w-5 justify-self-end text-gray-600'
          aria-hidden='true'
        />
        <dt className='text-sm font-medium'>Phone:</dt>
        <dd className={`text-sm ${plForDd}`}>
          {customer.phoneNumbers?.[0]?.phoneNumber || 'N/A'}
          {customer.phoneNumbers &&
            customer.phoneNumbers.length > 0 &&
            renderPhoneNumbers()}
        </dd>

        <AiOutlineMail
          className='mr-2 h-5 w-5 justify-self-end text-gray-600'
          aria-hidden='true'
        />
        <dt className='text-sm font-medium'>Email:</dt>
        <dd className={`text-sm ${plForDd}`}>
          {customer.emails?.[0]?.email || 'N/A'}
          
          {customer.emails && customer.emails.length > 0 && renderEmails()}
        </dd>

        <FaPeoplePulling
          className='mr-2 h-5 w-5 justify-self-end text-gray-600'
          aria-hidden='true'
        />
        <dt className='text-sm font-medium'>Reference:</dt>
        <ReferenceDetails
          reference={customer?.reference ?? undefined}
          plForDd={plForDd}
        />

        <CiTimer
          className='mr-2 h-5 w-5 justify-self-end text-gray-600'
          aria-hidden='true'
        />
        <dt className='text-sm font-medium'>Activity:</dt>
        <dd className={`text-sm ${plForDd}`}>{modifiedAtFormatted}</dd>
      </div>
      <h4 className='mb-2 mt-4 text-base font-medium'>Recent Property</h4>
      {recentProperty && (
        <div className='flex items-center justify-between'>
          <PropertyAddress address={recentProperty.property.address} />
          <AdditionalPropertyInfo property={recentProperty} />
        </div>
      )}
    </>
  );
};

const AdditionalInfoTab = ({ customer }: { customer: CustomerEntity }) => {
  const createdAtFormatted = moment(customer?.createdAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  return (
    <div className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2'>
      <dt className='text-sm font-medium'>Type:</dt>
      <dd className='text-sm'>{customer?.customerType}</dd>

      {customer?.companyName && (
        <>
          <dt className='text-sm font-medium'>Company Name:</dt>
          <dd className='text-sm'>{customer?.companyName}</dd>
        </>
      )}

      <dt className='text-sm font-medium'>Title:</dt>
      <dd className='text-sm'>{customer?.title}</dd>

      <dt className='text-sm font-medium'>Name:</dt>
      <dd className='text-sm'>{customer?.name}</dd>

      <dt className='text-sm font-medium'>Surname:</dt>
      <dd className='text-sm'>{customer?.surname}</dd>

      <dt className='text-sm font-medium'>Alias:</dt>
      <dd className='text-sm'>{customer?.alias}</dd>

      <dt className='text-sm font-medium'>Created Date:</dt>
      <dd className='text-sm'>{createdAtFormatted}</dd>

      <dt className='text-sm font-medium'>Created By:</dt>
      <dd className='text-sm'>{customer?.creator.name}</dd>

      <dt className='text-sm font-medium'>Updated By:</dt>
      <dd className='text-sm'>{customer?.modifier?.name}</dd>
    </div>
  );
};

const PropertiesTab = ({ customer }: { customer: CustomerEntity }) => {
  return (
    <div className='space-y-2'>
      {customer?.properties?.length ?? 0 > 0 ? (
        customer?.properties?.map((property, index) => (
          <div key={index} className='flex flex-col gap-y-2'>
            {property?.property && (
              <div className='flex items-center justify-between'>
                <PropertyAddress address={property.property.address} />
                <AdditionalPropertyInfo property={property} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className='text-sm'>No properties listed.</p>
      )}
    </div>
  );
};

const PropertyAddress = ({ address }: { address: string | undefined }) => {
  // Function to create Google Maps URL from an address
  const createGoogleMapsUrl = (address: string | undefined) => {
    if (!address) return '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <>
      <Link
        href={createGoogleMapsUrl(address)}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-x-2'
      >
        <PiHouseLineLight
          className='h-5 w-5 text-gray-600 hover:text-blue-600'
          aria-hidden='true'
        />
      </Link>
      <span className='px-2 text-sm'>{address}</span>
    </>
  );
};

const AdditionalPropertyInfo = ({ property }: { property: PropertyEntity }) => {
  // Format dates using moment.js
  const createdAtFormatted = moment(property.createdAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const modifiedAtFormatted = property.modifiedAt
    ? moment(property.modifiedAt).local().format('Do MMM YYYY HH:mm')
    : '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CustomButton variant='outline' size='sm'>
          More Info
        </CustomButton>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4'>
        <div className='space-y-4'>
          <div>
            <h3 className='text-lg font-semibold'>Billing Address</h3>
            <p className='space-y-1 rounded-md bg-gray-50 p-2 text-sm dark:bg-card'>
              {property.billing?.address}
            </p>
          </div>
          <h3 className='text-lg font-semibold'>Property Info</h3>

          <div
            className='grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 space-y-1 rounded-md bg-gray-50 p-2 dark:bg-card'
            style={{ marginTop: 0 }}
          >
            <dt className='text-sm font-medium'>Created:</dt>
            <dd className='text-sm'>{createdAtFormatted}</dd>

            <dt className='text-sm font-medium'>Created By:</dt>
            <dd className='text-sm'>{property.creator.name}</dd>

            <dt className='text-sm font-medium'>Modified:</dt>
            <dd className='text-sm'>{modifiedAtFormatted}</dd>

            <dt className='text-sm font-medium'>Modified By:</dt>
            <dd className='text-sm'>{property.modifier?.name}</dd>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerDetailsCard;
