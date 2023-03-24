/* eslint-disable no-nested-ternary */
import { Button, Checkbox, Divider, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import TagComponent from 'components/mocules/TagComponent';
import { ProductCardBuy } from 'components/organisms';
import DeleteDialog from 'components/organisms/ProductCartList/DeleteDialog';
import { MAX_PRODUCT_QTY_DISPLAY } from 'constants/data';
import { SELLER_GROUP } from 'constants/Enums';
import { MISSING_IMAGE } from 'constants/Images';
import { LOGO_MEDX } from 'constants/Images/default';
import { useModal } from 'hooks';
import { memo, useRef, useState } from 'react';
import { NotifyUtils } from 'utils';
import { debounceFunc400 } from 'utils/debounce';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStoreImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

const RowItem = memo(({ product = null, isMobile = false, index = null, handleChangeCheckbox, updateCartItem }) => {
  const searchInput = useRef([]);
  // check tag cận date
  const isNearExpiration = product?.lotDates?.find((item) => item?.isNearExpired === true) || false;
  const {
    quantityPurchasedToday,
    deal = null,
    // isNearOutOfStock = false,
    // statusData = {},
    // errorCode = null,
    maxQuantityPerDay,
    isCampaign,
    isDeal,
    availableProducts,
    maxQuantity: productMaxQuantity,
    isGift = false,
    // messageLimitOrder,
  } = product;

  const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;
  const listMaxQuantity = [productMaxQuantity];
  // nếu có số theo ngày thì mới tính
  if (maxQuantityPerDay > 0) {
    listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
  }

  let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
  if (maxQuantityProduct < 0) {
    maxQuantityProduct = 0;
  }

  return (
    <>
      <Divider className={styles.divider} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className={clsx(styles.item_container, (product?.errorCode || product?.errorMessageProduct) && styles.err_products)}
      >
        <Grid item xs={6} container alignItems="center">
          <Grid item xs={3} className={styles.avatar_seller}>
            <ImageFallbackProductImage
              fallbackSrc={MISSING_IMAGE}
              src={(product?.imagesProxy && `${product?.imagesProxy[0]}?size=400`) || MISSING_IMAGE}
              alt="product-img"
              width={52}
              height={52}
              quality={100}
              title={product?.name}
              className={styles.product_image}
            />
          </Grid>
          <Grid item xs={9} container direction="column" style={{ rowGap: '8px' }}>
            <LinkComp href={`/product/${product?.slug || ''}/loading`} prefetch={false} className={styles.text_product_container}>
              <Typography className={clsx(styles.fs_14, styles.text_product_name)}>{product?.name || ''}</Typography>
            </LinkComp>
            <div className={styles.tags_container}>
              <TagComponent
                page="quick-order"
                product={{ ...product, expiredDate: isNearExpiration?.expiredDate || product?.expiredDate || '' }}
                isMobile={isMobile}
              />
            </div>
            <div>
              {!isGift && maxQuantityProduct > 0 && maxQuantityProduct < MAX_PRODUCT_QTY_DISPLAY && (
                <Typography className={clsx(styles.product_category)} color="error" variant="body2" component="p">
                  Chỉ mua được tối đa {maxQuantityProduct} sản phẩm
                </Typography>
              )}
            </div>
            {/* Chỉ hiện 1 câu text limit */}
            {/* {messageLimitOrder && (
              <div>
                <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
                  {messageLimitOrder}
                </Typography>
              </div>
            )}
            {isNearOutOfStock && (
              <div>
                <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
                  Chỉ còn lại {formatNumber(statusData?.quantity)} sản phẩm
                </Typography>
              </div>
            )}
            {errorCode && (
              <div>
                <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
                  {errorCode === 'MAX_QUANTITY' && !isNearOutOfStock
                    ? maxQuantityProduct === 0
                      ? `Bạn đã đặt quá số lượng cho phép trong ngày, vui lòng quay lại vào ngày mai`
                      : quantityPurchasedToday === 0
                      ? ` Chỉ có ${maxQuantityProduct} sản phẩm vui lòng cập nhật lại số lượng`
                      : `Bạn đã mua ${quantityPurchasedToday}/${maxQuantityPerDay}. Chỉ còn ${maxQuantityProduct} sản phẩm vui lòng cập nhật lại số lượng`
                    : ERROR_CART_MESSAGE[errorCode]}
                </Typography>
              </div>
            )}
            {errorCode !== 'MAX_QUANTITY' && maxQuantityPerDay > 0 && maxQuantityProduct < MAX_PRODUCT_QTY_DISPLAY && quantityPurchasedToday > 0 && (
              <div>
                <Typography className={clsx(styles.product_category)} color="textSecondary" variant="body2" component="p">
                  {`Bạn đã mua ${quantityPurchasedToday}/${maxQuantityPerDay || maxQuantityProduct} sản phẩm trong ngày `}
                </Typography>
              </div>
            )} */}
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ paddingRight: '12px' }}>
          <ProductCardBuy
            {...product}
            product={product}
            searchInput={searchInput}
            index={index}
            handleChangeCheckbox={handleChangeCheckbox}
            updateCartItem={updateCartItem}
            isBulkOrder
          />
        </Grid>
      </Grid>
    </>
  );
});

