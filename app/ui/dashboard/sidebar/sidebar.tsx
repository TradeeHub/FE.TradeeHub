"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement } from "react";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReorderIcon from "@mui/icons-material/Reorder";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsMartialArtsOutlinedIcon from "@mui/icons-material/SportsMartialArtsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

interface LinkItem {
  title: string;
  path: string;
  icon: ReactElement;
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
        icon: <DashboardOutlinedIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: (
          <SportsMartialArtsOutlinedIcon className="text-gray-600 mr-2 text-xl" />
        ),
      },
      {
        title: "Properties",
        path: "/dashboard/properties",
        icon: <HomeOutlinedIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Quotes",
        path: "/dashboard/quotes",
        icon: <WorkOutlineIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Jobs",
        path: "/dashboard/jobs",
        icon: <WorkIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Invoices",
        path: "/dashboard/Invoices",
        icon: <ReceiptIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Appointments",
        path: "/dashboard/appointments",
        icon: <CalendarMonthIcon className="text-gray-600 mr-2 text-xl" />,
      },
      {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: <AnalyticsIcon className="text-gray-600 mr-2 text-xl" />,
      },
    ],
  },
  // ...other sidebar groups
];

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed top-0 left-0 z-40 w-54 h-screen p-4 pt-2 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-roboto">
      <div className="h-full overflow-y-auto">
        <div className="flex items-center p-2">
          <ReorderIcon className="text-gray-600 text-lg" /> {/* Corrected text-l to text-lg */}<div className="pl-4">
          <span className="text-xl font-bold pr-0">Tradee</span>
          <span className="bg-orange-600 text-white text-xl font-bold px-2 p-1 rounded">Hub</span></div>
        </div>

        <ul className="space-y-2">
          {sideBarItems.map((group, groupIndex) => (
            <li key={groupIndex}>
              {group.list.map((item, itemIndex) => (
                <Link href={item.path} key={itemIndex} passHref>
                  <div className={`flex items-center p-2 rounded-lg group cursor-pointer ${
                      isActive(item.path) ? "bg-gray-100 text-black font-bold" : "text-gray-900 dark:text-white"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 text-sm`}> {/* Applied text-sm here */}
                    <span className="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition duration-75">{item.icon}</span>
                    <span className="ml-3">{item.title}</span> {/* Sidebar item text */}
                  </div>
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
