import { useQuery } from '@apollo/client';
import {
  AddNewCustomerRequestInput,
  CustomerByIdDocument,
  CustomerByIdQuery,
  CustomerByIdQueryVariables,
  CustomerEntity,
  useAddNewCustomerMutation,
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

  const customer = data?.customerById as CustomerEntity | null;

  return { customer, loading, error };
};

const useAddNewCustomer = () => {
  const [addNewCustomerMutation, { data, loading, error }] =
    useAddNewCustomerMutation();

  const addNewCustomer = async (input: AddNewCustomerRequestInput) => {
    console.log('input', input);
    try {
      await addNewCustomerMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Register error:', e);
    }
  };

  return {
    addNewCustomer,
    addNewCustomerResponse: data,
    addNewCustomerLoading: loading,
    addNewCustomerError: error,
  };
};

export { useCustomer, useAddNewCustomer };
