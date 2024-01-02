'use client';
import React from 'react';

const Customer = ({ params }: { params: { customerId: string } }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      Customer Details {params.customerId}
    </div>
  );
};

export default Customer;
