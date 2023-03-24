import { Grid, Paper, useMediaQuery } from '@material-ui/core';
import { isValid, OrderClient } from 'clients';
import clsx from 'clsx';
import ExportDataOrderDetail from 'components/organisms/ExportDataOrderDetail';
import InvoiceList from 'components/organisms/InvoiceList';
import { ENUM_ORDER_STATUS, PAYMENT_METHOD_NAME_SHORT } from 'constants/Enums';
import { MY_ORDER_URL } from 'constants/Paths';
import { useSetting } from 'context';
import { useModal } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FEATURE_RE_ORDER } from 'sysconfig';
import { DateTimeUtils } from 'utils';
import { remainTime } from 'utils/calculateTimeLeft';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import ButtonReOrder from '../ButtonReOrder';
import ButtonReturnOrder from '../ButtonReturnOrder';
import CustomModal from '../CustomModal';
import EditOrderButton from '../EditOrderButton';
import RequestInvoiceButton from '../RequestInvoiceButton';
import RequestInvoiceModal from '../RequestInvoiceFormModal';
import TicketButton from '../TicketButton';
import TicketFormModal from '../TicketFormModal';
import OrderStatusButton from './OrderStatusButton';
import styles from './styles.module.css';

const MyOrderDetail = ({
  amount = null,
  createdTime,
  deliveryDate = null,
  totalQuantity = null,
  redeemCode = null,
  totalDiscount = 0,
  paymentMethod,
}) => (
  <div style={{ overflowX: 'auto' }}>
    <Grid item xs={12} lg={4}>
      <div>
        <span className={styles.order_detail_label}>Sản phẩm: </span> {amount && formatNumber(amount)}
      </div>
      <div>
        <span className={styles.order_detail_label}>Tổng số lượng: </span> {totalQuantity && formatNumber(totalQuantity)}
      </div>
    </Grid>
    <Grid item xs={12} lg={8}>
      <div>
        <span className={styles.order_detail_label}>Ngày mua: </span>
        {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm:ss')}
      </div>
      <div>
        <span className={styles.order_detail_label}>Hình thức thanh toán: </span>
        {PAYMENT_METHOD_NAME_SHORT[paymentMethod]}
      </div>
      {deliveryDate && (
        <div>
          <span className={styles.order_detail_label}> Dự kiến giao ngày: </span>
          <span>{DateTimeUtils.getFormattedWithDate(new Date(deliveryDate))}</span>
        </div>
      )}
      {redeemCode && redeemCode.length > 0 && (
        <div>
          <span className={styles.order_detail_label}>Mã giảm giá: </span>
          <span>{redeemCode[0]}</span>
        </div>
      )}
      {totalDiscount > 0 && (
        <div>
          <span className={styles.order_detail_label}>Giảm giá: </span> {formatCurrency(totalDiscount)}
        </div>
      )}
    </Grid>
  </div>
);
const OrderRow = ({
  orderId,
  orderCode,
  createdTime,
  deliveryDate,
  customerName,
  customerPhone,
  customerId,
  customerCode,
  customerEmail,
  status,
  totalPrice,
  handleSetOrderStatus,
  bankInfo,
  reasonsList,
  totalItem,
  totalQuantity,
  canEdit,
  invoiceInfo,
  redeemCode,
  totalDiscount,
  paymentMethod,
  listInvoiceInfo,
  invoice,
  isMobile,
  products,
  completedTime,
}) => {
  const router = useRouter();
  const [orderTicket, setOrderTicket] = useState({});
  const [open, toggleOpen] = useModal();
  const [openCancelOrder, toggleOpenCancelOrder] = useModal();

  const {
    reconcileTime = null,
    // arisingInvoiceTime = null,
    numberOfUpdates = 0,
  } = invoiceInfo;

  const now = +new Date();
  // thời gian giao thành công
  const deliveredTime = (reconcileTime && +new Date(reconcileTime)) || 0;
  // thời gian xuất hóa đơn
  // const arasingInvoice = (arisingInvoiceTime && +new Date(arisingInvoiceTime)) || 0;

  const invoices = invoiceInfo?.invoices || [];

  const { mapSeller = new Map() } = useSetting();
  const numberOfSellerMEDX = products.filter(({ sellerCode, tags }) => {
    const sellerInfo = mapSeller?.get(sellerCode) || null;
    const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;
    return sellerInfo?.isInternal && isVAT;
  }).length;

  // const displayInvoiceBtn = () => {
  //   switch (status) {
  //     case ENUM_ORDER_STATUS.CANCEL:
  //       return false;
  //     case ENUM_ORDER_STATUS.DELIVERED:
  //     case ENUM_ORDER_STATUS.COMPLETED:
  //       // nếu có yêu cầu xuất hoá đơn
  //       if (invoice?.invoiceRequest) {
  //         // trong trường hợp có yêu cầu xuất hoá đơn
  //         // nếu có đã có hoá đơn thì sẽ dc cập nhập 1 lần - nếu quá thì ko dc
  //         if (numberOfUpdates > 0 && numberOfSellerMEDX === 0) {
  //           // numberOfUpdate chỉ dc đếm khi sau khi có hoá đơn
  //           return false;
  //         }
  //         // trong vòng 14 ngày thì vẫn hiện nút
  //         return arasingInvoice !== 0 && remainTime(now, arasingInvoice) <= 14 && numberOfSellerMEDX > 0;
  //       }
  //       // không yêu cầu xuất hoá đơn , thì sẽ tính 7 ngày từ ngày giao thành công để ẩn nút ( mặc định là hiện )
  //       // trong vòng 7 ngày thì sẽ hiện nút
  //       return deliveredTime !== 0 && remainTime(now, deliveredTime) <= 7;
  //     default:
  //       return true;
  //   }
  // };

  const enableBtn = () => {
    switch (status) {
      case ENUM_ORDER_STATUS.CANCEL:
        return false;
      case ENUM_ORDER_STATUS.DELIVERING:
        return !invoice?.invoiceRequest;
      case ENUM_ORDER_STATUS.DELIVERED:
      case ENUM_ORDER_STATUS.COMPLETED:
        if (!invoice?.invoiceRequest) return deliveredTime !== 0 && remainTime(now, deliveredTime) <= 7;
        return deliveredTime !== 0 && remainTime(now, deliveredTime) <= 14 && numberOfUpdates === 0;
      default:
        return true;
    }
  };

  const checkTime30days = completedTime !== 0 && remainTime(now, +new Date(completedTime)) >= 30;

  const [openModalInvoice, toggleOpenModalInvoice] = useModal();
  const handleChangeOrderTicket = (value) => {
    setOrderTicket(value);
  };

  const handleCancel = async () => {
    try {
      const result = await OrderClient.cancelOrder(orderId);
      if (!isValid(result)) {
        if (result?.errorCode === 'INTERNAL_SERVICE_ERROR') throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        else throw new Error(result?.message || 'Gửi yêu cầu giữ đơn thất bại');
      }
      NotifyUtils.success('Gửi yêu cầu hủy đơn thành công');
      toggleOpenCancelOrder();
      router.push(window.location.href);
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const maxWidth = useMediaQuery('(max-width:715px)');
  return (
    <Paper square={!maxWidth} className={clsx(styles.paper, invoices.length > 0 && styles.paper_popup)} elevation={0}>
      <Grid container>
        <Grid
          item
          xs={maxWidth ? 12 : 5}
          container
          direction="row"
          justifyContent={maxWidth ? 'space-between' : 'flex-start'}
          className={styles.grid}
        >
          <Grid item container>
            <Grid itemScope>
              <Link href={`${MY_ORDER_URL}/${orderId}`} key={`order-row-${uuidv4()}`} prefetch={false}>
                <h4 className={styles.order_id}>#{orderId} &nbsp;</h4>
              </Link>
            </Grid>
            <Grid className={styles.order_status} item style={{ paddingTop: '5px' }}>
              <div className={styles.status_export}>
                <OrderStatusButton status={status} handleSetOrderStatus={handleSetOrderStatus} />
                <ExportDataOrderDetail orderId={orderId} />
              </div>
            </Grid>
          </Grid>
          {/* {maxWidth ? null : ( */}
          <MyOrderDetail
            amount={totalItem}
            totalQuantity={totalQuantity}
            createdTime={createdTime}
            redeemCode={redeemCode}
            deliveryDate={deliveryDate}
            totalDiscount={totalDiscount}
            paymentMethod={paymentMethod}
            maxWidth={maxWidth}
          />
          {/* )} */}
        </Grid>

        <Grid item xs={maxWidth ? 12 : 2} container direction="row" justifyContent="space-between" className={clsx(styles.grid)}>
          {/* {maxWidth ? (
            <Grid className={styles.delivery_date} item>
              {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm:ss')}
            </Grid>
          ) : null} */}
          <Grid className={clsx(maxWidth ? styles.price_small_screen : styles.price)} item>
            {formatCurrency(totalPrice)}
          </Grid>
        </Grid>

        <Grid item xs={maxWidth ? 12 : 5} container direction={maxWidth ? 'row' : 'column'} justifyContent="center" className={styles.grid}>
          {/* <Grid item>
            <PrintInvoiceButton orderNo={orderNo} user={user} disabled={status !== ENUM_ORDER_STATUS.PENDING} />
          </Grid> */}
          {status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM && (
            <Grid item className={styles.gridBtn}>
              {canEdit && <EditOrderButton orderId={orderId} canEdit={canEdit} />}
            </Grid>
          )}
          {FEATURE_RE_ORDER && (
            <Grid item className={styles.gridBtn}>
              <ButtonReOrder orderId={orderId} />
            </Grid>
          )}
          <Grid item className={styles.gridBtn}>
            <TicketButton
              order={{
                orderId,
                orderCode,
                orderTime: createdTime,
                deliveryDate,
                name: customerName,
                phone: customerPhone,
                orderStatus: status,
              }}
              handleChangeOrderTicket={handleChangeOrderTicket}
              handleOpenModal={toggleOpen}
            />
            {/* {[ENUM_ORDER_STATUS.PROCESSING, ENUM_ORDER_STATUS.WAIT_TO_CONFIRM, ENUM_ORDER_STATUS.CONFIRMED].includes(status) && (
              <>
                <Grid item className={styles.gridBtn}>
                  <Button className="my-order__button my-order__button--secondary" onClick={toggleOpenCancelOrder}>
                    Hủy đơn hàng
                  </Button>
                </Grid>
              </>
            )} */}
          </Grid>

          {status === ENUM_ORDER_STATUS.DELIVERED || status === ENUM_ORDER_STATUS.COMPLETED ? (
            <ButtonReturnOrder orderId={orderId} disabled={status === ENUM_ORDER_STATUS.DELIVERED ? false : checkTime30days} />
          ) : null}
          {status !== ENUM_ORDER_STATUS.CANCEL && (
            <Grid item className={styles.gridBtn}>
              <RequestInvoiceButton
                invoice={invoice}
                handleOpenModal={toggleOpenModalInvoice}
                numberOfSellerMEDX={numberOfSellerMEDX}
                numberProduct={products?.length || 0}
                status={status}
                numberOfUpdates={numberOfSellerMEDX}
                enable={enableBtn()}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      {invoice?.invoiceRequest && invoices?.map((invoiceData) => <InvoiceList invoiceData={invoiceData} key={uuidv4()} orderId={orderId} />)}
      {open && (
        <TicketFormModal
          {...orderTicket}
          bankInfo={bankInfo}
          reasonsList={reasonsList}
          customerId={customerId}
          customerCode={customerCode}
          visible={open}
          onClose={toggleOpen}
          ticketType="ORDER"
        />
      )}

      {openCancelOrder && (
        <CustomModal
          visible={openCancelOrder}
          onClose={toggleOpenCancelOrder}
          title="Xin xác nhận"
          content="Quý khách có muốn hủy đơn hàng không."
          onClickOk={handleCancel}
          btnOnClose="Tôi xem lại"
          btnOk="Đồng ý"
        />
      )}
      {openModalInvoice && (
        <RequestInvoiceModal
          listInvoiceInfo={listInvoiceInfo}
          visible={openModalInvoice}
          onClose={toggleOpenModalInvoice}
          orderId={orderId}
          customerEmail={customerEmail}
          invoice={invoice}
          isMobile={isMobile}
        />
      )}
    </Paper>
  );
};

export default OrderRow;
