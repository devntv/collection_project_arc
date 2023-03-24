import { CustomerClient, getData, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT, PromoClient } from 'clients';
import DateTimeUtils from 'utils/DateTimeUtils';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';
import AddressService from './AddressService';

export const getReferralList = async ({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT }) => {
  const params = { offset, limit };
  const res = await CustomerClient.getReferral({ params });
  if (isValid(res)) {
    res.data = res.data.map((referral) => {
      const { lastTimeSendSMS = null, smsTotalSent = 0, expireTime } = referral;

      // check expired
      if (DateTimeUtils.compareTime(expireTime, Date.now()) < 0) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Không thể gửi. Bạn đã quá thời hạn gửi đến số điện thoại này!',
        };
      }

      // check send total
      if (smsTotalSent >= 5) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Không thể gửi. Bạn không thể gửi quá 5 lần!',
        };
      }
      // check > 3h
      const dateLastSend = new Date(lastTimeSendSMS).getTime();
      const curTime = new Date().getTime();
      if (curTime - dateLastSend <= 10800000) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!',
        };
      }

      return { ...referral, canResendSMS: true };
    });
  }

  return res;
};

export const sendSms = async ({ phoneNumber }) => {
  if (isEmpty(phoneNumber)) {
    return invalid('Số điện thoại không đúng định dạng');
  }
  const res = await CustomerClient.sendSms({ phoneNumber });

  if (!isValid(res)) {
    return res;
  }

  return res;
};

export const retrySendSMS = async ({ code }) => {
  const res = await CustomerClient.retrySendSms({ code });
  return res;
};

export const getListAddress = async ({ ctx }) => {
  const res = await CustomerClient.getListAddress({ ctx });
  if (!isValid(res)) return [];
  const data = getData(res);
  let addressInfoList = await Promise.all(
    data.map(async (info) => {
      const masterAddress = await AddressService.getMasterAddressString(info);
      return { ...info, masterAddress: `${info.address}, ${masterAddress}` };
    }),
  );
  addressInfoList = addressInfoList.sort((a, b) => DateTimeUtils.compareTime(a.createdTime, b.createdTime));

  return addressInfoList;
};

export const getListLoyalty = async ({ ctx }) => {
  const res = await CustomerClient.getListLoyalty(ctx);
  if (!isValid(res)) return [];
  let loyaltys = getData(res);
  const promotionIDs = loyaltys.map((loyalty) => loyalty.promotionId);
  const promosResp = await PromoClient.getPromotionListByIDs({ ctx, promotionIDs });
  if (isValid(promosResp)) {
    const promoMap = {};
    const promos = getData(promosResp);
    promos.forEach((promo) => {
      promoMap[promo.promotionId] = promo;
    });
    loyaltys = loyaltys
      .map((loyalty) => ({
        ...loyalty,
        promotion: promoMap[loyalty.promotionId],
      }))
      .filter((loyalty) => DateTimeUtils.compareTime(loyalty?.promotion?.endTime, Date.now()) > 0)
      .sort((a, b) => a.point - b.point);
  }
  return loyaltys;
};

export default {
  getReferralList,
  sendSms,
  retrySendSMS,
  getListAddress,
  getListLoyalty,
};
