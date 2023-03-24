import Cookies from 'js-cookie';
import { isDesktop } from 'react-device-detect';
import { GENERAL_DOMAIN } from 'sysconfig';
import { gtag } from 'utils';
import create from 'zustand';

const defaultState = {
  beta: false,
  mobileProductScrolling: true,
  isMobileV2Value: null,
};
export const KEY_ACCESS = 'mv2Settings';

const dataSaved = Cookies.get(KEY_ACCESS) ? JSON.parse(Cookies.get(KEY_ACCESS)) : defaultState;
// middleware store data by cookies
const persistByCookies = (config) => (set, get, api) =>
  config(
    (...args) => {
      const newValue = { ...dataSaved, ...args[0] };
      Cookies.set(KEY_ACCESS, newValue, {
        domain: GENERAL_DOMAIN,
        sameSite: 'Lax',
      });
      set(() => ({
        ...get(),
        ...newValue,
      }));
    },
    get,
    api,
  );

const useMobileV2 = create(
  persistByCookies(
    (set, get) => ({
      beta: dataSaved?.beta,
      mobileProductScrolling: true,
      toggleBeta: () => {
        set({ beta: !get()?.beta, isMobileV2Value: !get()?.isMobileV2Value });
        gtag.toggleMobileV2(get()?.beta);
      },
      toggleMobileProductScrolling: () => set({ mobileProductScrolling: !get()?.mobileProductScrolling }),
      isMobileV2: () => {
        if (typeof get()?.isMobileV2Value === 'boolean') {
          return get()?.isMobileV2Value && !isDesktop;
        }
        const data = Cookies.get(KEY_ACCESS) ? JSON.parse(Cookies.get(KEY_ACCESS)) : defaultState;
        const isMobileV2 = !isDesktop && data?.beta;
        set({ isMobileV2Value: isMobileV2 });
        return isMobileV2;
      },
      removeCookies: () => {
        const data = Cookies.remove(KEY_ACCESS, {
          domain: GENERAL_DOMAIN,
        });
        return data;
      },
      isTrackingMobileV2: process.env.NEXT_PUBLIC_ENV === 'prd' || process.env.NEXT_PUBLIC_ENV === 'uat',
    }),
    {
      name: 'mobileV2', // unique name
    },
  ),
);

export default useMobileV2;
