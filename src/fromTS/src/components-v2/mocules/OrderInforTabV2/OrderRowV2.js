import { Box, Button, ClickAwayListener, Divider, Grid, Grow, MenuItem, MenuList, Paper, Popper, Tooltip, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getFirst, isValid, OrderClient } from 'clients';
// eslint-disable-next-line import/no-unresolved
import ExportInvoice from 'components-v2/mocules/Export';
import { LinkComp } from 'components/atoms';
import { CustomModal, EditOrderButton, TicketFormModal } from 'components/mocules';
import { ENUM_ORDER_STATUS, ENUM_ORDER_STATUS_COLOR_V2, ENUM_ORDER_STATUS_LABEL } from 'constants/Enums';
import { TICKET_PROMO_ICON, TimeOrderStatus } from 'constants/Images';
import { MY_ORDER_URL } from 'constants/Paths';
import { useModal } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import { OrderService } from 'services';
import { DateTimeUtils } from 'utils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import ButtonSendTicketV2 from '../ButtonSendTicketV2';
import ExportDataOrderV2 from '../ExportDataOrderV2';
import styles from './styles.module.css';

const statusDot = (status) => {
  const background = ENUM_ORDER_STATUS_COLOR_V2[status];
  return background ? <Box style={{ backgroundColor: background }} className={styles.statusDot} /> : null;
};

const StatusOrder = memo(({ status, isMobile, saleOrderStatus }) => {
  const statusOrderCombined =
    status === ENUM_ORDER_STATUS.DELIVERING && saleOrderStatus === ENUM_ORDER_STATUS.TRANSPORTING ? ENUM_ORDER_STATUS.TRANSPORTING : status;

  return (
    <Grid className={styles.statusOrder} container alignItems="center" justifyContent={isMobile && 'flex-end'}>
      {statusDot(status)}
      <Typography>{ENUM_ORDER_STATUS_LABEL[statusOrderCombined]}</Typography>
    </Grid>
  );
});

const RowInfo = ({
  isMobile = false,
  orderId,
  createdTime,
  invoice,
  totalPrice,
  amount,
  totalQuantity,
  redeemCode,
  status,
  deliveryDate,
  saleOrderStatus,
}) => (
  <>
    {isMobile ? (
      <Grid item xs={12} container justifyContent="flex-start">
        <Grid item xs={5}>
          <Link href={`${MY_ORDER_URL}/${orderId}`} key={`order-row-${uuidv4()}`} prefetch={false}>
            <Typography className={styles.orderCode}>#{orderId} &nbsp;</Typography>
          </Link>
        </Grid>
        {invoice && invoice.invoiceRequest ? (
          <Grid item xs={7} container justifyContent="flex-end">
            <Typography className={styles.reqOrder}>Đã gửi yêu cầu xuất hóa đơn</Typography>
          </Grid>
        ) : (
          <Grid item xs={7} container justifyContent="flex-end">
            <Typography className={styles.timeOrder}>Không gửi yêu cầu xuất hóa đơn</Typography>
          </Grid>
        )}
        <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
          <ImageFallbackStatic src={TimeOrderStatus} width={12} height={12} priority />
          <Typography className={styles.timeOrder}>{DateTimeUtils.getFormattedDate(new Date(createdTime), 'HH:mm:ss DD/MM/YYYY')}</Typography>
        </Grid>
        <Grid item xs={6} container>
          <StatusOrder status={status} isMobile={isMobile} saleOrderStatus={saleOrderStatus} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={styles.priceOrder}>{formatCurrency(totalPrice)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={styles.quantityOrder}>
            Sản phẩm <span className={styles.numberBold}>{amount && formatNumber(amount)}</span>- Tổng SL{' '}
            <span className={styles.numberBold}>{totalQuantity && formatNumber(totalQuantity)}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.deliveryDate}>
          {deliveryDate && (
            <Typography>
              Dự kiến giao <span>{DateTimeUtils.getFormattedWithDate(new Date(deliveryDate))}</span>
            </Typography>
          )}
        </Grid>
      </Grid>
    ) : (
      <>
        {/* Column 1 */}
        <Grid item md={3} sm={3} container className={styles.order_code_wrapper}>
          <Typography className={styles.orderCode}>#{orderId} &nbsp;</Typography>
          <Grid item container alignItems="center">
            <ImageFallbackStatic src={TimeOrderStatus} width={12} height={12} priority />
            <Typography className={styles.timeOrder}>{DateTimeUtils.getFormattedDate(new Date(createdTime), 'HH:mm:ss DD/MM/YYYY')}</Typography>
          </Grid>
          {invoice && invoice.invoiceRequest ? (
            <Typography className={styles.reqOrder}>Đã gửi yêu cầu xuất hóa đơn</Typography>
          ) : (
            <Typography className={styles.timeOrder}>Không gửi yêu cầu xuất hóa đơn</Typography>
          )}
        </Grid>
        {/* Column 2 */}
        <Grid item className={styles.order_code_wrapper} md={2} sm={3} container alignContent="flex-start">
          <Typography className={styles.priceOrder}>{formatCurrency(totalPrice)}</Typography>
          <Grid item container>
            <Typography className={styles.quantityOrder}>
              Sản phẩm <span className={styles.numberBold}>{amount && formatNumber(amount)}</span>- Tổng SL{' '}
              <span className={styles.numberBold}>{totalQuantity && formatNumber(totalQuantity)}</span>
            </Typography>
          </Grid>
          {redeemCode && redeemCode.length > 0 && (
            <div className={styles.redeemCode}>
              <ImageFallbackStatic src={TICKET_PROMO_ICON} width={12} height={12} /> <span style={{ marginLeft: 4 }}>{redeemCode[0]}</span>
            </div>
          )}
        </Grid>
        {/* Column 3 */}
        <Grid item className={styles.order_time_wrapper} md={2} sm={3} container alignContent="flex-start">
          <StatusOrder status={status} saleOrderStatus={saleOrderStatus} />
          <Grid item container className={styles.deliveryDate}>
            {deliveryDate && (
              <Typography>
                Dự kiến giao <span>{DateTimeUtils.getFormattedWithDate(new Date(deliveryDate))}</span>
              </Typography>
            )}
          </Grid>
        </Grid>
      </>
    )}
  </>
);

