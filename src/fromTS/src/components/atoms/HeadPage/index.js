import Head from 'next/head';
import { getTitle } from 'utils/SEOUtils';

const HeadPage = ({ title, useSubTitle = false }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta httpEquiv="Cache-Control" content="no-cache" />
    <meta httpEquiv="Expires" content="-1" />
    <meta name="keywords" content="thuốc sỉ" />
    {title && <title>{getTitle(title, useSubTitle)}</title>}
  </Head>
);
export default HeadPage;