const GreenCheckbox = withStyles({
  root: {
    color: '#DCDBDB',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SellerItems = memo(({ data = null, isSelectedAllGroup = false, sellerGroupCode = null, checkAllGr, handleChangeCheckbox, updateCartItem }) => (
  <div className={styles.container}>
    <Grid container alignItems="center" justifyContent="space-between" className={styles.title_container}>
      <Grid item xs={5} className={styles.avatar_seller}>
        {data?.sellerGroupCode !== SELLER_GROUP.HANGMUAHO &&
          (data?.sellerGroupCode !== SELLER_GROUP.DOITAC ? (
            <LinkComp href={data?.sellerSlug && data?.isActiveSeller ? data?.sellerData?.linkStore : data?.sellerData?.linkSeller || ''}>
              <div className={styles.sellerAvatar}>
                {data?.sellerName === 'Dược Phẩm MEDX' ? (
                  <ImageFallbackStoreImage src={`${LOGO_MEDX}?size=origin`} className={styles.sellerIcon} width={50} height={17} alt="" />
                ) : (
                  <ImageFallbackStoreImage src={data?.sellerData?.avatar[0]} width={52} height={52} quality={100} />
                )}
                <Typography className={styles.text_seller_name}>{data?.sellerName}</Typography>
              </div>
            </LinkComp>
          ) : (
            <div style={{ display: 'flex' }}>
              <div className={styles.sellerAvatar}>
                {![SELLER_GROUP.DOITAC, SELLER_GROUP.HANGMUAHO].includes(data?.sellerGroupCode) && (
                  <>
                    <ImageFallbackStoreImage src={data?.sellerData?.avatar[0]} width={52} height={52} quality={100} />
                    <Typography className={styles.text_seller_name}>{data?.sellerName}</Typography>
                  </>
                )}
              </div>
            </div>
          ))}
      </Grid>
      {!data?.listProduct.some((item) => item?.isGift) && (
        <Grid item xs={7} container justifyContent="flex-end" alignItems="center">
          {data?.sellerGroupCode === SELLER_GROUP.MEDX || data?.needMoreValue <= 0 ? (
            <Typography className={styles.text_export_title} align="right">
              {' '}
              Đạt giá trị xuất hóa đơn
            </Typography>
          ) : (
            <Typography className={styles.text_export_title} align="right">
              Mua thêm <b>{formatCurrency(data?.needMoreValue)}</b> để đạt giá trị xuất hóa đơn
            </Typography>
          )}
          <FormControlLabel
            value="checkAllGr"
            labelPlacement="start"
            className={styles.checkbox_del}
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <GreenCheckbox
                className={styles.checkbox_del_all}
                onChange={() => checkAllGr(sellerGroupCode)}
                value={sellerGroupCode}
                checked={isSelectedAllGroup}
              />
            }
            label="Chọn tất cả"
          />
        </Grid>
      )}
    </Grid>
    {data?.listProduct &&
      data?.listProduct?.length > 0 &&
      data?.listProduct?.map((product, idx) => (
        <RowItem
          key={`${product.sku}`}
          product={product}
          index={idx}
          handleChangeCheckbox={(e) => handleChangeCheckbox(e, product?.sku)}
          updateCartItem={updateCartItem}
        />
      ))}
  </div>
));

function SellerEditItems({
  data = [],
  rawProducts = [],
  totalItemSelected = 0,
  totalItem = 0,
  isSelectedAll = true,
  selectAllCartItem,
  unselectAllCartItem,
  updateCart,
  selectCartItem,
  updateCartItem,
  groupSeller = null,
  cartNo = null,
  handleExportCart,
  removeCartItem,
}) {
  const [isCheckAll, setCheckAll] = useState(isSelectedAll);

  const handleCheckAll = async () => {
    if (!isSelectedAll) {
      await selectAllCartItem();
    } else {
      await unselectAllCartItem();
    }
    setCheckAll(!isSelectedAll);
  };

  // delete
  const [openDeleteCart, toggleDeleteCart] = useModal();
  // xóa 1 phần các sản phẩm đã chọn khỏi giỏ hàng
  const handleDeleteItemSellected = async () => {
    const isItemSellect = rawProducts?.filter((product) => product.isSelected === true);
    try {
      await Promise.all(isItemSellect?.map((item) => removeCartItem(item, true, false)));
      await updateCart();
    } catch (err) {
      NotifyUtils.error(err.message || 'Xoá các sản phẩm đã chọn thất bại');
    }
    debounceFunc400(() => {
      NotifyUtils.success('Xoá các sản phẩm đã chọn thành công');
      toggleDeleteCart();
    });
  };

  const handleChangeCheckbox = async (e, sku) => {
    const cartItem = rawProducts.find(({ sku: skuItem }) => skuItem === sku);
    await selectCartItem({
      sku,
      isSelected: !cartItem.isSelected,
      name: cartItem?.name || '',
      quantity: cartItem?.quantity || 0,
      cartNo: cartItem?.cartNo || '',
    });
  };

  const checkAllGr = (sellerCode) => {
    const sellerInfo = groupSeller[sellerCode];
    const { listProduct } = sellerInfo;
    const skus = listProduct.map(({ sku }) => sku);
    selectCartItem({ skus, isSelected: !sellerInfo.isSelectedAll, cartNo });
  };

  return (
    <>
      <Grid container alignItems="flex-start" style={{ width: '100%', height: '24px' }}>
        <Grid item xs={4}>
          <Typography className={styles.text_selected}>
            Đã chọn {formatNumber(totalItemSelected)} / {formatNumber(totalItem)}
          </Typography>
        </Grid>
        <Grid item xs={8} container justifyContent="flex-end" alignItems="center" style={{ columnGap: '20px' }}>
          <Button className={styles.btn_export_cart} onClick={handleExportCart}>
            Export giỏ hàng
          </Button>
          <Button className={styles.btn_del_items} disabled={totalItemSelected === 0} onClick={toggleDeleteCart}>
            Xoá sản phẩm đã chọn
          </Button>
          <FormControlLabel
            className={styles.checkbox_del}
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <GreenCheckbox
                className={styles.checkbox_del_all}
                onChange={handleCheckAll}
                name="checkedDelAll"
                color="primary"
                value={isCheckAll}
                checked={isCheckAll}
              />
            }
            labelPlacement="start"
            label="Chọn tất cả"
          />
          {openDeleteCart && (
            <DeleteDialog
              visible={openDeleteCart}
              onClose={toggleDeleteCart}
              totalItem={totalItem}
              totalItemSelected={totalItemSelected}
              onClickOk={handleDeleteItemSellected}
            />
          )}
        </Grid>
      </Grid>
      {data &&
        data?.length > 0 &&
        data.map((item) => (
          <SellerItems
            key={item?.sellerName}
            data={item}
            handleChangeCheckbox={handleChangeCheckbox}
            updateCartItem={updateCartItem}
            isSelectedAllGroup={item?.isSelectedAll || false}
            sellerGroupCode={item?.sellerGroupCode || null}
            checkAllGr={checkAllGr}
          />
        ))}
    </>
  );
}

export default SellerEditItems;
