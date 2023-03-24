import { PROMOTION_API } from 'constants/APIUriV2';
import { POST } from './Clients';

async function getPromoLists({ skus, getVoucherInfo = false, signal }) {
  const url = PROMOTION_API.PROMOLISTS_DETAIL_PRODUCT;
  const body = {
    skus,
    getVoucherInfo,
  };
  return POST({ url, body, signal });
}

export default {
  getPromoLists,
};
