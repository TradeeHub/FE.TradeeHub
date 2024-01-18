import { useQuery } from '@apollo/client';
import {
  CustomerByIdDocument,
  CustomerByIdQuery,
  CustomerByIdQueryVariables,
} from '@/generatedGraphql';
import { UseCustomerReturnType } from '@/app/[locale]/types/sharedTypes';

const useCustomer = (customerId: string): UseCustomerReturnType => {
  const { data, error, loading } = useQuery<
    CustomerByIdQuery,
    CustomerByIdQueryVariables
  >(CustomerByIdDocument, {
    variables: { id: customerId },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    console.error('Error fetching more data:', error);
  }

  return { data, loading, error };
};

export default useCustomer;
