import { Divider, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Button, InfoFormControl, Modal } from 'components/atoms';
import { useAuth, useTicket } from 'context';
import { useState } from 'react';
import { formatCurrency } from 'utils/FormatNumber';
import NotifyUtils from 'utils/NotifyUtils';
import InfoInput from '../InfoInput';
import styles from './style.module.css';

const FeedbackPriceFormModal = (props) => {
  const { visible, onClose, productId, sku } = props;
  const { customerInfo } = useAuth();
  const { sendDislikeFeedback } = useTicket();
  const [val, setVal] = useState({
    price: '',
    src: '',
  });

  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleSubmit = async () => {
    if (!val?.price) {
      NotifyUtils.error('Bạn chưa nhập giá tiền');
      return;
    }
    if (val.price <= 0) {
      NotifyUtils.error('Giá tiền phải lớn hơn 0');
      return;
    }
    const isSendFeedback = await sendDislikeFeedback({
      productId,
      sku,
      feedbackContent: `Giá: ${formatCurrency(val.price)} \n Nguồn: ${val.src || 'không đề cập'}`,
    });
    if (isSendFeedback) {
      onClose();
    }
  };
  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.feedback_order}>
        <div className={styles.title}>Gửi ý kiến đóng góp</div>
        <Grid container className={styles.container}>
          <div className={styles.info_group}>
            <Grid item xs={12} className={styles.text_body}>
              <Typography variant="h6">Xin chào {customerInfo.name}! Chúng tôi muốn lắng nghe góp ý từ bạn</Typography>
            </Grid>
          </div>
          <Divider />

          <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl xs={12} label="Giá thấp hơn sàn thuocsi.vn" htmlFor="price" isRequired>
              <InfoInput
                id="price"
                placeholder="Nhập giá (vnđ)"
                type="number"
                value={val.price}
                onChange={(e) => handleChangeValue('price', e?.target?.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} label="Nguồn mua (nơi cung cấp hoặc đường dẫn sản phẩm)" htmlFor="src">
              <InfoInput id="src" placeholder="Nhập nguồn mua" value={val.src || ''} onChange={(e) => handleChangeValue('src', e?.target?.value)} />
            </InfoFormControl>
          </Grid>
          <Grid className={styles.textarea} item container justifyContent="center" xs={12} spacing={1}>
            <Button className={clsx('payment_button', styles.button)} onClick={handleSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default FeedbackPriceFormModal;
