import { ButtonHeader } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { useAuth, useCart } from 'context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import styles from '../Template/styles.module.css';

const Footer = dynamic(() => import('components-v2/organisms/Footer'));
const CustomModal = dynamic(() => import('components/mocules/CustomModal'));
const NewRegisterGuestModal = dynamic(() => import('components/organisms/NewRegisterGuestModal'));
const NewSignInModal = dynamic(() => import('components/organisms/NewSignInModal'));
const NewSignUpModal = dynamic(() => import('components/organisms/NewSignUpModal'));
const NewChangePasswordModal = dynamic(() => import('components/organisms/NewChangePasswordModal'));
const NewForgetPasswordModal = dynamic(() => import('components/organisms/NewForgetPasswordModal'));
const FooterMobileNew = dynamic(() => import('components-v2/layout/Footer/mobile'));
const FooterMobile = dynamic(() => import('../FooterMobile'));

const FooterWithLogic = memo((props) => {
  const { product = '' } = props;
  const { pathname } = useRouter();

  const {
    isAuthenticated,
    isShowLogin,
    toggleLogin,
    handleChangeForget,
    handleChangeSignUp,
    isShowForgetPassword,
    toggleForgetPassword,
    isShowSignUp,
    toggleSignUp,
    handleChangeSignIn,
    isShowRegisterGuest,
    toggleRegisterGuest,
    registerGuest,
    isShowGuestExpiredTime,
    toggleShowGuestExpiredTime,
    isShowForgotPassMess,
    toggleShowForgotPassMess,
    isShowBlockAccountMess,
    toggleShowBlockAccountMess,
    isShowChangePassword,
    toggleChangePassword,
    beta,
  } = useAuth();

  const { toggleShowModalMax200Item, isShowModalMax200Item } = useCart();

  const textForgotPass = (
    <div className={styles.btngroup}>
      <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowForgotPassMess}>
        Tôi đã hiểu
      </ButtonHeader>
    </div>
  );
  const textShowBlock = (
    <div className={styles.btngroup}>
      <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowBlockAccountMess}>
        Tôi đã hiểu
      </ButtonHeader>
    </div>
  );
  const textMaxItem = (
    <div className={styles.btngroup}>
      <ButtonHeader variant="contained" btnType="primary" onClick={toggleShowModalMax200Item}>
        Tôi đã hiểu
      </ButtonHeader>
    </div>
  );
  return (
    <>
      {isMobile ? (
        <>
          {(pathname === '/' || pathname === '/qr') && <Footer />}
          <div style={{ marginTop: '44px' }}>{beta ? <FooterMobileNew /> : <FooterMobile product={product} />}</div>
        </>
      ) : (
        <Footer />
      )}
      {!isAuthenticated && (
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
              customBtnRender={textForgotPass}
            />
          )}
        </>
      )}
      {isShowBlockAccountMess && (
        <CustomModal
          visible={isShowBlockAccountMess}
          onClose={toggleShowBlockAccountMess}
          content={`Tài khoản của bạn đã bị khóa. Liên hệ ${BRAND_NAME} để được hỗ trợ, xin cám ơn!`}
          btnOkRender={false}
          btnCloseRender={false}
          customBtnRender={textShowBlock}
        />
      )}
      {isShowModalMax200Item && (
        <CustomModal
          visible={isShowModalMax200Item}
          onClose={toggleShowModalMax200Item}
          content="Giỏ hàng chỉ chứa tối đa 200 mặt hàng."
          btnOkRender={false}
          btnCloseRender={false}
          customBtnRender={textMaxItem}
        />
      )}
      {isAuthenticated && isShowChangePassword && <NewChangePasswordModal visible={isShowChangePassword} onClose={toggleChangePassword} />}
    </>
  );
});

export default FooterWithLogic;
