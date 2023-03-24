/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
import { AuthClient, CustomerClient, getFirst, isValid } from 'clients';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { REMEMBER_ME } from 'constants/Cookies';
import { CUSTOMER_TAG, ENUMS_ERROR_ACC_CODE, MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { HTTP_STATUS } from 'constants/Enums/http';
import { MY_ACCOUNT, QUICK_ORDER } from 'constants/Paths';
import { useModal } from 'hooks';
import useLocalStorageState from 'hooks/useLocalStorageState';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AuthService from 'services/AuthService';
import SettingService from 'services/SettingService';
import UserService from 'services/UserService';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, GENERAL_DOMAIN } from 'sysconfig';
import { gtag, NotifyUtils } from 'utils';
import localStorageUtils from 'utils/localStorageUtils';
import MonitorUtils from 'utils/MonitorUtils';
import { getSessionTokenClient } from 'utils/SessionUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import useChatGuest from 'zustand-lib/useChatGuest';

const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  isShowingLogin,
  referCode,
  tokenv1,
  token,
  redirectUrl,
  initialName = '',
  initDisplayProduct = '',
  initAccount,
  initUser,
}) => {
  // export const AuthProvider = ({ children, isShowingLogin, tokenv1 }) => {
  const [user, setUser] = useState(initUser);
  const [customerInfo, setCustomerInfo] = useState(initUser);

  // const [bankInfo, setBankInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname } = router;
  const [isShowLogin, toggleLogin] = useModal(!initUser && isShowingLogin);
  const [isShowSignUp, toggleSignUpFunc, getValShowSignUp] = useModal(!!referCode);
  const [isShowForgetPassword, toggleForgetPassword] = useModal();
  const [isShowChangePassword, toggleChangePassword] = useModal();
  const [isShowRegisterGuest, toggleRegisterGuest] = useModal(false);
  const [isShowForgotPassMess, toggleShowForgotPassMess] = useModal(false);
  const [mobileDisplayProduct, setMobileDisplayProduct] = useLocalStorageState('isMobilePaging', initDisplayProduct);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const removeGuestId = useChatGuest((state) => state.removeGuestId);
  const removeGuestInfo = useChatGuest((state) => state.removeGuestInfo);
  // const getDataMostSearch = useCallback(() => MostSearchData, []);

  // TODO:
  // change password
  useEffect(() => {
    setUser(initUser);
    setCustomerInfo(initUser);
    setIsAuthenticated(!!initUser);
    setIsLoading(false);

    const { account } = initUser || {};
    const { isTempPassword } = account || {};
    if (isTempPassword) {
      toggleChangePassword();
    }
    // FOR LOG tele
    if (initUser && initUser?.customerID) {
      Cookies.set('customerId', initUser?.customerID);
    }
  }, [initUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleSignUp = () => {
    if (!isShowSignUp) {
      gtag.register();
    }
    toggleSignUpFunc();
  };

  const [isShowBlockAccountMess, toggleShowBlockAccountMess] = useModal(false);
  const [isShowNotFoundAccountMess, toggleShowNotFoundAccountMess, getValShowResponseNotFoundAccountMess] = useModal(false);
  const [isShowGuestExpiredTime, toggleShowGuestExpiredTime] = useModal();

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();

    if (isMobileV2) {
      toggleSignUp();
    }
  }, [toggleSignUp, toggleLogin]);

  const handleChangePassword = useCallback(() => {
    toggleChangePassword();
  }, [toggleChangePassword]);

  const handleChangeSignUp = useCallback(() => {
    toggleLogin();
    toggleSignUp();
  }, [toggleLogin, toggleSignUp]);

  const handleChangeRegisterGuest = useCallback(() => {
    toggleLogin();
    toggleRegisterGuest();
  }, [toggleLogin, toggleRegisterGuest]);

  const setCookies = useCallback((info, rememberMe = false) => {
    const { bearerToken = null } = info;
    Cookies.set(ACCESS_TOKEN, bearerToken, {
      domain: GENERAL_DOMAIN,
      sameSite: 'Lax',
    });
    Cookies.set(REMEMBER_ME, rememberMe, {
      domain: GENERAL_DOMAIN,
      sameSite: 'Lax',
    });
    if (rememberMe) {
      Cookies.set(ACCESS_TOKEN_LONGLIVE, bearerToken, {
        expires: 5000,
        domain: GENERAL_DOMAIN,
        sameSite: 'Lax',
      });
    }
  }, []);

  // red customer
  const handleRedCustomer = async () => {
    const userRes = await AuthClient.getUser();
    if (isValid(userRes)) {
      const userInfo = getFirst(userRes);
      if (userInfo?.tags?.indexOf(CUSTOMER_TAG.BAN) >= 0) {
        router.push('/block-account');
        return true;
      }
    }
    return false;
  };

  const removeCookies = () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(ACCESS_TOKEN, { domain: GENERAL_DOMAIN });
    Cookies.remove(ACCESS_TOKEN_LONGLIVE);
    Cookies.remove(ACCESS_TOKEN_LONGLIVE, { domain: GENERAL_DOMAIN });
  };

  // 18 Oct 2021 : thêm thông tin bank info vào customerInfo
  const getUserInfo = useCallback(async () => {
    try {
      const ss = getSessionTokenClient();
      if (!ss || ss.length === 0) return null;

      const res = await UserService.getAccount();

      if (isValid(res)) {
        const customerInfoData = getFirst(res);
        const [bankInfoRes, accountInfoRes] = await Promise.all([CustomerClient.getBankAccountInfo({}), UserService.getAccountInfo({})]);
        customerInfoData.bank = getFirst(bankInfoRes);
        customerInfoData.account = getFirst(accountInfoRes)?.account || null;
        customerInfoData.session = getFirst(accountInfoRes)?.session || null;
        setCustomerInfo(customerInfoData);
        return res;
      }
      if (res.status === HTTP_STATUS.Unauthorized) {
        removeCookies();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return null;
  }, []);

  const reloadDataCustomer = async () => {
    try {
      const res = await UserService.getAccount();
      if (isValid(res)) {
        const customerInfoData = getFirst(res);
        const [bankInfoRes, accountInfoRes] = await Promise.all([CustomerClient.getBankAccountInfo({}), UserService.getAccountInfo({})]);
        customerInfoData.bank = getFirst(bankInfoRes);
        customerInfoData.account = getFirst(accountInfoRes)?.account || null;
        customerInfoData.session = getFirst(accountInfoRes)?.session || null;
        setCustomerInfo(customerInfoData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const setInfoUser = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(!!userInfo);
    setIsLoading(false);
  };

  const clearAllStorageData = () => {
    localStorage.removeItem('collectorProductSentArray');
    localStorageUtils.clearStorage();
    localStorage.setItem('logout', new Date());
    window.location.replace('/');
  };

  const logout = (callback, options = {}) => {
    const { clearAll = false } = options || {};
    setInfoUser(null);
    setCookies({}, true);
    removeCookies();

    try {
      localStorage.removeItem('collectorProductSentArray');
      if (clearAll) {
        clearAllStorageData();
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
    // thêm nếu k có options clear sẽ k đá về trang chủ
    window.location.replace('/');
    // hidden display form (login, forget, changpass) when click logOut
    if (typeof callback === 'function') {
      return callback();
    }

    // redirect to mienbac.thuocsi.vn
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);

    return false;
  };

  const loadUserFromCookies = useCallback(
    async (callback) => {
      const res = await getUserInfo();

      const userInfo = getFirst(res, null);
      // check guest user expireAt
      if (userInfo && userInfo.isQuest) {
        const timeRemaining = new Date(userInfo.expireAt).getTime() - new Date().getTime();
        // time remaining
        // console.log("time remaining: ", `${Math.floor(timeRemaining/1000/60)  }m`);
        setTimeout(
          () =>
            logout(() => {
              if (router.pathname !== '/') {
                router.push('/');
              }
              toggleShowGuestExpiredTime();
            }),
          timeRemaining,
        );
      } else {
        // redirect to mienbac.thuocsi.vn
        // window.location.href = DOMAINT_TS;
      }

      // chi-thi-16
      if (userInfo) userInfo.settings = await SettingService.getSettingInWeb({ user: userInfo });
      // end

      const cookiesValue = Cookies.get(ACCESS_TOKEN_LONGLIVE, { domain: GENERAL_DOMAIN });
      if (cookiesValue && cookiesValue.length > 0) {
        setCookies({ bearerToken: cookiesValue }, true);
      }

      if (userInfo) userInfo.cookiesValue = cookiesValue;
      setInfoUser(userInfo);
      setIsLoading(false);
      if (callback && typeof callback === 'function') callback(userInfo);
    },
    [getUserInfo, setIsLoading],
  );

  const login = (info, rememberMe) => {
    setCookies(info, rememberMe);
    loadUserFromCookies();
  };

  const handleLogin = ({ username, password, rememberMe = true, success, type = 'CUSTOMER', callback }) => {
    AuthService.login({ username, password, type, remember: rememberMe })
      .then(async (result) => {
        if (callback) callback(result);
        if (!isValid(result)) {
          const { errorCode } = result;

          // hiện thông báo nhập sai mật khẩu
          try {
            const isMessForgotPass = localStorage.getItem('isMessForgotPass');
            if (!isMessForgotPass) {
              toggleShowForgotPassMess();
              localStorage.setItem('isMessForgotPass', true);
            }
          } catch (e) {
            if (e === 'QUOTA_EXCEEDED_ERR') {
              console.error('Quota exceeded!');
            }
          }
          switch (errorCode) {
            case ENUMS_ERROR_ACC_CODE.WRONG_PASSWORD:
              NotifyUtils.error('Bạn đã nhập sai mật khẩu.');
              break;
            case ENUMS_ERROR_ACC_CODE.NOT_FOUND:
              NotifyUtils.error('Không tìm thấy thông tin người dùng.');
              break;
            default:
              NotifyUtils.error('Không tìm thấy thông tin người dùng.');
          }
          return;
        }

        // NotifyUtils.success('Đăng nhập thành công');
        removeGuestId(); // remove guestID của khách vãng lai
        removeGuestInfo(); // remove thông tin của khách vãng lai
        const userInfo = getFirst(result);
        login(userInfo, rememberMe);

        const customerRes = await UserService.getAccount();
        const info = getFirst(customerRes);
        if (!isValid(customerRes)) {
          switch (customerRes.errorCode) {
            case ENUMS_ERROR_ACC_CODE.CUSTOMER_DELETED:
              toggleShowBlockAccountMess();
              return;
            case ENUMS_ERROR_ACC_CODE.CUSTOMER_BLOCK:
              toggleShowBlockAccountMess();
              return;
            default:
              toggleShowNotFoundAccountMess(customerRes);
              return;
          }
        }

        // callback
        if (success) {
          success();
          // const { redirectUrl = null } = router.query || {};
          if (isShowLogin) toggleLogin();
          if (isShowSignUp && isMobileV2) toggleSignUp();
          // send event tracking monitor
          const metadata = {
            ref_url: router?.pathname || '/',
            redirect_url: redirectUrl || '/',
          };

          MonitorUtils.sendLoginEvent(MONITORING_COLLECTOR_TYPE.LOGIN, metadata);

          if (router.pathname === '/') {
            if (!info?.isUploadLicense && info?.status !== 'ACTIVE') {
              router.push(`${MY_ACCOUNT}?tab=3`);
              return;
            }
            // router.push(QUICK_ORDER);
            router.push(redirectUrl || '/');
            return; // de tranh reload
          }
          if (router?.pathname?.indexOf('product')) {
            router.reload();
            // router.push(redirectUrl || PRODUCTS_URL);
          }
        }
      })
      .catch(() => {
        NotifyUtils.error('Đã có lỗi xảy ra');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterGuest = (data, success) => {
    setIsLoading(true);
    AuthService.registerGuest(data)
      .then((result) => {
        if (!isValid(result)) {
          switch (result.errorCode) {
            case 'ACCOUNT_NOT_ACCEPTED':
              NotifyUtils.error('Tài khoản này đã được đăng ký dùng thử. Bạn không thể tiếp tục');
              toggleRegisterGuest(false);
              toggleLogin();
              break;
            default:
              NotifyUtils.error(result.message);
              toggleRegisterGuest(false);
              toggleLogin();
          }
          return;
        }
        const { phone } = getFirst(result);
        const userName = `guest${phone}`;
        handleLogin({ username: userName, password: `Guest${phone}`, type: 'GUEST' });
        setIsLoading(false);
        toggleRegisterGuest(false);
        // callback
        if (success) {
          success();
          if (router.pathname === '/') {
            router.push(QUICK_ORDER);
          }
        }
      })
      .catch(() => {
        NotifyUtils.error('Đã có lỗi xảy ra');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResetPassword = useCallback(async (data) => {
    const result = await AuthService.resetPassword(data);
    if (isValid(result)) {
      NotifyUtils.info(result.message);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
    }
  }, []);

  // off check token
  useEffect(() => {
    // nếu không có user thì mới check token
    if (initUser === null) {
      if (token) {
        setCookies({ bearerToken: token });
      }
      loadUserFromCookies(async (userInfo) => {
        // token
        if (token) {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (router.pathname === '/conversations') {
            router.push(router.asPath);
          } else {
            router.push(router.pathname);
          }
        } // nếu không có user thì check token
        if (tokenv1) {
          // redirect
          const result = await AuthService.loginv1({ tokenv1 });
          if (isValid(result)) {
            NotifyUtils.info(result.message);
            login(getFirst(result), true);
          } else {
            logout();
            NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
          }
        }
      });
      // check: nếu cookie trả về khác với cookie lưu ở máy thì reload lại trang
      // } else if (initUser?.cookiesValue !== Cookies.get(ACCESS_TOKEN_LONGLIVE, { domain: GENERAL_DOMAIN })) {
      //   // clear cookie
      //   logout(null, { clearAll: true });
      // window.location.replace('/');
      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 1000);
    }
  }, [pathname, loadUserFromCookies, tokenv1, token, redirectUrl]);

  const handleChangeDisplayProduct = (e) => {
    setMobileDisplayProduct(e.target.checked);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        customerInfo,
        isAuthenticated,
        login,
        handleLogin,
        handleRegisterGuest,
        logout,
        isLoading,
        isShowLogin,
        toggleLogin,
        isShowSignUp,
        toggleSignUp,
        isShowForgetPassword,
        toggleForgetPassword,
        isShowRegisterGuest,
        toggleRegisterGuest,
        isShowGuestExpiredTime,
        toggleShowGuestExpiredTime,
        handleChangeForget,
        handleChangeSignIn,
        handleChangeSignUp,
        handleChangeRegisterGuest,
        handleResetPassword,
        handleChangePassword,
        toggleChangePassword,
        isShowChangePassword,
        isShowForgotPassMess,
        toggleShowForgotPassMess,
        isShowBlockAccountMess,
        toggleShowBlockAccountMess,
        reloadDataCustomer,
        handleRedCustomer,
        mobileDisplayProduct,
        handleChangeDisplayProduct,
        isShowNotFoundAccountMess,
        toggleShowNotFoundAccountMess,
        getValShowResponseNotFoundAccountMess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
const LoadingScreenComponent = <LoadingScreen />;

export const LoadingRoute = ({ children }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return LoadingScreenComponent;
  }

  return children;
};
