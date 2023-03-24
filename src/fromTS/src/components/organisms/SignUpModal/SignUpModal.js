import { isValid } from 'clients';
import { AuthModal, SignUpForm } from 'components/mocules';
import { BRAND_NAME } from 'constants/Enums';
import { QUICK_ORDER } from 'constants/Paths';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AuthService } from 'services';
import { gtag, NotifyUtils } from 'utils';
import Insider from 'utils/Insider';

const SignUpModal = React.memo((props) => {
  const { className, visible, onClose, onChangeSignIn, t } = props;
  const { login } = useAuth();
  const router = useRouter();
  const { referCode } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlert, setHasAlert] = useState('');

  const handleSignUp = (data) => {
    setIsLoading(true);

    AuthService.signUp(data)
      .then((result) => {
        if (!isValid(result)) {
          NotifyUtils.error(result.message);
          setHasAlert(`Đã có lỗi xảy ra ${result.message}`);
          return;
        }
        // notification
        NotifyUtils.success(`Bạn đã đăng ký tài khoản ${BRAND_NAME} thành công`);

        // add gtag registed completed
        try {
          gtag.registedCompleted();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }

        // Insider event register completed
        try {
          const newUser = result?.data?.[0];
          Insider.registerSuccess(newUser);
        } catch (e) {
          console.error(e);
        }

        if (onClose && typeof onClose === 'function') {
          onClose();
        }

        // register success -> login and redirect
        AuthService
          // .loginLocal({
          //   username: data.phone,
          //   password: data.password,
          // })
          .login({ username: data.phone, password: data.password, type: 'CUSTOMER' })
          .then((resultlogin) => {
            if (!isValid(resultlogin)) {
              const errorCode = `login.${resultlogin.errorCode}`;
              NotifyUtils.error(t(errorCode));
              return;
            }
            NotifyUtils.success('Đăng nhập thành công');
            const userInfo = resultlogin.data[0];
            login(userInfo, false);

            // redirect to quick-order - when login success
            router.push(QUICK_ORDER);
          })
          .catch((error) => {
            NotifyUtils.error('Đã có lỗi xảy ra khi đăng nhập ');
            setHasAlert(`Đã có lỗi xảy ra ${error}`);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        NotifyUtils.error(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
        setHasAlert(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthModal visible={visible} className={className} onClose={onClose} title="Đăng ký Thành viên" width="438">
      <SignUpForm
        width="350"
        hasAlert={hasAlert}
        onClickSignIn={onChangeSignIn}
        isLoading={isLoading}
        referCode={referCode}
        onClickSignUp={handleSignUp}
      />
    </AuthModal>
  );
});

export default SignUpModal;
