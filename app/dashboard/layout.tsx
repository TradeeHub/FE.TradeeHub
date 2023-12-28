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
      <div className="lg:pl-72 p-4">{children}</div>
    </div>
  );
};

export default Layout;
