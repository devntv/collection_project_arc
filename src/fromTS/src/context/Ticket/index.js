import { isValid, TicketClient } from 'clients';
import { BRAND_NAME, TYPE_CUSTOMER_BY_COLOR } from 'constants/Enums';
import { useAuth } from 'context/Auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { DISLIKE_FEEDBACK_CODE, LIKE_FEEDBACK_CODE, TIME_PREVENT_FEEDBACK_PRICE } from 'sysconfig';
import { NotifyUtils } from 'utils';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [feedbackedListSku, setFeedbackedListSku] = useState([]);
  const { handleRedCustomer } = useAuth();
  useEffect(() => {
    const feedbackInfo = JSON.parse(localStorage.getItem('feedbackPrice'));
    setFeedbackedListSku(feedbackInfo);
  }, []);

  const sendFeedback = async ({ data }) => {
    const res = await TicketClient.createFeedback(data);
    if (isValid(res)) {
      NotifyUtils.success(`${BRAND_NAME} đã nhận phản hồi về giá của bạn.`);
      const { sku, reasonCodes } = data;
      const feedbackInfo = {
        sku,
        type: reasonCodes.toString(),
        createAt: new Date(),
        expiredAt: new Date(Date.now() + +TIME_PREVENT_FEEDBACK_PRICE),
      };

      const newListFeedback = feedbackedListSku?.filter((item) => item?.sku !== sku) || [];
      newListFeedback.push(feedbackInfo);
      localStorage.setItem('feedbackPrice', JSON.stringify(Array.from(newListFeedback).reverse()));
      setFeedbackedListSku(newListFeedback);
      return true;
    }
    if (res?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
      return false;
    }
    NotifyUtils.error('Gửi phản hồi thất bại');
    return false;
  };

  const sendLikeFeedback = async ({ sku, productId }) => {
    const data = {
      source: 'WEB',
      reasonCodes: [LIKE_FEEDBACK_CODE],
      type: 'PRODUCT',
      sku,
      productId,
      isAcceptPrice: true,
    };
    return sendFeedback({ data });
  };

  const sendDislikeFeedback = async ({ sku, productId, feedbackContent }) => {
    const data = {
      source: 'WEB',
      reasonCodes: [DISLIKE_FEEDBACK_CODE],
      type: 'PRODUCT',
      sku,
      productId,
      feedbackContent,
      isHighPrice: true,
    };
    return sendFeedback({ data });
  };

  const isSkuFeedbackedPrice = ({ sku }) => {
    const existFeedbackItem = feedbackedListSku?.find((item) => item?.sku === sku);
    const { expiredAt = null } = existFeedbackItem || {};
    if (!existFeedbackItem) return null;
    return { ...existFeedbackItem, disabledFeedbackPrice: new Date(expiredAt).getTime() > new Date().getTime() };
  };
  const contextValues = {
    sendLikeFeedback,
    sendDislikeFeedback,
    sendFeedback,
    feedbackedListSku,
    isSkuFeedbackedPrice,
  };

  return <TicketContext.Provider value={contextValues}>{children}</TicketContext.Provider>;
};

export const useTicket = () => useContext(TicketContext);
