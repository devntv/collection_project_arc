import { IconButton, Tooltip } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { getFirst, isValid } from 'clients';
import { BRAND_NAME, PAYMENT_METHOD_NAME } from 'constants/Enums';
import { useAuth } from 'context';
import * as FileSaver from 'file-saver';
// import dynamic from 'next/dynamic';
import { OrderService } from 'services';
import { NotifyUtils } from 'utils';
import * as XLSX from 'xlsx';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

// const XLSX = dynamic(() => import('xlsx'), { ssr: false });

const ExportDataOrderDetail = ({ orderId }) => {
  const getStyleBySlugOfTag = useStore((state) => state.getStyleBySlugOfTag);
  const { user } = useAuth();
  const productList = (products = []) => {
    const list = [];
    products.forEach((item, index) => {
      const { tags = null, isGift = false } = item?.productInfo || {};
      const tagList = [];
      if (isGift) tagList.push('QUÀ TẶNG');
      else if (tags) {
        tags.forEach((tag) => {
          if (tag !== 'GIFT') tagList.push(getStyleBySlugOfTag(tag)?.name);
        });
      }
      const tagNameString = tagList.toString();
      list.push({
        order: index + 1,
        name: item.productInfo.name,
        quantity: item?.quantity || 1,
        tags: tagNameString,
        totalPrice: item.totalPrice,
      });
    });
    return list;
  };

  const downloadFileOrderDetail = async (orderID) => {
    try {
      const orderRes = await OrderService.getOrderDetail({
        orderId: Number(orderID),
        getCombo: false,
        customerLevel: user?.level,
        locationCode: user?.provinceCode,
      });
      if (!isValid(orderRes)) {
        throw Error(orderRes?.message || 'Xuất đơn hàng không thành công');
      }
      const order = getFirst(orderRes, {});
      const productsInfo = productList(order.products);
      const {
        totalItem,
        totalQuantity,
        totalPrice,
        createdTime,
        deliveryDate,
        paymentMethod,
        redeemCode,
        totalDiscount,
        customerName,
        customerPhone,
        extraFee,
        deliveryMethodFee,
      } = order;

      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `Thông tin chi tiết đơn hàng ${orderId} - ${customerName} - ${customerPhone} - ${BRAND_NAME}`;
      const sheetName = `${orderId}`;
      const wb = XLSX.utils.book_new();
      wb.SheetNames.push(sheetName);
      const wsData = [
        ['Mã đơn', orderId],
        [],
        ['Sản phẩm', totalItem],
        ['Tổng số lượng', totalQuantity],
        ['Tổng giá tiền', totalPrice],
        ['Ngày mua', new Date(createdTime)],
        ['Ngày giao dự kiến', new Date(deliveryDate)],
        ['Hình thức thanh toán', PAYMENT_METHOD_NAME[paymentMethod]],
        ['Phí giao hàng', deliveryMethodFee],
        ['Phụ phí', extraFee],
        redeemCode && redeemCode.length > 0 && ['Mã giảm giá', redeemCode[0]],
        totalDiscount && totalDiscount > 0 && ['Số tiền được giảm', totalDiscount],
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.sheet_add_json(ws, [{ A: 'Số thứ tự', B: 'Tên sản phẩm', C: 'Số lượng', D: 'Tags', E: 'Tổng tiền' }], {
        skipHeader: true,
        origin: 'A15',
      });
      XLSX.utils.sheet_add_json(ws, productsInfo, {
        skipHeader: true,
        origin: 'A16',
      });
      wb.Sheets[sheetName] = ws;
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <Tooltip title="Xuất thông tin chi tiết đơn hàng">
      <IconButton size="small" className={styles.btn} onClick={() => downloadFileOrderDetail(orderId)}>
        <CloudDownloadIcon className={styles.icon} />
      </IconButton>
    </Tooltip>
  );
};
export default ExportDataOrderDetail;
