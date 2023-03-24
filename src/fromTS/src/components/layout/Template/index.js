/* eslint-disable react/jsx-wrap-multilines */
import { AppBar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import AlertSection from 'components-v2/atoms/AlertSection';
import Header from 'components-v2/layout/Header';
import { defaultOptionsTab } from 'components-v2/layout/Header/mobile/HeaderIconButton';
import Navbar from 'components-v2/layout/Navbar';
import { ButtonHeader } from 'components/atoms/Button';
import HeadPage from 'components/atoms/HeadPage';
import { BRAND_NAME } from 'constants/Enums';
import { CART_URL, PRODUCT_LIST, QUICK_ORDER } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import useHandleTrial from 'hooks/useHandleTrial';
import useTimeout from 'hooks/useTimeout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NOTIFY_IN_TOP_BAR } from 'sysconfig';
import { CookiesParser, routeHandler } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import FooterWithCart from '../FooterMobile/components/FooterWithCart';
import TopSearchMobile from '../TopSearchMobile';

import styles from './styles.module.css';

const DELAY_REQUEST_MODAL = 5000;

const Footer = dynamic(() => import('components-v2/organisms/Footer'), { ssr: false });
const CustomModal = dynamic(() => import('components/mocules/CustomModal'), { ssr: false });
const NewRegisterGuestModal = dynamic(() => import('components/organisms/NewRegisterGuestModal'), { ssr: false });
const NewSignInModal = dynamic(() => import('components/organisms/NewSignInModal'), { ssr: false });
const NewSignUpModal = dynamic(() => import('components/organisms/NewSignUpModal'), { ssr: false });
const NewChangePasswordModal = dynamic(() => import('components/organisms/NewChangePasswordModal'), { ssr: false });
const NewForgetPasswordModal = dynamic(() => import('components/organisms/NewForgetPasswordModal'), { ssr: false });
const FooterMobile = dynamic(() => import('../FooterMobile'), { ssr: false });
const HeaderMobile = dynamic(() => import('../HeaderMobile'), { ssr: false });
const HeaderMobileNew = dynamic(() => import('components-v2/layout/Header/mobile'), { ssr: false });
const FooterMobileNew = dynamic(() => import('components-v2/layout/Footer/mobile'), { ssr: false });

// modal
const RequestModal = dynamic(() => import('components/organisms/RequestModal'), { ssr: false });
const PopupFullScreen = dynamic(() => import('components-v2/PopupFullScreen'), { ssr: false });

const defaultMV2Options = {
  offHeader: false,
  title: '',
  CustomRightHeader: false, // => truyền vào components -> nếu có CustomRightHeader thì iconRightHeader sẽ ko hiển thị
  offIconRight: false,
  iconRightHeader: {
    // các icon right header muốn hiện (có sắp xếp theo thứ tự)
    notify: true,
    cart: true,
    userinfo: true,
    toQuickOrder: false,
    home: false,
  },
};
// this template is using for PC. mobile v1 and mobile
export default function Template({
  title = '',
  children,
  isMobile,
  pageName,
  pageTitle = '',
  product = '',
  point = 0,
  balance = 0,
  showTopSearchMV2 = false,
  overrideMV2Options = {},
  isWebView = false,
}) {
  const {
    isAuthenticated,
    toggleLogin,
    isShowLogin,
    handleChangeForget,
    isShowForgetPassword,
    toggleForgetPassword,
    toggleChangePassword,
    isShowChangePassword,
    isShowSignUp,
    toggleSignUp,
    handleChangeSignIn,
    handleChangeSignUp,
    registerGuest,
    isShowRegisterGuest,
    toggleRegisterGuest,
    toggleShowGuestExpiredTime,
    isShowGuestExpiredTime,
    isShowForgotPassMess,
    toggleShowForgotPassMess,
    isShowBlockAccountMess,
    toggleShowBlockAccountMess,
    isShowNotFoundAccountMess,
    toggleShowNotFoundAccountMess,
    getValShowResponseNotFoundAccountMess,
    customerInfo,
    user,
  } = useAuth();

  const [openRequestModal, toggleRequestModal] = useModal();
  const toggleBeta = useMobileV2((state) => state.toggleBeta);
  const canUseMobileV2 = useStore((state) => state.canUseMobileV2);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const beta = useMobileV2((state) => state.beta);

  const { clearCart, isShowModalMax200Item, toggleShowModalMax200Item } = useCart();

  const { pathname, asPath, replace, query, ...restRouter } = useRouter();

  useHandleTrial(user, isMobile, toggleBeta, isMobileV2, canUseMobileV2);

  const openModal = () => {
    const IS_SHOW_REQUEST_MODAL = 'isShowRequestModal';
    const isShowRequestModal = CookiesParser.CookiesParser(document.cookie)[IS_SHOW_REQUEST_MODAL];
    if (!isAuthenticated && !isShowRequestModal && !isShowLogin && !isShowSignUp) {
      toggleRequestModal();
      document.cookie = `${IS_SHOW_REQUEST_MODAL}=true;`;
    }
  };

  useTimeout(openModal, DELAY_REQUEST_MODAL);

  const { status = '' } = customerInfo || {};

  let mv2Options = {};
  if (beta || pathname === '/conversations') {
    const isBottomNavigation = routeHandler.isBottomNavigation({ pathname, asPath, ...restRouter });
    if (!overrideMV2Options.iconRightHeader && !isBottomNavigation) {
      mv2Options = {
        ...mv2Options,
        ...defaultOptionsTab,
      };
    } else {
      mv2Options = {
        ...defaultMV2Options,
        ...overrideMV2Options,
      };
    }
    mv2Options = {
      ...mv2Options,
      title: overrideMV2Options?.title ? overrideMV2Options?.title : pageTitle,
    };
  }

  useEffect(() => {
    if (!isAuthenticated && isShowGuestExpiredTime) {
      clearCart();
    }
  }, [isShowGuestExpiredTime]);

  let notifyWidth = 0;
  if (NOTIFY_IN_TOP_BAR) {
    notifyWidth = isMobile ? 129 : 0;
  }
  const checkRenderUIHeader = () => {
    const { offHeader, title: headerTitle, iconRightHeader, CustomRightHeader, offIconRight } = mv2Options;
    if (offHeader || isWebView) {
      return <></>;
    }
    if (beta || pathname === '/conversations') {
      // header mmv2
      return (
        <HeaderMobileNew
          title={headerTitle}
          isFooterPath={!!user}
          renderRightIcons={iconRightHeader}
          CustomRightHeader={CustomRightHeader}
          offIconRight={offIconRight}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      );
    }

    // header mv1
    return <HeaderMobile title={pageTitle} isMobile={isMobile} />;
  };

  const checkRenderUIFooter = () => {
    if (beta) {
      // show footer cart for quick order and cart page
      if (pathname === QUICK_ORDER || pathname === CART_URL) {
        return (
          <AppBar position="fixed" className={styles.appBar}>
            <FooterWithCart />
          </AppBar>
        );
      }

      if (routeHandler.isBottomNavigation({ pathname, asPath, ...restRouter })) {
        return (
          <div style={{ marginTop: 'calc(75px + 24px)' }}>
            <FooterMobileNew isAuthenticated={isAuthenticated} toggleSignUp={toggleSignUp} toggleLogin={toggleLogin} />
          </div>
        );
      }
      return <></>;
    }

    return (
      <>
        {pageName !== 'conversations' && (
          <div style={{ marginTop: '44px' }}>
            <FooterMobile product={product} />;
          </div>
        )}
      </>
    );
  };

  const MobileProdPage = [PRODUCT_LIST, '/manufacturers/[slug]', '/tag/[slug]'];
  const marginTopForHeader = () => {
    if (isMobile && beta && MobileProdPage.includes(pathname)) return '48px';
    if (isMobile && !mv2Options.offHeader) return '55px';

    return '0px';
  };

  return (
    <div>
      <HeadPage title={title} />
      <div id="main" className={clsx(beta && styles.new_bg_mobile, isMobile && styles.bg_mobile)}>
        {isMobile ? checkRenderUIHeader() : <Header isMobile={isMobile} />}
        {!isMobile && <Navbar pageName={pageName} point={point} balance={balance} />}
        {/* Placeholder for NOTIFY_IN_TOP_BAR */}
        {pageName !== 'conversations' && (
          <AlertSection
            beta={beta}
            pathname={pathname}
            isMobile={isMobile}
            notifyWidth={notifyWidth}
            marginTopForHeader={marginTopForHeader}
            isAuthenticated={isAuthenticated}
            status={status}
            asPath={asPath}
            isMobileProdPage={beta && isMobile && MobileProdPage.includes(pathname)}
            isMobileV2={isMobileV2}
          />
        )}

        {isMobile && pageName !== 'conversations' && <TopSearchMobile isNewMobile={beta} showTopSearchMV2={showTopSearchMV2} />}
        {children}
        {isMobile ? <>{checkRenderUIFooter()}</> : <Footer />}
        {isMobile && beta && !isAuthenticated ? (
          <PopupFullScreen user={user} />
        ) : (
          !isAuthenticated && (
            <>
              <NewSignInModal visible={isShowLogin} onClose={toggleLogin} onChangeForget={handleChangeForget} onChangeSignUp={handleChangeSignUp} />
              <NewForgetPasswordModal visible={isShowForgetPassword} onClose={toggleForgetPassword} />
              <NewSignUpModal visible={isShowSignUp} onClose={toggleSignUp} onChangeSignIn={handleChangeSignIn} className="signup-modal" />
              <NewRegisterGuestModal visible={isShowRegisterGuest} onClose={toggleRegisterGuest} onChangeRegisterGuest={registerGuest} />
              <CustomModal
                visible={isShowGuestExpiredTime}
                onClose={toggleShowGuestExpiredTime}
                content="Thời gian dùng thử đã hết. Mời bạn vui lòng tạo tài khoản để sử dụng hoặc nhắn tin chúng tôi để được hỗ trợ tốt nhất!"
                btnOkRender={false}
                btnCloseRender={false}
                customBtnRender={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <div className={styles.btngroup}>
                    {/* <ButtonHeader
                className={styles.custombtn}
                variant="contained"
                btnType="primary"
                href="tel:02873008840"
              >
                Gọi nhân viên hỗ trợ
              </ButtonHeader> */}
                    <ButtonHeader variant="contained" btnType="primary" onClick={toggleSignUp}>
                      Tạo tài khoản
                    </ButtonHeader>
                  </div>
                }
              />
              {isShowForgotPassMess && (
                <CustomModal
                  visible={isShowForgotPassMess}
                  onClose={toggleShowForgotPassMess}
                  content={`Bạn đã nhập sai mật khẩu. Hãy nhập thử "12345678" hoặc liên hệ ${BRAND_NAME} để được hỗ trợ, xin cảm ơn!`}
                  btnOkRender={false}
                  btnCloseRender={false}
                  customBtnRender={
                    <div className={styles.btngroup}>
                      <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowForgotPassMess}>
                        Tôi đã hiểu
                      </ButtonHeader>
                    </div>
                  }
                />
              )}
            </>
          )
        )}
        {isShowBlockAccountMess && (
          <CustomModal
            visible={isShowBlockAccountMess}
            onClose={toggleShowBlockAccountMess}
            content={
              <Typography className={styles.text_modal}>
                Tài khoản của bạn đã bị khoá. Liên hệ hotline <a href="tel:02873008840">02873008840</a> để được hỗ trợ, xin cảm ơn!
              </Typography>
            }
            btnOkRender={false}
            btnCloseRender={false}
            customBtnRender={
              <div className={styles.btngroup}>
                <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowBlockAccountMess}>
                  Tôi đã hiểu
                </ButtonHeader>
              </div>
            }
          />
        )}
        {isShowNotFoundAccountMess && (
          <CustomModal
            visible={isShowNotFoundAccountMess}
            onClose={toggleShowNotFoundAccountMess}
            content={`Không tìm thấy thông tin người dùng. Liên hệ ${BRAND_NAME} để được hỗ trợ, xin cảm ơn! ${JSON.stringify(
              getValShowResponseNotFoundAccountMess(),
            )}`}
            btnOkRender={false}
            btnCloseRender={false}
            customBtnRender={
              <div className={styles.btngroup}>
                <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowBlockAccountMess}>
                  Tôi đã hiểu
                </ButtonHeader>
              </div>
            }
          />
        )}
        {isShowModalMax200Item && (
          <CustomModal
            visible={isShowModalMax200Item}
            onClose={toggleShowModalMax200Item}
            content="Giỏ hàng chỉ chứa tối đa 200 mặt hàng."
            btnOkRender={false}
            btnCloseRender={false}
            customBtnRender={
              <div className={styles.btngroup}>
                <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowModalMax200Item}>
                  Tôi đã hiểu
                </ButtonHeader>
              </div>
            }
          />
        )}
        {isAuthenticated && isShowChangePassword && <NewChangePasswordModal visible={isShowChangePassword} onClose={toggleChangePassword} />}
      </div>

      {/* mặc định nếu chưa đăng nhập thì mobile dùng fb  */}
      {/* TODO: FbMessenger  FEATURE-CHAT */}
      {/* {!isAuthenticated && isMobile && isShowDelay && FACEBOOK_MESSENGER_ID && <Facebook />} off su dung Chatthuocsi thay chat fb */}
      {/* nếu không phải mobile => web => check setting  */}
      {/* {!isMobile && false && <>{MapChatComponent[chatSetting]}</>} */}
      {!beta && openRequestModal && <RequestModal visible={openRequestModal} onClose={toggleRequestModal} />}
    </div>
  );
}
