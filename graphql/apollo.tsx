"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface Props {
  children: React.ReactNode;
}

const GRAPHQL_ENDPOINT = "http://localhost:5269/graphql/";

const StrapiApolloProvider = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default StrapiApolloProvider;
