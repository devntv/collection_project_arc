import { ENUMS_CHAT_SETTING_VALUE } from 'constants/Enums';
import { DEFAULT_THUMBNAIL_PATH } from 'constants/Paths';
import { TOGGLE_FEATURE_PREFIX } from 'constants/ToggleFeature';
import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';
import { GENERAL_DOMAIN } from 'sysconfig';
import { formatCurrency } from 'utils/FormatNumber';
import create from 'zustand';
import createContext from 'zustand/context';

let store;

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  tabs: [],
  banners: [],
  tags: [],
  provinces: [],
  hashtagTopSearch: [],
  sellers: [],
  user: {},
  // manufacturers: [],
  // topManufacturers: [],
  categories: [],
  countdownBars: [],
  insiderSetting: true,
  thumbnailMap: {},
  defaultThumbnail: {},
  logs: false,
  toggleFeatures: {},
  chatSetting: ENUMS_CHAT_SETTING_VALUE.THUOCSI,
  isShowLocalThuocssiVn: false,
  timeLogs: 0,
  timeInitStoreGlobalDefaultInitialState: +new Date(),
  regionsMB: [], // -> data lầy từ services/srr.js -> dùng để check miền của user
  isMienBac: null,
});

const zustandContext = createContext();

const { Provider } = zustandContext;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const { useStore } = zustandContext;

const initializeStore = (preloadedState = {}) =>
  create((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    canUseMobileV2: () => {
      const { regionsMB, user } = get();
      return user && regionsMB?.indexOf(user?.provinceCode) === -1;
    },
    timeInitStoreGlobal: +new Date(),
    timeInitStoreGlobalCreate: +new Date(),
    // TODO: feature-debt
    // logic công nợ
    getDebt: () => get()?.user?.debt, // lấy debt dễ hơn
    getDebtActive: () => {
      const debt = get()?.user?.debt; // lấy debt dễ hơn
      return debt && debt?.contractStatus === 'ACTIVE' ? debt : null;
    },

    getAvailableDebtBalance: ({ isFormated = false, isCurrency = true }) => {
      const debt = get()?.user?.debt;
      // check statuss contract active
      // APO-1700 - bỏ đ
      if (!debt || debt?.contractStatus !== 'ACTIVE') return '0';
      const balance = debt?.balance || 0;
      if (!isCurrency) return formatCurrency(balance, '.', 0);
      if (isFormated) return formatCurrency(balance);
      return balance;
    },
    // end debt
    getCustomer: () => get()?.user, // lấy customer
    getAccount: () => get()?.user?.account, // lấy account
    getSession: () => get()?.user?.account, // lấy session
    // hostname
    getHostName: () => (window && window?.location?.hostname) || '',
    // internet isShowLocalThuocssiVn
    getIsShowLocalThuocssiVn: () => {
      // time excute with do server side
      const { timeLogs, timeInitStoreGlobal } = get();
      // time client - time in server
      const timeLatency = timeInitStoreGlobal - timeLogs;
      return timeLatency > 1000;
    },
    setIsShowLocalThuocssiVn: (value) => set({ isShowLocalThuocssiVn: value }),
    // end
    getStyleBySlugOfTag: (code) =>
      get()
        ?.tags?.filter((item) => item.visible)
        ?.find((item) => item.code === code),
    getTagBySlug: (slug) => get()?.tags?.find((item) => item.slug === slug),
    getRegionByProvinceCode: (provinceCode) => get()?.provinces?.find((item) => item.value === provinceCode)?.regionCode || null,
    getSellerByCode: (code) => get()?.sellers?.find((seller) => seller.code === code) || {},
    getThumbnail: (pathname = DEFAULT_THUMBNAIL_PATH) => get()?.thumbnailMap[pathname] || {},
    getDefaultThumbnail: () => get()?.defaultThumbnail || {},
    toggleFeature: (featureName, value = null, { isCookie = false }) => {
      // console.log('🚀 ~ file: storeGlobal.js ~ line 51 ~ create ~ featureName', featureName, value, isCookie);
      if (isCookie)
        Cookies.set(featureName, value, {
          domain: GENERAL_DOMAIN,
          sameSite: 'Lax',
        });
    },
    validateFeature: (featureName = '', options = {}) => {
      const { isCookie = false } = options || {};
      // console.log(
      //   '🚀 ~ file: storeGlobal.js ~ line 58 ~ create ~ featureName',
      //   featureName,
      //   isCookie,
      //   typeof Cookies.get(featureName),
      //   Cookies.get(featureName) === 'true',
      // );

      if (isCookie) {
        return Cookies.get(featureName) === 'true';
      }
      const toggleFeatures = get()?.toggleFeatures || {};
      // on / off tính năng với user : bằng customerId / accountId /phone
      // get config .env
      // TOGGLE_FEATURE_CHAT_ENABLE = on / off
      // TOGGLE_FEATURE_CHAT_TYPE = proviceCode / accountID / customerID / phone
      // TOGGLE_FEATURE_CHAT_VALUES = ['00','123','0974860956']
      const enable = toggleFeatures[`${TOGGLE_FEATURE_PREFIX + featureName}_ENABLE`] === 'on';
      // if feature not enable in env => false
      if (enable) {
        const values = toggleFeatures[`${TOGGLE_FEATURE_PREFIX}${featureName}_VALUES`];
        // values contains 00 -> all
        if (values.indexOf('00') >= 0) {
          return true;
        }
        const type = toggleFeatures[`${TOGGLE_FEATURE_PREFIX}${featureName}_TYPE`];
        const { user } = get();
        switch (type) {
          case 'provinceCode':
            return values.indexOf(`${user?.provinceCode}`) >= 0;
          case 'accountID':
            return values.indexOf(`${user?.accountID}`) >= 0;
          case 'customerID':
            return values.indexOf(`${user?.customerID}`) >= 0;
          case 'phone':
            return values.indexOf(`${user?.phone}`) >= 0;
          // phone
          default:
            return true;
        }
      }
      return false;
    },
  }));

function useCreateStore(serverInitialState) {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
          timeInitStoreGlobal: +new Date(),
          timeInitStoreGlobalInitialState: +new Date(),
        },
        true, // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
}

export default {
  useCreateStore,
  Provider,
  initializeStore,
  useStoreGlobal: useStore,
};
