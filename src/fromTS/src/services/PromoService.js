import { getData, getFirst, isValid, PromoClient } from 'clients';
import { PROMO_REWARD_TYPE } from 'constants/Enums';
import { ProductServiceV2 } from 'services';
import { DateTimeUtils } from 'utils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { isEmpty } from 'utils/ValidateUtils';

export const parseReward = (reward) => {
  if (!reward) {
    return null;
  }
  const { type, absoluteDiscount } = reward;

  switch (type) {
    case PROMO_REWARD_TYPE.ABSOLUTE:
      return { message: `Giảm ${formatCurrency(absoluteDiscount)}` };
    default:
      return null;
  }
};

export const parseCondition = (condition) => {
  if (!condition) return null;

  const { type, minOrderValue, productConditions } = condition;
  const message = [];

  switch (type) {
    case 'ORDER_VALUE':
      if (minOrderValue) {
        message.push(`Giá trị đơn hàng từ ${formatCurrency(minOrderValue)}`);
      }

      break;
    case 'PRODUCT_TAG':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có mã {productTag} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCT':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { productId, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có mã ${productId} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCT_CATEGORY':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { productId, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có hoạt chất ${productId} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCER':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { producerCode, sellerCodes, minQuantity } = _item;
          message.push(
            `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm của nhà sản xuất ${producerCode} của người bán ${sellerCodes.join(',')}`,
          );
        });
      }
      break;
    case 'INGREDIENT':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { ingredientCode, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có hoạt chất ${ingredientCode} của người bán ${sellerCodes.join(',')}
          `);
        });
      }

      break;
    case 'NO_RULE':
      // if (!productConditions) {
      //   return { message };
      // }

      break;
    default:
  }
  return { ...condition, message };
};

export const parseListReward = (rewards) => rewards?.map((reward) => parseReward(reward));

export const parseListCondition = (conditions) => conditions?.map((cond) => parseCondition(cond));

export const parseVoucherDetail = (voucherInfo) => {
  if (!voucherInfo) return null;

  const { rewards = [], conditions = [] } = voucherInfo;
  const rewardsVi = parseListReward(rewards);
  const conditionsVi = parseListCondition(conditions) || {};
  return { ...voucherInfo, rewardsVi, conditionsVi };
};

export const getPromotionDetailByVoucherCode = async ({ voucherCode }) => {
  if (isEmpty(voucherCode)) {
    return null;
  }
  const res = await PromoClient.getPromoDetailByVoucherCode({ voucherCode });
  const voucherInfo = getFirst(res);
  const { conditions, rewards } = voucherInfo?.promotion || {};

  return parseVoucherDetail({ ...voucherInfo, conditions, rewards });
};
const beautyPromo = ({
  conditions,
  code,
  endTime,
  promotionName,
  description,
  promotionType,
  status,
  type,
  voucherId,
  rewards,
  startTime,
  voucherCodes,
}) => ({
  conditions,
  code,
  endTime,
  promotionName,
  description,
  promotionType,
  status,
  type,
  voucherId,
  rewards,
  startTime,
  voucherCodes,
});

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }
  const promos = getData(promoRes);
  return promos.map((item) => beautyPromo(item));
}

const validateScopes = ({ regionCode, scopes, provinceCode, regionList = [] }) => {
  // validate
  let result = true;
  if (scopes && (regionCode || regionList)) {
    scopes.forEach((item) => {
      switch (item.type) {
        case 'AREA':
          if (item.quantityType === 'MANY') {
            result = item?.areaCodes?.indexOf(regionCode) >= 0 || item?.areaCodes?.indexOf(provinceCode) >= 0;
            // nếu check ko có province / region ở trên thì mới check tiếp danh sách region
            if (!result && regionList?.length > 0) {
              result = item?.areaCodes?.filter((areaCode) => regionList?.indexOf(areaCode) >= 0)?.length > 0 || false;
            }
          } else {
            result = true;
          }
          break;
        default:
      }
    });
  }
  return result;
};

// get voucher active
async function getVouchersActiveOrder({ ctx }) {
  const voucherRes = await PromoClient.getVoucherActiveOrder({ ctx });
  if (!isValid(voucherRes)) {
    return [];
  }
  const vouchers = getData(voucherRes);
  return vouchers
    .filter((voucherItem) => {
      const { voucher = {}, userPromotion = {} } = voucherItem;
      const { amount = 0 } = userPromotion;
      const { maxUsagePerCustomer, maxUsage, usageTotal = 0 } = voucher;

      // validate scopes
      // const { scopes = [] } = promotion;
      // const isValidateScope = validateScopes({ scopes, regionCode, provinceCode });
      const checkMaxUsage = !((maxUsage && usageTotal >= maxUsage) || (maxUsagePerCustomer && amount >= maxUsagePerCustomer));

      return checkMaxUsage;
    })
    .map((voucherItem) => {
      const { voucher = {}, userPromotion = {}, conditionDescription = '', canUse = false } = voucherItem;
      return { ...voucher, userPromotion, conditionDescription, canUse };
    });
}

// get voucher active
async function getVouchersActive({ ctx, regionCode = null, regionList = [] }) {
  const voucherRes = await PromoClient.getVoucherActive({ ctx });
  if (!isValid(voucherRes)) {
    return [];
  }
  const vouchers = getData(voucherRes);
  return vouchers
    .filter((voucherItem) => {
      const { voucher = {}, userPromotion = {} } = voucherItem;
      const { amount = 0 } = userPromotion;
      const { maxUsagePerCustomer, maxUsage, usageTotal = 0, promotion = {} } = voucher;

      // validate scopes
      const { scopes = [] } = promotion;
      const isValidateScope = validateScopes({ scopes, regionCode, regionList });
      const checkMaxUsage = !((maxUsage && usageTotal >= maxUsage) || (maxUsagePerCustomer && amount >= maxUsagePerCustomer));

      return isValidateScope && checkMaxUsage;
    })
    .map((voucherItem) => {
      const { voucher = {}, userPromotion = {} } = voucherItem;
      return { ...voucher, userPromotion };
    });
}

async function getMyVoucher({ ctx, offset, limit }) {
  const voucherRes = await PromoClient.getMyVoucher({ ctx, offset, limit });
  const vouchers = getData(voucherRes);

  const promotionIDs = vouchers.map((voucher) => voucher.voucher?.promotionId || 0);
  const promoRes = await PromoClient.getPromotionListByIDs({ ctx, promotionIDs });
  if (!isValid(promoRes)) return vouchers;

  const promoMap = {};
  const promos = getData(promoRes);
  promos.forEach((promo) => {
    promoMap[promo.promotionId] = promo;
  });

  return vouchers.map((voucherInfo) => {
    const { voucher = {} } = voucherInfo || {};
    const { conditions, rewards } = promoMap[voucher.promotionId] || {};
    return {
      ...promoMap[voucher.promotionId],
      ...parseVoucherDetail({ ...voucher, conditions, rewards }),
      isExpired: DateTimeUtils.compareTime(voucher.endTime, Date.now()) < 0,
      used: voucherInfo?.userPromotion || {},
    };
  });
}

export const parseListConditionVoucher = (vouchers = [], regionCode) =>
  vouchers.reduce((voucherList, promo) => {
    const { conditions, voucherCodes = [], rewards, promotionType } = promo;

    return [
      ...voucherList,
      ...voucherCodes?.map((v) =>
        parseVoucherDetail({
          ...v,
          conditions,
          rewards,
          promotionType,
          regionCode,
        }),
      ),
    ];
  }, []);
const isHaveGift = (voucher) => voucher?.rewards && voucher.rewards.length > 0 && voucher.rewards[0].gifts && voucher.rewards[0].gifts.length > 0;

export const convertVouchers = async ({ vouchers }) => {
  vouchers?.reduce((voucherList, promo) => {
    const { conditions, voucherCodes = [], rewards } = promo;
    return [
      ...voucherList,
      ...voucherCodes?.map((voucher) => {
        const rewardsVi = parseListReward(rewards);
        const conditionsVi = parseListCondition(conditions);
        return { ...voucher, rewardsVi, conditionsVi };
      }),
    ];
  });

  const skus = vouchers
    .filter((voucher) => isHaveGift(voucher))
    .reduce((acc, cur) => {
      const giftCodes = cur.rewards[0].gifts.map((gift) => gift.sku);
      return [...acc, ...giftCodes];
    }, []);

  let voucherList = vouchers;

  const productMapRes = await ProductServiceV2.getProductInfoMapFromSkus({ skus, getPrice: false });

  if (isValid(productMapRes)) {
    const productMap = getFirst(productMapRes);
    voucherList = vouchers.map((voucher) => {
      if (isHaveGift(voucher)) {
        const { gifts } = voucher.rewards[0];
        const giftList = [];
        gifts.forEach((gift) => {
          giftList.push(productMap[gift.sku]);
        });
        return {
          ...voucher,
          giftList,
          promotionType: PROMO_REWARD_TYPE.GIFT,
        };
      }
      return voucher;
    });
  }
  return voucherList;
};

// cheat
const getVouchers = async ({ getProductBySkus }) => {
  const vouchers = (await getVouchersActiveOrder({})).map((item) => ({
    ...(item?.promotion || {}),
    ...item,
    rewardsVi: parseListReward(item?.promotion?.rewards),
  }));

  const skus = vouchers
    .filter((voucher) => isHaveGift(voucher))
    .reduce((acc, cur) => {
      const giftCodes = cur.rewards[0].gifts.map((gift) => gift.sku);
      return [...acc, ...giftCodes];
    }, []);

  let voucherList = vouchers;

  const productMapRes = await getProductBySkus({ skus, getPrice: false });

  if (isValid(productMapRes)) {
    const productMap = getFirst(productMapRes);
    voucherList = vouchers.map((voucher) => {
      if (isHaveGift(voucher)) {
        const { gifts } = voucher.rewards[0];
        const giftList = [];
        gifts.forEach((gift) => {
          giftList.push(productMap[gift.sku]);
        });
        return {
          ...voucher,
          giftList,
          promotionType: PROMO_REWARD_TYPE.GIFT,
        };
      }
      return voucher;
    });
  }
  return voucherList;
};

const getPromoCodeDetail = async (voucherCode) => {
  const promoDetailResult = await PromoClient.getPromoDetailByVoucherCode({ voucherCode });
  if (!isValid(promoDetailResult)) {
    return promoDetailResult;
  }
  // map data detail
  const data = getFirst(promoDetailResult);
  const { promotion } = data;

  // checkGift
  let giftList = [];
  const isGift = isHaveGift(promotion);
  if (isGift) {
    const skus = promotion.rewards[0].gifts.map((item) => item.sku);
    const productMapRes = await ProductServiceV2.getProductInfoMapFromSkus({ skus, getPrice: false });
    if (isValid(productMapRes)) {
      giftList = Object.values(getFirst(productMapRes));
    }
  }

  return {
    ...promoDetailResult,
    data: [
      parseVoucherDetail({
        ...promotion,
        ...data,
        voucherCodes: [{ ...data, promotion: null }],
        giftList,
      }),
    ],
  };
};

// regionList : danh sách mã vùng ( region )
export const getClassifyVoucherCodes = async ({ ctx, regionCode, regionList }) => {
  const vouchers = await getVouchersActiveOrder({ ctx, regionCode, regionList });

  const myVouchers = vouchers.filter((voucher) => voucher?.appliedCustomers && voucher.appliedCustomers.length > 0);
  const otherVouchers = vouchers.filter((voucher) => !voucher?.appliedCustomers?.length > 0);
  return {
    myVouchers,
    otherVouchers,
  };
};

export default {
  getPromoActive,
  getMyVoucher,
  getPromotionDetailByVoucherCode,
  parseListReward,
  parseReward,
  getPromoCodeDetail,
  getClassifyVoucherCodes,
  getVouchersActive,
  getVouchers,
  getVouchersActiveOrder,
};
