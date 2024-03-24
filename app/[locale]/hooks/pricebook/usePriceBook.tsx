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
  useGetMaterialsLazyQuery,
  UpdateMaterialRequestInput,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation
} from '@/generatedGraphql';
import { useCallback } from 'react';

const useGetAllServiceCategoriesLazy = () => {
  const [searchServiceCategories, { data, loading, error }] = useLazyQuery<
    GetAllServiceCategoriesQuery,
    GetAllServiceCategoriesQueryVariables
  >(GetAllServiceCategoriesDocument, { notifyOnNetworkStatusChange: true });

  const serviceCategories = data?.serviceCategories;

  return { searchServiceCategories, serviceCategories, loading, error };
};

const useGetMaterialsLazy = (pageSize: number) => {
  const [searchMaterials, { data, loading, error, fetchMore, refetch }] =
    useGetMaterialsLazyQuery({
      notifyOnNetworkStatusChange: true,
      variables: {
        request: {},
        order: [{ modifiedAt: SortEnumType.Desc }],
        pageSize: pageSize,
        cursor: null
      }
    });

  const fetchMoreMaterials = useCallback(
    async (cursor: string | null) => {
      try {
        const fetchResult = await fetchMore({
          variables: {
            request: {},
            order: [{ modifiedAt: SortEnumType.Desc }],
            pageSize: pageSize,
            cursor: cursor
          }
        });
        const newMaterials =
          fetchResult?.data?.materials?.edges?.map((edge) => edge.node) || [];

        const pageInfo = fetchResult?.data?.materials?.pageInfo
          ? {
              ...fetchResult.data.materials.pageInfo,
              endCursor: fetchResult.data.materials.pageInfo.endCursor || null
            }
          : null;

        return { rows: newMaterials, pageInfo };
      } catch (error) {
        return { rows: [], pageInfo: null };
      }
    },
    [fetchMore, pageSize] // Include pageSize in the dependency array
  );

  return { searchMaterials, data, loading, error, fetchMoreMaterials, refetch };
};

// const useGetMaterials = (pageSize: number) => {
//   const {
//     data: allMaterials,
//     loading: allMaterialsLoading,
//     error: allMaterialsError,
//     refetch
//   } = useGetMaterialsQuery({
//     variables: {
//       request: {},
//       order: [{ modifiedAt: SortEnumType.Desc }],
//       pageSize: pageSize
//     }
//   });

//   return { allMaterials, allMaterialsLoading, allMaterialsError, refetch };
// };

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

const useDeleteMaterial = () => {
  const [deleteMaterialMutation, { data, loading, error }] =
    useDeleteMaterialMutation();

  const deleteMaterial = async (id: string) => {
    try {
      await deleteMaterialMutation({
        variables: { id }
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    deleteMaterial,
    deleteMaterialResponse: data,
    deleteMaterialLoading: loading,
    deleteMaterialError: error
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

const useUpdateMaterial = () => {
  const [updateMaterialMutation, { data, loading, error }] =
    useUpdateMaterialMutation();

  const updateMaterial = async (request: UpdateMaterialRequestInput) => {
    try {
      await updateMaterialMutation({
        variables: { request }
      });
    } catch (e) {
      console.error('Error deleting service category:', e);
    }
  };

  return {
    updateMaterial,
    updateMaterialResponse: data,
    updateMaterialLoading: loading,
    updateMaterialError: error
  };
};

export {
  useDeleteMaterial,
  useGetMaterialsLazy,
  useAddNewServiceCategory,
  useGetAllServiceCategoriesLazy,
  useGetAllServiceCategories,
  useAddMaterial,
  useAddLaborRate,
  useDeleteServiceCategory,
  useUpdateServiceCategory,
  useUpdateMaterial
};
