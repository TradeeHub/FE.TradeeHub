import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CustomersPagedDocument, CustomersPagedQuery, CustomersPagedQueryVariables } from '@/generatedGraphql';

const useCustomerData = () => {
    const { data, error, loading, fetchMore } = useQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(
        CustomersPagedDocument, 
        { variables: { pageSize: 30 }, notifyOnNetworkStatusChange: true }
    );

    const [customerData, setCustomerData] = useState({ data: [], pageInfo: null });


    const fetchMoreData = useCallback(async (endCursor) => {
        
    try {
            const fetchResult = await fetchMore({
                variables: { cursor: endCursor, pageSize: 30 }
            });
            const newRows = fetchResult?.data?.customers?.edges?.map(edge => edge.node) || [];

            if (customerData.data.length === 0) {
                setCustomerData({
                    data: newRows,
                    pageInfo: fetchResult?.data?.customers?.pageInfo
                });
            }

            else {

                console.log(' I GOT PREVIOUS DATAAAAAA', customerData.data.length);
            }
            return { rows: newRows, pageInfo: fetchResult?.data?.customers?.pageInfo };
        } catch (error) {
            console.error('Error fetching more data:', error);
            return { rows: [], pageInfo: undefined };
        }
}, [fetchMore]);


    return { data, loading, error, fetchMoreData };
};

export default useCustomerData;
