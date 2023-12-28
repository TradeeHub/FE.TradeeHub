"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { AiFillThunderbolt } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsHouses } from "react-icons/bs";
import { BsHousesFill } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import { PiChartPieSliceThin } from "react-icons/pi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { IoReorderFourOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";

interface LinkItem {
  title: string;
  path: string;
  icon: ReactElement;
  inactiveIcon: ReactElement;
}

// Define the structure for a group of sidebar items
interface SidebarGroup {
  title: string;
  list: LinkItem[];
}

// Data for the sidebar items
const sideBarItems: SidebarGroup[] = [
  {
    title: "Manage",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <AiOutlineDashboard />,
        inactiveIcon: <AiFillDashboard />,
      },
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: <HiOutlineUsers />,
        inactiveIcon: <HiUsers />,
      },
      {
        title: "Properties",
        path: "/dashboard/properties",
        icon: <BsHouses />,
        inactiveIcon: <BsHousesFill />,
      },
      {
        title: "Quotes",
        path: "/dashboard/quotes",
        icon: <AiOutlineThunderbolt />,
        inactiveIcon: <AiFillThunderbolt />,
      },
      {
        title: "Jobs",
        path: "/dashboard/jobs",
        icon: (
          <VscTools style={{ stroke: "currentColor", strokeWidth: "0.1" }} />
        ),
        inactiveIcon: (
          <VscTools style={{ stroke: "currentColor", strokeWidth: "0.5" }} />
        ),
      },
      {
        title: "Invoices",
        path: "/dashboard/invoices",
        icon: (
          <LiaFileInvoiceDollarSolid
            style={{ stroke: "currentColor", strokeWidth: "0.1" }}
          />
        ),
        inactiveIcon: (
          <LiaFileInvoiceDollarSolid
            style={{ stroke: "currentColor", strokeWidth: "1.1" }}
          />
        ),
      },
      {
        title: "Appointments",
        path: "/dashboard/appointments",
        icon: <IoCalendarOutline />,
        inactiveIcon: <IoCalendarSharp />,
      },
      {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: <PiChartPieSliceThin />,
        inactiveIcon: <PiChartPieSliceFill />,
      },
    ],
  },
  // ...other sidebar groups
];

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <aside className="w-54 bg fixed left-0 top-0 z-40 h-screen border-r border-gray-200 p-4 pt-2 font-roboto shadow-custom dark:border-gray-200">
      <div className="h-full overflow-y-auto">
        <div className="flex items-center p-2">
          <IoReorderFourOutline className="text-lg text-brand-secondary1" />
          <div className="pl-4">
            <span className="rounded-l bg-brand-secondary1d p-1 px-2 pr-0 text-xl font-bold text-brand-accent1">
              Tradee
            </span>
            <span className="rounded-r bg-brand-accent3d p-1 px-2 text-xl font-bold text-brand-secondary2l">
              Hub
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {sideBarItems.map((group) => (
            <li key={group.title}>
              {group.list.map((item) => (
                <div
                  className="border-b"
                  key={item.path}
                >
                  <Link href={item.path} passHref>
                    <div
                      className={`group flex cursor-pointer items-center rounded-lg p-2 ${
                        isActive(item.path)
                          ? "bg-brand-secondary2l font-bold text-brand-secondary1d"
                          : "text-brand-secondary1 dark:text-brand-secondary1"
                      } text-m hover:bg-gray-200 dark:hover:bg-gray-100`}
                    >
                      <span className="mr-2 text-xl text-brand-secondary1d">
                        {!isActive(item.path) ? item.icon : item.inactiveIcon}
                      </span>
                      <span className="ml-3">{item.title}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
