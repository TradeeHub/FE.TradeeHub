'use client';
import { useCustomer } from '@/app/[locale]/hooks/customer/useCustomer';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import { Suspense } from 'react';
import moment from 'moment';
import { HiOutlinePhone } from 'react-icons/hi2';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { CiTimer } from 'react-icons/ci';
import { FaBatteryEmpty } from 'react-icons/fa6';
import { PiHouseLineLight } from 'react-icons/pi';
import { BsHouses } from 'react-icons/bs';
import { PropertyEntity } from '@/generatedGraphql';
import CustomerDetailsCard from '@/app/[locale]/ui/dashboard/customers/customer/CustomerDetailsCard';

const Customer = ({ params }: { params: { customerId: string } }) => {
  const { customer, loading } = useCustomer(params.customerId);

  console.log('customer', customer);
  const createdAtFormatted = moment(customer?.createdAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const modifiedAtFormatted = moment(customer?.modifiedAt)
    .local()
    .format('Do MMM YYYY HH:mm');
  const mainPhone = customer?.phoneNumbers?.[0]?.phoneNumber || '';
  const recentProperty = customer?.properties?.[0]?.property.address || '';
  const mainEmail = customer?.emails?.[0].email || '';
  const hasMultipleProperties = (customer?.properties?.length ?? 0) > 1;
  const iconClass = 'h-6 w-5 text-foreground';
  const textClass = 'text-sm text-destructive-foreground';
  const tabs = [
    { name: 'Quotes', href: '#', current: true },
    { name: 'Jobs', href: '#', current: false },
    { name: 'Invoices', href: '#', current: false },
    { name: 'Appointments', href: '#', current: false },
    { name: 'Activity', href: '#', current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  if (customer) {
    return (
      <>
        <Suspense fallback={loading}>
          <CustomerDetailsCard customer={customer} />

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
  }
};

export default Customer;
