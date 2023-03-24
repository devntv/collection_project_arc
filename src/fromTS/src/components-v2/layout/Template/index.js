import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import HeaderMobileNew from 'components-v2/layout/Header/mobile';
import FooterWithLogic from 'components/layout/FooterWithLogic';
import HeaderMobile from 'components/layout/HeaderMobile';
import { useAuth } from 'context';
import useMobileV2 from 'zustand-lib/storeMobile';
import Header from '../Header';
import NavBar from '../Navbar';

export default function Template({ children, pageName, pageTitle = '', product = '', point = 0, balance = 0, isMobile }) {
  const { user } = useAuth();
  const beta = useMobileV2((state) => state.beta);

  const checkRenderUIHeader = () => {
    if (beta) {
      return <HeaderMobileNew title={pageTitle} />;
    }
    return <HeaderMobile title={pageTitle} isMobile={isMobile} />;
  };

  return (
    <div id="main">
      {isMobile ? checkRenderUIHeader() : <Header balance={balance} point={point} isMobile={isMobile} />}
      {!isMobile && <NavBar pageName={pageName} point={point} balance={balance} isMobile={isMobile} />}
      {user?.settings?.isDisplayNotiTopBar && (
        <Container maxWidth="lg" style={{ maxWidth: '1304px' }}>
          <Alert severity="error" style={{ marginTop: '10px', marginBottom: '5px', borderRadius: '8px' }}>
            {user?.settings?.content}
          </Alert>
        </Container>
      )}
      {children}
      <FooterWithLogic product={product} />
    </div>
  );
}
