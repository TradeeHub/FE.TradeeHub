"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HouseIcon from "@mui/icons-material/House";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReorderIcon from "@mui/icons-material/Reorder";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsMartialArtsOutlinedIcon from "@mui/icons-material/SportsMartialArtsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// Define the structure for individual link items
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
    <div className="sticky top-0 h-screen bg-white text-black font-roboto">
      <div className="flex items-center p-4 gap-2.5 font-bold">
        <ReorderIcon className="text-gray-600 mr-2 text-xl" />
        <span>TradeeHub</span>
      </div>
      {/* User Section */}
      {/* ... */}
      <ul className="list-none m-0 p-0">
        {sideBarItems.map((group, groupIndex) => (
          <li key={groupIndex} className="m-0 p-0">
            <ul className="list-none m-0 p-0">
              {group.list.map((item, itemIndex) => (
                <li key={itemIndex} className="m-0 p-0">
                  <Link href={item.path}>
                    <div
                      className={`flex items-center p-3 gap-2.5 cursor-pointer ${
                        isActive(item.path)
                          ? "bg-red-600 text-white font-bold"
                          : "text-black"
                      } hover:bg-red-600 hover:text-white`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
