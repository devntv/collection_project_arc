import { Box } from '@material-ui/core';
import FooterWithLogic from 'components/layout/FooterWithLogic';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import useMobileV2 from 'zustand-lib/storeMobile';
import Header from '../header';

const HeaderMobileNew = dynamic(() => import('components-v2/layout/Header/mobile'));

const NewTemplate = ({ title = '', children }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <meta name="keywords" content="thuốc sỉ" />
        {title && <title>{title}</title>}
      </Head>
      <div id="main" style={{ backgroundColor: '#ffff' }}>
        {isMobileV2 && <HeaderMobileNew />}
        <Box marginTop="40px">
          <Header />
        </Box>
        {children}
        {!isMobileV2 && <FooterWithLogic />}
      </div>
    </div>
  );
};
export default NewTemplate;
