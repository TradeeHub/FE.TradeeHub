'use client';
import useCustomer from '@/app/hooks/customer/useCustomer';
import { Suspense } from 'react';
const Customer = ({ params }: { params: { customerId: string } }) => {
  const { data, loading } = useCustomer(params.customerId);

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        Customer Details {params.customerId}
        <Suspense fallback={loading}>
          <div>Here I am {data?.customerById?.name}</div>
        </Suspense>
      </div>
    </>
  );
};

export default Customer;