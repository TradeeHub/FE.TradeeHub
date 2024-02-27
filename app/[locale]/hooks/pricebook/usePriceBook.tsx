import { useLazyQuery } from '@apollo/client';
import {
  AddNewServiceCategoryRequestInput,
  useAddNewServiceCategoryMutation,
  GetAllServiceCategoriesQuery,
  GetAllServiceCategoriesQueryVariables,
  GetAllServiceCategoriesDocument,
} from '@/generatedGraphql';

const useGetAllServiceCategoriesLazy = () => {
  const [getAllServiceCategories, { data, loading, error }] = useLazyQuery<
    GetAllServiceCategoriesQuery,
    GetAllServiceCategoriesQueryVariables
  >(GetAllServiceCategoriesDocument, { notifyOnNetworkStatusChange: true });

  const serviceCategories = data?.serviceCategories;

  return { getAllServiceCategories, serviceCategories, loading, error };
};

const useAddNewServiceCategory = () => {
  const [addNewServiceCategoryMutation, { data, loading, error }] =
    useAddNewServiceCategoryMutation();

  const addNewServiceCategory = async (
    input: AddNewServiceCategoryRequestInput,
  ) => {
    try {
      await addNewServiceCategoryMutation({
        variables: { input },
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

export { useAddNewServiceCategory, useGetAllServiceCategoriesLazy };
