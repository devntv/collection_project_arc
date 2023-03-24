import MasterDataClient from 'clients/MasterDataClient';

const getManufacturerInfo = async (code) => {
  const manufactorRes = await MasterDataClient.getManufacturer(code);
  return manufactorRes;
};

const getManufacturers = async ({ offset, limit }) => {
  const manufactorRes = await MasterDataClient.getManufacturers({ offset, limit });
  return manufactorRes;
};

export default {
  getManufacturerInfo,
  getManufacturers,
};
