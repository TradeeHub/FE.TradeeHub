import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  CustomersPagedDocument,
  CustomersPagedQuery,
  CustomersPagedQueryVariables,
} from '@/generatedGraphql';

const useCustomers = () => {
  const { data, error, loading, fetchMore } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 30 },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreData = useCallback(
    async (endCursor: string | null, pageSize: number) => {
      try {
        const fetchResult = await fetchMore({
          variables: { cursor: endCursor, pageSize: pageSize },
        });
        const newRows =
          fetchResult?.data?.customers?.edges?.map((edge) => edge.node) || [];

        // Adjust pageInfo to conform to PageInfo type
        const pageInfo = fetchResult?.data?.customers?.pageInfo
          ? {
              ...fetchResult.data.customers.pageInfo,
              endCursor: fetchResult.data.customers.pageInfo.endCursor || null, // Convert undefined to null
            }
          : null;

        return { rows: newRows, pageInfo };
      } catch (error) {
        return { rows: [], pageInfo: null };
      }
    },
    [fetchMore],
  );

  return { data, loading, error, fetchMoreData };
};

export default useCustomers;
