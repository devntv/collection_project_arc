import { AddressClient, getFirst, isValid } from 'clients';

const getRegions = async (ctx) => {
  const regionsRes = await AddressClient.getRegions(ctx);
  return regionsRes;
};

const getProvinces = async (ctx) => {
  const provincesRes = await AddressClient.getProvinces(ctx);
  if (!isValid(provincesRes)) {
    return [];
  }
  const provinces = provincesRes.data
    .map(({ name: label, code: value, regionCode }) => ({ label, value, regionCode }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return provinces;
};

const getAllCountriesMock = async ({ ctx }) => AddressClient.getAllCountriesMock({ ctx });
const getAllProvinceMock = async ({ ctx }) => AddressClient.getAllProvinceMock({ ctx });

const getAllCountries = async ({ ctx }) => {
  const countryRes = await AddressClient.getAllCountries({ ctx });
  if (!isValid(countryRes)) {
    return [];
  }
  const countries = countryRes.data.map(({ name: label, code: value }) => ({ label, value })).sort((a, b) => a.label.localeCompare(b.label));
  return countries;
};

const getDistrictsByProvince = async (provinceCode) => {
  const res = await AddressClient.getDistrictsByProvince(provinceCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data.map(({ name: label, code: value }) => ({ label, value })).sort((a, b) => a.label.localeCompare(b.label));
};

const getWardsByDistrict = async (districtCode) => {
  const res = await AddressClient.getWardsByDistrict(districtCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data.map(({ name: label, code: value }) => ({ label, value })).sort((a, b) => a.label.localeCompare(b.label));
};

const getMasterAddressString = async ({ ctx, provinceCode, districtCode, wardCode }) => {
  const [wardRes, districtRes, provinceRes] = await Promise.all([
    wardCode && AddressClient.getWardByCode(ctx, wardCode),
    AddressClient.getDistrictByCode(ctx, districtCode),
    AddressClient.getProvinceByCode(ctx, provinceCode),
  ]);
  let masterAddress = '';
  if (isValid(wardRes)) masterAddress += `${getFirst(wardRes).name}, `;
  if (isValid(districtRes)) masterAddress += `${getFirst(districtRes).name}, `;
  if (isValid(provinceRes)) masterAddress += getFirst(provinceRes).name;
  return masterAddress;
};

const getMasterAddressObject = async ({ ctx, provinceCode, districtCode, wardCode }) => {
  const [wardRes, districtRes, provinceRes] = await Promise.all([
    wardCode && AddressClient.getWardByCode(ctx, wardCode),
    AddressClient.getDistrictByCode(ctx, districtCode),
    AddressClient.getProvinceByCode(ctx, provinceCode),
  ]);
  const masterAddressObj = {};
  if (isValid(wardRes)) masterAddressObj.ward = getFirst(wardRes)?.name || '';
  if (isValid(districtRes)) masterAddressObj.district = getFirst(districtRes)?.name || '';
  if (isValid(provinceRes)) masterAddressObj.province = getFirst(provinceRes)?.name || '';

  return masterAddressObj;
};

export default {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
  getMasterAddressString,
  getMasterAddressObject,
  getAllCountries,
  getAllCountriesMock,
  getAllProvinceMock,
  getRegions,
};
