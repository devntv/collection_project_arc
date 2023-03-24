import { Grid, Typography } from '@material-ui/core';
import { ARR_REMOVE_PRODUCT } from 'constants/Enums';
import { ERROR_CART, ERROR_CODE_CART } from 'constants/ErrorCart';
import { useCart } from 'context';
import { useModal } from 'hooks';
import { NotifyUtils } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import ModalListProduct from '../ModalListProduct';
import styles from './styles.module.css';

function ErrProductsWarningCard({ isMobile = false }) {
  const { errProducts = [], removeCartItem, removeImportant, selectCartItem, updateCart } = useCart();
  const [firstProduct] = errProducts;
  const { imagesProxy = [], defaultImage, name = '', errorCode = null, errorMessage = '' } = firstProduct || {};
  const [showConfirmModal, toggleConfirmModal] = useModal();
  const errProductMessage =
    errorCode === ERROR_CODE_CART.REQUIRED_CERTIFICATE ? 'Bạn chưa đủ giấy phép để mua SP này' : ERROR_CART[errorCode] || errorMessage;

  const handleDeleteErrorItem = async () => {
    try {
      await errProducts?.forEach(async (item) => {
        if (ARR_REMOVE_PRODUCT.indexOf(item?.errorCode) >= 0) {
          removeCartItem(item);
        }
        if (item?.errorCode === 'MAX_QUANTITY') {
          if (item?.isImportant) {
            await removeImportant(item);
          }
          selectCartItem({
            ...item,
            isSelected: !item.isSelected,
          });
        }
      });
      await updateCart();
      NotifyUtils.success('Xoá tất cả sản phẩm lỗi thành công');
      toggleConfirmModal();
    } catch (error) {
      NotifyUtils.error(error.message || 'Xoá tất cả sản phẩm lỗi thất bại');
    }
  };

  return (
    <>
      {isMobile && errProducts?.length > 0 && (
        <Grid container justifyContent="center" className={styles.mobile_err_products_wrapper}>
          <Grid item xs={12}>
            <Typography className={styles.text_err_notification}>
              Xin vui lòng kiểm tra lại. Đơn hàng có sản phẩm không đủ điều kiện để thanh toán.
            </Typography>
          </Grid>
          <Grid item container xs={12} style={{ marginTop: '10px' }}>
            <Grid item xs={12} container alignItems="center" className={styles.product_wrapper}>
              <Grid item xs={3} style={{ padding: '10px' }}>
                <div className={styles.img_container}>
                  <ImageFallbackProductImage
                    width={46}
                    height={42}
                    alt="product-img-"
                    fallbackSrc={(imagesProxy && imagesProxy[0]) || defaultImage}
                    className={styles.imageMain}
                    src={defaultImage}
                    quality={100}
                  />
                </div>
              </Grid>
              <Grid item xs={9} container>
                <Grid item xs={12}>
                  <Typography align="left" className={styles.text_product_name}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingRight: '10px' }}>
                  <Typography align="right" className={styles.text_product_error}>
                    {errProductMessage}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Typography align="center" className={styles.text_view_all} onClick={toggleConfirmModal}>
              Xem tất cả
            </Typography>
          </Grid>
        </Grid>
      )}
      {showConfirmModal && (
        <ModalListProduct
          isMobile={isMobile}
          products={errProducts}
          isShowPopupConfirm={showConfirmModal}
          handleClosePopup={toggleConfirmModal}
          handleClick={handleDeleteErrorItem}
          title="Xin xác nhận"
          content="Xoá tất cả các sản phẩm không đủ điều kiện thanh toán"
        />
      )}
    </>
  );
}

export default ErrProductsWarningCard;
