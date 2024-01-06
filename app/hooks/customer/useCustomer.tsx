import { useQuery } from '@apollo/client';
import {
  CustomerByIdDocument,
  CustomerByIdQuery,
  CustomerByIdQueryVariables,
} from '@/generatedGraphql';
import { UseCustomerReturnType } from '@/app/types/sharedTypes';

const useCustomer = (customerId: string): UseCustomerReturnType => {
  const { data, error, loading } = useQuery<
    CustomerByIdQuery,
    CustomerByIdQueryVariables
  >(CustomerByIdDocument, {
    variables: { id: customerId },
    notifyOnNetworkStatusChange: true,
  });

  return { data, loading, error };
};

export default useCustomer;
