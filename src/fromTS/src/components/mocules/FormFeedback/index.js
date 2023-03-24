import { Grid, NativeSelect, TextField, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { isValid, TicketClient } from 'clients';
import { Button, InfoFormControl } from 'components/atoms';
import { useModal } from 'hooks';
import { useState } from 'react';
import { gtag } from 'utils';
// import NotifyUtils from 'utils/NotifyUtils';
import DateTimeUtils from 'utils/DateTimeUtils';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import NewCustomModal from '../NewCustomModal';
import OrderStatusButton from '../OrderInfoTabs/OrderStatusButton';
import UploadImages from '../UploadImages';
import styles from './style.module.css';
import validateForm from './validateForm';

const FormFeedback = ({ reasonsList, order, id }) => {
  const firstReason = reasonsList.length !== 0 ? reasonsList[0].value : '';
  const [reason, setReason] = useState(firstReason);
  const [val, setVal] = useState({
    bankCode: null,
    bankName: '',
    bankBranch: '',
    bankAccountName: '',
    feedbackContent: '',
    imageUrls: [],
  });
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleOnChangeReason = (e) => {
    setReason(e.target.value);
  };

  const [showModal, toggle] = useModal(false);
  const [showModalError, toggleModalError] = useModal(false);
  const [message, setMessage] = useState('');
  const onSubmit = async () => {
    const data = {
      ...val,
      orderCode: order.orderCode,
      customerID: order.customerId,
      customerId: order.customerId,
      phone: order.customerPhoneRaw,
      customerCode: order.customerCode,
      saleOrderCode: order.orderCode,
      saleOrderID: order.orderId,
      orderId: order.orderId,
      reasons: [reason],
      reasonCodes: [reason],
      type: 'ORDER',
      source: 'WEB',
      page: 'phanhoi',
    };
    try {
      validateForm(data);
      const feedbackResult = await TicketClient.createFeedbackWithoutLogin(data);
      if (!isValid(feedbackResult)) {
        setMessage(feedbackResult.message || 'Gửi phản hồi thất bại');
        toggleModalError();
        return;
      }
      setMessage('Gửi phản hồi thành công');
      gtag.sendFeedback();

      toggle();
      // throw new Error(feedbackResult.message || 'Gửi phản hồi thất bại');
      // NotifyUtils.success('Gửi phản hồi thành công');
      // clear
      setVal({ bankCode: '', bankName: '', bankBranch: '', bankAccountName: '', feedbackContent: '', imageUrls: [] });
    } catch (error) {
      // NotifyUtils.error(error.message);
      setMessage(error.message);
      toggleModalError();
    }
  };

  const handleOnChangeImages = (imgs) => {
    setVal({ ...val, imageUrls: imgs });
  };
  if (!id) {
    return <></>;
  }
  return order?.isValid ? (
    <>
      <div className={styles.wrap}>
        <div className={styles.info_group}>
          <Grid item xs={12} md={6} className={styles.text_body}>
            <span className={styles.label}>Mã đơn hàng: </span>
            <span className={styles.value}>{order.orderId}</span> <OrderStatusButton status={order.status} />
          </Grid>

          <Grid item xs={12} md={6} className={styles.text_body}>
            <span className={styles.label}>Số điện thoại: </span>
            <span className={styles.value}>{order.customerPhone}</span>
          </Grid>
          <Grid item xs={12} md={6} className={styles.text_body}>
            <span className={styles.label}>Ngày đặt hàng: </span>
            <span className={styles.value}>{DateTimeUtils.getFormattedWithDate(new Date(order.createdTime))}</span>
          </Grid>
        </div>
      </div>
      <div className={styles.feedback_order}>
        <Grid container className={styles.container}>
          <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
            <InfoFormControl xs={12} md={6} label="Lý do phản hồi" isRequired>
              <NativeSelect
                input={<InfoInput />}
                IconComponent={ExpandMore}
                value={reason}
                onChange={handleOnChangeReason}
                className={styles.reason_select}
              >
                {reasonsList.map((reasonE) => (
                  <option key={`key-reason-${uuidv4()}`} value={reasonE.code}>
                    {reasonE.name}
                  </option>
                ))}
              </NativeSelect>
            </InfoFormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl xs={12} md={6} label="Tên chủ tài khoản" htmlFor="bankAccountName">
              <InfoInput
                id="bankAccountName"
                placeholder="Nhập tên chủ tài khoản"
                value={val.bankAccountName}
                onChange={(e) => handleChangeValue('bankAccountName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Số tài khoản" htmlFor="bankCode">
              <InfoInput
                type="number"
                id="bankCode"
                placeholder="Nhập số tài khoản"
                value={val.bankCode}
                onChange={(e) => handleChangeValue('bankCode', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Ngân hàng" htmlFor="bankName">
              <InfoInput
                id="bankName"
                placeholder="Nhập tên ngân hàng"
                value={val.bankName}
                onChange={(e) => handleChangeValue('bankName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Chi nhánh" htmlFor="bankBranch">
              <InfoInput
                id="bankBranch"
                placeholder="Nhập tên chi nhánh"
                value={val.bankBranch}
                onChange={(e) => handleChangeValue('bankBranch', e.target.value)}
              />
            </InfoFormControl>
          </Grid>
          <Grid className={styles.textarea} item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl label="Nội dung phản hồi" xs={12} isRequired htmlFor="description">
              <br />
              <TextField
                id="feedbackContent"
                multiline
                minRows={4}
                variant="outlined"
                placeholder="Mời nhập nội dung phản hồi"
                value={val.feedbackContent}
                onChange={(e) => handleChangeValue('feedbackContent', e.target.value)}
                style={{ background: '#fff' }}
              />
            </InfoFormControl>
          </Grid>
          <Grid className={styles.imagesField} item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl label="Hình ảnh minh họa" xs={12} className={styles.customText} />
            <br />
            <UploadImages onChange={handleOnChangeImages} />
          </Grid>
          <Grid className={styles.textarea} item container justifyContent="center" xs={12} md={2} spacing={1} style={{ marginLeft: 'auto' }}>
            <Button className="payment_button" onClick={onSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
        <NewCustomModal
          visible={showModal}
          onClose={toggle}
          title="Thông báo"
          content={message}
          btnOk="Đóng"
          onClickOk={() => window.location.reload()}
        />

        <NewCustomModal
          visible={showModalError}
          onClose={toggleModalError}
          title="Thông báo"
          icon="!"
          content={message}
          btnOk="Đóng"
          onClickOk={() => {}}
        />
      </div>
    </>
  ) : (
    <Typography>Không có đơn hàng</Typography>
  );
};

export default FormFeedback;
