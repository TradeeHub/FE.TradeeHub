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
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useLocale } from 'next-intl';

// have a function to create a client for you
function makeClient(navigateToLogin) {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: 'http://localhost:5020/graphql/',
    credentials: 'include',
    fetchOptions: { cache: 'no-store' },
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      let isAuthError = false;

      if (graphQLErrors) {
        console.log('I GOT GRAPHQL ERRORS', graphQLErrors);
        for (const err of graphQLErrors) {
          if (err.extensions?.code === 'AUTH_NOT_AUTHORIZED') {
            console.log('NOT LOGGED IN ERROR APOLLO');
            navigateToLogin();
            isAuthError = true;
            break; // Exit the loop as we found an auth error
          }
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }

      // Forward the operation only if it's not an auth error
      if (!isAuthError) {
        return forward(operation);
      }
    },
  );

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

// Component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const locale = useLocale();

  const navigateToLogin = useCallback(() => {
    console.log(' I NEED TO PUSH ', `/${locale}/login`,router);
    router.push(`/${locale}/login`);
  }, [router]);

  // Pass a function to ApolloNextAppProvider that invokes makeClient
  const makeClientFunc = () => makeClient(navigateToLogin);

  return (
    <ApolloNextAppProvider makeClient={makeClientFunc}>
      {children}
    </ApolloNextAppProvider>
  );
}
