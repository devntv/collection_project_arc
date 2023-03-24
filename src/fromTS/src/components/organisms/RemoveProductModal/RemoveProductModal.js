import { Box, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { ButtonDefaultLogin, Modal } from 'components/atoms';
import { memo } from 'react';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import styles from './style.module.css';

const RemoveProductModal = memo((props) => {
  const { onClose, onRemove, visible, className, restProps, product } = props;
  const { defaultImage, displayPriceFormated } = product || {};

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: 'center' }}>
          {/* <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div> */}
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <div className={styles.modal_content_wrap}>
            <Typography className={styles.modal_content} data-test="modal-remove-product-text">
              Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?
            </Typography>
          </div>
        </div>
        {product && (
          <Card className={styles.remove_item}>
            <div className={styles.remove_item_image}>
              <ImageFallbackProductImage
                className={styles.remove_item_image}
                src={defaultImage && `${defaultImage}?size=200`}
                fallbackSrc={defaultImage}
                width={80}
                height={80}
                alt={product.name && product.name}
              />
            </div>
            <div className={styles.remove_item_content}>
              <div className={styles.remove_item_cart_name}>{product.name && product.name}</div>
              <div className={styles.remove_item_cart_price}>{displayPriceFormated}</div>
            </div>
          </Card>
        )}

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <ButtonDefaultLogin btnType="warning" onClick={onClose} data-test="btn-cancel-del-product-in-cart">
            Không
          </ButtonDefaultLogin>

          {/* Auto focus to remove item */}
          <ButtonDefaultLogin onClick={() => onRemove()} autoFocus data-test="btn-ok-del-product-in-cart">
            Có
          </ButtonDefaultLogin>
        </div>
      </Box>
    </Modal>
  );
});

export default RemoveProductModal;
