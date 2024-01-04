'use client';
import useCustomer from '@/app/hooks/customer/useCustomer';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';
import moment from 'moment';
import { HiOutlinePhone } from 'react-icons/hi2';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { CiTimer } from 'react-icons/ci';
import { FaBatteryEmpty } from 'react-icons/fa6';
import { PiHouseLineLight } from 'react-icons/pi';
import { BsHouses } from "react-icons/bs";

const Customer = ({ params }: { params: { customerId: string } }) => {
  const { data, loading } = useCustomer(params.customerId);
  const customer = data?.customerById;
  const createdAtFormatted = moment(customer?.createdAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const modifiedAtFormatted = moment(customer?.modifiedAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const mainPhone = customer?.phoneNumbers[0].phoneNumber;
  const recentProperty = customer?.properties[0]?.propertyAddress.fullAddress;
  const iconClass = 'h-6 w-5 text-brand-accent1';
  const textClass =  'text-sm leading-6 text-brand-secondary1d';
  return (
    <>
      <Suspense fallback={loading}>
        <div className='gap-5 lg:col-start-3 lg:row-end-1'>
          <div className='flex flex-row gap-10'>
            <h2 className='sr-only'>Customer Details</h2>

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
                      <label>#CRN-1</label>
                    </p>
                  </dd>
                </div>
                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='text-sm'>
                    <FaBatteryEmpty
                      className={iconClass}
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20'>
                    Lead
                  </dd>
                </div>
                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='text-sm'>
                    <HiOutlinePhone
                      className={iconClass}
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className={textClass}>
                    <span>{mainPhone}</span>
                  </dd>
                </div>

                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt>
                    <PiHouseLineLight
                      className={iconClass}
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className={textClass}>
                    <span>{recentProperty}</span>
                  </dd>
                </div>

                <div className='mt-2 flex w-full flex-none gap-x-4 px-6'>
                  <dt>
                    <AiOutlineMail
                      className={iconClass}
                      aria-hidden='true'
                    />
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
                    <CiTimer
                      className={iconClass}
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className={textClass}>
                    <time dateTime={modifiedAtFormatted}>
                      {modifiedAtFormatted}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
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
                  {customer?.properties?.map(property => (
                    <div key={property?.id} className='mt-2 flex w-full flex-wrap gap-x-4 px-6'>
                      <dt>
                        <PiHouseLineLight
                          className={iconClass}
                          aria-hidden='true'
                        />
                      </dt>
                      <dd className={textClass}>
                        <span>{property?.propertyAddress?.fullAddress}</span>
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Customer;
