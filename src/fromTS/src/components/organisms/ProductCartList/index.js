/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Box, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
// import { Button } from 'components/atoms';
import { withStyles } from '@material-ui/core/styles';
import { Description, Info, Star } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import ModalListProduct from 'components-v2/mocules/ModalListProduct';
import { LinkComp } from 'components/atoms';
import CartNote from 'components/mocules/CartNote';
import CustomModal from 'components/mocules/CustomModal';
import { palette } from 'constants/Colors';
import { ARR_REMOVE_PRODUCT, BRAND_NAME, SELLER_GROUP } from 'constants/Enums';
import { DELETEV2_ICON, GIFT_ICON, STORE_IMAGE_DEFAULT } from 'constants/Images';
import { LOGO_MEDX } from 'constants/Images/default';
import { QUICK_ORDER } from 'constants/Paths';
import { useCart, useSetting } from 'context';
import { useModal } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getLinkTagDeal, NotifyUtils } from 'utils';
import { debounceFunc400, debounceFunc500 } from 'utils/debounce';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import ImageFallback, { ImageFallbackProductImage, ImageFallbackStatic, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import ProductCart from '../ProductCart';
import DeleteDialog from './DeleteDialog';
import styles from './style.module.css';

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: palette.warning.main,
    },
  },
  checked: {},
})(React.forwardRef((props, ref) => <Checkbox color="default" ref={ref} {...props} />));

