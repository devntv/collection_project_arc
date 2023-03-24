import { getData, isValid } from 'clients';
import { getListRewardBySeller, getRewardDetail, getRewards } from 'clients/RewardsClient';

export const getListReward = async ({ ctx, offset, limit, status }) => {
  const result = await getRewards({ ctx, offset, limit, status });

  if (!isValid(result)) return null;
  const listReward = getData(result);
  const { total } = result;
  // const now = new Date();
  // const rewards = listReward.map((item) => {
  //   if (item?.details[0]?.result === undefined) {
  //     if (new Date(item?.startTime) > now) return { ...item, status: 'UPCOMING' };
  //     if (new Date(item?.startTime) <= now && new Date(item?.endTime) >= now) return { ...item, status: 'IN_PROGRESS' };
  //     return { ...item, status: 'EXPIRED' };
  //   }
  //   return { ...item, status: item?.details[0]?.result?.status || '' };
  // });
  return { data: listReward, total };
};


// clone lại hàm getListReward bỏ đi parameter ctx
// lý do: get list từ Clients side => không có ctx
export const getListRewardMobileV2 = async ({ offset, limit, status}) => {
  const result = await getRewards({ offset, limit, status });
  if(!isValid(result)) return null
  const listReward = getData(result);
  const { total } = result;
  return { data: listReward, total };
}

export const getNumberOfEveryStatus = async ({ ctx }) => {
  const [totalRes, upcomingRes, inProcessRes, expiredRes] = await Promise.all([
    getRewards({ ctx, offset: 0, limit: 1 }),
    getRewards({ ctx, status: 'UPCOMING', offset: 0, limit: 1 }),
    getRewards({ ctx, status: 'PROCESSING', offset: 0, limit: 1 }),
    getRewards({ ctx, status: 'EXPIRED', offset: 0, limit: 1 }),
  ]);

  return {
    ALL: totalRes?.total || 0,
    UPCOMING: upcomingRes?.total || 0,
    PROCESSING: inProcessRes?.total || 0,
    EXPIRED: expiredRes?.total || 0,
  };
};


// clone lại hàm getNumberOfEveryStatus bỏ đi parameter ctx
// lý do: get list từ Clients side => không có ctx
export const getNumberOfEveryStatusMobileV2 = async () => {
  const [totalRes, upcomingRes, inProcessRes, expiredRes] = await Promise.all([
    getRewards({ offset: 0, limit: 1 }),
    getRewards({ status: 'UPCOMING', offset: 0, limit: 1 }),
    getRewards({ status: 'PROCESSING', offset: 0, limit: 1 }),
    getRewards({ status: 'EXPIRED', offset: 0, limit: 1 }),
  ]);
  
  return {
    ALL: totalRes?.total || 0,
    UPCOMING: upcomingRes?.total || 0,
    PROCESSING: inProcessRes?.total || 0,
    EXPIRED: expiredRes?.total || 0,
  };
}

export const getRewardDetailById = async (id) => {
  const result = await getRewardDetail({ id });
  return result;
};

export const getRewardsBySeller = async ({ sellerCode }) => {
  const result = await getListRewardBySeller({ sellerCode });
  if (!isValid(result)) return null;
  const data = getData(result);
  const banners = [];
  data.forEach((item) => {
    const { imageUrls = [] } = item;
    if (imageUrls.length > 0) banners.push(imageUrls[0]);
  });
  return { banners, data };
};
export default { getListReward, getRewardDetailById, getNumberOfEveryStatus, getRewardsBySeller, getListRewardMobileV2, getNumberOfEveryStatusMobileV2 };
