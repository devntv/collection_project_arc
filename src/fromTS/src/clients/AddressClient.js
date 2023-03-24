import { CORE_API } from 'constants/APIUri';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { GET, GET_ALL } from './Clients';

const getProvinces = async (ctx) => GET({ url: CORE_API.PROVINCE_LIST, ctx, isBasic: true, isAuth: false });

const getRegions = async (ctx) => GET_ALL({ url: CORE_API.REGIONS, ctx, isBasic: true, isAuth: false, cache: true });

const getDistrictsByProvince = async (provinceCode) => GET({ url: CORE_API.DISTRICT_LIST, params: { provinceCode } });

const getWardsByDistrict = async (districtCode = '') => {
  if (isEmpty(districtCode)) {
    return invalid('DistrictCode not found');
  }
  return GET({ url: CORE_API.ADMINISTRATIVE, params: { districtCode } });
};

const getWardByCode = async (ctx, wardCode) => GET({ ctx, url: CORE_API.WARD, params: { wardCode } });

const getDistrictByCode = async (ctx, code) => GET({ ctx, url: CORE_API.DISTRICT, params: { code } });

const getProvinceByCode = async (ctx, code) => GET({ ctx, url: CORE_API.PROVINCE, params: { code } });

const getAllCountriesMock = async ({ ctx }) => GET({ url: '/web/master-data/country', ctx, mock: true, isAuth: false });

const getAllProvinceMock = async ({ ctx }) => GET({ url: '/web/master-data/provinces', ctx, mock: true, isAuth: false });

const getAllCountries = async ({ ctx }) => GET({ url: CORE_API.COUNTRIES_LIST, ctx, isBasic: true, isAuth: false });

export default {
  getProvinces,
  getAllCountries,
  getDistrictsByProvince,
  getWardsByDistrict,
  getWardByCode,
  getDistrictByCode,
  getProvinceByCode,
  getAllCountriesMock,
  getAllProvinceMock,
  getRegions,
};
