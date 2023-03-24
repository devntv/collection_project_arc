import { Tooltip } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { getFirst, isValid } from 'clients';
import { getShowTags } from 'components/mocules/TagComponent';
import { getTagName } from 'components/mocules/TagType';
import { BRAND_NAME, PAYMENT_METHOD_NAME } from 'constants/Enums';
// import { ICON_EXPORT_XLS_ORDER } from 'constants/Images';
import * as FileSaver from 'file-saver';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
import { OrderService } from 'services';
import { NotifyUtils } from 'utils';
import * as XLSX from 'xlsx';
import { useStore } from 'zustand-lib/storeGlobal';

// const XLSX = dynamic(() => import('xlsx'), { ssr: false });

const ExportDataOrderV2 = ({ orderId, className }) => {
  const getStyleBySlugOfTag = useStore((state) => state.getStyleBySlugOfTag);
  const user = useStore((state) => state?.user) || null;

  const getProductInfo = (orderItems = [], products = [], provinceCode = null) => {
    const infoList = orderItems.map((item, index) => {
      const { tags = null, isGift = false, lotDates = [] } = item || {};
      // get tags name of order items
      const tagList = [];
      if (isGift) tagList.push('QUÀ TẶNG');
      if (lotDates?.find((lotItem) => lotItem?.isNearExpired === true)) tagList.push('Cận date');
      if (tags) {
        const showTags = getShowTags(tags, getStyleBySlugOfTag, provinceCode);
        showTags.forEach((tag) => {
          if (tag === 'DEAL' || tag === 'FLASH_SALE') tagList.push('Khuyễn mãi');
          if (tag === 'NEAR_EXPIRATION') tagList.push('Cận date');
          if (tag !== 'GIFT') tagList.push(getTagName(tag, getStyleBySlugOfTag));
        });
      }
      const tagNameString = [...new Set(tagList?.filter(Boolean))]?.toString() || '';
      // get order items name
      const product = products.find((pro) => pro?.sku === item?.sku) || null;
      const productName = product?.productInfo?.name || '';

      return {
        order: index + 1,
        name: productName,
        quantity: item?.quantity || 1,
        tags: tagNameString,
        totalPrice: item.totalPrice,
      };
    });

    return infoList;
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
      const productsInfo = getProductInfo(order.orderItems, order.products, user?.provinceCode);
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
    <button size="small" className={className} onClick={() => downloadFileOrderDetail(orderId)}>
      {/* <Image src={ICON_EXPORT_XLS_ORDER} width="20" height="22" priority /> */}
      <p>Danh sách đơn hàng.xlsx</p>
      <Tooltip title="Xuất thông tin chi tiết đơn hàng">
        <CloudDownloadIcon style={{ color: '#ABABAB' }} />
      </Tooltip>
    </button>
  );
};
export default ExportDataOrderV2;
