import { useQuery } from '@apollo/client';
import {
  AddNewCustomerRequestInput,
  CustomerDocument,
  CustomerQuery,
  CustomerQueryVariables,
  CustomerEntity,
  useAddNewCustomerMutation
} from '@/generatedGraphql';
import { UseCustomerReturnType } from '@/app/[locale]/types/sharedTypes';

const useCustomer = (customerId: string): UseCustomerReturnType => {
  const { data, error, loading } = useQuery<
    CustomerQuery,
    CustomerQueryVariables
  >(CustomerDocument, {
    variables: { id: decodeURIComponent(customerId) },
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    console.error('Error fetching more data:', error);
  }

  const customer = data?.customer as CustomerEntity | null;

  return { customer, loading, error };
};

const useAddNewCustomer = () => {
  const [addNewCustomerMutation, { data, loading, error }] =
    useAddNewCustomerMutation();

  const addNewCustomer = async (input: AddNewCustomerRequestInput) => {
    try {
      await addNewCustomerMutation({
        variables: { input }
      });
    } catch (e) {
      console.error('Register error:', e);
    }
  };

  return {
    addNewCustomer,
    addNewCustomerResponse: data,
    addNewCustomerLoading: loading,
    addNewCustomerError: error
  };
};

export { useCustomer, useAddNewCustomer };
