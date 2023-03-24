// import * as Sentry from '@sentry/nextjs';
// import * as Sentry from '@sentry/nextjs';
// TODO: refactor contanst
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';
import Insider from 'utils/Insider';
import { removeSessionToken } from 'utils/SessionUtils';
// import Router from 'next/router';

export const withLogin =
  (Component, checkLogin = true, redirect = {}) =>
  ({ ...props }) => {
    // if (maintain) {
    //   return <MaintainPage />;
    // }
    // nếu có lỗi server side thì sẽ in ở đây
    if (props?.err) {
      console.error(props?.err);
    }
    const { url, message } = redirect;
    const { isAuthenticated, isInvalidToken, user } = props;
    let msg = '';
    if (checkLogin && !isAuthenticated) {
      msg = message && message.length > 0 ? message : 'Bạn cần đăng nhập để vào được trang này ';
    } else if (isInvalidToken) {
      // server side
      // when user click other page , do with server side run -> check inValidToken
      msg = message && message.length > 0 ? message : 'Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại để có thể tiếp tục thao tác ';
    }

    if (msg && msg.length > 0) {
      removeSessionToken();
      NotifyUtils.error(msg);
      // Router.push(url && url.length > 0 ? url : '/?login=true');
      const currentUrl = window.location.pathname;
      setTimeout(() => {
        window.location.replace(url && url.length > 0 ? url : `/?login=true&redirectUrl=${currentUrl}`);
      }, 2000);

      return <LoadingScreen />;
    }

    // TODO: insider
    Insider.initUser(user);

    // // init sentry
    // if (user?.customerID) {
    //   Sentry?.setUser({ id: user?.customerID });
    // }

    return <Component {...props} />;
  };

export default withLogin;
