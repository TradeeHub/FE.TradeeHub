import { useLazyQuery } from '@apollo/client';
import {
  AddNewServiceCategoryRequestInput,
  useAddNewServiceCategoryMutation,
  GetAllServiceCategoriesQuery,
  GetAllServiceCategoriesQueryVariables,
  GetAllServiceCategoriesDocument,
  useAddMaterialMutation,
  AddLaborRateRequestInput,
  useAddLaborRateMutation,
  useDeleteServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  UpdateServiceCategoryRequestInput,
  AddMaterialRequestInput,
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

const useDeleteServiceCategory = () => {
  const [deleteServiceCategoryMutation, { data, loading, error }] =
    useDeleteServiceCategoryMutation();

  const deleteServiceCategory = async (id: string) => {
    try {
      await deleteServiceCategoryMutation({
        variables: { id },
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    deleteServiceCategory,
    deleteServiceCategoryResponse: data,
    deleteServiceCategoryLoading: loading,
    deleteServiceCategoryError: error,
  };
};

const useUpdateServiceCategory = () => {
  const [updateServiceCategoryMutation, { data, loading, error }] =
    useUpdateServiceCategoryMutation();

  const updateServiceCategory = async (
    input: UpdateServiceCategoryRequestInput,
  ) => {
    try {
      await updateServiceCategoryMutation({
        variables: { input },
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    updateServiceCategory,
    updateServiceCategoryResponse: data,
    updateServiceCategoryLoading: loading,
    updateServiceCategoryError: error,
  };
};

export {
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
  useAddMaterial,
  useAddLaborRate,
  useDeleteServiceCategory,
  useUpdateServiceCategory,
};
