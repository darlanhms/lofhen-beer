import type { AppProps } from 'next/app';
import { ThemeProvider } from '@lofhen/ui-kit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CustomPage } from 'types/customPage';
import React from 'react';
import { SidebarProvider } from 'hooks/userSidebar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type AppPropsWithLayout = AppProps & {
  Component: CustomPage;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): React.ReactElement {
  const Layout = Component.layout ?? React.Fragment;

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
