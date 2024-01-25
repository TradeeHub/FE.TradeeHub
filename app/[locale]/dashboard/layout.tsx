'use client';
import React from 'react';
import { LayoutProps } from '../types/sharedTypes';
import AuthenticationGuard from './AuthenticationGuard';
import Sidebar from '../ui/dashboard/sidebar/Sidebar';
import Navbar from '../ui/dashboard/navbar/Navbar';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AuthenticationGuard>
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
      </AuthenticationGuard>
    </>
  );
};

export default Layout;
