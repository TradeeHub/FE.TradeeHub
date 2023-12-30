import React from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="p-4 lg:pl-64">
        <div className="p-4 pl-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
