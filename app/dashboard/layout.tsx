import React from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-h-screen flex-1 pl-[205px]">
        {" "}
        {/* Adjust this pl value to match the width of your sidebar */}
        <main className="p-4 pb-0">
          <Navbar />
        </main>
        <main className="p-4 pt-0">
          {children} {/* This is where your content will go */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
