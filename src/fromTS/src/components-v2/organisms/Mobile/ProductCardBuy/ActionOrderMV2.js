import clsx from 'clsx';
import MobileInputProduct from 'components-v2/atoms/MobileInputProduct';
import MobileMinusButton from 'components-v2/atoms/MobileMinusButton';
import MobilePlusButton from 'components-v2/atoms/MobilePlusButton';
import { RemoveProductModal } from 'components/organisms';
import useOrderProduct from 'hooks/useOrderProduct';
import { memo } from 'react';
import styles from './styles.module.css';

const Actions = memo(
  ({
    handleDecrease,
    handleOnBlur,
    handleChangeInput,
    isProductAvailable,
    quantity,
    dealReady,
    handleIncrease,
    isShowRemove,
    handleCloseRemoveModal,
    handleRemove,
    isDisableMinusBtn,
    isDisabledPlusBtn,
    product,
  }) => (
    <div className={styles.wrapper_action_order_mv2}>
      <MobileMinusButton disabled={isDisableMinusBtn} onClick={handleDecrease} />
      <MobileInputProduct
        type="number"
        className={clsx(styles.input_action_mv2)}
        product={product}
        // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
        onChange={handleChangeInput}
        onBlur={handleOnBlur}
        // searchInput={(el) => {
        //   searchInput.current[index] = el; // eslint-disable-line no-param-reassign
        // }}
        value={quantity}
        disabled={isProductAvailable || !dealReady}
      />
      <MobilePlusButton disabled={isDisabledPlusBtn} onClick={handleIncrease} />
      {isShowRemove && <RemoveProductModal product={product} visible={isShowRemove} onClose={handleCloseRemoveModal} onRemove={handleRemove} />}
    </div>
  ),
);

const ActionOrderMV2 = ({ product, deal }) => {
  const {
    handleDecrease,
    handleOnBlur,
    handleChangeInput,
    isProductAvailable,
    quantity,
    dealReady,
    handleIncrease,
    isShowRemove,
    handleCloseRemoveModal,
    handleRemove,
    isDisableMinusBtn,
    isDisabledPlusBtn,
  } = useOrderProduct({ deal, ...product });

  return (
    <>
      <Actions
        handleDecrease={handleDecrease}
        handleOnBlur={handleOnBlur}
        handleChangeInput={handleChangeInput}
        isProductAvailable={isProductAvailable}
        handleIncrease={handleIncrease}
        isDisableMinusBtn={isDisableMinusBtn}
        isDisabledPlusBtn={isDisabledPlusBtn}
        isShowRemove={isShowRemove}
        dealReady={dealReady}
        quantity={quantity}
        handleCloseRemoveModal={handleCloseRemoveModal}
        handleRemove={handleRemove}
        product={product}
      />
    </>
  );
};
export default ActionOrderMV2;
