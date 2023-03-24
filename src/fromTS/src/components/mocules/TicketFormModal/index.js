import { Card, CardContent, Divider, Grid, NativeSelect, TextField, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { getFirst, isValid, TicketClient } from 'clients';
import PasswordWarningText from 'components-v2/atoms/PasswordWarningText';
import { Button, InfoFormControl, LinkComp, Modal } from 'components/atoms';
import { EnumsTicket, ENUM_ORDER_STATUS_LABEL, TYPE_CUSTOMER_BY_COLOR } from 'constants/Enums';
import { MY_ACCOUNT } from 'constants/Paths';
import { useAuth, useSetting } from 'context';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { OrderService } from 'services';
import { REASON_VOUCHER_BIRTHDAY } from 'sysconfig';
import { gtag } from 'utils';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import SearchProduct from '../SearchProduct';
import UploadImages from '../UploadImages';
import styles from './style.module.css';
import validateForm from './validateForm';

const TicketFormModal = (props) => {
  const {
    visible,
    onClose,
    orderId = 0,
    productName,
    productId,
    sku,
    orderCode,
    customerCode,
    customerId,
    ticketType = 'ORDER',
    user = null,
    reloadFunc,
    optionSelected,
    handleCancelRequestOrder,
    status: statusOrder,
  } = props;
  const [curType, setCurType] = useState(ticketType);

  const { customerInfo, handleRedCustomer } = useAuth();
  const { reasonsTicket, provinces } = useSetting();
  const reasonsByType = reasonsTicket?.filter((item) => item.status === 'ACTIVE' && item.ticketType === curType) || [];

  const listTicketTypes = customerInfo.isActive ? EnumsTicket.TicketTypes : EnumsTicket.TicketTypesNotActive;

  const [listReasons, setListReasons] = useState(reasonsByType);
  const [curReason, setCurReason] = useState(
    (optionSelected && reasonsByType.find((item) => item.code === optionSelected)) || (reasonsByType && reasonsByType[0]) || null,
  );

  const [orderDetail, setOrderDetail] = useState({});

  const handleChangeType = (e) => {
    const ticketTypeSelected = e.target.value;
    setCurType(ticketTypeSelected);
  };

  useEffect(() => {
    let reasons = reasonsTicket?.filter((item) => item.status === 'ACTIVE' && item.ticketType === curType) || [];
    if (orderDetail) {
      const { status } = orderDetail;
      if (status) {
        reasons = reasons.filter((item) => item && (item?.orderStatuses === null || item?.orderStatuses?.indexOf(status) >= 0));
      }
    }

    setListReasons(reasons);
    setCurReason((optionSelected && reasonsByType.find((item) => item.code === optionSelected)) || reasons[0] || null);
  }, [curType, orderDetail, reasonsTicket]);

  // const [reason, setReason] = useState(curReason?.name);

  const [val, setVal] = useState({
    bankCode: customerInfo?.bank?.bankCode || '',
    bankName: customerInfo?.bank?.bankName || '',
    bankBranch: customerInfo?.bank?.bankBranch || '',
    bankAccountName: customerInfo?.bank?.bankAccountName || '',
    bankAccountCode: customerInfo?.bank?.code || '',
    feedbackContent: '',
    imageUrls: [],
    productId,
    orderId,
    sku,
    productName,
    phone: user?.phone || customerInfo?.phone || '',
    email: user?.email || customerInfo?.email || '',
    ticketType: curType,
    isDisableSubmit: false,
  });

  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const disableSubmit = () => {
    handleChangeValue('isDisableSubmit', true);
  };
  const [productSearch, setProductSearch] = useState(null);

  const handleLoadOrderDetail = useCallback(
    async (id) => {
      // handleChangeValue('orderId', id);
      if (id) {
        if ([EnumsTicket.TicketEnums.ORDER, EnumsTicket.TicketEnums.PRODUCT].indexOf(curType) >= 0) {
          const orderResult = await OrderService.getOrderById({ orderId: id });
          setOrderDetail(getFirst(orderResult));
          if (!isValid(orderResult)) {
            NotifyUtils.error('Mã đơn hàng không đúng hoặc không tồn tại');
          }
        }
      }
    },
    [curType],
  );

  const handleChangeOrderId = (orderIdCur) => {
    try {
      // const orderIdCur = parseInt(id, 10);
      if (orderIdCur) {
        handleLoadOrderDetail(orderIdCur);
      }
      handleChangeValue('orderId', Number(orderIdCur));
    } catch (error) {
      NotifyUtils.warn('Mã đơn hàng không đúng định dạng');
    }
  };

  useEffect(() => {
    handleLoadOrderDetail(val.orderId);
  }, [handleLoadOrderDetail, val.orderId]);

  const handleOnChangeReason = (e) => {
    const reasonCode = e.target.value;
    const reason = reasonsByType.find((item) => item.code === reasonCode);
    setCurReason(reason);
  };

  const handleSearchProduct = (product) => {
    handleChangeValue('productName', product?.product?.name);
    handleChangeValue('productId', product?.product?.productID);
    handleChangeValue('sku', product?.sku?.code);
    setProductSearch(product);
  };

  // const handleChangeReasons =(reasonId) => {

  // }

  const onSubmit = async () => {
    if (optionSelected) {
      handleCancelRequestOrder();
    }
    if (optionSelected && (statusOrder === 'COMPLETED' || statusOrder === 'DELIVERED' || statusOrder === 'DELIVERING')) {
      onClose();
      return;
    }
    const data = {
      ...val,
      orderCode,
      customerId,
      customerCode,
      reasonName: curReason?.name || '',
      reasonCodes: [curReason?.code || ''],
      type: curType,
      ticketType: curType,
      source: 'WEB',
      orderDetail,
    };
    try {
      // validate form data
      validateForm(data);

      if (data.orderId && orderDetail) {
        data.orderId = Number(data.orderId);
      }

      switch (data.type) {
        case EnumsTicket.TicketEnums.ACCOUNT:
        case EnumsTicket.TicketEnums.OTHER:
          delete data.reasonCodes;
          delete data.orderId;
          delete data.productId;
          delete data.sku;
          break;
        default:
          break;
      }

      if (
        !curReason?.showBankAccount ||
        [EnumsTicket.TicketEnums.ACCOUNT, EnumsTicket.TicketEnums.PRODUCT, EnumsTicket.TicketEnums.OTHER].indexOf(data.ticketType) >= 0
      ) {
        delete data.bankCode;
        delete data.bankName;
        delete data.bankBranch;
        delete data.bankAccountCode;
      }

      const feedbackResult = await TicketClient.createFeedback(data);
      if (!isValid(feedbackResult)) {
        if (feedbackResult?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
          return;
        }
        throw new Error(feedbackResult.message || 'Gửi phản hồi thất bại');
      }
      NotifyUtils.success('Gửi phản hồi thành công');

      // clear
      onClose();
      if (reloadFunc) {
        reloadFunc();
      }
      setVal({});
      gtag.sendFeedback();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const handleOnChangeImages = (imgs = []) => {
    setTimeout(() => {
      setVal({ ...val, isDisableSubmit: false, imageUrls: [...(val?.imageUrls || []), ...imgs] });
    }, 1500);
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.feedback_order}>
        <div className={styles.title}>Gửi yêu cầu hỗ trợ</div>
        <Grid container className={styles.container}>
          <div className={styles.info_group}>
            <Grid item xs={12} md={12} className={styles.text_body}>
              <Typography variant="h5">Xin chào {customerInfo.name}!</Typography>
            </Grid>
          </div>
          <Divider />
          <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
            <InfoFormControl xs={12} md={12} label="Bạn muốn hỗ trợ về vấn đề gì" isRequired>
              <NativeSelect
                input={<InfoInput />}
                IconComponent={ExpandMore}
                value={curType}
                onChange={handleChangeType}
                className={styles.reason_select}
                disabled={ticketType === EnumsTicket.TicketEnums.PRODUCT || !!orderId || !!optionSelected}
              >
                {listTicketTypes?.map((type) => (
                  <option key={`ticket-type-${type}`} value={type}>
                    {EnumsTicket.TicketLabelEnums[type].label}
                  </option>
                ))}
              </NativeSelect>
            </InfoFormControl>
          </Grid>

          {curType === EnumsTicket.TicketEnums.PRODUCT && (
            <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
              <InfoFormControl xs={12} md={12} label="Sản phẩm bạn muốn hỗ trợ là gì" htmlFor="productId" isRequired>
                {productName ? (
                  <InfoInput
                    id="productId"
                    placeholder="Sản phẩm bạn muốn hỗ trợ là gì"
                    defaultValue={productName || ''}
                    disabled={ticketType === 'PRODUCT'}
                  />
                ) : (
                  <>
                    <SearchProduct
                      handleKeyDown={() => {}}
                      onClickItem={handleSearchProduct}
                      id="productId"
                      placeholder="Sản phẩm bạn muốn hỗ trợ là gì"
                    />
                    {productSearch && (
                      <>
                        <Typography variant="subtitle1" style={{ fontWeight: 400, fontSize: '14px' }}>
                          Sản phẩm đang chọn :
                        </Typography>
                        <Alert severity="info" icon={false} style={{ borderRadius: '8px' }}>
                          <Typography variant="body2"> {productSearch?.product?.name || ''}</Typography>
                        </Alert>
                      </>
                    )}
                  </>
                )}
              </InfoFormControl>
            </Grid>
          )}

          {[EnumsTicket.TicketEnums.PRODUCT].indexOf(curType) >= 0 && (
            <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
              <InfoFormControl xs={12} md={12} label=" Nhập mã đơn hàng" htmlFor="orderId">
                <InfoInput
                  id="orderId"
                  placeholder="Nhập mã đơn hàng"
                  type="number"
                  defaultValue={val?.orderId || ''}
                  onBlur={(e) => handleChangeOrderId(e?.target?.value || '')}
                />
              </InfoFormControl>
            </Grid>
          )}

          {[EnumsTicket.TicketEnums.ORDER].indexOf(curType) >= 0 && (
            <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
              <InfoFormControl xs={6} md={6} label="Nhập mã đơn hàng" htmlFor="orderId" isRequired>
                <InfoInput
                  id="orderId"
                  placeholder="Nhập mã đơn hàng"
                  type="number"
                  disabled={!!orderId}
                  defaultValue={val?.orderId || ''}
                  onBlur={(e) => handleChangeOrderId(e?.target?.value || 0)}
                />
              </InfoFormControl>
              <InfoFormControl xs={6} md={6} label="Trạng thái đơn hàng" htmlFor="orderStatus" isRequired>
                <InfoInput
                  id="orderStatus"
                  placeholder="Trạng thái đơn hàng"
                  value={ENUM_ORDER_STATUS_LABEL[orderDetail?.status || orderDetail?.orderStatus || ''] || ''}
                  disabled
                />
              </InfoFormControl>
            </Grid>
          )}

          {[EnumsTicket.TicketEnums.PRODUCT, EnumsTicket.TicketEnums.ACCOUNT, EnumsTicket.TicketEnums.OTHER].indexOf(curType) >= 0 && (
            <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
              <InfoFormControl xs={6} md={6} label="Số điện thoại" htmlFor="phone" isRequired>
                <InfoInput id="phone" placeholder="Số điện thoại" value={val.phone} onChange={(e) => handleChangeValue('phone', e.target.value)} />
              </InfoFormControl>
              <InfoFormControl xs={6} md={6} label="Email" htmlFor="email">
                <InfoInput id="email" placeholder="Email" value={val.email} onChange={(e) => handleChangeValue('email', e.target.value)} />
              </InfoFormControl>
            </Grid>
          )}

          {[EnumsTicket.TicketEnums.PROMOTION].indexOf(curType) >= 0 && (
            <>
              <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
                <InfoFormControl xs={6} md={6} label="Số điện thoại" htmlFor="phone" isRequired>
                  <InfoInput
                    disabled
                    id="phone"
                    placeholder="Số điện thoại"
                    value={val.phone}
                    onChange={(e) => handleChangeValue('phone', e.target.value)}
                  />
                </InfoFormControl>
                <InfoFormControl xs={6} md={6} label="Khu vực của bạn" htmlFor="provine" disabled>
                  <NativeSelect
                    input={<InfoInput />}
                    IconComponent={ExpandMore}
                    value={customerInfo?.provinceCode}
                    className={styles.reason_select}
                    disabled
                  >
                    {provinces?.map((province) => (
                      <option key={`provinces-${uuidv4()}`} value={province.value}>
                        {province.label}
                      </option>
                    ))}
                  </NativeSelect>
                </InfoFormControl>
              </Grid>
              <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
                <InfoFormControl xs={12} md={12} label="Tên nhà thuốc/ Phòng Khám/ Bệnh Viện" htmlFor="scope">
                  <InfoInput id="scope" placeholder="Tên nhà thuốc/ Phòng khám/ Bệnh Viện" value={customerInfo?.businessName || ''} disabled />
                </InfoFormControl>
              </Grid>
            </>
          )}

          {[EnumsTicket.TicketEnums.PRODUCT, EnumsTicket.TicketEnums.ORDER, EnumsTicket.TicketEnums.PROMOTION].indexOf(curType) >= 0 && (
            <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
              <InfoFormControl xs={12} md={12} label="Chọn lý do cần hỗ trợ" isRequired>
                <NativeSelect
                  input={<InfoInput />}
                  IconComponent={ExpandMore}
                  value={curReason?.code}
                  onChange={handleOnChangeReason}
                  className={styles.reason_select}
                  disabled={!!optionSelected}
                >
                  {listReasons?.map((reasonE) => (
                    <option key={`key-reason-${uuidv4()}`} value={reasonE.code}>
                      {reasonE.name}
                    </option>
                  ))}
                </NativeSelect>
              </InfoFormControl>
            </Grid>
          )}

          {curReason?.showBankAccount && [EnumsTicket.TicketEnums.ORDER].indexOf(curType) >= 0 && (
            <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
              <Typography variant="subtitle1" style={{ fontWeight: 500, paddingLeft: '4px' }}>
                Thông tin tài khoản ngân hàng
              </Typography>
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography>Tên chủ tài khoản: {val.bankAccountName}</Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography>Số tài khoản: {val.bankCode}</Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography>Ngân hàng: {val.bankName}</Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography>Chi nhánh: {val.bankBranch}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid container alignContent="flex-start" direction="row" style={{ paddingTop: 5 }}>
                <Typography variant="body2" style={{ fontWeight: 500, paddingTop: 3, paddingLeft: 4 }}>
                  {val?.bankCode ? 'Bạn muốn thay đổi thông tin tài khoản ngân hàng?' : 'Bạn chưa có tài khoản ngân hàng? '}
                </Typography>
                <LinkComp href={`${MY_ACCOUNT}?tab=4`} target="_blank" style={{ color: 'green' }} variant="body2">
                  {val?.bankCode ? 'Nhấn vào đây' : 'Thêm tại đây'}
                </LinkComp>
              </Grid>
            </Grid>
          )}
          {/*  sinh nhật */}
          {REASON_VOUCHER_BIRTHDAY === curReason?.code && (
            <Grid className={styles.imagesField} item xs={12} container justifyContent="space-evenly" spacing={1}>
              <Grid className={styles.imagesField} item xs={12} md={6} lg={6} container justifyContent="space-evenly">
                <InfoFormControl label="Ảnh mặt trước CMND/CCCD/CCCD gắn chip " xs={12} className={styles.customText} isRequired />
                <br />
                <UploadImages onChange={handleOnChangeImages} setLoading={disableSubmit} isOnlyOneImage limit={1} />
              </Grid>
              <Grid className={styles.imagesField} item xs={12} md={6} lg={6} container justifyContent="space-evenly">
                <InfoFormControl label="Ảnh mặt sau CMND/CCCD/CCCD gắn chip " xs={12} className={styles.customText} isRequired />
                <br />
                <UploadImages onChange={handleOnChangeImages} setLoading={disableSubmit} isOnlyOneImage limit={1} />
              </Grid>
              <Typography style={{ color: 'red', fontFamily: 'ggsr', fontSize: '13px' }}>
                *Việc cung cấp hình ảnh CMND/CCCD/CCCD gắn chip nhằm mục đích đối soát thông tin ngày tháng năm sinh (DOB) của khách hàng, không sử
                dụng vào những mục đích khác.
              </Typography>
            </Grid>
          )}
          <Grid className={styles.textarea} item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl label="Nội dung phản hồi" xs={12} htmlFor="description">
              <br />
              <TextField
                id="feedbackContent"
                multiline
                minRows={4}
                variant="outlined"
                placeholder="Mời nhập nội dung phản hồi"
                value={val?.note}
                onChange={(e) => handleChangeValue('feedbackContent', e.target.value)}
                style={{ background: '#fff' }}
              />
            </InfoFormControl>
          </Grid>
          {REASON_VOUCHER_BIRTHDAY !== curReason?.code && (
            <Grid className={styles.imagesField} item xs={12} container justifyContent="space-evenly" spacing={1}>
              <InfoFormControl label="Hình ảnh minh họa" xs={12} className={styles.customText} />
              <br />
              <UploadImages onChange={handleOnChangeImages} setLoading={disableSubmit} />
            </Grid>
          )}
          <div style={{ marginTop: '18px' }}>
            <PasswordWarningText />
          </div>
          <Grid className={styles.textarea} item container justifyContent="center" xs={12} spacing={1}>
            <Button className="payment_button" onClick={onSubmit} disabled={val.isDisableSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

TicketFormModal.propsTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  orderId: PropTypes.number,
  productName: PropTypes.string,
  productId: PropTypes.number,
  phone: PropTypes.string,
  orderTime: PropTypes.string,
  orderCode: PropTypes.string,
  bankInfo: PropTypes.object,
  customerCode: PropTypes.string,
  customerId: PropTypes.number,
  ticketType: PropTypes.string.isRequired,
};

export default TicketFormModal;
