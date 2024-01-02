import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  CustomersPagedDocument,
  CustomersPagedQuery,
  CustomersPagedQueryVariables,
} from '@/generatedGraphql';

const useCustomerData = () => {
  const { data, error, loading, fetchMore } = useQuery<
    CustomersPagedQuery,
    CustomersPagedQueryVariables
  >(CustomersPagedDocument, {
    variables: { pageSize: 30 },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreData = useCallback(
    async (endCursor: string | null) => {
      try {
        const fetchResult = await fetchMore({
          variables: { cursor: endCursor, pageSize: 30 },
        });
        const newRows =
          fetchResult?.data?.customers?.edges?.map((edge) => edge.node) || [];

        return {
          rows: newRows,
          pageInfo: fetchResult?.data?.customers?.pageInfo,
        };
      } catch (error) {
        console.error('Error fetching more data:', error);
        return { rows: [], pageInfo: undefined };
      }
    },
    [fetchMore],
  );

  return { data, loading, error, fetchMoreData };
};

export default useCustomerData;
