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
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
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
        </nav>
      </div>
    </>
  );
}
