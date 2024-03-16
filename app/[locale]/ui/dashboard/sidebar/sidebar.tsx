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
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import ChangeLanguage from '@/app/[locale]/components/ChangeLanguage';
import { IoBookOutline } from 'react-icons/io5';
import { IoBookSharp } from 'react-icons/io5';

const SideBar = () => {
  const t = useTranslations('general');

  const locale = useLocale();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navigation: LinkItem[] = [
    {
      title: t('dashboard'),
      path: `/${locale}/dashboard`,
      icon: AiOutlineDashboard,
      inactiveIcon: AiFillDashboard
    },
    {
      title: t('customers'),
      path: `/${locale}/dashboard/customers`,
      icon: HiOutlineUsers,
      inactiveIcon: HiUsers
    },
    {
      title: t('properties'),
      path: `/${locale}/dashboard/properties`,
      icon: BsHouses,
      inactiveIcon: BsHousesFill
    },
    {
      title: t('quotes'),
      path: `/${locale}/dashboard/quotes`,
      icon: AiOutlineThunderbolt,
      inactiveIcon: AiFillThunderbolt
    },
    {
      title: t('jobs'),
      path: `/${locale}/dashboard/jobs`,
      icon: VscTools,
      inactiveIcon: VscTools
    },
    {
      title: t('invoices'),
      path: `/${locale}/dashboard/invoices`,
      icon: LiaFileInvoiceDollarSolid,
      inactiveIcon: LiaFileInvoiceDollarSolid
    },
    {
      title: t('appointments'),
      path: `/${locale}/dashboard/appointments`,
      icon: IoCalendarOutline,
      inactiveIcon: IoCalendarSharp
    },
    {
      title: t('analytics'),
      path: `/${locale}/dashboard/analytics`,
      icon: PiChartPieSliceThin,
      inactiveIcon: PiChartPieSliceFill
    },
    {
      title: t('pricebook'),
      path: `/${locale}/dashboard/pricebook`,
      icon: IoBookOutline,
      inactiveIcon: IoBookSharp
    }
  ];

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
          <ul className='space-y-1'>
            {navigation.map((item) => (
              <li key={item.title} className='w-full'>
                <Link href={item.path} passHref locale={locale}>
                  <Button
                    variant='ghost'
                    className={`text-md w-full justify-start gap-4 text-left ${
                      isActive(item.path) ? 'bg-border' : ''
                    }`}
                  >
                    {' '}
                    {!isActive(item.path) ? (
                      <item.icon
                        className='text h-6 w-6 shrink-0 dark:text-white'
                        aria-hidden='true'
                      />
                    ) : (
                      <item.inactiveIcon
                        className='text h-6 w-6 shrink-0 dark:text-white'
                        aria-hidden='true'
                      />
                    )}
                    <span className='text font-roboto dark:text-white'>
                      {item.title}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='mt-auto'>
          <ChangeLanguage />
        </div>
      </div>
    </>
  );
};

export default SideBar;
