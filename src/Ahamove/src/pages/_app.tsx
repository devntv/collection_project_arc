import { Hydrate } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import nextI18nextConfig from '../../next-i18next.config';
import { AppProviders } from '../AppProviders';
import '../styles/global.css';

// Workaround for https://github.com/zeit/next.js/issues/8592
export type AppProps = NextAppProps & {
  /** Will be defined only is there was an error */
  err?: Error;
};

function App({ Component, pageProps, err }: AppProps) {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, [router.events]);
  return (
    <AppProviders>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=5,viewport-fit=cover"
        />
      </Head>
      {/* Hydrate query cache */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} err={err} key={router.asPath} />
        <ToastContainer autoClose={3000} hideProgressBar={true} />
      </Hydrate>
    </AppProviders>
  );
}

export default appWithTranslation(App, {
  ...nextI18nextConfig,
});
