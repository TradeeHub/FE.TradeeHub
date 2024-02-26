import { useQuery } from '@apollo/client';
import {
  AddNewCustomerRequestInput,
  CustomerDocument,
  CustomerQuery,
  CustomerQueryVariables,
  CustomerEntity,
  useAddNewCustomerMutation,
  AddNewServiceCategoryRequestInput,
} from '@/generatedGraphql';
import { UseCustomerReturnType } from '@/app/[locale]/types/sharedTypes';

const useService = (customerId: string): UseCustomerReturnType => {
  const { data, error, loading } = useQuery<
    CustomerQuery,
    CustomerQueryVariables
  >(CustomerDocument, {
    variables: { id: decodeURIComponent(customerId) },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    console.error('Error fetching more data:', error);
  }

  const customer = data?.customer as CustomerEntity | null;

  return { customer, loading, error };
};

const useAddNewServiceCategory = () => {
  const [addNewServiceCategoryMutation, { data, loading, error }] = useAddNewServiceCategoryMutation();

  const addNewServiceCategory = async (input: AddNewServiceCategoryRequestInput) => {
    try {
      await addNewServiceCategoryMutation({
        variables: { request: input },
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addNewServiceCategory,
    addNewServiceCategoryResponse: data,
    addNewServiceCategoryLoading: loading,
    addNewServiceCategoryError: error,
  };
};
};

export { useServiceCategory, useService };