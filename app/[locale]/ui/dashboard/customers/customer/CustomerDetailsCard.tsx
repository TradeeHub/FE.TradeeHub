import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { HiOutlinePhone } from 'react-icons/hi2';
import { AiOutlineMail } from 'react-icons/ai';
import { FaBatteryEmpty } from 'react-icons/fa6';
import { PiHouseLineLight } from 'react-icons/pi';
import moment from 'moment';
import { CustomerEntity, ReferenceInfoEntity } from '@/generatedGraphql';
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

const CustomerDetailsCard = ({ customer }: { customer: CustomerEntity }) => {
  return (
    <>
      <Card className='h-[350px] w-[480px]'>
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
              <DetailsTab customer={customer} />
            </TabsContent>
            <TabsContent value='properties'>
              <PropertiesTab customer={customer} />
            </TabsContent>
            <TabsContent value='additionalInfo'>
              <AdditionalInfoTab customer={customer} />
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
  const mainPhone = customer?.phoneNumbers?.[0]?.phoneNumber || '';
  const recentProperty = customer?.properties?.[0]?.property.address || '';
  const mainEmail = customer?.emails?.[0].email || '';

  const modifiedAtFormatted = customer?.modifiedAt
    ? moment(customer?.modifiedAt).local().format('Do MMM YYYY HH:mm')
    : '';
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
        <dd className={`text-sm ${plForDd}`}>{mainPhone}</dd>

        <AiOutlineMail
          className='mr-2 h-5 w-5 justify-self-end text-gray-600'
          aria-hidden='true'
        />
        <dt className='text-sm font-medium'>Email:</dt>
        <dd className={`text-sm ${plForDd}`}>{mainEmail}</dd>

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
      <h4 className='mb-2 mt-4 text-base font-medium'>Most Recent Property</h4>
      <div className='flex items-center gap-x-2'>
        <PropertyAddress address={recentProperty} />
      </div>
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
    </div>
  );
};

const PropertiesTab = ({ customer }: { customer: CustomerEntity }) => {
  return (
    <div className='space-y-2'>
      {customer?.properties?.length ?? 0 > 0 ? (
        customer?.properties?.map((property, index) => (
          <div key={index} className='flex items-center gap-x-2'>
            <PropertyAddress address={property?.property.address} />
          </div>
        ))
      ) : (
        <p>No properties listed.</p>
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
      <span className='text-sm'>{address}</span>
    </>
  );
};

export default CustomerDetailsCard;
