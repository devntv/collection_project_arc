/* eslint-disable no-nested-ternary */
import { Card, CardActionArea, IconButton, Tooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import { CustomModal, ProductCardContent } from 'components/mocules';
import { GIFT_IMAGE, MISSING_IMAGE } from 'constants/Images';
import { useCart } from 'context';
import useModal from 'hooks/useModal';
import { useRef, useState } from 'react';
import { NotifyUtils } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

const ProductCart = ({ product, name, isMobile, isImportant, scrollTo, index, handleChangeCheckbox, isMobileV2 = false, link }) => {
  const [isShowModal, toggle] = useModal();
  const [isShowModalWarning, toggleWarning] = useModal();
  const { addImportant, removeImportant, cartItems = [], totalRemainingCanImportant = 0 } = useCart();

  const maxImportant = Math.ceil((cartItems.filter((item) => item.isSelected).length * 20) / 100);
  const [unset, setUnset] = useState(false);
  const { imagesProxy, isGift, errorCode, isSelected } = product;
  const searchInput = useRef([]);

  const importantList = cartItems.filter((item) => item.isSelected && item.isImportant);
  const handleSetImportant = () => {
    if (!isSelected) {
      NotifyUtils.error('Bạn phải chọn sản phẩm trước khi đánh dấu sản phẩm quan trọng');
      return;
    }
    if (isImportant) {
      setUnset(true);
    } else {
      if (importantList.length >= Math.floor((cartItems.filter((item) => item.isSelected).length * 20) / 100)) {
        toggleWarning();
        return;
      }
      setUnset(false);
    }
    toggle();
  };

  const handleConfirmImportantModal = () => {
    if (isImportant) {
      removeImportant(product);
    } else {
      addImportant(product);
    }
    toggle();
  };

  return (
    <div className={styles.button_container} data-test="cart-item-container">
      <div className={styles.root_card}>
        {!isGift && (
          <Tooltip
            title={
              isImportant
                ? 'Bỏ đánh dấu sản phẩm quan trọng'
                : !isSelected
                ? 'Bạn cần chọn sản phẩm này mới có thể đánh dấu sản phẩm quan trọng'
                : totalRemainingCanImportant > 0
                ? 'Chọn sản phẩm quan trọng'
                : `Bạn cần thêm ${
                    importantList.length === maxImportant ? 5 : maxImportant * 5 - cartItems.filter((item) => item.isSelected).length
                  } sản phẩm vào giỏ hàng để có thể đánh dấu quan trọng`
            }
          >
            <IconButton
              onClick={handleSetImportant}
              className={clsx(styles.important_item, product.important && styles.important_item_active)}
              data-test="btn-important-item"
            >
              <StarIcon style={{ color: isImportant ? '#f9b514' : totalRemainingCanImportant <= 0 ? '#919aa3' : '' }} />
            </IconButton>
          </Tooltip>
        )}
        <Card className={clsx(styles.product_card, errorCode ? styles.error : '')}>
          <div className={styles.product_image}>
            <CardActionArea>
              <ImageFallbackProductImage
                fallbackSrc={isGift ? GIFT_IMAGE : (imagesProxy && imagesProxy[0]) || MISSING_IMAGE}
                src={(imagesProxy && `${imagesProxy[0]}`) || (isGift ? GIFT_IMAGE : MISSING_IMAGE)}
                alt={name && name}
                width={100}
                height={100}
                quality={100}
                title={name && name}
                className={styles.image}
              />
            </CardActionArea>
          </div>
          {/* fix  */}
          <div className={clsx(isMobile ? styles.cart_content_mobile : styles.cart_content_web)}>
            <ProductCardContent cart className={styles.product_content} row product={product} isMobile={isMobile} link={link} isLinkTagDeal />
            <ProductCardBuy
              searchInput={searchInput}
              index={index}
              cartItems={cartItems}
              {...product}
              product={product}
              cart
              name={name}
              isMobile={isMobile}
              scrollTo={scrollTo}
              handleChangeCheckbox={handleChangeCheckbox}
              isMobileV2={isMobileV2}
            />
          </div>
        </Card>
      </div>

      <CustomModal
        onClickOk={handleConfirmImportantModal}
        visible={isShowModal}
        onClose={toggle}
        title="Xin xác nhận"
        content={`Bạn có chắc bạn muốn ${unset ? 'bỏ' : ''} đánh dấu sản phẩm này là quan trọng trong đơn hàng hiện tại?`}
      />

      <CustomModal
        onClose={toggleWarning}
        visible={isShowModalWarning}
        title="Đánh dấu sản phẩm quan trọng"
        content={`Bạn cần thêm ${
          importantList.length === maxImportant ? 5 : maxImportant * 5 - cartItems.filter((item) => item.isSelected).length
        } sản phẩm vào giỏ hàng để có thể đánh dấu quan trọng`}
        btnOnClose="Đóng"
        btnOkRender={false}
      />
    </div>
  );
};
export default ProductCart;
