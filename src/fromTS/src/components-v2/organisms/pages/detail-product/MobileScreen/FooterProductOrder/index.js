import { Typography } from '@material-ui/core';
import { getFirst, isValid } from 'clients';
import MobileInputProduct from 'components-v2/atoms/MobileInputProduct';
import MobileMinusButton from 'components-v2/atoms/MobileMinusButton';
import MobilePlusButton from 'components-v2/atoms/MobilePlusButton';
import { RemoveProductModal } from 'components/organisms';
import { useCart } from 'context';
import { useModal } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { calculateTimeLeft } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import { convertLargeNumb, formatFloatNumber, formatNumber } from 'utils/FormatNumber';
import styles from './styles.module.css';

const FooterProductOrder = ({ product: { deal, ...product } }) => {
  const { updateCartItemMV2, removeCartItem, validate200Item } = useCart();
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [isShowing, togglePrdRemove] = useModal();
  const didMountRef = useRef(false);
  const prevQuantity = useRef(product?.quantity || 0); // lưu giá trị quantity trước đó
  const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;

  const listMaxQuantity = [product?.maxQuantity || 0];
  const outOfStock = deal?.maxQuantity === (deal?.quantity || 0) || false;
  const outOfDate = (deal && deal?.endTime && new Date(deal?.endTime) < new Date()) || false;
  const checkProductAvailable = () => product?.status === 'OUT_OF_STOCK' || product?.status === 'SUSPENDED' || outOfStock || outOfDate;
  const timeLeft = calculateTimeLeft(deal?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;

  // nếu có số theo ngày thì mới tính
  if (product?.maxQuantityPerDay > 0) {
    listMaxQuantity.push(product?.maxQuantityPerDay - product?.quantityPurchasedToday);
  }

  // limit theo ngày ( tìm min ) , nếu < 0 thì set lại về 0
  let maxQuantityProduct = (product?.isCampaign && product?.availableProducts) || (product?.isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
  if (maxQuantityProduct < 0) {
    maxQuantityProduct = 0;
  }

  const renderPointReceive = () => {
    const { point = null, pointMultiplier = null, displayPrice } = product;

    const pointByPrice = pointMultiplier ? (displayPrice * quantity * pointMultiplier) / 100000 : (displayPrice * quantity) / 100000;
    const pointByPriceFormatted = formatFloatNumber(pointByPrice);
    let pointReceive = 0;
    if (point > 0 && quantity > 0) {
      pointReceive = formatNumber(convertLargeNumb(quantity * point * (pointMultiplier || 1)));
    }
    if (!point && pointByPrice > 0) {
      pointReceive = formatNumber(pointByPriceFormatted);
    }

    return (
      <Typography variant="subtitle1" className={styles.labelOrder}>
        Tổng Điểm Tích Lũy
        <span className={styles.totalPoint}>&nbsp; {pointReceive} điểm</span>
      </Typography>
    );
  };

  // gửi request update số lượng order
  const updateCard = async (q, isReload = true, isStale) => {
    /**
     * !q = quantity invalid
     * q === 0 số lượng = 0 -> ko update
     * q === prevQuantity.current -> số đã update k cần update lại
     */

    if (!q || +q === 0 || q === prevQuantity.current) {
      return;
    }

    const response = await updateCartItemMV2({ product, q: parseFloat(q) }, isReload);

    if (isStale?.stale) {
      return;
    }

    if (response?.status === 'CART_MAX_QUANTITY' || response?.status === 'MAX_QUANTITY') {
      setQuantity(response?.maxQuantity);
      return;
    }

    if (isValid(response)) {
      const { quantity: quantityResponse = null } = getFirst(response, {});
      if (quantityResponse !== null) {
        setQuantity(quantityResponse);
        prevQuantity.current = quantityResponse;
      }
    } else {
      setQuantity(0);
    }
  };

  const handleIncrease = () => {
    if (!validate200Item(product?.sku)) {
      return;
    }
    setQuantity(+quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity < 1) return;
    if (quantity === 1) {
      togglePrdRemove();
      return;
    }
    setQuantity(+quantity - 1);
  };

  const handleRemove = () => {
    removeCartItem({ sku: product?.sku }, true).then((res) => {
      if (res.status === 'OK') setQuantity(0);
    });
    prevQuantity.current = 0;
    togglePrdRemove();
  };

  const handleBlur = (event) => {
    const { value } = event.target;

    if ((value.trim() === '' || +value === 0) && prevQuantity.current !== 0) {
      togglePrdRemove();
      setQuantity(0);
    }
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    let num = value.replace(/\D/g, '');

    if (+num > maxQuantityProduct) {
      // đặt số lượng sản phẩm lớn hơn quy định
      num = maxQuantityProduct;
    }
    setQuantity(num);
  };

  const handleCloseRemoveModal = () => {
    togglePrdRemove();
    setQuantity(prevQuantity.current);
  };

  useEffect(() => {
    const isStale = { stale: false }; // memory-leaks-in-react
    if (didMountRef.current === true) {
      if (quantity === 0) return;
      debounceFunc500(() => {
        updateCard(quantity, undefined, isStale);
      });
    } else {
      didMountRef.current = true;
    }

    // eslint-disable-next-line consistent-return
    return () => {
      isStale.stale = true;
    };
  }, [quantity]);

  return (
    <div className={styles.root}>
      {renderPointReceive()}
      <div className={styles.wrapperActions}>
        <MobileMinusButton disabled={!dealReady || quantity <= 0} onClick={handleDecrease} className={styles.btnMinus} />
        <MobileInputProduct
          max={product?.availableProducts || 0}
          value={quantity}
          className={styles.input}
          onChange={handleChangeInput}
          onBlur={handleBlur}
          min="0"
        />
        <MobilePlusButton
          disabled={checkProductAvailable() || !dealReady || (maxQuantityProduct > 0 && quantity >= maxQuantityProduct)}
          onClick={handleIncrease}
          className={styles.btnPlus}
        />
      </div>
      <RemoveProductModal product={product} visible={isShowing} onClose={handleCloseRemoveModal} onRemove={handleRemove} />
    </div>
  );
};

export default FooterProductOrder;
