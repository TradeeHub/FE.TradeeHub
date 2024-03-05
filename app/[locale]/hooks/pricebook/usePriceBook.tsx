import { useLazyQuery } from '@apollo/client';
import {
  AddNewServiceCategoryRequestInput,
  useAddNewServiceCategoryMutation,
  GetAllServiceCategoriesQuery,
  GetAllServiceCategoriesQueryVariables,
  GetAllServiceCategoriesDocument,
  useAddMaterialMutation,
  AddMaterialRequestInput,
  AddLaborRateRequestInput,
  useAddLaborRateMutation,
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

const useAddMaterial = () => {
  const [addMaterialMutation, { data, loading, error }] =
    useAddMaterialMutation();

  const addMaterial = async (input: AddMaterialRequestInput) => {
    try {
      await addMaterialMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addMaterial,
    addMaterialResponse: data,
    addMaterialLoading: loading,
    addMaterialError: error,
  };
};

const useAddLaborRate = () => {
  const [addLaborRateMutation, { data, loading, error }] =
    useAddLaborRateMutation();

  const addLaborRate = async (input: AddLaborRateRequestInput) => {
    try {
      await addLaborRateMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addLaborRate,
    addLaborRateResponse: data,
    addLaborRateLoading: loading,
    addLaborRateError: error,
  };
};

export {
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
  useAddMaterial,
  useAddLaborRate,
};
