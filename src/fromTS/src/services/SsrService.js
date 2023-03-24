/* eslint-disable no-restricted-syntax */
import { AddressClient, CustomerClient, getData, getFirst, getSessionToken, isValid } from 'clients';
import AccountingClient from 'clients/AccountingClient';
import { CUSTOMER_TAG, HTTP_STATUS } from 'constants/Enums';
import { TOGGLE_FEATURE_PREFIX } from 'constants/ToggleFeature';
import CookieParser from 'utils/CookieParser';
import { formatCurrency } from 'utils/FormatNumber';
import MockService from './MockService';
import { getAccount, getAccountInfo } from './UserService';

const DEFAULT_LANG = 'vi';
const defaultInitZustand = [
  'tabs',
  'tags',
  'hashtagTopSearch',
  'countdownBars',
  'banners',
  'menuBar',
  'cateogries',
  'insiderSetting',
  'thumbnailMap',
  'chatSetting',
  'regionsMB', // -> regions MB
];

const convertAccountInfo = (acc = {}) => ({
  accountId: acc?.accountId || '',
  email: acc?.email || '',
  fullname: acc?.fullname || '',
  phoneNumber: acc?.phoneNumber || '',
  status: acc?.status || '',
  type: acc?.type || '',
  username: acc?.username || '',
  createdTime: acc?.createdTime || '', // thêm createdTime cho mobile v2 check > createdTime ( new layou mobile)
});

const getEnvToggleFunction = () => {
  const data = {};
  for (const key in process.env) {
    if (key?.startsWith(TOGGLE_FEATURE_PREFIX)) data[key] = process.env[key];
  }
  return data;
};

const toggleFeatures = getEnvToggleFunction();

