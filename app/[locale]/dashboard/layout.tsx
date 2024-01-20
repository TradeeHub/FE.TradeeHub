'use client';
import React from 'react';
import { LayoutProps } from '../types/sharedTypes';
import Sidebar from '../ui/dashboard/sidebar/Sidebar';
import Navbar from '../ui/dashboard/navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import AuthenticationGuard from './AuthenticationGuard';

const Layout = ({ children }: LayoutProps) => {
  const user = useSelector((state: RootState) => state.user.data);

  if (!user) {
    return <></>;
  }

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
