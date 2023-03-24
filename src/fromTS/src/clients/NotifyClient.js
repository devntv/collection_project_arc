import { NOTIFICATION_API } from 'constants/APIUri';
import { GET, PUT } from './Clients';

export const getNotify = async ({ ctx }) => {
  const url = NOTIFICATION_API.NOTIFICATION_LIST;
  return GET({ url, ctx });
};

export const getTotalNotification = async ({ ctx }) => {
  const url = NOTIFICATION_API.NOTIFICATION_COUNTER;
  return GET({ url, ctx });
};

export const markReadNotiByCode = async ({ ctx, code }) => {
  const url = NOTIFICATION_API.NOTIFICATION;
  return PUT({ url, ctx, params: { code } });
};

export const markReadAllNoti = async ({ ctx }) =>
  PUT({ url: NOTIFICATION_API.NOTIFICATION_ALL, ctx });

export default {
  getNotify,
  getTotalNotification,
  markReadAllNoti,
  markReadNotiByCode,
};
