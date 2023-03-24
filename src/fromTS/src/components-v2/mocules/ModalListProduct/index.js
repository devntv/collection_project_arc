import { Button, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from 'components/atoms';
import { ICON_WISHLIST_DEL_V2 } from 'constants/Icons';
import ErrProductCard from '../ErrProductCard';
import styles from './styles.module.css';

function ModalListProduct({
  content = null,
  title = '',
  isShowPopupConfirm = false,
  handleClosePopup,
  handleClick,
  icon = true,
  btnCancelText = '',
  btnOkText = '',
  products = [],
  isMobile = false,
  ...restProps
}) {
  if (isMobile) {
    return (
      <Modal {...restProps} open={isShowPopupConfirm} onClose={handleClosePopup}>
        <div className={styles.modal_mobile_wrapper}>
          <div style={{ textAlign: 'center' }}>
            <Grid container justifyContent="space-between" alignItems="flex-start" style={{ position: 'relative' }}>
              <Grid item xs={11}>
                <Typography align="left" className={styles.text_top_mobile}>
                  Xin vui lòng kiểm tra lại. Trong giỏ hàng có sản phẩm không đủ điều kiện để thanh toán.
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={handleClosePopup} className={styles.btn_ic_close}>
                  <CloseIcon className={styles.icon_close} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container style={{ maxHeight: '373px', overflowY: 'auto' }}>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <Grid item xs={12} key={product?.sku}>
                    <ErrProductCard product={product} />
                    <Divider style={{ width: '100%' }} />
                  </Grid>
                ))}
            </Grid>
          </div>
          <Grid container justifyContent="center" alignItems="center" style={{ width: '100%', marginTop: '20px' }}>
            <IconButton className={styles.btn_ok_mobile} onClick={handleClick}>
              <ICON_WISHLIST_DEL_V2 className={styles.icon_del} />
              Xoá tất cả sản phẩm lỗi
            </IconButton>
          </Grid>
        </div>
      </Modal>
    );
  }

  return (
    <Modal {...restProps} open={isShowPopupConfirm} onClose={handleClosePopup}>
      <div className={styles.modal_wrapper}>
        <div style={{ textAlign: 'center' }}>
          {icon && (
            <div className={styles.warning_icon}>
              <Typography className={styles.text_icon}>!</Typography>
            </div>
          )}
          {title && <Typography className={styles.text_title}>{title}</Typography>}
          {content && <div>{content}</div>}
          {/* <ErrorProductsPayment /> */}
          <Grid container style={{ maxHeight: '373px', overflowY: 'auto' }}>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <Grid item xs={12} key={product?.sku}>
                  <ErrProductCard product={product} />
                  <Divider style={{ width: '100%' }} />
                </Grid>
              ))}
          </Grid>
        </div>
        <Grid container justifyContent="space-between" alignItems="center" style={{ width: '100%', marginTop: '20px' }}>
          <Button className={styles.btn_cancel} onClick={handleClosePopup}>
            {btnCancelText || 'Xem lại'}
          </Button>
          <Button className={styles.btn_ok} onClick={handleClick}>
            {btnOkText || 'Đồng ý'}
          </Button>
        </Grid>
      </div>
    </Modal>
  );
}

export default ModalListProduct;
