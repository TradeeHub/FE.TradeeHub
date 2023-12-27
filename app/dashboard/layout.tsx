import React from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <div className="w-64"> {/* Adjust width as necessary */}
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout
