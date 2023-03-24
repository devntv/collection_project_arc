/* eslint-disable no-unused-vars */
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import getConfig from 'next/config';
// import * as Sentry from '@sentry/nextjs';
import Theme from 'components/layout/Theme';
import { MOBILE } from 'constants/Device';
import { ACCOUNT, CART_URL, CHECKOUT_URL, DOMAINS_THUOCSI, QUICK_ORDER } from 'constants/Paths';
import {
  AuthProvider,
  CartContextProvider,
  LoadingRoute,
  NotiContextProvider,
  ProductContextProvider,
  SearchProvider,
  SettingProvider,
  TicketProvider,
  WishListProvider,
} from 'context';
import ContextProviderComposer from 'context/ContextProviderComposer';
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// import '../scripts/wydr';
// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Theme
import { ThemeProvider as StyledTheme } from 'styled-components';
import { DOMAIN_WEB_HOST, ENV, INSIDER_ID } from 'sysconfig';
import { gtag, ScrollToTop } from 'utils';
// CSS global
import IconChat from 'components-v2/atoms/IconChat';
import { DEFAULT_THUOCSI_LONG_TITLE } from 'constants/data';
import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
// import * as Services from 'services';
import { GA_TRACKING_ID_V2 } from 'utils/gtag';
import { GLOBAL_STORE } from 'zustand-lib';
import useMobileV2 from 'zustand-lib/storeMobile';
import useChat from 'zustand-lib/useChat';
import '../styles/globals.css';
import '../styles/icomoon.css';

// Happy lunar new year 2023
const ChatThuocSi = dynamic(() => import('utils/ChatThuocsi'), { ssr: false });

const { publicRuntimeConfig } = getConfig();

const pathNoRedirect = [
  '/',
  '/list-product',
  '',
  '/flagship-store',
  '/flagship-store/[slug]/list-product',
  '/flagship-store/[slug]',
  '/flagship-store/durex',
  '/flagship-store/durex/list-product',
  '/flagship-store/durex/rewards',
  '/flagship-store/sanofi',
  '/flagship-store/sanofi/list-product',
  '/flagship-store/sanofi/rewards',
  '/phanhoi',
  '/qr',
  '/qr/[code]',
  'phanhoi',
  'feedback',
  '/feedback',
  '/flagship-store/[slug]/flagship-rewards',
  '/flagship-store/[slug]/rewards',
  '/tracking-order',
  '/maintain',
];

const DISABLE_INSIDER = ['tracuu.thuocsi.vn', 'phanhoi.thuocsi.vn', 'maintain.thuocsi.vn', 'maintain.v2-stg.thuocsi.vn'];
const CHAT_HIDE_URLS = ['/discovery', CART_URL, CHECKOUT_URL, ACCOUNT, QUICK_ORDER];

