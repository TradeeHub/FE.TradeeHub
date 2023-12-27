"use client";
import { usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-lg mb-5 bg-gray-100 flex items-center justify-between">
      <div className="text-gray-500 font-bold capitalize">{pathname.split("/").pop()}</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-gray-700 p-2.5 rounded-lg">
          <SearchIcon className="text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-white placeholder-gray-300 focus:outline-none"
          />
        </div>
        <div className="flex gap-5">
          <NotificationsIcon className="text-gray-600 cursor-pointer" />
          <SettingsIcon className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
