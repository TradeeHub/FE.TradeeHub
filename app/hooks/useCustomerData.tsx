import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CustomersPagedDocument, CustomersPagedQuery, CustomersPagedQueryVariables } from '@/generatedGraphql';

const useCustomerData = () => {
    const { data, error, loading, fetchMore } = useQuery<CustomersPagedQuery, CustomersPagedQueryVariables>(
        CustomersPagedDocument, 
        { variables: { pageSize: 40 }, notifyOnNetworkStatusChange: true }
    );

    console.log('USER CUSTOMER DATA INITIAL DATA', data)

    const [rowData, setRowData] = useState([]);

const fetchMoreData = useCallback(async () => {
    console.log('trying to fetch more ',!data?.customers?.pageInfo.hasNextPage)
    if (!data?.customers?.pageInfo.hasNextPage) {
        return { rows: [], lastRow: -1 };
    }
    const endCursor = data.customers.pageInfo.endCursor;

    try {
        const fetchResult = await fetchMore({
            variables: { after: endCursor, pageSize: 40 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    ...prev,
                    customers: {
                        ...fetchMoreResult.customers,
                        edges: [...prev.customers.edges, ...fetchMoreResult.customers.edges],
                        pageInfo: fetchMoreResult.customers.pageInfo,
                    },
                };
            },
        });

        const newRows = fetchResult.data.customers.edges.map(edge => edge.node);
        setRowData(prevRows => [...prevRows, ...newRows]);
        return { rows: newRows, lastRow: fetchResult.data.customers.pageInfo.hasNextPage ? -1 : newRows.length };
    } catch (error) {
        console.error('Error fetching more data:', error);
        return { rows: [], lastRow: -1 };
    }
}, [data, fetchMore]);


    return { rowData, loading, error, fetchMoreData };
};

export default useCustomerData;
