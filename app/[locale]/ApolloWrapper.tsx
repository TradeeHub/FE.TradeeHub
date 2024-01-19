'use client';
// ^ this file needs the "use client" pragma
import { onError } from '@apollo/client/link/error';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import authenticatedVar from './constants/authenticated';

function makeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: 'http://localhost:5020/graphql/',
    credentials: 'include',
    fetchOptions: { cache: 'no-store' },
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    let isAuthError = false;

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'AUTH_NOT_AUTHORIZED') {
          console.log('Changing auth to falseee');
          authenticatedVar(false);
          isAuthError = true;
          break;
        }
      }
    }

    if (!isAuthError) {
      return forward(operation);
    }
  });

  // Combine the error link with the http link
  const combinedLink = ApolloLink.from([errorLink, httpLink]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({ stripDefer: true }),
            combinedLink,
          ])
        : combinedLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
