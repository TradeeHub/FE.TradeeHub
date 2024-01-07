'use client';
import React from 'react';
import Navbar from '../ui/dashboard/navbar/navbar';
import Sidebar from '../ui/dashboard/sidebar/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex'>
      {/* Sidebar - hidden on small screens and visible on large screens */}
      <div className='hidden min-h-screen flex-none border-r bg-card lg:flex'>
        <Sidebar />
      </div>

      <div className='flex flex-grow flex-col'>
        <div className='border-b'>
          <Navbar />
        </div>
        {/* Navbar */}

        {/* Page content */}
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