const MINUTES_30 = 1800000;

const STATUS_ORDER_GET_INVOICE = [
  ENUM_ORDER_STATUS.DELIVERED,
  ENUM_ORDER_STATUS.DELIVERING,
  ENUM_ORDER_STATUS.CANCEL,
  ENUM_ORDER_STATUS.WAIT_TO_DELIVER,
  ENUM_ORDER_STATUS.COMPLETED,
];

const OrderRow = ({
  orderId,
  orderCode,
  createdTime,
  deliveryDate,
  customerName,
  customerPhone,
  customerId,
  customerCode,
  status,
  totalPrice,
  bankInfo,
  reasonsList,
  totalItem: amount,
  totalQuantity,
  invoiceInfo,
  invoice,
  redeemCode = [],
  isMobile = false,
  hasDeal = false,
  hasCampaign = false,
  isAndroid = false,
  isTablet = false,
  saleOrderStatus,
  clearSelected,
  setSelectedInvoices,
  isSelectedInvoices,
}) => {
  const router = useRouter();
  const validateFeature = useStore((state) => state.validateFeature);
  const [orderTicket, setOrderTicket] = useState({});
  const [open, toggleOpen] = useModal();
  const [openCancelOrder, toggleOpenCancelOrder] = useModal();
  // const { invoices = [] } = invoiceInfo || {};
  const [invoices, setInvoices] = useState(invoiceInfo?.invoices || []);
  const [invoiceFees, setInvoiceFees] = useState([]);

  useEffect(async () => {
    const callInvoices = [];
    // đơn ở trạng thái hoàn tất mới có hđ phí người bán - người mua
    // apo-1080 chờ tháng 3/2023 mới có đơn có hđ phí người bán - người mua => tạm off trên prd
    if (status === ENUM_ORDER_STATUS.COMPLETED && validateFeature('INVOICE_BUYER_FEE')) {
      callInvoices.push(OrderService.getOrderInvoiceFee({ orderId }).then((invoiceFeeData) => setInvoiceFees(invoiceFeeData)));
    }
    if ((!invoices || invoices?.length === 0) && STATUS_ORDER_GET_INVOICE.indexOf(status) >= 0) {
      callInvoices.push(OrderClient.getInvoicesByOrderId({ orderId }).then((invoicesRes) => setInvoices(getFirst(invoicesRes)?.invoices || [])));
    }
    await Promise.all(callInvoices);
  }, [orderId]);

  const countInvoice = [];
  let tooltipText = 'Đơn hàng có sản phẩm khuyến mãi không thể chỉnh sửa được';

  const checkCanShowEditButton = () =>
    // ẩn nút 'Sửa đơn' nếu đơn hàng ở các trạng thái Đã hủy, Đã giao, Hoàn tất
    status !== ENUM_ORDER_STATUS.DELIVERED && status !== ENUM_ORDER_STATUS.CANCEL && status !== ENUM_ORDER_STATUS.COMPLETED;

  const checkCanEdit = () => {
    if (hasDeal || hasCampaign) {
      return false;
    }
    const isEditStatus = status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM && +new Date() - +new Date(createdTime) <= MINUTES_30;
    tooltipText = 'Đơn hàng quá thời gian cho phép sửa đơn (30 phút)';
    return isEditStatus;
  };

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
  const anchorRef = useRef(null);
  const [openInvoicsList, setOpenInvoiceList] = useState(false);

  // improve popup giấy tờ - APO-855
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedInvoices({ orderId });
  };
  const handleCloseInvoice = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    // setOpenInvoiceList(false);
    clearSelected();
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openInvoicsList);
  useEffect(() => {
    if (prevOpen.current === true && openInvoicsList === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openInvoicsList;
  }, [openInvoicsList]);

  const handleListKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // setOpenInvoiceList(false);
      clearSelected();
    }
  };
  // total invoice
  invoices.forEach((value) => {
    value?.invoiceData?.forEach((item) => {
      if (item?.pdfUrl) countInvoice.push(item?.pdfUrl);
    });
  });
  invoiceFees.forEach((value) => {
    value?.invoiceData?.forEach((item) => {
      if (item?.pdfUrl) countInvoice.push(item?.pdfUrl);
    });
  });

  // improve popup giấy tờ - APO-855
  useEffect(() => {
    setOpenInvoiceList(!!isSelectedInvoices);
  }, [isSelectedInvoices]);

  return (
    <Grid container style={{ position: 'relative', zIndex: '0' }}>
      <LinkComp href={`${MY_ORDER_URL}/${orderId}`} prefetch={false} className={styles.w_100}>
        <Grid container item xs={12} direction="row" className={styles.wrapOrderList} style={{ paddingLeft: isAndroid && '10px' }}>
          <RowInfo
            isMobile={isMobile}
            orderId={orderId}
            createdTime={createdTime}
            invoice={invoice}
            amount={amount}
            deliveryDate={deliveryDate}
            redeemCode={redeemCode}
            status={status}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            saleOrderStatus={saleOrderStatus}
          />
          <Grid item className={styles.order_btn_wrapper} md={5} container>
            <Grid container alignItems="center" justifyContent="flex-end" className={styles.groupBtn}>
              {checkCanShowEditButton() && (
                <>
                  {checkCanEdit() ? (
                    <span style={{ marginRight: 10 }}>
                      <EditOrderButton orderId={orderId} canEdit btnStyle btnText="Sửa đơn" />
                    </span>
                  ) : (
                    <Tooltip title={tooltipText} arrow>
                      <span style={{ marginRight: 10 }}>
                        <EditOrderButton orderId={orderId} btnStyle btnText="Sửa đơn" />
                      </span>
                    </Tooltip>
                  )}
                </>
              )}
              <Button
                className={`${openInvoicsList ? `${styles.btnData} + ${styles.btnActive}` : styles.btnData}`}
                onClick={handleToggle}
                ref={anchorRef}
                aria-haspopup="true"
                aria-controls={openInvoicsList ? 'menu-list-grow' : undefined}
              >
                {`Giấy tờ (${countInvoice.length === 0 ? 1 : countInvoice.length + 1})`}
                <ExpandMoreIcon className={styles.btnIcon} />
              </Button>

              <ButtonSendTicketV2
                isMobile={isMobile}
                isTablet={isTablet}
                className={styles.btnOrder}
                handleChangeOrderTicket={handleChangeOrderTicket}
                handleOpenModal={toggleOpen}
                order={{
                  orderId,
                  orderCode,
                  orderTime: createdTime,
                  deliveryDate,
                  name: customerName,
                  phone: customerPhone,
                  orderStatus: status,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </LinkComp>
      <Popper open={openInvoicsList} anchorEl={anchorRef.current} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'left center' : 'center bottom',
              position: 'relative',
              zIndex: '999999',
              border: '1px solid #E9E9E9',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Paper className={styles.Paper}>
              <ClickAwayListener onClickAway={handleCloseInvoice}>
                <MenuList autoFocusItem={openInvoicsList} onKeyDown={handleListKeyDown} id="menu-list-grow" className={styles.invoiceList}>
                  <Grid container item xs={12} justifyContent="flex-end" style={{ padding: '0px 10px' }}>
                    <CancelOutlinedIcon className={styles.iconCancel} onClick={handleCloseInvoice} />
                  </Grid>
                  <Grid container item xs={12} style={{ padding: '0px 16px' }} alignItems="center" justifyContent="space-between">
                    <Typography className={styles.data}>Giấy tờ</Typography>
                    <Typography className={styles.desInvoice}>{`${countInvoice.length + 1} tệp`}</Typography>
                  </Grid>
                  <Divider />
                  {invoiceFees.length > 0 &&
                    invoiceFees.map((data) => <ExportInvoice key={data?.code} data={data} className={styles.invoiceData} isFee />)}
                  {invoices?.map((invoiceData) => (
                    <ExportInvoice key={uuidv4()} data={invoiceData} className={styles.invoiceData} />
                  ))}
                  {countInvoice.length + 1 > 1 && (
                    <Grid item xs={12} className="item-divider">
                      <Divider />
                    </Grid>
                  )}

                  <MenuItem className={styles.items}>
                    <ExportDataOrderV2 orderId={orderId} className={styles.exportXLSX} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
    </Grid>
  );
};

export default OrderRow;
