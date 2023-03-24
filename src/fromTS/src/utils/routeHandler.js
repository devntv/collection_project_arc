/* eslint-disable array-callback-return */
import { BOTTOM_NAVIGATION_PAGES, SELLERS } from 'constants/Paths';

// check === sellers?type=all
const isSellerPageTypeAll = (router) => SELLERS === router.pathname && (router?.query?.type === 'all' || router?.query?.type === 'flagship');

const isBottomNavigation = (router) => {
  if (isSellerPageTypeAll(router)) return false;
  if (BOTTOM_NAVIGATION_PAGES.includes(router.pathname)) return true;
  return false;
};

const changeParameterUrl = (router, query = {}, method = 'push', options = { shallow: true }) => {
  router[method]({
    pathname: router.route,
    query: { ...router.query, ...query },
    options,
  });
};
// change parameter without re-render pages (replace)
export const replaceParams = (query = {}) => {
  const url = new URL(window.location);

  if (url) {
    Object.keys(query).map((q) => {
      url.searchParams.set(q, query[q]);
    });
    window.history.replaceState(null, '', url.toString());
  }
};
// change parameter without re-render pages (push)
export const pushParams = (query = {}) => {
  const url = new URL(window.location);

  if (url) {
    Object.keys(query).map((q) => {
      url.searchParams.set(q, query[q]);
    });
    window.history.pushState(null, '', url.toString());
  }
};

export default {
  isBottomNavigation,
  changeParameterUrl,
};
