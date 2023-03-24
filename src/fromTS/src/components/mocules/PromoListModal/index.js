import { Divider, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getFirst, isValid, OrderClient } from 'clients';
import { Modal } from 'components/atoms';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { PROMO_REWARD_TYPE } from 'constants/Enums';
import { useAuth, useCart, useProduct, useSetting } from 'context';
import { memo, useCallback, useEffect, useState } from 'react';
import { PromoService } from 'services';
import { DateTimeUtils } from 'utils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import CartCouponCard from '../CartCouponCard';
import Button from './Button';
import Input from './Input';
import styles from './style.module.css';

const TEXT_DEFAULT = '';

const searchString = (arr, str) => {
  const result = arr.filter((el) => el.code?.indexOf(str) > -1);
  return result;
};

// TODO:PROMOTION
const PromoListModal = memo((props) => {
  const { user } = useAuth();
  const { getProductBySkus, getProductsByIds } = useProduct();
  const { mapIngredients, mapSeller, mapManufactuers, mapCategories } = useSetting();
  const getStyleBySlugOfTag = useStore((state) => state.getStyleBySlugOfTag);
  const cartInfo = useCart();
  const { onClose, visible, className, restProps, redeemCode, handleChangePromo, subPrice } = props;
  // const { provinceCode } = user || {};
  // const regionCode = provinces?.find((item) => item.value === provinceCode)?.regionCode;
  const [text, setText] = useState(TEXT_DEFAULT);
  const [promoSearchs, setPromoSearchs] = useState([]);
  const [promos, setPromos] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleRemoveText = () => {
    setText(TEXT_DEFAULT);
  };

  // THUANNC
  const isHaveGift = (voucher) => voucher?.rewards && voucher.rewards.length > 0 && voucher.rewards[0].gifts && voucher.rewards[0].gifts.length > 0;

  const filterSellerCodes = ({ productCondition, items }) =>
    productCondition?.sellerQuantityType === 'MANY' ? items?.filter((item) => productCondition?.sellerCodes?.indexOf(item?.sellerCode) >= 0) : items;

  const validateProductCondition = ({ productCondition, items }) => {
    // console.log('validateProductCondition > ', productCondition, items);
    const { minQuantity = 0, minTotalValue = 0 } = productCondition;

    // const totalItems = items?.length || 0;

    const totalQuantity = items?.reduce((total_, item) => total_ + item.quantity, 0);
    // console.log('totalQuantity > ', totalQuantity);
    if (minQuantity > 0 && minQuantity > totalQuantity) {
      return false;
    }

    if (minTotalValue > 0) {
      const totalPriceTag = items?.reduce((total_, item) => total_ + item?.total || 0, 0);
      if (totalPriceTag < minTotalValue) {
        return false;
      }
    }

    return true;
  };

  const getSellerNames = ({ sellerCodes }) =>
    sellerCodes
      ?.map((sellerCode) => mapSeller?.get(sellerCode)?.name || '')
      .filter((item) => item && item.length > 0)
      .join(' , ');

  const ONE_DAY = 86400000;

  const parseConditionVoucher = async (voucher, lastOrderInfo) => {
    const { promotionType, conditions = [] } = voucher || {};
    const { cartItems = [] } = cartInfo || {};
    const isGift = isHaveGift(voucher);
    const newConditionVi = await Promise.all(
      conditions?.map(async (condition) => {
        if (!condition) return null;
        const message = [];
        const { type, productConditions } = condition || {};
        let isDisable = false;
        switch (type) {
          case 'ORDER_VALUE': {
            const { minOrderValue = 0, minDaysNoOrder = 0, maxTotalOrder = 0, minTotalOrder = 0 } = condition || {};
            if (minOrderValue > 0) {
              const tempIsDisable = subPrice < minOrderValue;
              if (tempIsDisable) isDisable = tempIsDisable;
              message.push({ text: `Giá trị đơn hàng từ ${formatCurrency(minOrderValue)}`, isDisable: tempIsDisable });
            }

            if (minDaysNoOrder > 0) {
              let tempIsDisable = true;
              const createdTime = new Date(lastOrderInfo?.lastOrder?.createdTime?.substring(0, 10)?.replaceAll('-', '/') || new Date());
              if (createdTime) {
                const today = new Date();
                const diffDays = Math.ceil((today - createdTime) / ONE_DAY) - 1;
                tempIsDisable = diffDays <= minDaysNoOrder;
              }
              if (tempIsDisable) isDisable = tempIsDisable;
              message.push({ text: `Số ngày không đặt hàng: ${minDaysNoOrder} ngày`, isDisable: tempIsDisable });
            }

            if (maxTotalOrder > 0) {
              let tempIsDisable = true;
              if (lastOrderInfo) {
                tempIsDisable = lastOrderInfo?.totalOrder > maxTotalOrder;
              }
              if (tempIsDisable) isDisable = tempIsDisable;
              message.push({ text: `Số đơn hàng tối đa: ${maxTotalOrder} đơn hàng`, isDisable: tempIsDisable });
            }

            if (minTotalOrder > 0) {
              let tempIsDisable = true;
              if (lastOrderInfo) {
                tempIsDisable = lastOrderInfo?.totalOrder < minTotalOrder;
              }
              if (tempIsDisable) isDisable = tempIsDisable;
              message.push({ text: `Số đơn hàng tối thiểu: ${minTotalOrder} đơn hàng`, isDisable: tempIsDisable });
            }
            break;
          }
          case 'PRODUCT': {
            await Promise.all(
              productConditions?.map(async (productCondition) => {
                const { productId, sellerCodes, minQuantity, minTotalValue } = productCondition || {};
                const mapProductId = await getProductsByIds({ ids: [productId] });
                const productInfo = mapProductId?.get(productId) || {};
                const sellerNames = getSellerNames({ sellerCodes });

                let items = cartItems || [];
                // validate sellerCodes
                items = items.filter((item) => item.productId === productId);
                items = filterSellerCodes({ productCondition, items });

                isDisable = !validateProductCondition({ productCondition, items });
                message.push({
                  text: `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có tên ${productInfo.name} ${
                    sellerNames ? `của người bán ${sellerNames}` : ''
                  } 
                    ${minTotalValue ? ` tối thiểu ${formatCurrency(minTotalValue)}` : ''}`,
                  isDisable,
                });
              }),
            );
            break;
          }
          case 'PRODUCT_TAG': {
            await Promise.all(
              productConditions?.map(async (productCondition) => {
                const { productTag, sellerCodes, minQuantity, minTotalValue } = productCondition || {};
                const tagName = getStyleBySlugOfTag(productTag)?.name || '';
                const sellerNames = getSellerNames({ sellerCodes });

                let items = cartItems || [];
                // validate sellerCodes
                items = filterSellerCodes({ productCondition, items });
                const mapProduct = await getProductBySkus({ skus: items?.map((item) => item.sku) || [], getPrice: false });
                items = items?.filter((item) => {
                  const { sku } = item || {};
                  const info = mapProduct?.get(sku) || null;
                  if (info) {
                    return info?.tags?.indexOf(productTag) >= 0;
                  }
                  return false;
                });

                isDisable = !validateProductCondition({ productCondition, items });
                message.push({
                  text: `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có tag ${tagName} ${sellerNames ? `của người bán ${sellerNames}` : ''} 
                  ${minTotalValue ? ` tối thiểu ${formatCurrency(minTotalValue)}` : ''}`,
                  isDisable,
                });
              }),
            );
            break;
          }
          case 'INGREDIENT': {
            await Promise.all(
              productConditions?.map(async (productCondition) => {
                const { ingredientCode, minTotalValue, minQuantity, sellerCodes } = productCondition || {};
                let items = cartItems || [];
                items = filterSellerCodes({ productCondition, items });
                const mapProduct = await getProductBySkus({ skus: items?.map((item) => item.sku) || [], getPrice: false });
                items = items?.filter((item) => {
                  const { sku } = item || {};
                  const info = mapProduct?.get(sku) || null;
                  if (info) {
                    return info?.ingredients?.some((ingredient) => ingredient?.ingredientCode === ingredientCode);
                  }
                  return true;
                });
                isDisable = !validateProductCondition({ productCondition, items });
                const sellerNames = getSellerNames({ sellerCodes });
                const { name: ingredientName = '' } = mapIngredients?.get(ingredientCode) || {};
                message.push({
                  text: `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm có hoạt chất ${ingredientName} 
                  ${sellerNames ? `của người bán ${sellerNames}` : ''}
                  ${minTotalValue ? ` tối thiểu ${formatCurrency(minTotalValue)}` : ''}`,
                  isDisable,
                });
              }),
            );
            break;
          }
          case 'PRODUCER': {
            await Promise.all(
              productConditions?.map(async (productCondition) => {
                const { producerCode, sellerCodes, minQuantity, minTotalValue } = productCondition || {};
                let items = cartItems || [];
                // validate sellerCodes
                items = filterSellerCodes({ productCondition, items });
                const mapProduct = await getProductBySkus({ skus: items?.map((item) => item.sku) || [], getPrice: false });
                items = items?.filter((item) => {
                  const { sku } = item || {};
                  const info = mapProduct?.get(sku) || null;
                  if (info) {
                    return info?.manufacturerCode === producerCode;
                  }
                  return true;
                });
                isDisable = !validateProductCondition({ productCondition, items });
                const producerName = mapManufactuers?.get(producerCode)?.name;
                const sellerNames = getSellerNames({ sellerCodes });
                message.push({
                  text: `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm của nhà sản xuất ${producerName} 
                  ${sellerNames ? `của người bán ${sellerNames}` : ''} 
                  ${minTotalValue ? ` tối thiểu ${formatCurrency(minTotalValue)}` : ''}`,
                  isDisable,
                });
              }),
            );
            break;
          }
          case 'PRODUCT_CATEGORY':
            await Promise.all(
              productConditions?.map(async (productCondition) => {
                const { categoryCode, minTotalValue, sellerCodes, minQuantity } = productCondition || {};
                let items = cartItems || [];
                // validate sellerCodes
                items = filterSellerCodes({ productCondition, items });
                const mapProduct = await getProductBySkus({ skus: items?.map((item) => item.sku) || [], getPrice: false });
                items = items?.filter((item) => {
                  const { sku } = item || {};
                  const info = mapProduct?.get(sku) || null;
                  if (info) {
                    return info?.categoryCodes?.indexOf(categoryCode) >= 0;
                  }
                  return true;
                });
                isDisable = !validateProductCondition({ productCondition, items });
                const sellerNames = getSellerNames({ sellerCodes });
                const categoryName = mapCategories?.get(categoryCode)?.name || '';
                message.push({
                  text: `Cần mua ít nhất ${formatNumber(minQuantity)} sản phẩm nằm trong danh mục ${categoryName} ${
                    sellerNames ? `của người bán ${sellerNames}` : ''
                  }
                  ${minTotalValue ? ` tối thiểu ${formatCurrency(minTotalValue)}` : ''}`,
                  isDisable,
                });
              }),
            );
            break;
          case 'NO_RULE':
            break;
          default: {
            isDisable = false;
          }
        }
        return { ...condition, isDisable, message };
      }),
    );

    const isDisable = newConditionVi?.some((condition) => condition.isDisable) || false;

    return { ...voucher, conditionsVi: newConditionVi, isDisable, promotionType: isGift ? PROMO_REWARD_TYPE.GIFT : promotionType };
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const customerId = user.customerID;
      const orderRes = await OrderClient.getLastOrder({ customerId });
      const lastOrderInfo = getFirst(orderRes);
      // setLastOrderInfo(lastRes);
      const voucherActiveList = await PromoService.getVouchers({
        getProductBySkus,
        getStyleBySlugOfTag,
        mapIngredients,
        mapSeller,
        mapManufactuers,
        mapCategories,
      });
      // result = objArray.map(a => a.foo);
      const voucherListParsed = await Promise.all(
        voucherActiveList
          .map(async (voucher) => {
            const newVoucher = await parseConditionVoucher(voucher, lastOrderInfo);
            // console.log('new Voucher ', newVoucher);
            return newVoucher;
          })
          .sort((a, b) => a.isDisable - b.isDisable),
      );
      // console.log('voucherList parsed ', voucherListParsed);
      const vouchers = voucherListParsed.filter((voucher) => !(voucher.endTime && DateTimeUtils.compareTime(voucher.endTime, Date.now()) <= 0));
      // map vouchers reaplce product / tag

      const prs = searchString(vouchers, '');
      setPromos(prs);
      setPromoSearchs(prs);
      setLoading(false);
    }
    if (visible) {
      fetchData();
    }
  }, [subPrice, visible]);

  useEffect(() => {
    const prms = searchString(promos, text?.toUpperCase() || '');
    setPromoSearchs(prms);
  }, [promos, text]);

  const searchPromotionWithCode = useCallback(async () => {
    const codeSearch = text || '';
    if (!codeSearch) {
      return;
    }

    const detailRes = await PromoService.getPromoCodeDetail(codeSearch);

    const myVoucher = await PromoService.getMyVoucher({});
    const myVoucherCodeSearch = myVoucher?.find((obj) => obj?.code === codeSearch);
    // If vouchers are not apply for group of users, or user haven't used it yet, myAmountUsage will be undefined
    const myAmountUsage = myVoucherCodeSearch?.used?.amount || 0;

    if (isValid(detailRes)) {
      const promoDetail = getFirst(detailRes);
      const { code } = promoDetail;
      const customerId = user.customerID;
      const orderRes = await OrderClient.getLastOrder({ customerId });
      const lastOrderInfo = getFirst(orderRes);
      if (promoSearchs.filter((item) => item.code === code).length === 0) {
        const promotionSearchResult = await Promise.all(
          [promoDetail]
            .filter((voucher) => {
              if (voucher?.appliedCustomers?.length > 0 && voucher?.appliedCustomers?.indexOf(user.customerID) === -1) {
                return false;
              }
              return (
                voucher.endTime &&
                DateTimeUtils.compareTime(voucher.endTime, Date.now()) > 0 &&
                voucher.status === 'ACTIVE' &&
                (voucher?.maxUsagePerCustomer === 0 || voucher?.maxUsagePerCustomer > myAmountUsage)
              );
            })
            .map((voucher) => parseConditionVoucher(voucher, lastOrderInfo))
            .sort((a, b) => a.isDisable - b.isDisable),
        );
        const promosUpdate = promoSearchs.concat(promotionSearchResult);
        setPromoSearchs(promosUpdate);
      }
    }
  });

  const handleSearchButton = (event) => {
    const code = event.target.value;
    if (event.key === 'Enter') {
      searchPromotionWithCode(code);
      event.preventDefault();
    }
  };

  // TODO:

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      {loading ? (
        <div className={styles.confirm_modal_wrap}>
          <div className={styles.modal_title}>
            <h2>Mã giảm giá</h2>
            <CloseIcon className={styles.close} onClick={onClose} />
          </div>
          <LoadingScreen />
        </div>
      ) : (
        <div className={styles.confirm_modal_wrap}>
          <div className={styles.modal_title}>
            <h2>Mã giảm giá</h2>
            <CloseIcon className={styles.close} onClick={onClose} />
          </div>
          <Divider />
          <Grid container>
            <Grid item xs={9} md={10}>
              <Input
                endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} />}
                placeholder="Nhập mã cần tìm"
                value={text}
                onChange={handleChangeText}
                onKeyDown={handleSearchButton}
                style={{ height: 'auto' }}
              />
            </Grid>

            <Grid item xs={3} md={2}>
              <Button className={styles.button} onClick={searchPromotionWithCode} />
            </Grid>
          </Grid>
          <div className={styles.counpon_list_wapper}>
            <div className={styles.counpon_list}>
              {promoSearchs.length !== 0 ? (
                <Grid container spacing={1}>
                  {promoSearchs.map((voucher) => (
                    <Grid className={styles.coupon_card_grid} item key={uuidv4()} style={{ width: '100%' }}>
                      <CartCouponCard {...voucher} redeemCode={redeemCode} handleChangePromo={handleChangePromo} subPrice={subPrice} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div className={styles.not_yet}>
                  <span>Chưa có mã</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
});

export default PromoListModal;
