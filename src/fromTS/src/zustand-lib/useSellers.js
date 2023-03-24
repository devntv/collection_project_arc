/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import { getData, getFirst, isValid, SellerClient } from 'clients';
import MockClient from 'clients/MockClient';
import { BRAND_NAME } from 'constants/Enums';
import { DOMAIN_FLAGSHIP_STORE } from 'sysconfig';
import SellerUtils from 'utils/SellerUtils';
import create from 'zustand';
import { persist } from 'zustand/middleware';

// getNameSeller = (props) => {
//   const { seller = {}, tags = [] } = props;
//   const { code } = seller;
//   const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;
//   // const { mapSeller = new Map(), mapStoreActives = new Map() } = useSetting();
//   const sellerInfo = mapSeller?.get(code) || null;
//   let sellerName = '';
//   let isDisplayStore = true;
//   let fullNameSeller = '';
//   const { isVip = false, slug = '' } = sellerInfo || {};
//   const linkSeller = sellerInfo?.landingPage?.startsWith('https://try.thuocsi.vn')
//     ? sellerInfo?.landingPage
//     : `/seller-products/${sellerInfo?.slugStore || sellerInfo?.slug}`;
//   let linkStore = `/seller/${slug}`;
//   if (isVip) {
//     linkStore = DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug) || `/flagship-store/${slug}`;
//   }
//   if (sellerInfo?.isInternal) {
//     fullNameSeller = 'MEDX';
//     if (isVAT) {
//       sellerName = 'MEDX';
//     }
//   } else if (sellerInfo?.sellerType === 'ENTERPRISE') {
//     sellerName = sellerInfo?.name || '';
//     fullNameSeller = sellerInfo?.fullName || '';
//   } else {
//     sellerName = 'Đối tác của thuocsi';
//     isDisplayStore = false;
//     fullNameSeller = 'Đối tác của thuocsi';
//   }
//   return { sellerName, linkStore, linkSeller, isDisplayStore, fullNameSeller, ...sellerInfo };
// };

const timeCache = 10 * 60 * 1000;
const defaultState = { mapSellers: {} };

const convertNameSeller = (sellerInfo, tags = []) => {
  const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;
  let sellerName = '';
  let isDisplayStore = true;
  let fullNameSeller = '';
  const curTime = +new Date();
  const { isVip = false, name, status, slug = '', sellerType, sellerID, code, avatar, sellerClass } = sellerInfo || {};

  let linkSeller = sellerInfo?.landingPage?.startsWith('https://try.thuocsi.vn')
    ? sellerInfo?.landingPage
    : `/seller-products/${sellerInfo?.slugStore || sellerInfo?.slug}`;

  let linkStore = `/seller/${slug}`;
  if (isVip) {
    linkStore = DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug) || `/flagship-store/${slug}`;
  }
  if (sellerInfo?.isInternal) {
    fullNameSeller = 'MEDX';
    if (isVAT) {
      sellerName = 'MEDX';
    }
  } else if (sellerInfo?.sellerType === 'ENTERPRISE') {
    sellerName = sellerInfo?.name || '';
    fullNameSeller = sellerInfo?.fullName || '';
  } else {
    sellerName = `Đối tác của ${BRAND_NAME}`;
    isDisplayStore = false;
    fullNameSeller = `Đối tác của ${BRAND_NAME}`;
    linkSeller = `/doitac/${code}`;
  }
  return {
    isVip,
    name,
    linkSeller,
    linkStore,
    sellerName,
    isDisplayStore,
    fullNameSeller,
    status,
    slug,
    sellerType,
    sellerID,
    code,
    avatar,
    sellerClass,
    ttl: curTime + timeCache,
    createdTime: curTime,
  };
};

const convertSellerCache = (sellerInfo) => {
  const curTime = +new Date();

  return {
    ...sellerInfo,
    ttl: curTime + timeCache,
    createdTime: curTime,
  };
};
const useSellers = create(
  persist(
    (set, get) => ({
      ...defaultState,
      getNameSeller: ({ sellerInfo, tags }) => {
        const { code } = sellerInfo || {};
        const mapSellers = get()?.mapSellers || {};
        const seller = mapSellers[code];
        if (seller) {
          if (seller.ttl < +new Date()) get()?.revalidateSellerByCode({ code });
          return convertNameSeller(seller, tags);
        }

        return convertNameSeller(sellerInfo, tags);
      },
      getSellerByCodeSync: ({ code, tags = [] }) => {
        const mapSellers = get()?.mapSellers || {};
        const sellerInfo = mapSellers[code];
        if (sellerInfo) {
          if (sellerInfo.ttl < +new Date()) {
            get()?.revalidateSellerByCode({ code });
          }
          return convertNameSeller(sellerInfo, tags);
        }
        get()?.revalidateSellerByCode({ code });
        return null;
      },
      getSellerByCodes: async ({ codes }) => codes?.map((code) => get()?.revalidateSellerByCode({ code })),

      getSellerByCode: async ({ code, tags }) => {
        const mapSellers = get()?.mapSellers || {};
        let sellerInfo = mapSellers[code];
        if (sellerInfo) {
          if (sellerInfo.ttl < +new Date()) get()?.revalidateSellerByCode({ code });
          return convertNameSeller(sellerInfo, tags);
        }

        sellerInfo = await get()?.revalidateSellerByCode({ code });
        return convertNameSeller(sellerInfo, tags);
      },
      revalidateSellerByCode: async ({ code = [] }) => {
        const mapSellers = get()?.mapSellers || {};
        // let sellerInfo = mapSellers[code];
        const sellerResult = await SellerClient.getSellerByCode({ sellerCode: code });
        // invalid seller result return null
        if (!isValid(sellerResult)) {
          return null;
        }
        // convert seller info
        const sellerInfo = SellerUtils.convertSeller(getFirst(sellerResult));
        if (sellerInfo) {
          mapSellers[code] = convertSellerCache(sellerInfo);
          set({ mapSellers });
        }
        return sellerInfo || null;
      },
      initAllSellers: () => {
        MockClient.getAllSellers().then((listSellerResult) => {
          const mapSellers = get()?.mapSellers || {};
          getData(listSellerResult)?.forEach((item) => {
            mapSellers[item.code] = convertSellerCache(item);
          });
          set({ mapSellers });
        });
      },
      reset: () => {
        useSellers.persist.clearStorage();
        set(defaultState);
      },
    }),
    {
      name: 'sellerv2', // unique name
    },
  ),
);

// // then somewhere in your app
// const myStore = useSellers();

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     myStore.reset();
//   }, 1000 * 60 * 5);

//   return () => {
//     clearInterval(intervalId);
//   };
// }, []);

export default useSellers;
