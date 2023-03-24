import { MARKETING_API } from 'constants/APIUri';
import { GET } from './Clients';

const getListBanner = (ctx) => {
  const url = MARKETING_API.BANNER;
  return GET({ url, ctx, isBasic: true, isAuth: false });
};

const getHashtagTopSearch = () => GET({ url: '/web/top-search', mock: true, isAuth: false });

const getProductFiles = ({ q = {}, isMienBac = false }) =>
  GET({ url: '/web/sanphammoi', params: { q: JSON.stringify(q), isMienBac }, mock: true, isAuth: false });

const getListBannerMock = () => {
  const url = '/web/banner';
  return GET({ url, mock: true, isAuth: false });
};

const getMostSearchMock = () => GET({ url: '/web/most-search', mock: true, isAuth: false });

export default {
  getListBanner,
  getListBannerMock,
  getMostSearchMock,
  getHashtagTopSearch,
  getProductFiles,
};
