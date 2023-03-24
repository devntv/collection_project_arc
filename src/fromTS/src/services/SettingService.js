import { SettingClient } from 'clients';
import { MAX_ORDER_IN_WEEK, MAX_SKU_IN_ORDER, NOTIFY_IN_TOP_BAR, PROVINCES_TURN_OFF_PAYMENT } from 'sysconfig';

export const getListSetting = async ({ ctx }) => {
  const res = await SettingClient.getSettingList({ ctx });
  return res;
};

const getSettingInWeb = async ({ user }) => {
  // const totalOrderInWeek = await OrderService.getOrderCountInWeekStartDate({ ctx });
  const isDisplayNotiTopBar = PROVINCES_TURN_OFF_PAYMENT.indexOf('ALL') >= 0 || PROVINCES_TURN_OFF_PAYMENT?.indexOf(user?.provinceCode) >= 0 || false;

  const settingWeb = {
    MAX_ORDER_IN_WEEK,
    MAX_SKU_IN_ORDER,
    // totalOrderInWeek,
    isDisplayNotiTopBar,
    content: NOTIFY_IN_TOP_BAR,
    canOrderInWeek: MAX_ORDER_IN_WEEK,
    isDisablePayment: isDisplayNotiTopBar,
  };

  return settingWeb;
};

export default { getListSetting, getSettingInWeb };