// cart
const ProductCartList = ({ products, isMobile, removeCartItem, isItemInArrayRemove, isErrorCartItem, updateCart, mapInvoice }) => {
  const {
    selectAllCartItem,
    unselectAllCartItem,
    selectCartItem,
    totalItemSelected = 0,
    totalItem = 0,
    isSelectedAll,
    cartNo,
    isErrorImportant,
    removeImportant,
    errProducts = [],
    giftProductRowRef
  } = useCart();
  const router = useRouter();
  // const errProducts = products?.filter((item) => item?.errorCode || item?.errorMessage) || [];
  const { mapSeller = new Map(), mapStoreActives = new Map(), getNameSeller } = useSetting();
  // const classes = useStyles();

  const [isCheckAll, setIsCheckAll] = useState(isSelectedAll);
  const groupSeller = {};

  useEffect(() => {
    setIsCheckAll(isSelectedAll);
  }, [isSelectedAll]);

  products?.forEach((productItem) => {
    const { sellerCode, isVAT, total: totalPrice, productTags, isSelected, isGift } = productItem || {};
    const sellerInfo = mapSeller?.get(sellerCode) || null;
    const minInvoice = mapInvoice.find((item) => item?.sellerCode === sellerCode)?.minInvoice5pc || 0;
    let minVAT = 0;

    let sellerGroupCode = '';
    let sellerName = '';
    let sellerGroupCodeType;

    if (sellerInfo?.isInternal) {
      if (isVAT) {
        sellerName = 'Dược Phẩm MEDX';
        sellerGroupCode = SELLER_GROUP.MEDX;
        sellerGroupCodeType = SELLER_GROUP.MEDX;
      } else {
        sellerName = 'Hàng Mua Hộ';
        sellerGroupCode = SELLER_GROUP.HANGMUAHO;
        sellerGroupCodeType = SELLER_GROUP.HANGMUAHO;
      }
    } else if (sellerInfo?.sellerType === 'ENTERPRISE') {
      sellerName = sellerInfo?.name || '';
      sellerGroupCode = sellerCode;
      sellerGroupCodeType = sellerCode;
      minVAT = minInvoice || 0;
    } else if (isGift) {
      sellerName = 'Quà Tặng';
      sellerGroupCode = SELLER_GROUP.GIFT_ORDER;
      sellerGroupCodeType = SELLER_GROUP.GIFT_ORDER;
    } else {
      sellerName = `Đối Tác Của ${BRAND_NAME}`;
      sellerGroupCode = SELLER_GROUP.DOITAC;
      sellerGroupCodeType = SELLER_GROUP.DOITAC;
    }

    let sellerData = groupSeller[sellerGroupCode];

    // conver data
    if (!sellerData) {
      const landingPage = sellerInfo?.landingPage || null;

      sellerData = {
        landingPage,
        minVAT,
        isActiveSeller: !!mapStoreActives?.get(sellerCode),
        avatarSeller: sellerInfo?.imageStoreUrls?.length > 0 ? sellerInfo?.imageStoreUrls[0] : STORE_IMAGE_DEFAULT,
        sellerName,
        sellerCode,
        sellerSlug: sellerInfo?.slug || '',
        sellerGroupCode,
        sellerGroupCodeType,
        needMoreValue: 0,
        listProduct: [],
        totalPrice: 0,
        isSelectedAll: true,
        productTags: productTags || [],
      };
      groupSeller[sellerGroupCode] = sellerData;
    }
    // map data

    const isHaveVat = productTags.indexOf('HOADONNHANH') >= 0;

    // hotfix : gom nhóm hoá đơn nhanh lại
    if (isHaveVat) {
      sellerData.listProduct.unshift(productItem);
    } else {
      sellerData.listProduct.push(productItem);
    }

    if (isSelected) {
      if (isHaveVat) {
        sellerData.totalPrice += totalPrice;
      }
    } else {
      sellerData.isSelectedAll = false;
    }

    sellerData.needMoreValue = minVAT - sellerData.totalPrice > 0 ? minVAT - sellerData.totalPrice : 0;

    groupSeller[sellerGroupCode] = sellerData;
  });

  const groupsMapOrder = Object.keys(groupSeller).map((key) => groupSeller[key]);

  groupsMapOrder.sort((a, b) => {
    if (a.sellerGroupCodeType === SELLER_GROUP.GIFT_ORDER) return 1;
    if (b.sellerGroupCodeType === SELLER_GROUP.GIFT_ORDER) return -1;

    if (a.sellerGroupCode === SELLER_GROUP.MEDX) return -1;
    if (b.sellerGroupCode === SELLER_GROUP.MEDX) return 1;

    if (a.sellerGroupCode === SELLER_GROUP.HANGMUAHO) return 1;
    if (b.sellerGroupCode === SELLER_GROUP.HANGMUAHO) return -1;

    if (a.sellerGroupCodeType === SELLER_GROUP.DOITAC) return 1;
    if (b.sellerGroupCodeType === SELLER_GROUP.DOITAC) return -1;

    const listPrdA = a?.listProduct || [];
    const listPrdB = b?.listProduct || [];
    const x = listPrdA.findIndex(({ errorCode }) => ARR_REMOVE_PRODUCT.includes(errorCode));
    const y = listPrdB.findIndex(({ errorCode }) => ARR_REMOVE_PRODUCT.includes(errorCode));

    if (x < 0 && y >= 0) return b - a;
    if (x >= 0 && y < 0) return a - b;

    return -1;
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showConfirmModal, toggleConfirm] = useModal();

  const [checked, setChecked] = useState(new Array(products.length).fill(false));
  const [listItemDelete, setListItemDelete] = useState([]);
  const [listProductUnSelectImportant, setListProductUnSelectImportant] = useState([]);
  useLayoutEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const handleScrollPosition = (position) => {
    setScrollPosition(position);
  };

  const handleClick = () => {
    toggleConfirm();
  };

  const handleDeleteErrorItem = async () => {
    try {
      await products?.forEach((item) => {
        if (ARR_REMOVE_PRODUCT.indexOf(item?.errorCode) >= 0) {
          removeCartItem(item);
        }
      });
      NotifyUtils.success('Xoá tất cả sản phẩm lỗi thành công');
    } catch (error) {
      NotifyUtils.error(error.message || 'Xoá tất cả sản phẩm lỗi thất bại');
    }
    // await updateCart();
    router.reload();
    toggleConfirm();
    setChecked(new Array(products.length).fill(false));
    setListItemDelete([]);
  };

  const [showModalConfirmDeleteSeletedItems, toggleModalConfirmDeleteSeletedItems] = useModal();
  // const [disableDeleteBtn, setDisableDeleteBtn] = useState(true);
  const [openDeleteCart, toggleDeleteCart] = useModal();

  const handleChangeCheckbox = (e, sku) => {
    // find cartItem by sku
    const cartItem = products.find(({ sku: skuItem }) => skuItem === sku);

    // APO-8: nếu bỏ chọn toàn bộ , mà nếu có 1 có sản phẩm đánh dấu quan trọng -> hiện popup để xác nhận xoá SP quan trọng
    if (cartItem.isImportant && cartItem.isSelected) {
      setListProductUnSelectImportant([cartItem]);
    } else {
      selectCartItem({
        sku,
        isSelected: !cartItem.isSelected,
        name: cartItem?.name || '',
        quantity: cartItem?.quantity || 0,
        cartNo: cartItem?.cartNo || '',
      });
    }
  };

  // TODO: APO-8 important
  const checkAll = async () => {
    if (!isSelectedAll) {
      // call api select all
      await selectAllCartItem();
    } else {
      // call api un select all

      // APO-8: nếu bỏ chọn toàn bộ , mà nếu có 1 có sản phẩm đánh dấu quan trọng -> hiện popup để xác nhận xoá SP quan trọng
      const productIsSelected = products?.filter((item) => item.isSelected);
      if (productIsSelected.find((item) => item.isImportant)) {
        setListProductUnSelectImportant(productIsSelected);
      } else {
        await unselectAllCartItem();
      }
    }
    setIsCheckAll(!isSelectedAll);
    // setProductItems(getState().cartItems);
  };

  // TODO: APO-8 important
  const checkAllGr = (sellerCode) => {
    // call API skus
    const sellerInfo = groupSeller[sellerCode];
    const { listProduct } = sellerInfo;
    const skusImportant = listProduct.filter((item) => item.isImportant);
    const skus = listProduct.map(({ sku }) => sku);

    // APO-8: nếu bỏ chọn toàn bộ , mà nếu có 1 có sản phẩm đánh dấu quan trọng -> hiện popup để xác nhận xoá SP quan trọng
    if (skusImportant?.length > 0 && sellerInfo.isSelectedAll) {
      setListProductUnSelectImportant(listProduct);
    } else {
      selectCartItem({ skus, isSelected: !sellerInfo.isSelectedAll, cartNo });
    }
  };

  const handleDeleteSeletedItems = async () => {
    const arr = products.filter((item) => listItemDelete.includes(item.productId.toString()));
    try {
      // remove all selected item
      await Promise.all(arr?.map(async (item) => removeCartItem(item, false)));
      await updateCart();
      NotifyUtils.success('Xoá tất cả sản phẩm đã chọn thành công');
      toggleDeleteCart();
    } catch (error) {
      NotifyUtils.error(error.message || 'Xoá tất cả sản phẩm đã chọn thất bại');
    }
    debounceFunc500(() => {
      toggleModalConfirmDeleteSeletedItems();
      setListItemDelete([]);
    });
  };
  // xóa 1 phần các sản phẩm đã chọn khỏi giỏ hàng
  const handleDeleteItemSellected = async () => {
    const isItemSellect = products?.filter((product) => product.isSelected === true);
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
  const numberGroup = groupsMapOrder.length;
  return (
    <>
      <div className={styles.instruction_text}>
        <Star className={styles.star_icon} />
        <Typography>Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt nhiều cái cũng tính là 1)</Typography>
      </div>
      <div className={styles.instruction_text}>
        <Description className={styles.vat_icon} />
        <Typography>
          Nhà cung cấp chỉ xuất hóa đơn cho khách hàng nếu tổng sản phẩm của nhà cung cấp trong đơn hàng đạt giá trị xuất hóa đơn (Chỉ xuất hóa đơn
          cho sản phẩm có "HÓA ĐƠN NHANH")
        </Typography>
      </div>
      {isItemInArrayRemove && (
        <>
          <div>
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              Trong giỏ hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán. Xin vui lòng kiểm tra lại thông tin giỏ hàng hoặc{' '}
              <b className={styles.deleteBtn} role="button" onClick={handleClick}>
                <DeleteIcon fontSize="small" /> nhấn vào đây
              </b>{' '}
              để xoá tất cả sản phẩm lỗi.
            </Alert>
          </div>
        </>
      )}

      {/* Ẩn thông báo 10Jun2022 */}
      {/* // APO-8: Lên tính năng APO-8 cần báo cho khách biết  */}
      {/* <div className={styles.info_text}>
        <Star className={styles.star_icon} />
        <Typography>Thông báo: Tính năng mới cho phép chọn mua một phần giỏ hàng.</Typography>
      </div> */}
      {/* <div className={!disableDeleteBtn ? styles.deleteSeletedBtn : styles.hidden}>
        <Button className={classes.root} onClick={toggleModalConfirmDeleteSeletedItems} startIcon={<DeleteIcon />}>
          Xóa các sản phẩm đã chọn ({listItemDelete.length}/{products.length} sản phẩm)
        </Button>
      </div> */}
      <div className={styles.wrapActionCart}>
        <Box className={styles.btnChoosen}>
          {/* <Image src={CARTV2_ICON} width="20px" height="24px" /> */}
          <Typography data-test="cart-select-text">
            đã chọn {formatNumber(totalItemSelected)} / {formatNumber(totalItem)}
          </Typography>
        </Box>
        <div className={clsx(styles.deleteSeletedBtn, isMobile && styles.flex_sb)}>
          <ButtonV2
            className={clsx(styles.btnDelete, totalItemSelected === 0 && styles.disabled)}
            onClick={toggleDeleteCart}
            disabled={totalItemSelected === 0}
            data-test="btn-del-checked-items"
          >
            <ImageFallbackStatic src={DELETEV2_ICON} width="15px" height="20px" />
            <Typography> Xóa sản phẩm đã chọn </Typography>
          </ButtonV2>
          <FormControlLabel
            value="checkAll"
            control={<CustomCheckbox onChange={checkAll} value={isCheckAll} checked={isCheckAll} />}
            label="Chọn tất cả"
            labelPlacement="start"
            data-test="cart-check-all"
          />
        </div>
        <DeleteDialog
          visible={openDeleteCart}
          onClose={toggleDeleteCart}
          totalItem={totalItem}
          totalItemSelected={totalItemSelected}
          onClickOk={handleDeleteItemSellected}
        />
      </div>
      <div>
        {groupsMapOrder?.map(
          ({
            listProduct,
            needMoreValue,
            sellerName,
            isActiveSeller,
            sellerCode,
            sellerSlug = '',
            isSelectedAll: isSelectedAllGroup,
            sellerGroupCode,
            productTags,
          }) => {
            const seller = { code: sellerCode, tags: productTags };
            const sellerInfo = getNameSeller({ seller });
            const { linkStore = '', linkSeller = '', avatar = [] } = sellerInfo;

            return (
              <div key={uuidv4()} ref={sellerGroupCode === SELLER_GROUP.GIFT_ORDER ? giftProductRowRef : null}>
                {(numberGroup > 1 || sellerGroupCode !== SELLER_GROUP.HANGMUAHO) && (
                  <>
                    <div className={!isMobile ? styles.headerGroup : styles.headerGroupMobile}>
                      <div>
                        {(sellerGroupCode !== SELLER_GROUP.HANGMUAHO &&
                          // sellerGroupCode !== SELLER_GROUP.DOITAC &&
                          sellerGroupCode !== SELLER_GROUP.GIFT_ORDER && (
                            <LinkComp className={isMobile ? styles.linkComp : undefined} href={sellerSlug && isActiveSeller ? linkStore : linkSeller}>
                              <div className={styles.sellerAvatar}>
                                {sellerName === 'Dược Phẩm MEDX' ? (
                                  <ImageFallbackStoreImage
                                    src={`${LOGO_MEDX}?size=origin`}
                                    className={styles.sellerIcon}
                                    width={50}
                                    height={17}
                                    alt=""
                                  />
                                ) : (
                                  <ImageFallbackStoreImage src={avatar[0]} alt="store" width={30} height={30} quality={100} />
                                )}
                              </div>
                              <Typography style={{ fontWeight: 'bold' }}>{sellerName}</Typography>
                            </LinkComp>
                          )) ||
                          (sellerGroupCode === SELLER_GROUP.GIFT_ORDER && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div className={styles.sellerAvatar}>
                                <ImageFallback src={GIFT_ICON} fallbackSrc={GIFT_ICON} width={35} height={35} quality={100} alt="gift_icon" />
                              </div>
                              <Typography style={{ fontWeight: 'bold' }}>{sellerName}</Typography>
                            </div>
                          ))}
                      </div>
                      <div>
                        <div>
                          {sellerGroupCode === SELLER_GROUP.HANGMUAHO ||
                          sellerGroupCode === SELLER_GROUP.DOITAC ||
                          sellerGroupCode === SELLER_GROUP.GIFT_ORDER ? (
                            <Typography />
                          ) : sellerGroupCode === SELLER_GROUP.MEDX ? (
                            <Typography> Đạt giá trị xuất hóa đơn</Typography>
                          ) : needMoreValue <= 0 ? (
                            <Typography>Đạt giá trị xuất hóa đơn</Typography>
                          ) : (
                            <Typography>
                              Mua thêm <b>{formatCurrency(needMoreValue)}</b> để đạt giá trị xuất hóa đơn
                            </Typography>
                          )}
                        </div>
                        {numberGroup > 1 && listProduct?.every((product) => !product.isGift === true) && (
                          <div className={!isMobile ? styles.checkboxGroup : styles.checkboxGroupMobile}>
                            <FormControlLabel
                              value="checkAllGr"
                              control={
                                <CustomCheckbox onChange={() => checkAllGr(sellerGroupCode)} value={sellerGroupCode} checked={isSelectedAllGroup} />
                              }
                              label="Chọn tất cả"
                              labelPlacement="start"
                              className={styles.checkbox}
                              data-test="cart-check-item-all"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div style={{ marginBottom: '16px' }}>
                  {listProduct &&
                    listProduct.map((item, index) => (
                      <ProductCart
                        key={`product-cart-${sellerGroupCode}-${item.sku}`}
                        product={item}
                        isImportant={item.isImportant}
                        name={`cart-${item.sku}`}
                        isMobile={isMobile}
                        scrollTo={handleScrollPosition}
                        index={index}
                        handleChangeCheckbox={(e) => handleChangeCheckbox(e, item?.sku)}
                        isChecked={checked}
                        link={getLinkTagDeal(item)}
                      />
                    ))}
                </div>
              </div>
            );
          },
        )}
      </div>
      <div className={styles.instruction_text}>
        <Info className={styles.info_icon} />
        <Typography>
          Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang
          <Link href={QUICK_ORDER} prefetch={false}>
            <span className={styles.quick_order}>&nbsp;Đặt hàng nhanh </span>
          </Link>
        </Typography>
      </div>
      <div className={styles.notes}>
        <div className={styles.note_title}>Ghi chú khác</div>
        <div className={styles.note_content}>
          Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có
          thể.
        </div>
        <CartNote />
      </div>
      {isMobile && isErrorCartItem && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          Xin vui lòng kiểm tra lại thông tin giỏ hàng. Trong giỏ hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán.
        </Alert>
      )}
      {isMobile && isErrorImportant && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          Xin vui lòng kiểm tra lại thông tin giỏ hàng. Trong giỏ hàng của quý khách không đủ số lượng để đánh dấu sản phẩm quan tâm.
        </Alert>
      )}
      {showConfirmModal && (
        <ModalListProduct
          isMobile={isMobile}
          products={errProducts}
          isShowPopupConfirm={showConfirmModal}
          handleClosePopup={toggleConfirm}
          handleClick={handleDeleteErrorItem}
          title="Xin xác nhận"
          content="Xoá tất cả các sản phẩm không đủ điều kiện thanh toán"
        />
      )}
      {/* <CustomModal
        visible={showConfirmModal}
        onClose={toggleConfirm}
        title="Xin xác nhận"
        btnOk="Đồng ý"
        onClickOk={handleDeleteErrorItem}
        btnOnClose="Xem lại"
      >
        <Typography>Xóa tất cả các sản phẩm không đủ điều kiện để thanh toán.</Typography>
      </CustomModal> */}
      <CustomModal
        visible={showModalConfirmDeleteSeletedItems}
        onClose={toggleModalConfirmDeleteSeletedItems}
        title="Xin xác nhận"
        btnOk="Đồng ý"
        onClickOk={handleDeleteSeletedItems}
        btnOnClose="Xem lại"
      >
        <Typography>Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?</Typography>
      </CustomModal>

      {/* // APO-8: nếu bỏ chọn toàn bộ , mà nếu có 1 có sản phẩm đánh dấu quan trọng -> hiện popup để xác nhận xoá SP quan trọng
        Đây la popup xoá SP quan trọng
      */}
      {listProductUnSelectImportant.filter((item) => item.isImportant).length > 0 && (
        <CustomModal
          visible={listProductUnSelectImportant.filter((item) => item.isImportant).length > 0}
          onClose={() => setListProductUnSelectImportant([])}
          title="Xác nhận"
          btnOk="Đồng ý"
          onClickOk={async () => {
            const skusImportant = listProductUnSelectImportant.filter((item) => item.isImportant);
            const promiseRemoveImportant = skusImportant.map(removeImportant);
            await Promise.all(promiseRemoveImportant);
            await selectCartItem({ skus: listProductUnSelectImportant.map((item) => item.sku), isSelected: false, cartNo });
            setListProductUnSelectImportant([]);
          }}
          btnOnClose="Xem lại"
        >
          <CardContent>
            <Typography>Danh sách sản phẩm bỏ chọn có chứa sản phẩm quan trọng, khi bạn bỏ chọn thì sẽ mất đánh dấu sản phẩm quan trọng?</Typography>
            {listProductUnSelectImportant
              ?.filter((item) => item.isImportant)
              ?.map((product) => (
                <Card className={styles.remove_item} key={`unselect-item-${product.sku}`}>
                  <div className={styles.remove_item_image}>
                    <ImageFallbackProductImage
                      className={styles.remove_item_image}
                      src={product?.imagesProxy && `${product?.imagesProxy[0]}?size=200`}
                      fallbackSrc={product?.imagesProxy[0]}
                      width={80}
                      height={80}
                      alt={product.name && product.name}
                    />
                  </div>
                  <div className={styles.remove_item_content}>
                    <div className={styles.remove_item_cart_name}>{product.name && product.name}</div>
                    <div className={styles.remove_item_cart_price}>{formatCurrency(product.displayPrice)}</div>
                  </div>
                </Card>
              ))}
          </CardContent>
        </CustomModal>
      )}
    </>
  );
};
export default ProductCartList;
