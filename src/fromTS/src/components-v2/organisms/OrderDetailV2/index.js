import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { getData, isValidWithoutData, TicketClient } from 'clients';
import clsx from 'clsx';
import ButtonEditOrderV2 from 'components-v2/mocules/ButtonEditOrderV2';
import ButtonReOrderV2 from 'components-v2/mocules/ButtonReOrderV2';
import CountDownEdit30Minutes from 'components-v2/mocules/CountDownEdit30Minutes';
import OrderDetailProductV2 from 'components-v2/mocules/OrderDetailProductV2';
import TicketFormModalV2 from 'components-v2/mocules/TicketFormModalV2';
import { LinkComp } from 'components/atoms';
import { PrintInvoiceButton } from 'components/mocules';
import { settingsTicket } from 'constants/data';
import { ENUM_ORDER_STATUS, ENUM_ORDER_STATUS_COLOR_V2, ENUM_ORDER_STATUS_LABEL } from 'constants/Enums';
import { ICON_ARROW_RIGHT_DETAILV2, ICON_FEEBACK_DETAILV2, ICON_RETURN_DETAILV2 } from 'constants/Icons';
import { MY_ORDER_URL, PATH_INFO_BILL } from 'constants/Paths';
import { useModal } from 'hooks';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ACCESS_TOKEN, RETURN_ORDER_DOMAIN, RETURN_ORDER_DOMAIN_TICKETID } from 'sysconfig';
import { DateTimeUtils, NotifyUtils } from 'utils';
import { remainTime } from 'utils/calculateTimeLeft';
import { v4 as uuidv4 } from 'uuid';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import OrderDetailContent from './OrderDetailContent';
import OrderDetailStep from './OrderDetailStep';
import OrderInvoiceDetail from './OrderInvoiceDetail';
// import InvoiceList from '../InvoiceList';
import styles from './styles.module.css';

const isShowInvoice = false;
const HIDE_EDIT_BTN_STATUS = [ENUM_ORDER_STATUS.DELIVERED, ENUM_ORDER_STATUS.CANCEL, ENUM_ORDER_STATUS.COMPLETED];

