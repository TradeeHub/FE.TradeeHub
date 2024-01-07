'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiUsers } from 'react-icons/hi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { AiFillDashboard } from 'react-icons/ai';
import { AiOutlineDashboard } from 'react-icons/ai';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BsHouses } from 'react-icons/bs';
import { BsHousesFill } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoCalendarSharp } from 'react-icons/io5';
import { PiChartPieSliceThin } from 'react-icons/pi';
import { PiChartPieSliceFill } from 'react-icons/pi';
import { VscTools } from 'react-icons/vsc';
import { IconType } from 'react-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
interface LinkItem {
  title: string;
  path: string;
  icon: IconType;
  inactiveIcon: IconType;
}

const navigation: LinkItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: AiOutlineDashboard,
    inactiveIcon: AiFillDashboard,
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: HiOutlineUsers,
    inactiveIcon: HiUsers,
  },
  {
    title: 'Properties',
    path: '/dashboard/properties',
    icon: BsHouses,
    inactiveIcon: BsHousesFill,
  },
  {
    title: 'Quotes',
    path: '/dashboard/quotes',
    icon: AiOutlineThunderbolt,
    inactiveIcon: AiFillThunderbolt,
  },
  {
    title: 'Jobs',
    path: '/dashboard/jobs',
    icon: VscTools,
    inactiveIcon: VscTools,
  },
  {
    title: 'Invoices',
    path: '/dashboard/invoices',
    icon: LiaFileInvoiceDollarSolid,
    inactiveIcon: LiaFileInvoiceDollarSolid,
  },
  {
    title: 'Appointments',
    path: '/dashboard/appointments',
    icon: IoCalendarOutline,
    inactiveIcon: IoCalendarSharp,
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: PiChartPieSliceThin,
    inactiveIcon: PiChartPieSliceFill,
  },
];

export default function Example() {
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <img
                        className='h-8 w-auto'
                        src='logoth.png'
                        alt='Your Company'
                      />
                    </div>
                    <nav className='flex flex-1 flex-col'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map((item) => (
                              <li key={item.title}>
                                <Link href={item.path} passHref>
                                  <div
                                    className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                      isActive(item.path)
                                        ? 'bg-gray-800 text-white'
                                        : 'hover:bg-mute text-mute hover:text-white'
                                    } text-m hover:bg-mute dark:hover:bg-gray-800`}
                                  >
                                    {!isActive(item.path) ? (
                                      <item.icon
                                        className='h-6 w-6 shrink-0'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <item.inactiveIcon
                                        className='h-6 w-6 shrink-0'
                                        aria-hidden='true'
                                      />
                                    )}
                                    <span>{item.title}</span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className='mt-auto'>
                          <a
                            href='#'
                            className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'
                          >
                            <Cog6ToothIcon
                              className='h-6 w-6 shrink-0'
                              aria-hidden='true'
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='flex flex-col overflow-y-auto px-6 pb-4'>
          <div className='flex h-16 items-center justify-start'>
            <div className='pl-2 text-3xl font-bold'>
              <span className='text-primary dark:text-accent'>Tradee</span>
              <span className='text-secondary'>Hub</span>
            </div>
          </div>
          <nav>
            <ul role='list' className='space-y-1'>
              {navigation.map((item) => (
                <li key={item.title} className='w-full'>
                  <Link href={item.path} passHref>
                    <Button
                      variant='ghost'
                      className={`w-full justify-start gap-2 text-left text-lg ${
                        isActive(item.path) ? 'bg-border' : ''
                      }`}
                    >
                      {' '}
                      {!isActive(item.path) ? (
                        <item.icon
                          className='h-6 w-6 shrink-0 text-primary'
                          aria-hidden='true'
                        />
                      ) : (
                        <item.inactiveIcon
                          className='h-6 w-6 shrink-0 text-primary'
                          aria-hidden='true'
                        />
                      )}
                      <span className='text-primary'>{item.title}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='mt-4 w-full'
              aria-label='Toggle Theme'
              variant={'secondary'}
            >
              Set Theme
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}
