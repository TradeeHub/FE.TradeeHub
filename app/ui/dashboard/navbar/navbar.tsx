"use client";
import { usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { IoMdNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="relative z-50 mb-5 flex items-center justify-between rounded-lg bg-brand-secondary1d px-4 py-2 shadow-custom">
      <div className="font-bold capitalize text-white">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 rounded-lg bg-brand-secondary2l p-0.5">
          <SearchIcon className="text-bg-secondary1d text-1xl" />{" "}
          {/* Adjusted size with Tailwind class */}
          <input
            type="text"
            placeholder="Search..."
            className="text-secondary1d border-none bg-transparent placeholder-brand-secondary1d focus:outline-none"
          />
        </div>
        <div className="flex gap-5">
          <IoSettingsSharp className="cursor-pointer text-2xl text-white" />{" "}
          {/* Adjusted size with Tailwind class */}
          <IoMdNotifications className="cursor-pointer text-2xl text-white" />{" "}
          {/* Adjusted size with Tailwind class */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
