import type { AppProps } from 'next/app';
import { ThemeProvider } from 'ui-kit';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
