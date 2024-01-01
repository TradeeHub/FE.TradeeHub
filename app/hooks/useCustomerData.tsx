import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CustomersPagedDocument, CustomersPagedQuery, CustomersPagedQueryVariables } from '@/generatedGraphql';

const useCustomerData = () => {
    const { data, error, loading, fetchMore } = useQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(
        CustomersPagedDocument, 
        { variables: { pageSize: 30 }, notifyOnNetworkStatusChange: true }
    );


    console.log('CUSTOEMR DATAA', data)
    // Initialize state with an empty array for data and null for pageInfo
    const [customerData, setCustomerData] = useState({ data: [], pageInfo: null });

    // useEffect(() => {
    //     console.log('I AM USING EFFECT HERE ' )
    //     if (data) {
    //         const initialData = data.customers.edges.map(edge => edge.node);
    //         console.log('I AM USING EFFECT HERE ', initialData, data.customers.pageInfo )

    //         setCustomerData({ data: initialData, pageInfo: data.customers.pageInfo });
    //     }
    // }, [data]);

const fetchMoreData = useCallback((endCursor) => {
    console.log('before fetching more data', endCursor)
    return fetchMore({
        variables: { cursor: endCursor, pageSize: 30 },
        // updateQuery: (prev, { fetchMoreResult }) => {
        //     console.log("UPDATE QUERY SHIT", prev, fetchMoreResult)
        //     if (!fetchMoreResult) return prev;

        //     return {
        //         ...prev,
        //         customers: {
        //             ...fetchMoreResult.customers,
        //             edges: [...prev.customers.edges, ...fetchMoreResult.customers.edges],
        //             pageInfo: fetchMoreResult.customers.pageInfo,
        //         },
        //     };
        // },
    }).then(fetchResult => {
        const newRows = fetchResult?.data?.customers?.edges?.map(edge => edge.node) || [];

        console.log("PREVIOUS DATAAA", customerData.data.length )
        if(customerData.data.length === 0){
            setCustomerData(prevData => ({
                data: newRows,
                pageInfo: fetchResult?.data?.customers?.pageInfo
            }));
        }
        else
        {
            
            console.log(' I GOT PREVIOUS DATAAAAAA', customerData.data.length)
        }
        console.log('DO I REALLY HAVE THE DATA? ', fetchResult)
        
        return { rows: newRows, pageInfo: fetchResult?.data?.customers?.pageInfo };
    }).catch(error => {
        console.error('Error fetching more data:', error);
        return { rows: [], pageInfo: undefined };
    });
}, [fetchMore]);


    return { data, loading, error, fetchMoreData };
};

export default useCustomerData;
