import { REWARDS_API, REWARDS_BY_SELLER, REWARD_DETAIL } from 'constants/APIUriV2';
import { GET, LIMIT_DEFAULT, OFFSET_DEFAULT } from './Clients';

export async function getRewards({ ctx, offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, status = null }) {
  const url = REWARDS_API;
  const params = {
    offset,
    limit,
    getTotal: true,
    status,
    q: JSON.stringify({ status }),
  };
  return GET({ url, ctx, params });
}

export async function getRewardDetail({ id }) {
  const url = REWARD_DETAIL;
  const params = {
    id,
  };
  return GET({ url, params });
}

export async function getListRewardBySeller({ ctx, offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, sellerCode }) {
  const url = REWARDS_BY_SELLER;
  const params = {
    offset,
    limit,
    getTotal: true,
    q: JSON.stringify({ sellerCode }),
  };
  return GET({ url, ctx, params });
}
export default { getRewards, getRewardDetail, getListRewardBySeller };