const OrderDetailV2 = ({ order, user, bankInfo, listInvoiceInfo, logs, invoiceFee = [] }) => {
  const router = useRouter();
  const {
    orderId,
    canEdit,
    createdTime,
    orderCode,
    customerName,
    customerPhone,
    status,
    deliveryDate,
    customerId,
    customerCode,
    completedTime,
    hasCampaign,
    hasDeal,
    orderItems = [],
  } = order;

  const checkTime30days = completedTime !== 0 && remainTime(+new Date(), +new Date(completedTime)) >= 30;
  const [orderTicket, setOrderTicket] = useState({});
  const [ticketReturn, setTicketReturn] = useState([]);
  const [openTicket, toggleOpenTicket] = useModal();
  const ref = useRef({});

  const caculate30minutes = (time) => {
    const today = new Date();
    const createTime = DateTimeUtils.addHours(new Date(time));
    const diffMs = today - createTime;
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    const remainTimes = 30 - diffMins;
    return remainTimes;
  };

  // promotion ctkm

  const { getPromoLists } = useGetTagPromotion();

  useEffect(() => {
    const dataSku = [];
    orderItems?.forEach((item) => dataSku.push(item?.sku));
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ skus: [...dataSku], getVoucherInfo: false, signal });

    return () => controller.abort();
  }, [orderItems]);
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

  const statusOrder = (statusRender) => {
    const background = ENUM_ORDER_STATUS_COLOR_V2[statusRender];
    return background ? <Box style={{ backgroundColor: background }} className={styles.statusDot} /> : null;
  };

  const RenderStatus = ({ status: statusRender, saleOrderStatus }) => {
    // nếu delivering & saleOrderStastus === tránporting => transporting
    const statusOrderCombined =
      statusRender === ENUM_ORDER_STATUS.DELIVERING && saleOrderStatus === ENUM_ORDER_STATUS.TRANSPORTING
        ? ENUM_ORDER_STATUS.TRANSPORTING
        : statusRender;
    return (
      <Grid container alignItems="center">
        {statusOrder(statusRender)}
        <Typography className={styles.statusTitle}>{ENUM_ORDER_STATUS_LABEL[statusOrderCombined]}</Typography>
        {canEdit && <CountDownEdit30Minutes minutes={caculate30minutes(createdTime)} />}
      </Grid>
    );
  };
  // {
  //   orderId,
  //   orderCode,
  //   orderTime: createdTime,
  //   deliveryDate,
  //   name: customerName,
  //   phone: customerPhone,
  //   orderStatus: status,
  // }
  // y/c trả

  const token = Cookies.get(ACCESS_TOKEN);
  const handleRedirectPOS = async () => {
    const statusRes = await TicketClient.getVerifyTickerReturn(orderId);
    if (isValidWithoutData(statusRes)) {
      router.push(`${RETURN_ORDER_DOMAIN}?token=${token}&orderId=${orderId}`);
    } else {
      NotifyUtils.error('Bạn đã nhập kho đơn hàng thành công nên không thể tạo yêu cầu. Vui lòng liên hệ CS để được hỗ trợ!');
    }
  };

  const returnOrderRes = useCallback(async () => {
    const res = await TicketClient.getTicketReturn(orderId);
    setTicketReturn(getData(res));
  }, [orderId]);
  useEffect(() => {
    returnOrderRes();
  }, []);
  const handleChangeOrderTicket = (value) => {
    setOrderTicket(value);
  };
  const handleClickAction = (id) => {
    if (id === 1) {
      toggleOpenTicket();
      handleChangeOrderTicket({
        orderId,
        orderCode,
        orderTime: createdTime,
        deliveryDate,
        name: customerName,
        phone: customerPhone,
        orderStatus: status,
      });
    }
    if (id === 2) {
      handleRedirectPOS();
    }
    return null;
  };

  const handleEditOrderTooltip = () => {
    let title = 'Chỉnh sửa đơn hàng';

    if (!canEdit) {
      title = 'Đơn hàng quá thời gian cho phép sửa đơn (30 phút)';
    }

    if (hasCampaign || hasDeal) {
      title = 'Đơn hàng có sản phẩm khuyến mãi không thể chỉnh sửa được';
    }

    return title;
  };

  return (
    <Grid container>
      <Grid item xs={12} className={styles.comeback}>
        <Link href={MY_ORDER_URL} prefetch={false}>
          &lt;&lt; Quay lại đơn hàng của tôi
        </Link>
      </Grid>
      <Grid container spacing={1} alignItems="stretch">
        {/* Left */}
        <Grid item md={7} sm={12}>
          <Paper variant="outlined" className={styles.wrapLeftOrder}>
            <Grid item xs={12} container justifyContent="space-between">
              <Typography className={styles.orderID}>Đơn hàng #{order.orderId}</Typography>
              <Grid item xs={7} direction="row" container justifyContent="flex-end" alignItems="center">
                {/* <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      className={styles.Grow}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                            {mapActionData({ className: styles.btnReturn, orderId, V2style: true }).map((item) => (
                              <div key={item.id}>
                                <MenuItem
                                  style={{
                                    display:
                                      item.id === 2 && status !== ENUM_ORDER_STATUS.DELIVERED && status !== ENUM_ORDER_STATUS.COMPLETED ? 'none' : '',
                                  }}
                                  disabled={item.id === 2 && (status === ENUM_ORDER_STATUS.DELIVERED ? false : checkTime30days)}
                                >
                                  <Button
                                    disableRipple
                                    className={styles.wrapMoreAction}
                                    onClick={() => handleClickAction(item.id)}
                                    disabled={item.id === 2 && status === ENUM_ORDER_STATUS.DELIVERED ? false : checkTime30days}
                                  >
                                    <div style={{ display: 'flex' }}>{item.icon}</div>
                                    <div>{item.content}</div>
                                  </Button>
                                </MenuItem>
                              </div>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper> */}
              </Grid>
            </Grid>
            <Grid container item xs={12} direction="row" style={{ marginTop: '8px' }}>
              <RenderStatus status={order?.status} saleOrderStatus={order?.saleOrderStatus} />
            </Grid>
            {/* Improve new ui - APO-885 */}
            <Grid container item xs={12} direction="row" className={styles.container_btn_action}>
              {/* ẩn nút 'Sửa đơn' nếu đơn hàng ở các trạng thái Đã hủy, Đã giao, Hoàn tất */}
              {!HIDE_EDIT_BTN_STATUS.includes(status) && (
                <ButtonEditOrderV2
                  orderId={orderId}
                  canEdit={canEdit}
                  handleEditOrderTooltip={handleEditOrderTooltip}
                  className={styles.btn_action_order}
                />
              )}
              <ButtonReOrderV2 orderId={orderId} className={styles.btn_action_order} />
              {[ENUM_ORDER_STATUS.DELIVERED, ENUM_ORDER_STATUS.COMPLETED].includes(status) && (
                <Button
                  startIcon={<ICON_RETURN_DETAILV2 />}
                  className={clsx(styles.btn_action_order, status === ENUM_ORDER_STATUS.DELIVERED ? false : checkTime30days && styles.disabled_btn)}
                  onClick={() => handleClickAction(2)}
                  disabled={status === ENUM_ORDER_STATUS.DELIVERED ? false : checkTime30days}
                >
                  Trả hàng
                </Button>
              )}
              <Button startIcon={<ICON_FEEBACK_DETAILV2 />} className={styles.btn_action_order} onClick={() => handleClickAction(1)}>
                Phản hồi
              </Button>
            </Grid>
            <Grid container style={{ marginTop: '25px' }}>
              <OrderDetailContent order={order} />
            </Grid>
          </Paper>
        </Grid>
        {/* Right */}
        <Grid item md={5} sm={12}>
          <Paper variant="outlined" className={styles.wrapRightOrder}>
            <OrderDetailStep order={order} logs={logs} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container xs={12} item style={{ marginTop: '16px', height: '150px' }} className={ticketReturn.length <= 0 ? styles.hiddenWrapTicket : ''}>
        <Paper variant="outlined" className={styles.ticketReturn}>
          <Grid container justifyContent="space-between">
            <Typography className={styles.ticket_return_title}>Phiếu yêu cầu trả</Typography>
            {ticketReturn.length > 0 && <Typography className={styles.ticket_number_text}>{ticketReturn?.length} Phiếu Yêu Cầu</Typography>}
          </Grid>
          <Grid container item xs={12} className={styles.ticket}>
            <Slider ref={ref} {...settingsTicket} className={clsx(styles.wrapSlider, ticketReturn?.length > 3 && styles.slider_items)}>
              {ticketReturn?.map((item) => (
                <div className={styles.ticketItem} key={uuidv4()}>
                  <Grid container direction="column" justifyContent="center" style={{ width: '117px' }}>
                    <Typography className={styles.ticket_item_title}>phiếu yêu cầu</Typography>
                    <Typography className={styles.ticketCode}>{item.ticketId}</Typography>
                  </Grid>
                  <div role="presentation" className={styles.hover_green}>
                    <LinkComp href={`${RETURN_ORDER_DOMAIN_TICKETID}?ticketId=${item.ticketId}&token=${token}`}>
                      <ICON_ARROW_RIGHT_DETAILV2 />
                    </LinkComp>
                  </div>
                </div>
              ))}
            </Slider>
          </Grid>
        </Paper>
      </Grid>
      <Grid className={clsx(styles.table_wrapper)} item xs={12}>
        <OrderInvoiceDetail invoiceFee={invoiceFee} order={order} listInvoiceInfo={listInvoiceInfo} products={order?.products || []} />
      </Grid>
      {isShowInvoice && <PrintInvoiceEle />}
      <Grid className={styles.table_wrapper} item xs={12}>
        <OrderDetailProductV2
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
          bankInfo={bankInfo}
          {...order}
        />
      </Grid>
      {openTicket && (
        <TicketFormModalV2
          {...orderTicket}
          bankInfo={bankInfo}
          customerId={customerId}
          customerCode={customerCode}
          visible={openTicket}
          onClose={toggleOpenTicket}
          ticketType="ORDER"
        />
      )}
      <Grid item xs={12} className={styles.comeback} style={{ marginTop: '25px' }}>
        <Link href={MY_ORDER_URL} prefetch={false}>
          &lt;&lt; Quay lại đơn hàng của tôi
        </Link>
      </Grid>
    </Grid>
  );
};

export default OrderDetailV2;
