'use client';
import React from 'react';
import Navbar from '../ui/dashboard/navbar/navbar';
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import { AuthProvider } from '../contexts/AuthProvider ';
import { LayoutProps } from '../types/sharedTypes';

const Layout = ({ children }: LayoutProps) => {
  console.log('AAAAAAAAAAAAAAAAAAA');
  return (
    <>
      <AuthProvider>
        <div className='flex'>
          {/* Sidebar - hidden on small screens and visible on large screens */}
          <div className='hidden min-h-screen flex-none border-r bg-card lg:flex'>
            <Sidebar />
          </div>

          <div className='flex flex-grow flex-col'>
            <div className='border-b'>
              <Navbar />
            </div>

            <div className='overflow-auto p-4'>{children}</div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
};

export default Layout;
