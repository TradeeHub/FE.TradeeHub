'use client';
import useCustomer from '@/app/hooks/customer/useCustomer';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { CreditCardIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';
const Customer = ({ params }: { params: { customerId: string } }) => {
  const { data, loading } = useCustomer(params.customerId);
  const customer = data?.customerById;
  return (
    <>
        <Suspense fallback={loading}>
          <div className='lg:col-start-3 lg:row-end-1'>
            <h2 className='sr-only'>Summary</h2>
            <div className='rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5'>
              <dl className='flex flex-wrap'>
                <div className='flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6 items-center'>
                  <dt className=''>
                    <span className='sr-only'>Client</span>
                    <UserCircleIcon
                      className='h-10 w-10 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-md font-semibold leading-6 text-gray-900'>
                      {customer?.title} {customer?.name} {customer?.surname}
                  </dd>
                </div>
                {/* <div className='mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6 items-center'>
                 
                </div> */}
                <div className='flex-none self-end px-6 pt-4'>
                  <dt className='sr-only'>Status</dt>
                  <dd className='rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20'>
                    Paid
                  </dd>
                </div>
                <div className='mt-4 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='flex-none'>
                    <span className='sr-only'>Due date</span>
                    <CalendarDaysIcon
                      className='h-6 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-sm leading-6 text-gray-500'>
                    <time dateTime='2023-01-31'>January 31, 2023</time>
                  </dd>
                </div>
                <div className='mt-4 flex w-full flex-none gap-x-4 px-6'>
                  <dt className='flex-none'>
                    <span className='sr-only'>Status</span>
                    <CreditCardIcon
                      className='h-6 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd className='text-sm leading-6 text-gray-500'>
                    Paid with MasterCard
                  </dd>
                </div>
              </dl>
              <div className='mt-6 border-t border-gray-900/5 px-6 py-6'>
                <a
                  href='#'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Download receipt <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </Suspense>
    </>
  );
};

export default Customer;
