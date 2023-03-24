import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, getSessionToken, POST, PUT } from './Clients';

export const getUserWithContext = async (ctx) => {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { isAuthenticated: false };
  }
  return GET({ url: CUSTOMER_API.INFO, ctx });
};

export const loginInternal = async ({ ctx, body }) =>
  POST({
    ctx,
    url: ACCOUNT_API.AUTHENTICATION,
    body: { ...body, type: 'EMPLOYEE' },
    isAuth: true,
  });

export const login = async (body) =>
  POST({
    url: CUSTOMER_API.SIGN_IN,
    // url: ACCOUNT_API.AUTHENTICATION,
    body,
    isAuth: false,
  });

export const logout = async () => PUT({ url: ACCOUNT_API.LOGOUT });
export const passwordRecovery = async (body) => POST({ url: ACCOUNT_API.PASSWORD_RECOVERY, body, isBasic: true, isAuth: false });

export const passwordUpdate = async (body) => PUT({ url: ACCOUNT_API.PASSWORD_RECOVERY, body, isBasic: true, isAuth: false });

export const loginLocal = async (body) => POST({ url: '/login', body, page: true, mock: true, isAuth: false });

// { username password }
export const signUp = async (body) => POST({ url: CUSTOMER_API.REGISTER, body, isAuth: false });

export const registerGuest = async (body) => POST({ url: CUSTOMER_API.REGISTER_GUEST, body, isBasic: true });

export const registerV1 = async ({ t }) => GET({ url: CUSTOMER_API.REGISTER, params: { t }, isAuth: false, isBasic: true });

export const getAccountInfo = async ({ ctx }) => GET({ url: ACCOUNT_API.GET_ACCOUNT_INFO, ctx });

export const getUser = async () => {
  const result = await GET({ url: CUSTOMER_API.INFO, params: { getCustomer: true } });
  return result;
};

export const newPassword = async (body) => PUT({ url: ACCOUNT_API.PASSWORD_NEW, body, isAuth: true });

export default {
  login,
  getUser,
  signUp,
  registerGuest,
  getUserWithContext,
  loginLocal,
  getAccountInfo,
  passwordRecovery,
  passwordUpdate,
  registerV1,
  newPassword,
  logout,
  loginInternal,
};
