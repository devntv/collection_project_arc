import { getFirst, isValid, NotifyClient } from 'clients';

export const getTotalNotification = async ({ ctx }) => {
  const res = await NotifyClient.getTotalNotification({ ctx });
  if (!isValid(res)) {
    return {};
  }
  return getFirst(res);
};

export const getNotifications = async ({ ctx }) => {
  const res = await NotifyClient.getNotify({ ctx });
  return res;
};

export const markReadAll = async ({ ctx }) => NotifyClient.markReadAllNoti({ ctx });

export const markReadByCode = async ({ ctx, code }) =>
  NotifyClient.markReadNotiByCode({ ctx, code });

export default {
  getTotalNotification,
  getNotifications,
  markReadAll,
  markReadByCode,
};
