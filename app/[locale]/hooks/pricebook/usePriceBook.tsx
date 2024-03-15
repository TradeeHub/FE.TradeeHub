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
  useGetAllServiceCategoriesQuery,
  SortEnumType,
  useGetMaterialsQuery,
  useGetMaterialsLazyQuery
} from '@/generatedGraphql';

const useGetAllServiceCategoriesLazy = () => {
  const [searchServiceCategories, { data, loading, error }] = useLazyQuery<
    GetAllServiceCategoriesQuery,
    GetAllServiceCategoriesQueryVariables
  >(GetAllServiceCategoriesDocument, { notifyOnNetworkStatusChange: true });

  const serviceCategories = data?.serviceCategories;

  return { searchServiceCategories, serviceCategories, loading, error };
};

const useGetMaterialsLazy = () => {
  const [searchMaterials, { data, loading, error }] = useGetMaterialsLazyQuery({
    notifyOnNetworkStatusChange: true
  });

  const materials = data?.materials;

  return { searchMaterials, materials, loading, error };
};

const useGetMaterials = () => {
  const {
    data,
    loading: allMaterialsLoading,
    error: allMaterialsError
  } = useGetMaterialsQuery({
    variables: {
      request: {},
      order: [{ modifiedAt: SortEnumType.Desc }],
      pageSize: 50
    },
    notifyOnNetworkStatusChange: true
  });

  const allMaterials = data?.materials;
  return { allMaterials, allMaterialsLoading, allMaterialsError };
};

const useGetAllServiceCategories = () => {
  const {
    data,
    loading: initialLoading,
    error: initialError
  } = useGetAllServiceCategoriesQuery({
    variables: {
      name: '',
      order: [{ modifiedAt: SortEnumType.Desc }],
      pageSize: 50
    },
    notifyOnNetworkStatusChange: true
  });

  const serviceCategoriesInitialLoad = data?.serviceCategories;
  return { serviceCategoriesInitialLoad, initialLoading, initialError };
};

const useAddNewServiceCategory = () => {
  const [addNewServiceCategoryMutation, { data, loading, error }] =
    useAddNewServiceCategoryMutation();

  const addNewServiceCategory = async (
    input: AddNewServiceCategoryRequestInput
  ) => {
    try {
      await addNewServiceCategoryMutation({
        variables: { input }
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addNewServiceCategory,
    addNewServiceCategoryResponse: data,
    addNewServiceCategoryLoading: loading,
    addNewServiceCategoryError: error
  };
};

const useAddMaterial = () => {
  const [addMaterialMutation, { data, loading, error }] =
    useAddMaterialMutation();

  const addMaterial = async (input: AddMaterialRequestInput) => {
    try {
      await addMaterialMutation({
        variables: { input }
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addMaterial,
    addMaterialResponse: data,
    addMaterialLoading: loading,
    addMaterialError: error
  };
};

const useAddLaborRate = () => {
  const [addLaborRateMutation, { data, loading, error }] =
    useAddLaborRateMutation();

  const addLaborRate = async (input: AddLaborRateRequestInput) => {
    try {
      await addLaborRateMutation({
        variables: { input }
      });
    } catch (e) {
      console.error('Error adding new service category:', e);
    }
  };

  return {
    addLaborRate,
    addLaborRateResponse: data,
    addLaborRateLoading: loading,
    addLaborRateError: error
  };
};

const useDeleteServiceCategory = () => {
  const [deleteServiceCategoryMutation, { data, loading, error }] =
    useDeleteServiceCategoryMutation();

  const deleteServiceCategory = async (id: string) => {
    try {
      await deleteServiceCategoryMutation({
        variables: { id }
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    deleteServiceCategory,
    deleteServiceCategoryResponse: data,
    deleteServiceCategoryLoading: loading,
    deleteServiceCategoryError: error
  };
};

const useUpdateServiceCategory = () => {
  const [updateServiceCategoryMutation, { data, loading, error }] =
    useUpdateServiceCategoryMutation();

  const updateServiceCategory = async (
    input: UpdateServiceCategoryRequestInput
  ) => {
    try {
      await updateServiceCategoryMutation({
        variables: { input }
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    updateServiceCategory,
    updateServiceCategoryResponse: data,
    updateServiceCategoryLoading: loading,
    updateServiceCategoryError: error
  };
};

export {
  useGetMaterialsLazy,
  useGetMaterials,
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
  useGetAllServiceCategories,
  useAddMaterial,
  useAddLaborRate,
  useDeleteServiceCategory,
  useUpdateServiceCategory
};