const MyApp = (props) => {
  const { Component, pageProps, host = '', buildId = '' } = props;

  const { user = {}, accountInfo = {}, SEO_CONFIG = {}, initialZustandState = {} } = pageProps || {};

  const { useCreateStore, Provider } = GLOBAL_STORE || {};

  // Sentry?.setTag('buildId', buildId);
  // Sentry.setUser({ id: user?.customerID });
  const { insiderSetting = false, thumbnailMap = {}, defaultThumbnail = {}, regionsMB = [] } = initialZustandState || {};

  const router = useRouter();
  const { query, replace, pathname } = router || {};
  const createStore = useCreateStore({ ...pageProps.initialZustandState, user });
  const { referCode, action, login, forgetpasscode, t, token, redirectUrl } = query || {};
  const isShowingLogin = login === 'true';
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const isTrackingMobileV2 = useMobileV2((state) => state.isTrackingMobileV2);

  const { clearState } = useChat((state) => state);
  let isEnableInsider = insiderSetting;
  if (host) {
    isEnableInsider = !DISABLE_INSIDER.some((item) => item === host) && insiderSetting;
  }

  // Dùng SEO default là thông tin SEO của trang chủ
  const seoInfo = thumbnailMap[router.asPath] || {};
  const toggleChat = () => {
    clearState();
    router.push(`/conversations`);
  };

  // hide page chat
  const isShowIconFBPage = !CHAT_HIDE_URLS.includes(pathname);

  // config https://material-ui.com/guides/server-rendering/
  useEffect(() => {
    // if (window) window.Services = Service;

    // initAllSellers();
    // Remove the server-side injected CSS.
    // if (!isPrd && window) {
    //   window.Services = Services;
    // }
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // lỗi zalo
    if (!window.zaloJSV2) {
      window.zaloJSV2 = {};
    }

    // nếu khách vào thuocsi.com.vn -> cần redirect lại domain chính
    if (window && window?.location?.href?.indexOf('thuocsi.com.vn') >= 0) {
      router.push(`${DOMAIN_WEB_HOST}`);
    }

    // Prevent pull to refresh for chat mobile
    if (router.pathname === '/conversations') {
      document.querySelector('html')?.classList.add('preventPullToRefresh');
    } else {
      document.querySelector('html')?.classList?.remove('preventPullToRefresh');
    }
  }, []);

  // DOMAINS_THUOCSI -> domain thuocsi sẽ chạy, các host khác proxy tới thuocsi sẽ bị đá lại domain chính
  useEffect(() => {
    // nếu chuyển sang trang products ... thì sẽ check host , nếu ko đúng host thì tự redirect sang domain chính
    if (DOMAINS_THUOCSI?.indexOf(host) === -1 && !pathNoRedirect.includes(router.pathname)) {
      router.push(`${DOMAIN_WEB_HOST}${router.asPath}`);
    }

    // TODO:   nếu user là miền bắc -> hk.thuocsi.vn , nếu user là miền nam ->thuocsi.vn
    // internet bị đứt nên cần move uat / prd sang hk.thuocsi.vn
    // NG dùng miền bắc - sài domain thuocsi.vn -> thì vào hk

    // off redirect -> hk  06Mar2023
    // if (['prd'].includes(ENV) && user && regionsMB && regionsMB?.includes(`${user.provinceCode}`) && host?.startsWith('thuocsi.vn')) {
    //   // test
    //   // if (user && regionsMB && regionsMB?.includes(`${user.provinceCode}`) && host !== 'hk.thuocsi.vn') {
    //   // redirect to hk / nếu là khách miền abwcs
    //   router.push(`https://hk.thuocsi.vn/${router.asPath}`);
    // }
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = async (url) => {
      gtag.pageview(url);
      // fbpixel.pageview();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <meta name="keywords" content="thuốc sỉ" />
        <title>{seoInfo?.pageTitle || SEO_CONFIG?.title || defaultThumbnail?.pageTitle || DEFAULT_THUOCSI_LONG_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {/* <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height="3" options={{ showSpinner: false }} /> */}
      <StylesProvider injectFirst>
        <StyledTheme theme={Theme}>
          <MuiThemeProvider theme={Theme}>
            <CssBaseline />
            {/* Context composer */}
            <Provider createStore={createStore}>
              <ContextProviderComposer
                contextProviders={[
                  <AuthProvider
                    isShowingLogin={isShowingLogin}
                    referCode={referCode}
                    forgetpasscode={forgetpasscode}
                    action={action}
                    tokenv1={t}
                    token={token}
                    redirectUrl={redirectUrl}
                    // initAccount={accountInfo}
                    initUser={user}
                  />,
                  <ProductContextProvider initUser={user} />,
                  <CartContextProvider />,
                  <NotiContextProvider initUser={user} />,
                  <SettingProvider />,
                  <SearchProvider />,
                  <WishListProvider />,
                  <TicketProvider />,
                  // <Provider config={rollbarConfig} />,
                ]}
              >
                {/* Protect route */}
                <LoadingRoute>
                  <Component {...pageProps} />
                  {/* TODO: FbMessenger  FEATURE-CHAT */}
                  {/* {pageProps.isMobile && isShowIconFBPage && pageProps?.isAuthenticated && <IconChat isAuthenticated={pageProps?.isAuthenticated} onClick={toggleChat} />} */}

                  {pageProps.isMobile && isShowIconFBPage && <IconChat isAuthenticated={pageProps?.isAuthenticated} onClick={toggleChat} />}
                  {/* ChatThuocSi comp gồm FB mess, Internal Chat, Chat setting */}
                  {/* add key để reload lại chat khi login */}
                  {!pageProps.isMobile && <ChatThuocSi key={pageProps?.isAuthenticated || null} />}
                  {pathname !== '/conversations' && <ScrollToTop {...router} />}
                  <ToastContainer limit={2} pauseOnHover={false} hideProgressBar autoClose={2000} closeOnClick />
                </LoadingRoute>
              </ContextProviderComposer>
            </Provider>
          </MuiThemeProvider>
        </StyledTheme>
      </StylesProvider>
      {isEnableInsider && INSIDER_ID && (
        <Script id={INSIDER_ID} src={`https://thuocsivn.api.useinsider.com/ins.js?id=${INSIDER_ID}`} strategy="afterInteractive" />
      )}

      {ENV === 'prd' && isMobileV2 && isTrackingMobileV2 && (
        <>
          <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID_V2}&l=dataLayerGAV2`} />
          <Script strategy="lazyOnload">
            {`
                    window.dataLayerGAV2 = window.dataLayerGAV2 || [];
                    function gtagGAV2(){dataLayerGAV2.push(arguments);}
                    gtagGAV2('js', new Date());
                    gtagGAV2('config', '${GA_TRACKING_ID_V2}', {
                    page_path: window.location.pathname,
                    });
                `}
          </Script>
        </>
      )}
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

MyApp.getInitialProps = async (appContext) => {
  const time = +new Date();
  const appProps = await App.getInitialProps(appContext);
  let host = '';
  try {
    host = appContext.ctx.req.headers.host || '';
  } catch (error) {
    host = "can't detect host";
  }

  let isMobile = '';
  try {
    const UA = appContext.ctx.req.headers['user-agent'];
    isMobile = Boolean(UA.match(MOBILE));
  } catch (error) {
    isMobile = `can not detect device - ${error}`;
  }

  return {
    ...appProps,
    host,
    buildId: publicRuntimeConfig.buildId,
    timeAPP: +new Date() - time,
    pageProps: {
      isMobile: !!isMobile,
    },
  };
};

export default appWithTranslation(MyApp);
