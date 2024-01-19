'use client';
import { RootState } from '@/lib/store';
import React from 'react';
import { useSelector } from 'react-redux';

const Appointments = () => {
  const user = useSelector((state: RootState) => state.user.data);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      Appointments Calendar MY USER {user?.name}
    </div>
  );
};

export default Appointments;
