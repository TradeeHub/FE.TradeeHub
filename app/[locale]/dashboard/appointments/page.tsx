'use client';
import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';

const Appointments = () => {
  const { user } = useAuth(); // Use the useAuth hook to access the user
  console.log('user   is here ', user);
  return (
    <div style={{ height: 400, width: '100%' }}>
      Appointments Calendar MY USER {user?.name}
    </div>
  );
};

export default Appointments;
