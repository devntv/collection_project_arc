import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';
import Theme from 'components/layout/Theme';
import { DEFAULT_THUOCSI_DESCRIPTION, DEFAULT_THUOCSI_LONG_TITLE, DEFAULT_THUOCSI_TITLE } from 'constants/data';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { GTM } from 'sysconfig';
import { getLinkImageCache } from 'utils/CacheImageUtils';
// import { FACEBOOK_PIXEL_CODE } from 'utils/fbpixel';
import { GA_TRACKING_ID } from 'utils/gtag';

const LinkBanner = getLinkImageCache({
  src: 'https://img-proxy.thuocsi.vn/thuocsi-live/web/marketing/campaign_09/thumbnail_01Nov2022.png?size=origin',
  width: 1200,
  quality: 100,
});

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    let pageProps = null;

    const styledComponentsSheet = new StyledComponentSheets();
    const materialSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => {
            pageProps = props;
            return styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />));
          },
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        pageProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    const { pageProps } = this.props;

    const router = pageProps?.router || {};

    const thumbnailMap = pageProps?.pageProps?.initialZustandState?.thumbnailMap || {};
    const defaultThumbnail = pageProps?.pageProps?.initialZustandState?.defaultThumbnail || {};

    // Dùng SEO default là thông tin SEO của trang chủ
    const seoInfo = thumbnailMap[router.asPath];

    const SEO_CONFIG = pageProps?.pageProps?.SEO_CONFIG || {};

    return (
      <Html lang="en" prefix="og: http://ogp.me/ns#">
        <Head>
          <meta charSet="utf-8" />
          {/* zalo */}
          <meta property="title" content={seoInfo?.title || SEO_CONFIG?.title || defaultThumbnail?.title || DEFAULT_THUOCSI_TITLE} />
          <meta
            property="description"
            content={seoInfo?.description || SEO_CONFIG?.description || defaultThumbnail?.description || DEFAULT_THUOCSI_DESCRIPTION}
          />
          <meta property="og:title" content={seoInfo?.title || SEO_CONFIG?.ogTitle || defaultThumbnail?.title || DEFAULT_THUOCSI_TITLE} />
          <meta property="og:image" content={seoInfo?.imageUrl || SEO_CONFIG?.ogImage || defaultThumbnail?.imageUrl || LinkBanner} />
          <meta property="og:image:alt" content={seoInfo?.title || SEO_CONFIG?.ogImageAlt || defaultThumbnail?.title || DEFAULT_THUOCSI_LONG_TITLE} />
          <meta
            property="og:description"
            content={seoInfo?.description || SEO_CONFIG?.ogDescription || defaultThumbnail?.description || DEFAULT_THUOCSI_DESCRIPTION}
          />
          {/* end zalo
          {/* PWA primary color */}
          <meta name="theme-color" content={Theme.palette.thirdly.main} />
          <link rel="shortcut icon" type="image/png" href="/static/images/favicon-16x16.png" size="16x16" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          {/* <link rel="shortcut icon" type="image/png" href="/images/favicon-16x16.png" size="16x16" />
          <link rel="shortcut icon" type="image/png" href="/images/favicon-32x32.png" size="32x32" />
          <link rel="shortcut icon" type="image/png" href="/images/favicon-96x96.png" size="96x96" /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <link rel="preload" href="/static/fonts/GoogleSans-Medium.ttf" as="font" type="font/ttf" crossOrigin="" />
          <link rel="preload" href="/static/fonts/GoogleSans-Regular.ttf" as="font" type="font/tff" crossOrigin="" />

          {GA_TRACKING_ID && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}&l=dataLayerGA`} />}
          {/* {GTM && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTM}`} />} */}

          {GA_TRACKING_ID && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayerGA = window.dataLayerGA || [];
                  function gtagGA(){dataLayerGA.push(arguments);}
                  gtagGA('js', new Date());
                  gtagGA('config', '${GA_TRACKING_ID}',{
                    page_path: window.location.pathname,
                  });
  `,
              }}
            />
          )}

          {GTM && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM}');
  `,
              }}
            />
          )}

          {/* {FACEBOOK_PIXEL_CODE && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${FACEBOOK_PIXEL_CODE});
              fbq('track', 'PageView');
  `,
              }}
            />
          )}

          {FACEBOOK_PIXEL_CODE && (
            <noscript>
              <img
                alt="facebook-events"
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_CODE}&ev=PageView&noscript=1`}
              />
            </noscript>
          )} */}
        </Head>
        <body className="notranslate">
          {GTM && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="gtag manager"
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
