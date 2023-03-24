import { getFirst } from 'clients';
import { getLogs } from 'clients/TrackingOrderClient';
import { HTTP_STATUS } from 'constants/Enums';

const mapStatus = {
  CONFIRMED: 'Đã xác nhận đơn hàng',
  // WAIT_TO_PICK: 'Đợi lấy hàng',
  // PICKING: 'Đang lấy hàng',
  // WAIT_TO_CHECK: 'Đã lấy hàng xong',
  // CHECKING: 'Đang kiểm tra đơn hàng',
  // WAIT_TO_PACK: 'Đơn hàng đang chờ đóng gói',
  // PACKING: 'Đang đóng gói đơn hàng',
  WAIT_TO_DELIVERY: 'Chờ giao hàng',
  DELIVERING: 'Đơn hàng đang vận chuyển',
  DELIVERED: 'Giao thành công',
};

const PROCESSING = ['WAIT_TO_PICK', 'PICKING', 'WAIT_TO_CHECK', 'CHECKING', 'WAIT_TO_PACK', 'PACKING'];

export const getDataLogsOrder = async (params) => {
  const data = {};

  // get logs 3pl
  const resultTpl = await getLogs(params);

  const { logs = [] } = getFirst(resultTpl) || {};

  data.logsTpl = [];

  let isProcessing = false;
  data.logsTpl = logs
    ?.map((item) => {
      if (!isProcessing && PROCESSING.indexOf(item.status) >= 0) {
        isProcessing = true;
        return {
          lastUpdatedTime: Number(`${item.actionTime}000`) || null,
          statusName: 'Đang xử lí đơn',
          createdSource: item?.extraData?.tplName || null,
          trackingCode: item?.extraData?.trackingCode || null,
        };
      }

      const statusName = mapStatus[item.status] || null;

      if (statusName)
        return {
          lastUpdatedTime: Number(`${item.actionTime}000`) || null,
          statusName,
          createdSource: item?.extraData?.tplName || null,
          trackingCode: item?.extraData?.trackingCode || null,
        };

      return null;
    })
    .filter((item) => item);

  return {
    status: HTTP_STATUS.Ok,
    data: [data],
  };
};

export default { getDataLogsOrder };
