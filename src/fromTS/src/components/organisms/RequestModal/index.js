import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { Modal } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { memo } from 'react';
import styles from './styles.module.css';

const RequestModal = memo((props) => {
  const { onClose, visible, className, restProps } = props;

  const onClickReject = () => {
    // eslint-disable-line no-alert
    alert('Bạn phải đồng ý điều khoản thì mới có thể truy cập được website');
  };
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div>
          Sàn giao dịch thương mại điện tử {BRAND_NAME} ("<b>Sàn Giao Dịch</b>") được thiết lập để các thành viên tham gia mua bán sỉ các sản phẩm
          dược phẩm, vật tư y tế, mỹ phẩm và các sản phẩm được phép lưu hành tại Việt Nam. Thành viên tham gia Sàn Giao Dịch là các công ty, tổ chức,
          nhà thuốc, quầy thuốc, phòng khám được cấp quyền phân phối dược phẩm, vật tư y tế và các sản phẩm khác; và phải có người phụ trách chuyên
          môn theo quy định của pháp luật. Các thông tin về giá cả, thông tin sản phẩm thuốc đăng tải lên Sàn Giao Dịch nhằm mục đích cung cấp thông
          tin cho thành viên có quyền mua hàng có thể xác định các đặc tính của hàng hóa để đưa ra quyết định mua. Việc sử dụng thuốc kê đơn hay chữa
          bệnh phải tuyệt đối tuân thủ theo sự hướng dẫn của người có chuyên môn về y dược. Sàn Giao Dịch không chịu trách nhiệm cho bất cứ hậu quả
          nào xảy ra do tự ý dùng thuốc dựa trên các thông tin trên và các trường hợp thành viên mua thuốc cho mục đích tiêu dùng.
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button data-test="request-accepted" onClick={onClose} className={clsx(styles.btn, styles.fill_btn)}>
            Tôi đồng ý
          </Button>
          <Button data-test="request-denied" className={clsx(styles.btn, styles.brown_btn)} onClick={onClickReject}>
            Tôi không đồng ý
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default RequestModal;
