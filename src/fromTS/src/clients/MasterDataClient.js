import { PRODUCT_API } from 'constants/APIUriV2';
import { GET } from './Clients';

const getManufacturer = async (code) =>
  GET({
    url: PRODUCT_API.MANUFACTURER_INFO,
    params: {
      q: JSON.stringify({ code }),
    },
  });

const getManufacturers = async ({ offset, limit }) =>
  GET({
    url: PRODUCT_API.MANUFACTURER_LIST,
    params: {
      offset,
      limit,
    },
  });

export default {
  getManufacturer,
  getManufacturers,
};
