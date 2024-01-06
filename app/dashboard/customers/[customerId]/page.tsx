'use client';
import useCustomer from '@/app/hooks/customer/useCustomer';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import { Suspense, useState } from 'react';
import moment from 'moment';
import { HiOutlinePhone } from 'react-icons/hi2';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { CiTimer } from 'react-icons/ci';
import { FaBatteryEmpty } from 'react-icons/fa6';
import { PiHouseLineLight } from 'react-icons/pi';
import { BsHouses } from 'react-icons/bs';

const Customer = ({ params }: { params: { customerId: string } }) => {
  const [showProperties, setShowProperties] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { data, loading } = useCustomer(params.customerId);
  const customer = data?.customerById;
  const createdAtFormatted = moment(customer?.createdAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const modifiedAtFormatted = moment(customer?.modifiedAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const mainPhone = customer?.phoneNumbers[0].phoneNumber;
  const recentProperty = customer?.properties[0]?.property.fullAddress;
  const iconClass = 'h-6 w-5 text-brand-accent1';
  const textClass = 'text-sm leading-6 text-brand-secondary1d items-center';
  const tabs = [
    { name: 'Quotes', href: '#', current: true },
    { name: 'Jobs', href: '#', current: false },
    { name: 'Invoices', href: '#', current: false },
    { name: 'Appointments', href: '#', current: false },
    { name: 'Activity', href: '#', current: false },
  ];

  const toggleProperties = () => setShowProperties(!showProperties);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <Suspense fallback={loading}>
        <div className='gap-5 lg:col-start-3 lg:row-end-1'>
          <div className='flex flex-row gap-10'>
            <h2 className='sr-only'>Customer Details</h2>
            {/* Customer Details */}
            <div className='rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5'>
              <dl className='flex flex-col'>
                <div className='flex w-full flex-none items-center gap-x-4 border-b border-gray-900/5 px-6 pb-3 pt-3'>
                  <dt>
                    <span className='sr-only'>Client</span>
                    <UserCircleIcon
                      className='h-12 w-12 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-md font-semibold leading-6 text-gray-900'>
                    <h3 className='text-base font-semibold leading-6 text-brand-secondary1d'>
                      {' '}
                      {customer?.title} {customer?.name} {customer?.surname}
                    </h3>
                    <p className='text-sm text-brand-textLight'>
                      <label>{customer?.customerReferenceNumber}</label>
                    </p>
                  </dd>
                </div>
                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='text-sm'>
                    <FaBatteryEmpty className={iconClass} aria-hidden='true' />
                  </dt>
                  <dd className='rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20'>
                    {customer?.status}
                  </dd>
                </div>
                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='text-sm'>
                    <HiOutlinePhone className={iconClass} aria-hidden='true' />
                  </dt>
                  <dd className={textClass}>
                    <span>{mainPhone}</span>
                  </dd>
                </div>

                <div className='mt-2 flex flex-col px-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-4'>
                      {customer?.properties?.length > 1 ? (
                        <BsHouses
                          className='h-6 w-5 text-brand-accent3'
                          aria-hidden='true'
                        />
                      ) : (
                        <PiHouseLineLight
                          className={iconClass}
                          aria-hidden='true'
                        />
                      )}
                      <span className='text-sm leading-6 text-brand-secondary1d'>
                        {recentProperty}
                      </span>
                    </div>
                    {customer?.properties?.length > 1 && (
                      <button
                        onClick={toggleProperties}
                        className='text-brand-accent3 focus:outline-none'
                      >
                        {showProperties ? (
                          <ChevronUpIcon className='h-5 w-5' />
                        ) : (
                          <ChevronDownIcon className='h-5 w-5' />
                        )}
                      </button>
                    )}
                  </div>

                  {showProperties && (
                    <div className=''>
                      {customer?.properties?.map(
                        (property, index) =>
                          index !== 0 && (
                            <div
                              key={index}
                              className='flex items-center gap-x-2 pl-8'
                            >
                              <PiHouseLineLight
                                className={iconClass}
                                aria-hidden='true'
                              />
                              <span className='text-sm leading-6 text-brand-secondary1d'>
                                {property?.property?.fullAddress}
                              </span>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                </div>

                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt>
                    <AiOutlineMail className={iconClass} aria-hidden='true' />
                  </dt>
                  <dd className={textClass}>
                    <span>{customer?.emails[0].email}</span>
                  </dd>
                </div>

                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='flex-none text-sm'>
                    <HiOutlineCalendarDays
                      className={iconClass}
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className={textClass}>
                    <time dateTime={createdAtFormatted}>
                      {createdAtFormatted}
                    </time>
                  </dd>
                </div>
                <div className='mt-2 flex w-full flex-none items-center gap-x-4 px-6 pb-3'>
                  <dt className='flex-none text-sm'>
                    <CiTimer className={iconClass} aria-hidden='true' />
                  </dt>
                  <dd className={textClass}>
                    <time dateTime={modifiedAtFormatted}>
                      {modifiedAtFormatted}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Properties */}
            <h2 className='sr-only'>Properties</h2>
            <div className='rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5'>
              <dl className='flex flex-col'>
                <div className='flex w-full flex-none items-center gap-x-4 border-b border-gray-900/5 px-6 pb-3 pt-3'>
                  <dt>
                    <span className='sr-only'>Properties</span>
                    <BsHouses
                      className='h-10 w-10 text-brand-accent3'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-md font-semibold leading-6 text-gray-900'>
                    <h3 className='text-base font-semibold leading-6 text-brand-secondary1d'>
                      <span>Properties</span>
                    </h3>
                  </dd>
                </div>
                {customer?.properties?.map((property) => (
                  <div
                    key={property?.id}
                    className='mt-2 flex w-full flex-wrap gap-x-4 px-6'
                  >
                    <dt>
                      <PiHouseLineLight
                        className={iconClass}
                        aria-hidden='true'
                      />
                    </dt>
                    <dd className={textClass}>
                      <span>{property?.property?.fullAddress}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mt-20'>
          <div className='sm:hidden'>
            <label htmlFor='tabs' className='sr-only'>
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id='tabs'
              name='tabs'
              className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              defaultValue={tabs.find((tab) => tab.current)?.name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <nav
              className='isolate flex divide-x divide-gray-200 rounded-lg shadow'
              aria-label='Tabs'
            >
              {tabs.map((tab, tabIdx) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden='true'
                    className={classNames(
                      tab.current ? 'bg-indigo-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Customer;
