import { Grid, NativeSelect, TextField } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { isValid, TicketClient } from 'clients';
import { Button, InfoFormControl } from 'components/atoms';
import { EnumsTicket } from 'constants/Enums';
import { useState } from 'react';
import { gtag, NotifyUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import UploadImages from '../UploadImages';
import styles from './style.module.css';
import validateForm from './validateForm';

/*
Form feed back account -> no authen 
*/

const FormFeedbackAccount = () => {
  const [val, setVal] = useState({
    phone: '',
    email: '',
    fullName: '',
    feedbackContent: '',
    imageUrls: [],
  });
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  // const [showModal, toggle] = useModal(false);
  // const [showModalError, toggleModalError] = useModal(false);
  // const [message, setMessage] = useState('');
  const onSubmit = async () => {
    const data = {
      ...val,
      type: 'ACCOUNT',
      source: 'WEB',
      page: 'phanhoi',
    };
    try {
      validateForm(data);
      const feedbackResult = await TicketClient.createFeedbackWithoutLogin(data);
      if (!isValid(feedbackResult)) {
        // setMessage(feedbackResult.message || 'Gửi phản hồi thất bại');
        // toggleModalError();
        NotifyUtils.error(feedbackResult.message || 'Gửi phản hồi thất bại');
        return;
      }
      // setMessage('Gửi phản hồi thành công');
      // toggle();
      gtag.sendFeedback();
      NotifyUtils.success('Gửi phản hồi thành công');
      setVal({ feedbackContent: '', phone: '', email: '', imageUrls: [] });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      NotifyUtils.error(error.message);
      // setMessage(error.message);
      // toggleModalError();
    }
  };

  const handleOnChangeImages = (imgs) => {
    setVal({ ...val, imageUrls: imgs });
  };

  return (
    <>
      <div className={styles.feedback_order}>
        <Grid container className={styles.container}>
          <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
            <InfoFormControl xs={12} md={12} label="Bạn muốn phản hồi về vấn đề gì" isRequired>
              <NativeSelect input={<InfoInput />} IconComponent={ExpandMore} className={styles.reason_select}>
                {EnumsTicket.TicketTypesPageFeedback.map((item) => (
                  <option key={`key-ticket-type-${uuidv4()}`} value={item}>
                    {EnumsTicket.MapTicketTypeName[item]}
                  </option>
                ))}
              </NativeSelect>
            </InfoFormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl xs={12} md={12} label="Tên của bạn là gì" htmlFor="fullName">
              <InfoInput
                id="fullName"
                placeholder="Nhập tên của bạn"
                value={val.fullName}
                onChange={(e) => handleChangeValue('fullName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Số điện thoại" htmlFor="phone" isRequired>
              <InfoInput
                id="phone"
                placeholder="Nhập số điện thoại"
                value={val.bankCode}
                onChange={(e) => handleChangeValue('phone', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Email của bạn" htmlFor="email">
              <InfoInput id="email" placeholder="Nhập email" value={val.email} onChange={(e) => handleChangeValue('email', e.target.value)} />
            </InfoFormControl>
          </Grid>
          <Grid className={styles.textarea} item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl label="Nội dung phản hồi" xs={12} htmlFor="description">
              <br />
              <TextField
                id="feedbackContent"
                multiline
                rows={4}
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
            {/* isAuth = false => upload no need authen */}
            <UploadImages onChange={handleOnChangeImages} isAuth={false} />
          </Grid>
          <Grid className={styles.textarea} item container justifyContent="center" xs={12} md={2} spacing={1} style={{ marginLeft: 'auto' }}>
            <Button className="payment_button" onClick={onSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>

        {/* <NewCustomModal
          visible={showModal}
          onClose={() => window.location.reload()}
          title="Thông báo"
          content={message}
          btnOk="Đóng"
          icon={null}
          onClickOk={() => window.location.reload()}
        /> */}

        {/* <NewCustomModal
          visible={showModalError}
          onClose={toggleModalError}
          title="Lỗi!"
          content={message}
          icon="!"
          // btnOk="Đóng"
          btnOnClose="Đóng"
          onClickOk={() => toggleModalError()}
        /> */}
      </div>
    </>
  );
};

export default FormFeedbackAccount;
