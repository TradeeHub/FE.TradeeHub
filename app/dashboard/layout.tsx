import React from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      {/* Sidebar - hidden on small screens and visible on large screens */}
      <div className="hidden lg:flex flex-none w-60">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
