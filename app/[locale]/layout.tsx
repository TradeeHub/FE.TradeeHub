import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import StoreProvider from './StoreProvider';
import { RootLayoutProps } from './types/sharedTypes';
import AuthenticationGuard from './AuthenticationGuard';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const messages = useMessages();
  const { locale } = params;

  return (
    <html lang={locale}>
      <StoreProvider>
        <ApolloWrapper>
          <body className={inter.className}>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider locale={locale} messages={messages}>
                <AuthenticationGuard>
                  {children} <Toaster />
                </AuthenticationGuard>
              </NextIntlClientProvider>
            </ThemeProvider>
          </body>
        </ApolloWrapper>
      </StoreProvider>
    </html>
  );
}
