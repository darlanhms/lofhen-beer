import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@lofhen/ui-kit';
import { SidebarProvider } from 'hooks/useSidebar';
import { CustomPage } from 'types/customPage';

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
