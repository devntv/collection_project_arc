import { Button, Card, Grid } from '@material-ui/core';
import { getFirst, isValid } from 'clients';
import { CARTV2_ICON } from 'constants/Images';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import { useState } from 'react';
import { OrderService } from 'services';
import { gtag, NotifyUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import CustomModal from '../../../components/mocules/CustomModal';
import styles from './styles.module.css';

const ButtonReOrderV2 = ({ orderId, className }) => {
  // const router = useRouter();
  const { user } = useAuth();
  const { reOrderById } = useCart();
  const [isShowPopupConfirm, togglePopupConfirm] = useModal();
  const [items, setItems] = useState([]);

  const handleShowInfo = async () => {
    const orderInfoRes = await OrderService.getOrderDetail({
      orderId,
      locationCode: user?.provinceCode,
      customerLevel: user?.level,
      getCombo: false,
    });
    const orderInfo = getFirst(orderInfoRes);
    if (!orderInfo) {
      NotifyUtils.warn('Không tìm thấy thông tin đơn hàng');
      return;
    }
    setItems(orderInfo?.products || []);
    gtag.reOrderShowPopup();
    togglePopupConfirm();
  };

  const handleClosePopup = () => {
    togglePopupConfirm();
    gtag.reOrderClickCancel();
  };

  const handleReOrder = async () => {
    const result = await reOrderById({ orderId });
    if (isShowPopupConfirm) {
      togglePopupConfirm();
    }
    gtag.reOrderClickOk();
    if (isValid(result)) {
      NotifyUtils.success(`Đã thêm sản phẩm vào giỏ hàng!`);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi !!');
    }
  };

  return (
    <>
      {/* <Tooltip title="Thêm vào giỏ hàng lại" arrow>
        <div onClick={handleShowInfo} role="presentation" className={styles.iconReOrder}>
          <ICON_RE_ORDERV2 />
        </div>
      </Tooltip> */}
      <Button
        startIcon={<ImageFallbackStatic src={CARTV2_ICON} width={15} height={17} layout="fixed" />}
        className={className}
        onClick={handleShowInfo}
      >
        Mua lại
      </Button>

      {isShowPopupConfirm && (
        <CustomModal
          icon={false}
          visible={isShowPopupConfirm}
          onClose={handleClosePopup}
          title="Mua đơn hàng lần nữa!"
          content={`Bạn có muốn thêm ${items.length} sản phẩm trong đơn hàng ${orderId} vào lại giỏ hàng hiện tại!`}
          btnOk="Thêm vào giỏ hàng"
          onClickOk={handleReOrder}
        >
          <Grid style={{ overflowY: 'auto', maxHeight: '400px' }}>
            {items &&
              items.length > 0 &&
              items.map(({ productInfo, quantity = 1 }) => {
                const { defaultImage, name, salePrice } = productInfo || {};
                return (
                  <Card className={styles.remove_item} key={uuidv4()}>
                    <div className={styles.remove_item_image}>
                      <ImageFallbackProductImage
                        className={styles.remove_item_image}
                        src={defaultImage && `${defaultImage}?size=200`}
                        fallbackSrc={defaultImage}
                        width={80}
                        height={80}
                        alt={name && name}
                      />
                    </div>
                    <div className={styles.remove_item_content}>
                      <div className={styles.remove_item_cart_name}>{name && name}</div>
                      <div className={styles.remove_item_cart_price}>
                        {quantity} x {salePrice && formatCurrency(salePrice)}
                      </div>
                    </div>
                  </Card>
                );
              })}
          </Grid>
        </CustomModal>
      )}
    </>
  );
};

export default ButtonReOrderV2;