export const doWithServerSide = async (ctx, callback, options = {}) => {
  const timeLogs = new Date();
  const { redirect, namespaces, serverSideTranslations, isGetUser = true, inititalZustand = [] } = options || {};

  // nếu path = .json thì nó chỉ lấy data json thôi, zustand đã được init lần đầu khi load page rồi , nên ko cần load lại khi nhấn qua lại các trang
  // thử nghiệp 06Mar2023
  // thuannc
  const zustandList = ctx?.req?.url?.includes('.json') ? [] : [...defaultInitZustand, ...inititalZustand];
  // const zustandList = [...defaultInitZustand, ...inititalZustand];
  const lang = CookieParser.getCookieFromCtx(ctx, 'NEXT_LOCALE') || DEFAULT_LANG;
  ctx.locale = lang;
  let i18next = {};
  // ko bỏ trong arrays dc
  if (serverSideTranslations && namespaces) {
    const timeExcute = +new Date();
    i18next = await serverSideTranslations(lang, namespaces, { i18n: { defaultLocale: lang } });
    i18next.timeExcute = +new Date() - timeExcute;
  }
  try {
    let isAuthenticated = false;
    let user = null;
    // const accountInfo = null;
    const initialZustandState = { toggleFeatures };
    let isInvalidToken = false;
    const actions = [];
    if (zustandList?.includes('tabs')) {
      MockService.getTabs().then((tabs) => {
        initialZustandState.tabs = tabs;
        initialZustandState.timeTabs = new Date() - timeLogs;
      });
    }

    if (zustandList?.includes('tags')) {
      actions.push(
        MockService.getTags().then((tags) => {
          initialZustandState.tags = tags;
          initialZustandState.timeTags = new Date() - timeLogs;
        }),
      );
    }
    if (zustandList?.includes('countries')) {
      actions.push(
        MockService.getListCountries().then((countries) => {
          initialZustandState.countries = countries;
          initialZustandState.timeCountries = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList?.includes('provinces')) {
      actions.push(
        MockService.getListProvinves().then((provinces) => {
          initialZustandState.provinces = provinces;
          initialZustandState.timeProvinces = new Date() - timeLogs;
        }),
      );
    }

    // if (zustandList.includes('sellers')) {
    // if (inititalZustand.includes('sellers')) {
    //   actions.push(
    //     MockService.getListSellers().then((sellers) => {
    //       initialZustandState.sellers = sellers;
    //       initialZustandState.timehashtagSellers = new Date() - timeLogs;
    //     }),
    //   );
    // }

    if (zustandList.includes('hashtagTopSearch')) {
      actions.push(
        MockService.getListHashtagTopSearch().then((hashtags) => {
          initialZustandState.hashtagTopSearch = hashtags;
          initialZustandState.timehashtagTopSearch = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList.includes('countdownBars')) {
      actions.push(
        MockService.getListCountdownBar().then((countdownBars) => {
          initialZustandState.countdownBars = countdownBars;
          initialZustandState.timeCountdownBars = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList.includes('banners')) {
      actions.push(
        MockService.getBanners().then((bannerRes) => {
          initialZustandState.banners = getData(bannerRes);
          initialZustandState.timeBanners = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList.includes('menuBar')) {
      actions.push(
        MockService.getMenuBar().then((menuBarRes) => {
          initialZustandState.menuBar = menuBarRes;
          initialZustandState.timeMenuBar = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList.includes('cateogries')) {
      actions.push(
        MockService.getCategories().then((cagories) => {
          initialZustandState.cagories = cagories || [];
          initialZustandState.timeCateogries = new Date() - timeLogs;
        }),
      );
    }

    // if (zustandList.includes('manufacturers')) {
    //   actions.push(
    //     MockService.getManufacturers().then((data) => {
    //       initialZustandState.manufacturers = data || [];
    //       initialZustandState.timeManufacturers = new Date() - timeLogs;
    //     }),
    //   );
    // }

    // if (zustandList.includes('topManufacturers')) {
    //   actions.push(
    //     MockService.getTopManufacturers().then((data) => {
    //       initialZustandState.topManufacturers = data || [];
    //       initialZustandState.timeTopManufacturers = new Date() - timeLogs;
    //     }),
    //   );
    // }

    if (zustandList.includes('insiderSetting')) {
      actions.push(
        MockService.getInsiderSetting().then((insiderSettingRes) => {
          initialZustandState.insiderSetting = insiderSettingRes;
          initialZustandState.timeInsiderSetting = new Date() - timeLogs;
        }),
      );
    }
    if (zustandList.includes('thumbnailMap')) {
      actions.push(
        MockService.getThumbnailList().then(({ defaultThumbnail, thumbnailMap }) => {
          initialZustandState.thumbnailMap = thumbnailMap;
          initialZustandState.defaultThumbnail = defaultThumbnail;
          initialZustandState.timeThumbnails = new Date() - timeLogs;
        }),
      );
    }

    if (zustandList.includes('chatSetting')) {
      actions.push(
        MockService.getChatSetting().then((chatSettingRes) => {
          initialZustandState.chatSetting = chatSettingRes;
          initialZustandState.timeChatSetting = new Date() - timeLogs;
        }),
      );
    }

    // Region
    if (zustandList.includes('regionsMB')) {
      actions.push(
        AddressClient.getRegions(ctx).then((regionsResult) => {
          initialZustandState.regionsMB = getData(regionsResult).find((item) => item.code === 'MIENBAC')?.provinceCodes || [];
          initialZustandState.timeRegionsMB = new Date() - timeLogs;
        }),
      );
    }

    // if (zustandList.includes('reasonsList')) {
    //   actions.push(
    //     TicketClient.getListReasons(ctx)
    //     MockService.getThumbnailList().then((thumbnailRes) => {
    //       initialZustandState.thumbnails = thumbnailRes;
    //       initialZustandState.timeThumbnail = new Date() - timeLogs;
    //     }),
    //   );
    // }

    // const accRes = await getAccount(ctx);

    // move object account & session vào trong để giống useAuth , mốt bỏ cho dễ
    // todo: thiếu bank , thiếu formatCurrency debt

    if (isGetUser) {
      actions.push(
        // eslint-disable-next-line consistent-return

        getAccount(ctx).then(async (customerResp) => {
          // customer info
          isInvalidToken = customerResp?.status === HTTP_STATUS.Unauthorized;
          if (isValid(customerResp)) {
            isAuthenticated = true;
            user = getFirst(customerResp);

            // TODO: feature-debt
            // get debt
            const [debtRes, accResp, bankInfoRes] = await Promise.all([
              AccountingClient.getDebtCheck({ customerId: user.customerID, ctx }),
              getAccountInfo({ ctx }),
              CustomerClient.getBankAccountInfo({ ctx }),
            ]);
            if (isValid(debtRes)) {
              user.debt = getFirst(debtRes) || null;
              if (user?.debt) {
                user.debt.isActive = user?.debt?.isValid;
                user.debt.balanceFormated = formatCurrency(user.debt.balance);
                if (user.debt.balance <= 0) {
                  user.debt.balanceMessageError = 'Số hạn mức khả dụng không đủ, vui lòng kiểm tra lại hạn mức hoặc thanh toán để tăng lại hạn mức.';
                }
              }
            }
            if (isValid(accResp)) {
              const accData = getFirst(accResp);
              // console.log('🚀 ~ file: SsrService.js ~ line 214 ~ getAccount ~ accData', accData);
              user.bank = getFirst(bankInfoRes);
              user.account = convertAccountInfo(accData?.account || {});
              user.session = accData?.session;
              user.cookiesValue = getSessionToken(ctx) || ''; // add cookies values for check for authContext
            }
          }
        }),
      );

      await Promise.all(actions);

      //  debt công nợ
      const isBannedAccount = user?.tags?.indexOf(CUSTOMER_TAG.BAN) >= 0;
      if (user && isBannedAccount && ctx?.resolvedUrl !== '/block-account') {
        return {
          redirect: {
            destination: '/block-account',
            permanent: false,
          },
        };
      }

      if (!isAuthenticated && redirect) {
        const redirectUrl = redirect.url || '/';
        return {
          redirect: {
            destination: redirectUrl,
            permanent: false,
          },
        };
      }
    }

    const timeGetAccount = new Date() - timeLogs;
    const timeCallback = new Date();

    // add data cache to prevent call duplicate apis
    let result = callback(ctx, user, { ...initialZustandState });

    // wait for page promise
    if (result && result instanceof Promise) {
      result = await result;
    }

    // todo: why?
    // initialZustandState.user = user;
    initialZustandState.timeLogs = +timeLogs;

    result = result || {};
    result.props = { ...(result?.props || {}), ...i18next, initialZustandState };
    result.props.user = user || null;
    // result.props.accountInfo = accountInfo || null;
    result.props.isInvalidToken = isInvalidToken;
    // result.props.sessionToken = sessionToken;
    const timeExcuteDoWithServerSide = +new Date() - +timeLogs;
    result.props.isAuthenticated = isAuthenticated;
    result.props.timeExcuteCallback = +new Date() - +timeCallback;
    result.props.timeExcuteDoWithServerSide = timeExcuteDoWithServerSide;
    result.props.timeGetAccount = timeGetAccount;
    return result;
  } catch (err) {
    return {
      props: {
        ...i18next,
        isAuthenticated: false,
        user: null,
        timeExcuteDoWithServerSide: +new Date() - +timeLogs,
        // serialize err
        err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      },
    };
  }
};

export default {
  doWithServerSide,
};
