import { Grid, Paper } from '@material-ui/core';
import {
  EditOrderButton,
  OrderDetailInfo,
  OrderDetailProduct,
  OrderDetailStep,
  PrintInvoiceButton,
  TicketButton,
  TicketFormModal,
} from 'components/mocules';
import ExportDataOrderDetail from 'components/organisms/ExportDataOrderDetail';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { MY_ORDER_URL, PATH_INFO_BILL } from 'constants/Paths';
import { useModal } from 'hooks';
import Link from 'next/link';
import { useState } from 'react';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import InvoiceList from '../InvoiceList';
import styles from './styles.module.css';

const isShowInvoice = false;

const OrderDetailContainer = ({ order, bankInfo, reasonsList, isMobile, user }) => {
  const [orderTicket, setOrderTicket] = useState({});
  const [open, toggleOpen] = useModal();

  const { invoices = [], invoice } = order || {};

  const handleChangeOrderTicket = (value) => {
    setOrderTicket(value);
  };
  // const isCanExport = order;
  const PrintInvoiceEle = (
    <Grid item className={styles.print_invoice}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid className={styles.print_invoice_button} container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton orderCode={order.orderCode} user={user} disabled={order.status !== ENUM_ORDER_STATUS.PENDING} />
          </Grid>
          <Grid item container direction="column" justifyContent="center" xs={5}>
            {order.status === ENUM_ORDER_STATUS.CANCEL || order.status === ENUM_ORDER_STATUS.COMPLETED ? (
              <div className={styles.text_danger}>Đơn hàng của bạn đã quá thời gian để xuất hóa đơn</div>
            ) : (
              <div className={styles.text_bill}>
                Xem thông tin xuất hoá đơn đỏ&nbsp;
                <a href={PATH_INFO_BILL} target="_blank" rel="noreferrer">
                  tại đây
                </a>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper classes={{ root: styles.container }} elevation={3}>
          <Grid container>
            {!isMobile && (
              <>
                <Grid item xs={12}>
                  <div className={styles.head}>
                    <h3 className={styles.title}>
                      Chi tiết đơn hàng #{order.orderId}
                      {order?.status === 'CANCEL' && <span style={{ color: 'red' }}> (Đã hủy)</span>}
                    </h3>
                    <ExportDataOrderDetail orderId={order.orderId} />
                  </div>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <OrderDetailStep status={order?.status} />
            </Grid>
            <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
              <Grid container justifyContent="center" direction="column">
                <div className={styles.order_status_bottom_text}>
                  Ngày mua:&nbsp;
                  <span>{DateTimeUtils.getFormattedDate(new Date(order.createdTime), 'DD/MM/YYYY HH:mm:ss')}</span>
                </div>
                <div className={styles.order_status_bottom_text}>
                  Dự kiến giao vào:&nbsp;
                  <span>{order.deliveryDate ? DateTimeUtils.getFormattedWithDate(new Date(order.deliveryDate)) : '(Chưa có)'}</span>
                </div>
              </Grid>
              <Grid className={styles.order_button} item container direction="row" justifyContent="flex-end">
                {order?.canEdit && <EditOrderButton orderId={order.orderId} canEdit={order.canEdit} />}
                <TicketButton
                  order={{
                    ...order,
                    orderId: order.orderId,
                    orderTime: order.createdTime,
                    name: order?.customerName,
                    phone: order?.customerPhone,
                  }}
                  handleChangeOrderTicket={handleChangeOrderTicket}
                  handleOpenModal={toggleOpen}
                />
              </Grid>
            </Grid>
          </Grid>
          {invoice?.invoiceRequest &&
            invoices?.map((invoiceData) => <InvoiceList invoiceData={invoiceData} key={uuidv4()} orderId={order.orderId} />)}
        </Paper>
        {open && (
          <TicketFormModal {...orderTicket} bankInfo={bankInfo} reasonsList={reasonsList} visible={open} onClose={toggleOpen} ticketType="ORDER" />
        )}
      </Grid>
      {isShowInvoice && <PrintInvoiceEle />}
      <Grid item xs={12}>
        <OrderDetailInfo {...order} />
      </Grid>
      <Grid className={styles.table_wrapper} item xs={12}>
        <OrderDetailProduct
          products={order?.products || []}
          promoName={order?.redeemCode}
          totalDiscount={order?.totalDiscount}
          totalPrice={order?.totalPrice}
          paymentMethodFee={order?.paymentMethodFee}
          deliveryCarrier={order?.deliveryCarrier}
          deliveryMethodFee={order?.deliveryMethodFee}
          price={order?.price}
          extraFee={order.extraFee}
          status={order?.status}
          orderItems={order?.orderItems || []}
          point={order?.point}
        />
      </Grid>
      <Grid item xs={12} className={styles.comeback}>
        <Link href={MY_ORDER_URL} prefetch={false}>
          &lt;&lt; Quay lại đơn hàng của tôi
        </Link>
      </Grid>
    </Grid>
  );
};

export default OrderDetailContainer;
