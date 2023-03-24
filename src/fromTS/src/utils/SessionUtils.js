import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, GENERAL_DOMAIN } from 'sysconfig';

export function getSessionTokenClient() {
  const tk = Cookies.get(ACCESS_TOKEN, {
    domain: GENERAL_DOMAIN,
  });
  if (tk && tk.length > 0) {
    return tk;
  }
  const tkLong =
    Cookies.get(ACCESS_TOKEN_LONGLIVE, {
      domain: GENERAL_DOMAIN,
    }) || '';

  return tkLong && tkLong !== 'null' ? tkLong : '';
}

// TODO: refactor contanst
export const removeSessionToken = () => {
  Cookies.remove(ACCESS_TOKEN, {
    domain: GENERAL_DOMAIN,
  });
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(ACCESS_TOKEN_LONGLIVE, {
    domain: GENERAL_DOMAIN,
  });
  Cookies.remove(ACCESS_TOKEN_LONGLIVE);
};

export default {
  getSessionTokenClient,
  removeSessionToken,
};
