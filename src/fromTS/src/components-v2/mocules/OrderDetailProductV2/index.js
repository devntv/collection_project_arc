/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* react/self-closing-comp */
import {
  Accordion,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneIcon from '@material-ui/icons/Done';
import StarIcon from '@material-ui/icons/Star';
import { getData, isValidWithData, OrderClient } from 'clients';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { LinkComp } from 'components/atoms';
import { TicketFormModal } from 'components/mocules';
import NewCustomModal from 'components/mocules/NewCustomModal';
import TagComponent from 'components/mocules/TagComponent';
import { ARR_STATUS_WARE_HOUSE, BRAND_NAME, ENUM_ORDER_STATUS, LABEL_GIFT_TAG_PROMOTION, SELLER_GROUP } from 'constants/Enums';
import { ICON_FILE_CHECKED, ICON_UP_INVOICE } from 'constants/Icons';
import { CARTV2_ICON, GIFT_ICON, GIFT_ICON2, MISSING_IMAGE, STORE_IMAGE_DEFAULT } from 'constants/Images';
import { LOGO_MEDX } from 'constants/Images/default';
import { useCart, useSetting } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { REASON_CANCEL_ORDER } from 'sysconfig';
import { getLinkTagDeal, myLoader, NotifyUtils } from 'utils';
import { formatCurrency, formatFloatNumber, formatNumber } from 'utils/FormatNumber';
import ImageFallback, { ImageFallbackProductImage, ImageFallbackStatic, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { isEmpty } from 'utils/ValidateUtils';
import { v4 as uuidV4 } from 'uuid';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import CustomModalV2 from '../CustomModalV2';
import styles from './styles.module.css';

const STATUS_CHECK_DELIVER = ['WAIT_TO_DELIVER', 'DELIVERING', 'DELIVERED', 'COMPLETED'];

const dataTabTable = [
  { label: 'Sản phẩm', align: 'left' },
  { label: ' ', align: 'left' },
  { label: 'Lô/HSD', align: 'left' },
  { label: 'SL đang Giữ/Đặt', align: 'left' },
  { label: 'Giá(đ)', align: 'right' },
  { label: 'Tổng Cộng(đ)', align: 'right' },
];
const dataTabTableDeliver = [
  { label: 'Sản phẩm', align: 'left' },
  { label: ' ', align: 'left' },
  { label: 'Lô/HSD', align: 'left' },
  { label: 'SL đang Giữ/Đặt', align: 'left' },
  { label: 'Giá(đ)', align: 'right' },
  { label: 'Tổng Cộng(đ)', align: 'right' },
];

const dataTabTableCompleted = [
  { label: 'Sản phẩm', align: 'left' },
  { label: '', align: 'left' },
  { label: 'Lô/HSD', align: 'left' },
  { label: 'Điểm tích lũy', align: 'center' },
  { label: 'SL Đã Giao/Đặt', align: 'left' },
  { label: 'Giá(đ)', align: 'right' },
  { label: 'Tổng Cộng(đ)', align: 'right' },
];
const dataTabTableShowMore = [
  { label: '', align: 'left' },
  { label: 'Danh sách sản phẩm xuất kho', align: 'left' },
  { label: '', align: 'center' },
  { label: ' ', align: 'center' },
  { label: '', align: 'left' },
  { label: '', align: 'right' },
  { label: ' ', align: 'right' },
];
const dataTabTableCancel = [
  { label: 'Sản phẩm', align: 'left' },
  { label: ' ', align: 'left' },
  { label: 'Lô/HSD', align: 'left' },
  { label: 'SL đang Giữ/Đặt', align: 'left' },
  { label: 'Giá(đ)', align: 'right' },
  { label: 'Tổng Cộng(đ)', align: 'right' },
];

const OrderDetailProductV2 = ({
  products,
  promoName,
  // totalDiscount = 100,
  totalPrice: totalPriceAll,
  paymentMethodFee,
  deliveryMethodFee,
  price,
  extraFee = 0,
  status,
  point = null,
  bankInfo,
  orderId,
  canClickActiveButton: isDisplayBtnSendOrder,
  canClickCancelButton: isDisableBtnCancelOrder,
  canClickHoldButton: isDisplayBtnWaitMore,
  holdOrderProcessingTime,
  order,
  orderItems,
  redeemApplyResult,
}) => {
  const redeemRs = redeemApplyResult && redeemApplyResult?.find((item) => !item?.autoApply && item?.canUse === true);
  const autoRedeemRs = redeemApplyResult && redeemApplyResult?.find((item) => item?.autoApply && item?.canUse === true);
  const { code, discountValue: discountValueManual = 0, gifts: giftsManual = null } = redeemRs || {};
  const { discountValue: discountValueAuto = 0, gifts: giftsAuto = null } = autoRedeemRs || {};
  const totalGiftManual = (giftsManual?.length > 0 && giftsManual.reduce((a, b) => a + b.quantity, 0)) || 0;
  const totalGiftAuto = (giftsAuto?.length > 0 && giftsAuto.reduce((a, b) => a + b.quantity, 0)) || 0;

  const [isShowPopupConfirm, togglePopupConfirm] = useModal();
  let totalReturnedPrice = 0;
  let productsReturn = [];
  let totalUndeliverablePrice = 0;
  let undeliverableProducts = [];
  const { updateCartItem, updateCart, cartItems } = useCart();
  const { mapStoreActives = new Map(), getNameSeller, mapSeller } = useSetting();

  // kiểm tra có có sản phẩm xuất kho chưa
  const checkOutbondProducts = !!products?.find((product) => product?.outboundQuantity >= 0 && product?.outboundInfos);
  const isShowOutboundUndeliverable = !!products?.find((product) => product?.outboundQuantity > 0);
  // kiểm tra có sản phẩm nào không giao
  const checkUndeliverableProducts = !!products?.find((product) => product?.quantity - (product?.outboundQuantity || 0) > 0);
  if (STATUS_CHECK_DELIVER.indexOf(status) >= 0 && checkUndeliverableProducts) {
    undeliverableProducts = products
      .filter((product) => product?.quantity - (product?.outboundQuantity || 0) > 0)
      ?.map((product, index) => {
        const { price: salePrice = 0, quantity, outboundQuantity = 0 } = product;
        const undeliverableQuantity = quantity - outboundQuantity;
        const undeliverablePrice = undeliverableQuantity * salePrice;
        totalUndeliverablePrice += undeliverablePrice;

        return {
          ...product,
          index,
          undeliverableQuantity,
          undeliverablePrice,
        };
      });
  }

  // kiểm tra có sản phẩm nào trả lại hay không
  const checkReturnProducts = !!products?.find((product) => product?.returnedQuantity > 0);
  if (checkReturnProducts) {
    productsReturn = products
      .filter((product) => product?.returnedQuantity > 0)
      ?.map((product, index) => {
        const { price: salePrice = 0, returnedQuantity } = product;
        const productPrice = salePrice * returnedQuantity;
        totalReturnedPrice += productPrice;

        return {
          ...product,
          index,
          productPrice,
        };
      });
  }

  const handleReOrder = () => {
    if (!isShowPopupConfirm) {
      togglePopupConfirm();
    }
  };
  const handleClosePopup = () => {
    togglePopupConfirm();
  };

  // thêm sản phẩm không giao vào giỏ hàng
  const updateUndeliverableProductsCart = async (isReload = false) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of undeliverableProducts) {
      const product = {
        isDeal: item.productInfo.isDeal,
        name: item.productInfo.name,
        price: item.price,
        quantity: item.undeliverableQuantity,
        sku: item.productInfo.sku,
        type: item.type,
        sellerCode: item.sellerCode,
      };
      const cartQuantity = cartItems?.find((cartProduct) => cartProduct?.productId === item?.productID)?.quantity || 0;
      // eslint-disable-next-line no-await-in-loop
      await updateCartItem(
        {
          product,
          q: cartQuantity + item.undeliverableQuantity,
        },
        isReload,
      );
    }
    await updateCart();
    togglePopupConfirm();
  };

  const groupSellerInfo = {};
  products?.forEach((item) => {
    const { sellerCode, total: totalPrice, tags, type } = item || {};

    const sellerInfo = mapSeller?.get(sellerCode) || null;

    let sellerGroupCode = '';
    let sellerName = '';

    const isVat = tags?.indexOf('HOADONNHANH') >= 0;

    let sellerGroupCodeType;
    if (type === 'GIFT') {
      sellerName = 'Quà Tặng';
      sellerGroupCode = SELLER_GROUP.GIFT_ORDER;
      sellerGroupCodeType = SELLER_GROUP.GIFT_ORDER;
    } else if (sellerInfo?.isInternal) {
      if (isVat) {
        sellerName = 'MEDX';
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
    } else {
      sellerName = `Đối Tác Của ${BRAND_NAME}`;
      sellerGroupCode = SELLER_GROUP.DOITAC;
      sellerGroupCodeType = SELLER_GROUP.DOITAC;
    }

    let sellerData = groupSellerInfo[sellerGroupCode];

    if (!sellerData) {
      const landingPage = sellerInfo?.landingPage || null;

      sellerData = {
        landingPage,
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
      };
      groupSellerInfo[sellerGroupCode] = sellerData;
    }

    if (isVat) {
      sellerData.listProduct.unshift(item);
    } else {
      sellerData.listProduct.push(item);
    }
  });

  const groupSellers = Object.keys(groupSellerInfo).map((item) => groupSellerInfo[item]);
  const dataNewGroupSellers = groupSellers.sort((a, b) => {
    if (a.sellerGroupCodeType === SELLER_GROUP.GIFT_ORDER) return 1;
    if (b.sellerGroupCodeType === SELLER_GROUP.GIFT_ORDER) return -1;

    if (a.sellerGroupCode === SELLER_GROUP.MEDX) return -1;
    if (b.sellerGroupCode === SELLER_GROUP.MEDX) return 1;

    if (a.sellerGroupCode === SELLER_GROUP.HANGMUAHO) return 1;
    if (b.sellerGroupCode === SELLER_GROUP.HANGMUAHO) return -1;

    if (a.sellerGroupCodeType === SELLER_GROUP.DOITAC) return 1;
    if (b.sellerGroupCodeType === SELLER_GROUP.DOITAC) return -1;
    return -1;
  });

  // action  3 nut
  const [modalBtnWaitMore, toggleBtnWaitMore] = useModal();
  const [modalBtnOrderSend, toggleBtnOrderSend] = useModal();
  const [openTicketCancel, toggleOpenTicketCancel] = useModal();

  const [, setHoldConfig] = useState([]);
  const [statusWareHouse, setStatusWareHouse] = useState([]);
  const [isDisableBtnWaitmore, setIsDisableBtnWaitmore] = useState(false);
  const [isShowOutBoundInfo, toggle] = useModal();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function getHoldConfig() {
      const result = await OrderClient.getHoldOrderConfig({ signal });
      if (isValidWithData(result)) {
        setHoldConfig(getData(result));
      }
    }
    getHoldConfig();
    return () => controller.abort();
  }, []);
  // holdConfig[index] ứng với từng nút:  holdConfig[0] -> chờ thêm,  holdConfig[1] -> đi đơn luôn
  // processingTime tăng thêm xx thời gian bấm nút chờ thêm
  // const { processingTime } = holdConfig[0] || 0;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function getStatusByWareHouse() {
      const result = await OrderClient.getStatusWareHouse({ adminId: orderId, signal });
      if (isValidWithData(result)) {
        const dataWareHouse = getData(result);
        const { status } = dataWareHouse[0];
        setStatusWareHouse(status);
      }
    }
    getStatusByWareHouse();
    return () => controller.abort();
  }, []);

  const handleCheckBeforeStatusWareHouse = (status) => {
    const statusDefault = ARR_STATUS_WARE_HOUSE[3];
    const index = ARR_STATUS_WARE_HOUSE.indexOf(statusDefault);
    const getBeforeStatusDefault = ARR_STATUS_WARE_HOUSE.slice(0, index);
    return getBeforeStatusDefault.includes(status);
  };

  // chờ thêm
  const handleWaitMore = async () => {
    const result = await OrderClient.waitMoreOrder({ orderId, action: 'HOLD' });
    const { status } = result || '';
    toggleBtnWaitMore();
    if (status === 'OK') {
      setIsDisableBtnWaitmore(true);
      NotifyUtils.success('Chờ thêm thành công');
    }
    if (status === 'NOT_FOUND') {
      NotifyUtils.error('Đơn hàng đang chờ xác nhận hoặc có lỗi xảy ra');
    }
  };

  // đi đơn luôn
  const handleSendOrder = async () => {
    toggleBtnOrderSend();
    const result = await OrderClient.waitMoreOrder({ orderId, action: 'ACTIVE' });
    const { status, message } = result || '';
    if (status === 'OK') {
      NotifyUtils.success('Đi đơn thành công');
    } else {
      NotifyUtils.error(message);
    }
  };

  // gửi y/c hủy
  /* 3 nut button tạm ẩn */
  const [isSendCancelOrder, setIsSendCancelOrder] = useState(isDisableBtnCancelOrder);

  const handleCancelRequestOrder = async () => {
    const result = await OrderClient.waitMoreOrder({ orderId, action: 'REQUEST_CANCEL' });
    const { status, message } = result;
    if (status === 'OK') {
      setIsSendCancelOrder((prev) => prev === false);
    } else {
      NotifyUtils.error(message);
    }
  };

  const [seeMore, setSeeMore] = useState(true);
  const handleChangeViewMore = () => {
    setSeeMore(!seeMore);
  };

  const isStatusAfterConfirm = status === 'DELIVERING' || status === 'DELIVERED' || status === 'COMPLETED';

  const handleCompletedTab = (status) => {
    if (status === 'COMPLETED') {
      return dataTabTableCompleted.map((tab) => (
        <TableCell className={styles.tableCellText} align={tab.align} key={uuidV4()}>
          {tab.label}
        </TableCell>
      ));
    }
    if (status === ENUM_ORDER_STATUS.DELIVERING || status === ENUM_ORDER_STATUS.DELIVERED) {
      return dataTabTableDeliver.map((tab) => (
        <TableCell className={styles.tableCellText} align={tab.align} key={uuidV4()}>
          {tab.label}
        </TableCell>
      ));
    }
    if (status === ENUM_ORDER_STATUS.CANCEL) {
      return dataTabTableCancel.map((tab) => (
        <TableCell className={styles.tableCellText} align={tab.align} key={uuidV4()}>
          {tab.label}
        </TableCell>
      ));
    }
    return dataTabTable.map((tab) => (
      <TableCell className={styles.tableCellText} align={tab.align} key={uuidV4()}>
        {tab.label}
      </TableCell>
    ));
  };
  const handleCompletedTabShowMore = () =>
    dataTabTableShowMore.map((tab) => (
      <TableCell className={styles.tableCellTextOutBound} align={tab.align} key={uuidV4()}>
        {tab.label}
      </TableCell>
    ));

  const enableOut = () => {
    switch (status) {
      case ENUM_ORDER_STATUS.CANCEL:
        return false;
      case ENUM_ORDER_STATUS.DELIVERING:
      case ENUM_ORDER_STATUS.DELIVERED:
      case ENUM_ORDER_STATUS.COMPLETED:
        return true;
      default:
        return false;
    }
  };
  // check tag order
  const findSkuTag = (order, skuProduct) => {
    const newOrder = order.find(({ sku }) => sku === skuProduct);
    const { tags = [], statusData = {}, lotDates = [] } = newOrder;
    // vi tag tra thang trong orderItems
    const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
    let newTags = tags || [];
    if (isNearExpiration) newTags = [...tags, 'NEAR_EXPIRATION'];
    return <TagComponent product={{ tags: newTags, statusData, expiredDate: isNearExpiration?.expiredDate }} isProductCard isSellerList={false} />;
  };

  // tag gift promo
  const { dataByPromoListsDetail, filterTagGift } = useGetTagPromotion();

  const isTagGift = (sku) => filterTagGift(sku, dataByPromoListsDetail);

  const TagGift = () => (
    <span style={{ whiteSpace: 'nowrap' }}>
      <span className={styles.tagGiftPromo}>
        {LABEL_GIFT_TAG_PROMOTION}
        <span style={{ fontWeight: 'bold', color: 'black' }}>&nbsp;-&nbsp;</span>
      </span>
    </span>
  );

  return (
    <>
      {STATUS_CHECK_DELIVER.indexOf(status) >= 0 && checkUndeliverableProducts && isShowOutboundUndeliverable && (
        <TableContainer component={Paper} className={styles.table} elevation={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <p className={styles.title_list}>Danh sách sản phẩm không giao</p>
            </Grid>
            <Grid item>
              {/* <Tooltip title="Thêm lại sản phẩm vào giỏ hàng" arrow>
                <IconButton size="small" className={styles.btn} onClick={handleReOrder}>
                  <ShoppingCartIcon className={styles.icon} />
                </IconButton>
              </Tooltip> */}
              <Button
                startIcon={<ImageFallbackStatic src={CARTV2_ICON} width={11} height={12} layout="fixed" />}
                className={styles.btn_add_not_delivered}
                onClick={handleReOrder}
              >
                Thêm giỏ hàng
              </Button>
              {isShowPopupConfirm && (
                <CustomModalV2
                  icon={false}
                  visible={isShowPopupConfirm}
                  onClose={handleClosePopup}
                  title="Đặt hàng lại"
                  content={`Bạn có muốn thêm ${undeliverableProducts.length} sản phẩm không giao được trong đơn hàng vào giỏ hàng hiện tại không?`}
                  btnOk="Đồng ý"
                  onClickOk={updateUndeliverableProductsCart}
                  btnOnClose="Từ chối"
                />
              )}
            </Grid>
          </Grid>
          <Table className={styles.table}>
            <TableHead>
              <TableRow className={styles.table_title}>
                <TableCell>STT</TableCell>
                <TableCell align="left">Sản phẩm</TableCell>
                <TableCell align="right">Số lượng không giao</TableCell>
                <TableCell align="right">Giá (đ)</TableCell>
                <TableCell align="right">Tổng cộng (đ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {undeliverableProducts.map((product) => {
                const { price: salePrice, index, undeliverableQuantity, undeliverablePrice } = product;
                const { name = '', slug } = product?.productInfo || {};

                return (
                  <Fragment key={uuidV4()}>
                    {product?.quantity - (product?.outboundQuantity || 0) > 0 ? (
                      <TableRow key={uuidV4()} className={styles.table_row_text}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="left">
                          <LinkComp variant="h5" className={styles.hover_green} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
                            {name}
                          </LinkComp>
                        </TableCell>
                        <TableCell align="right">{formatNumber(undeliverableQuantity || 0)}</TableCell>
                        <TableCell align="right">{formatNumber(salePrice)}</TableCell>
                        <TableCell align="right">{formatNumber(undeliverablePrice)}</TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                  </Fragment>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right" className={styles.text_total_style}>
                  <b>Tổng Cộng</b>
                </TableCell>
                <TableCell align="right" className={styles.text_total_style}>
                  <b>{formatCurrency(totalUndeliverablePrice)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Grid container xs={12} item className={styles.table}>
        <Grid container item xs={12} justifyContent="space-between">
          <p className={styles.title_list}>{`Danh sách sản phẩm (${products?.length} sản phẩm)`}</p>
          {enableOut() &&
            checkOutbondProducts &&
            (isShowOutBoundInfo ? (
              <Button onClick={toggle} className={styles.btn_toggle} startIcon={<ICON_FILE_CHECKED />} endIcon={<ICON_UP_INVOICE />}>
                Ẩn Danh Sách Sản Phẩm Xuất Kho
              </Button>
            ) : (
              <Button
                onClick={toggle}
                className={clsx(styles.btn_toggle, styles.rotate_icon)}
                startIcon={<ICON_FILE_CHECKED />}
                endIcon={<ICON_UP_INVOICE />}
              >
                Hiển Thị Danh Sách Sản Phẩm Xuất Kho
              </Button>
            ))}
        </Grid>
        <TableContainer component={Paper} elevation={4} className={styles.tableItem}>
          <Accordion expanded={seeMore}>
            {dataNewGroupSellers?.map((data) => {
              const { listProduct: products, sellerCode: code, sellerName: nameSeller, sellerGroupCode, sellerSlug = '', isActiveSeller } = data;
              const tags = products?.map(({ tags }) => tags)[0];

              const seller = { code };
              const sellerInfo = getNameSeller({ seller, tags });
              const { linkStore = '', linkSeller = '', avatar = [] } = sellerInfo;

              products.sort((a, b) => {
                if (a.skuStatus === 'GIFT') return -1;
                if (b.skuStatus === 'GIFT') return -1;
                return -1;
              });

              return (
                <Grid container xs={12} item className={styles.wrapContaineInfo} key={uuidV4()}>
                  <Grid container xs={12} item style={{ marginTop: '10px' }}>
                    <Grid item xs={10} className={styles.wrapAvatarInfo} container alignItems="center">
                      {(sellerGroupCode !== SELLER_GROUP.HANGMUAHO &&
                        sellerGroupCode !== SELLER_GROUP.GIFT_ORDER &&
                        sellerGroupCode !== SELLER_GROUP.DOITAC && (
                          <>
                            <LinkComp target="_blank" className={styles.link} href={sellerSlug && isActiveSeller ? linkStore : linkSeller}>
                              {nameSeller === 'MEDX' ? (
                                <ImageFallbackStoreImage
                                  src={`${LOGO_MEDX}?size=origin`}
                                  className={styles.sellerIcon}
                                  width={50}
                                  height={17}
                                  alt=""
                                />
                              ) : (
                                <Avatar
                                  src={avatar?.length > 1 ? avatar[0] : STORE_IMAGE_DEFAULT}
                                  alt={`seller ${nameSeller}`}
                                  className={styles.avatarSeller}
                                />
                              )}
                              <span className={styles.link}>{nameSeller}</span>
                            </LinkComp>
                          </>
                        )) ||
                        (sellerGroupCode === SELLER_GROUP.GIFT_ORDER && (
                          <>
                            <ImageFallback
                              src={GIFT_ICON}
                              fallbackSrc={GIFT_ICON}
                              className={styles.sellerIcon}
                              width={30}
                              height={30}
                              alt={`seller ${nameSeller}`}
                            />
                            <span className={styles.link}>{nameSeller}</span>
                          </>
                        )) || (
                          <>
                            <Avatar
                              src={avatar[0] || STORE_IMAGE_DEFAULT}
                              // fallbackSrc={STORE_IMAGE_DEFAULT}
                              alt={`seller ${nameSeller}`}
                              className={styles.avatarSeller}
                            />
                            {/* APO-1997 */}
                            {sellerGroupCode !== SELLER_GROUP.HANGMUAHO && <span className={styles.link}>{nameSeller}</span>}
                          </>
                        )}
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-end" className={styles.totalProduct}>
                      <Typography>{products?.length} sản phẩm</Typography>
                    </Grid>
                  </Grid>

                  <Grid xs={12} item container>
                    <Table className={styles.table}>
                      <TableHead>
                        <TableRow>{handleCompletedTab(status)}</TableRow>
                      </TableHead>
                      <TableBody>
                        {products?.map((product) => {
                          const {
                            price: salePrice,
                            totalPrice,
                            quantity,
                            isImportant,
                            comboList = [],
                            outboundInfos,
                            outboundQuantity,
                            totalPoint = null,
                            reservedQuantity = 0,
                            productID,
                            type,
                            tags,
                            sku: skuProduct,
                          } = product;

                          const { imagesProxy = [], name = '', slug = '', isGift, requireGPPMessage } = product?.productInfo || {};

                          return (
                            <Fragment key={uuidV4()}>
                              <TableRow key={productID} className={comboList?.length > 0 ? styles.isComboList : styles.tableRow}>
                                <TableCell className={styles.imgProduct}>
                                  {!isGift ? (
                                    <LinkComp href={`/product/${slug || ''}`}>
                                      <ImageFallbackProductImage
                                        src={!isEmpty(imagesProxy) && `${imagesProxy[0]}`}
                                        fallbackSrc={imagesProxy[0]}
                                        alt={name}
                                        width={68}
                                        height={68}
                                        objectFit="contain"
                                      />

                                      {isImportant && <StarIcon className={styles.startIcon} />}
                                    </LinkComp>
                                  ) : (
                                    <ImageFallbackProductImage
                                      src={!isEmpty(imagesProxy) && `${imagesProxy[0]}`}
                                      fallbackSrc={imagesProxy[0]}
                                      alt={name}
                                      width={68}
                                      height={68}
                                      objectFit="contain"
                                    />
                                  )}
                                </TableCell>
                                {isGift ? (
                                  <TableCell className={styles.wrapName}>
                                    <Typography variant="h5" className={styles.prd_name_text} padding="0px">
                                      {name}
                                    </Typography>
                                    <Box className={styles.gift_label}>Quà tặng</Box>
                                  </TableCell>
                                ) : (
                                  <>
                                    <TableCell className={styles.wrapName}>
                                      <div className={clsx(styles.wrapInfoText)}>
                                        <div>
                                          {isTagGift(skuProduct) ? <TagGift /> : ''}
                                          <span className={styles.wrapNameWithGift}>
                                            <LinkComp
                                              variant="h5"
                                              href={`/product/${slug || ''}`}
                                              className={clsx(styles.prd_name_text, styles.hover_green)}
                                              padding="0px"
                                            >
                                              {name}
                                            </LinkComp>
                                          </span>
                                        </div>

                                        <div className={styles.product_tags}>
                                          {(type === 'DEAL' || type === 'CAMPAIGN') &&
                                            tags &&
                                            tags.indexOf('CAMPAIGN') === -1 &&
                                            tags.indexOf('DEAL') === -1 && (
                                              <LinkComp href={getLinkTagDeal(product, type)} prefetch={false}>
                                                <div className={styles.discount_flag}>
                                                  <span className={styles.discount_flag_text}>Khuyến Mãi</span>
                                                </div>
                                              </LinkComp>
                                            )}
                                          {findSkuTag(orderItems, skuProduct)}
                                        </div>
                                        {requireGPPMessage && <Typography className={styles.text_danger}>{requireGPPMessage}</Typography>}
                                        {status !== 'WAIT_TO_CONFIRM' && status !== ENUM_ORDER_STATUS.CANCEL && (
                                          <>
                                            {formatNumber(reservedQuantity) === formatNumber(quantity) ? (
                                              <Typography className={clsx(styles.availableProduct, isStatusAfterConfirm ? styles.hiddenStatus : '')}>
                                                Đang có hàng
                                              </Typography>
                                            ) : (
                                              <Typography className={clsx(styles.waitProduct, isStatusAfterConfirm ? styles.hiddenStatus : '')}>
                                                Đang chờ hàng
                                              </Typography>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </TableCell>
                                  </>
                                )}

                                {outboundQuantity >= 0 ? (
                                  <TableCell align="center" className={clsx(styles.iot, styles.widthSalePrice)}>
                                    <div>
                                      {!isShowOutBoundInfo &&
                                        outboundInfos &&
                                        outboundInfos?.map(({ lot, expDate }) => (
                                          <Box className={styles.boxLot} key={uuidV4()}>
                                            <Box>{lot || ''}</Box>
                                            {lot && expDate && '/'}
                                            <Box>{expDate || ''}</Box>
                                          </Box>
                                        ))}
                                    </div>
                                  </TableCell>
                                ) : (
                                  <TableCell align="center" className={clsx(styles.iot, styles.widthSalePrice)}>
                                    <div>
                                      <Box className={styles.boxLot}>
                                        <Box>-</Box>
                                      </Box>
                                    </div>
                                  </TableCell>
                                )}
                                {status === 'COMPLETED' && (
                                  <TableCell align="center" className={styles.accumulationPoint}>
                                    {totalPoint > 0 ? (
                                      <Tooltip title="Điểm tích lũy của từng sản phẩm được làm tròn xuống, tính đến số thập phân số 2" arrow>
                                        <div className={clsx(styles.wrapInfoText, styles.widthTotalPoint)}>
                                          {formatFloatNumber(totalPoint) || '-'}
                                        </div>
                                      </Tooltip>
                                    ) : (
                                      <div className={clsx(styles.wrapInfoText, styles.widthTotalPoint)}>-</div>
                                    )}
                                  </TableCell>
                                )}
                                <TableCell align="left" className={clsx(styles.product_quantity, styles.widthQuantily)}>
                                  <Box>
                                    <Box className={styles.wrapHoldOrder}>
                                      {status !== 'WAIT_TO_CONFIRM' ? (
                                        <>
                                          {`${formatNumber(reservedQuantity) < 0 ? 0 : formatNumber(reservedQuantity)} / ${formatNumber(quantity)}`}
                                          {formatNumber(reservedQuantity) === formatNumber(quantity) ? (
                                            <DoneIcon className={styles.successIcon} />
                                          ) : (
                                            <AccessTimeIcon className={styles.timeHoldIcon} />
                                          )}
                                        </>
                                      ) : (
                                        <>{`0 / ${formatNumber(quantity)}`}</>
                                      )}
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="right" className={clsx(styles.product_price, styles.widthSalePrice)}>
                                  <Box>{isGift || type === 'GIFT' ? '0' : `${formatNumber(salePrice)}`}</Box>
                                </TableCell>
                                <TableCell align="right" className={clsx(styles.product_price, styles.widthProductPrice)}>
                                  <Box>{isGift || type === 'GIFT' ? '0' : formatNumber(totalPrice)}</Box>
                                </TableCell>
                              </TableRow>
                              {comboList?.length > 0 && (
                                <TableRow className={styles.tableRow}>
                                  <TableCell />
                                  <TableCell colSpan={status === 'COMPLETED' ? 4 : 3}>
                                    {comboList?.length > 0 && (
                                      <Box className={styles.boxCombo}>
                                        <Box>Mua combo bao gồm</Box>
                                        {comboList?.length > 0 &&
                                          comboList?.map((item) => {
                                            const { name, slug, isGift, productId, quantity, tags, statusData = {}, lotDates = [] } = item;
                                            const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
                                            let newTags = tags || [];
                                            if (isNearExpiration) newTags = [...tags, 'NEAR_EXPIRATION'];
                                            return (
                                              <Fragment key={productId}>
                                                {isGift ? (
                                                  <Typography key={productId} className={styles.comboLink}>
                                                    {name}
                                                  </Typography>
                                                ) : (
                                                  <>
                                                    <LinkComp
                                                      key={productId}
                                                      className={clsx(styles.comboLink, styles.comboColor)}
                                                      href={`/product/${slug}`}
                                                      prefetch={false}
                                                    >
                                                      {name}-{`SL:${quantity}`}
                                                    </LinkComp>
                                                    <div className={styles.product_tags}>
                                                      <TagComponent
                                                        product={{ tags: newTags, statusData, expiredDate: isNearExpiration?.expiredDate }}
                                                        isProductCard
                                                        isSellerList={false}
                                                        isCombo
                                                      />
                                                    </div>
                                                  </>
                                                )}
                                              </Fragment>
                                            );
                                          })}
                                      </Box>
                                    )}
                                  </TableCell>

                                  <TableCell align="right" className={clsx(styles.product_price, styles.widthSalePrice)}>
                                    <Box>
                                      {comboList?.length > 0 && (
                                        <Box className={styles.boxCombo}>
                                          {comboList?.length > 0 &&
                                            comboList?.map((item) => {
                                              const { price, productId } = item;
                                              return (
                                                <Box key={productId} marginTop="20px">
                                                  <Box className={styles.boxHeight} />
                                                </Box>
                                              );
                                            })}
                                        </Box>
                                      )}
                                    </Box>
                                  </TableCell>

                                  <TableCell align="right" className={clsx(styles.product_price, styles.widthProductPrice)}>
                                    <Box>
                                      {comboList?.length > 0 && (
                                        <>
                                          <Box className={styles.boxCombo}>
                                            {comboList?.length > 0 &&
                                              comboList?.map((item) => {
                                                const { productId, isGift } = item;
                                                return (
                                                  <Box key={productId} marginBottom="20px">
                                                    {isGift ? (
                                                      <>
                                                        <Box>Quà Tặng</Box>
                                                      </>
                                                    ) : (
                                                      ''
                                                    )}
                                                  </Box>
                                                );
                                              })}
                                          </Box>
                                        </>
                                      )}
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}
                              {isShowOutBoundInfo && outboundQuantity >= 0 && outboundInfos && reservedQuantity > 0 && (
                                <>
                                  <TableRow
                                    className={clsx(comboList?.length > 0 ? styles.isComboList : styles.tableRow, styles.tableCellBGOutBound)}
                                  >
                                    <TableCell colSpan={7}>
                                      <Box className={styles.titleOutbound}>Danh Sách Sản Phẩm Xuất Kho</Box>
                                    </TableCell>
                                  </TableRow>
                                  {outboundInfos?.map((info) => (
                                    <TableRow className={styles.tableCellBGContext} key={uuidV4()}>
                                      <TableCell className={styles.imgProduct}>
                                        <LinkComp href={`/product/${slug || ''}`}>
                                          <Image
                                            loader={myLoader}
                                            src={!isEmpty(imagesProxy) ? `${imagesProxy[0]}` : MISSING_IMAGE}
                                            alt={name}
                                            width={68}
                                            height={68}
                                            objectFit="contain"
                                          />
                                        </LinkComp>
                                      </TableCell>
                                      <TableCell className={styles.wrapName}>
                                        <div className={styles.wrapInfoText}>
                                          <LinkComp
                                            variant="h5"
                                            href={`/product/${slug || ''}`}
                                            className={clsx(styles.prd_name_text, styles.hover_green)}
                                            padding="0px"
                                          >
                                            {name}
                                          </LinkComp>
                                        </div>
                                      </TableCell>

                                      <TableCell align="center" className={styles.iot}>
                                        <Box className={styles.boxLot}>
                                          <Box>{info?.lot || ''}</Box>/<Box>{info?.expDate || ''}</Box>
                                        </Box>
                                      </TableCell>
                                      {status === ENUM_ORDER_STATUS.COMPLETED && <TableCell />}
                                      <TableCell align="left" className={clsx(styles.product_quantity, styles.widthQuantily)}>
                                        <Box>
                                          <Box className={styles.wrapHoldOrder}>
                                            {`${formatNumber(reservedQuantity) < 0 ? 0 : formatNumber(info?.quantity)} / ${formatNumber(quantity)}`}
                                            {formatNumber(reservedQuantity) === formatNumber(quantity) ? (
                                              <DoneIcon className={styles.successIcon} />
                                            ) : (
                                              <AccessTimeIcon className={styles.timeHoldIcon} />
                                            )}
                                          </Box>
                                        </Box>
                                      </TableCell>
                                      <TableCell />
                                      <TableCell />
                                    </TableRow>
                                  ))}
                                </>
                              )}
                            </Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              );
            })}
          </Accordion>
        </TableContainer>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          style={{ maxHeight: '10px' }}
          className={groupSellers?.length <= 1 ? styles.hiddenViewmore : ''}
        >
          <div className={clsx(styles.viewMore, !seeMore ? styles.viewMoreRotate : '')} onClick={handleChangeViewMore} role="presentation">
            <p>{!seeMore ? 'Xem thêm' : 'Ẩn'}</p>
            <div style={{ marginLeft: '5px' }} className={styles.icon_size_12}>
              {!seeMore ? <ICON_UP_INVOICE /> : <ICON_UP_INVOICE className={styles.viewMoreRotate} />}
            </div>
          </div>
        </Grid>

        {/* total price */}

        <Grid xs={12} item className={clsx(styles.dashed, styles.bottomListProduct)} />
        <Grid container item xs={12} style={{ marginTop: '20px' }}>
          <Grid container item xs={12}>
            <Grid item xs={10} className={styles.bottomPrice}>
              <Typography>Tạm tính</Typography>
            </Grid>
            <Grid item xs={2} className={styles.bottomPriceRight}>
              <Typography>{formatNumber(price)}</Typography>
            </Grid>
            <Grid item xs={10} className={styles.bottomPrice}>
              <Typography>Phí theo hình thức thanh toán</Typography>
            </Grid>
            <Grid item xs={2} className={styles.bottomPriceRight}>
              <Typography>{formatNumber(paymentMethodFee)}</Typography>
            </Grid>
            <Grid item xs={10} className={styles.bottomPrice}>
              <Typography>Phí vận chuyển</Typography>
            </Grid>
            <Grid item xs={2} className={styles.bottomPriceRight}>
              <Typography>{formatNumber(deliveryMethodFee)}</Typography>
            </Grid>
            <Grid item xs={10} className={styles.bottomPriceEnd}>
              <Typography>Phụ phí</Typography>
            </Grid>
            <Grid item xs={2} className={styles.bottomPriceRight}>
              <Typography>{formatNumber(extraFee)}</Typography>
            </Grid>
            <Grid xs={12} item className={styles.dashed} />

            {(redeemRs || autoRedeemRs) && (
              <Grid item xs={12} className={styles.promoCodeTop}>
                <Typography>Giảm giá</Typography>
              </Grid>
            )}
            {autoRedeemRs && (
              <>
                <Grid item xs={10} className={styles.promoCode}>
                  <Typography>Tự động áp dụng</Typography>
                </Grid>
                <Grid item xs={2} className={styles.promoCodeRight}>
                  {(discountValueAuto > 0 && formatNumber(-discountValueAuto)) ||
                    (giftsAuto && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={{ marginRight: '5px', fontFamily: 'ggsm', textTransform: 'lowercase' }}>x{totalGiftAuto}</Typography>
                        <ImageFallbackStatic src={GIFT_ICON2} alt="icon del voucher" height="19" width="19" />
                      </div>
                    ))}
                </Grid>
              </>
            )}

            {redeemRs && (
              <Grid container item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={9} className={styles.promoCode}>
                  <Typography>{code}</Typography>
                </Grid>
                <Grid item xs={2} className={styles.promoCodeRight}>
                  {(discountValueManual > 0 && formatNumber(-discountValueManual)) ||
                    (giftsManual && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={{ marginRight: '5px', fontFamily: 'ggsm', textTransform: 'lowercase' }}>x{totalGiftManual}</Typography>
                        <ImageFallbackStatic src={GIFT_ICON2} alt="icon del voucher" height="19" width="19" />
                      </div>
                    ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          {!isEmpty(promoName) && <Grid xs={12} item className={styles.dashed} />}
          <Grid container xs={12} item justifyContent="space-between" alignItems="center" className={styles.totalPrice}>
            <Grid item className={styles.price_point}>
              <Typography>Tổng điểm tích lũy</Typography>
            </Grid>
            <Grid item className={styles.pricePoint}>
              {formatFloatNumber(point)}
            </Grid>
          </Grid>
          <Grid container xs={12} item justifyContent="space-between" alignItems="center" className={styles.totalPrice}>
            <Grid item className={styles.price_label}>
              <Typography>Tổng tiền</Typography>
            </Grid>
            <Grid item className={styles.price}>
              {formatCurrency(totalPriceAll)}
            </Grid>
          </Grid>
          {/*  isDisplayBtnWaitMore cheeck display button theo config, % đơn,... handleCheckBeforeStatusWareHouse -> check theo status kho */}

          {/* 3 nut button tạm ẩn */}
          <Grid container xs={12} item justifyContent="center" alignItems="center" className={styles.groupActionBtn}>
            {isDisplayBtnWaitMore && handleCheckBeforeStatusWareHouse(statusWareHouse) && (
              <Grid item sm={4} container justifyContent="center" className={!isSendCancelOrder ? styles.disableBtn : styles.blockBtn}>
                <ButtonV2
                  className={clsx(styles.btnWaitMore, isDisableBtnWaitmore ? styles.disableBtn : '')}
                  onClick={toggleBtnWaitMore}
                  disabled={isDisableBtnWaitmore}
                >
                  Chờ thêm
                </ButtonV2>
              </Grid>
            )}
            {isDisplayBtnSendOrder && (
              <Grid item sm={4} container justifyContent="center" className={!isSendCancelOrder ? styles.disableBtn : styles.blockBtn}>
                <ButtonV2 className={clsx(styles.btnOrderSend)} onClick={toggleBtnOrderSend}>
                  Đi đơn luôn
                </ButtonV2>
              </Grid>
            )}
            {(status === ENUM_ORDER_STATUS.CANCEL ||
              status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM ||
              status === ENUM_ORDER_STATUS.CONFIRMED ||
              status === ENUM_ORDER_STATUS.PROCESSING) && (
              <Grid item sm={4} container justifyContent="center" className={!isSendCancelOrder ? styles.disableBtn : styles.blockBtn}>
                <ButtonV2
                  className={clsx(styles.btnRequestCancel, !isSendCancelOrder ? styles.disableBtn : '')}
                  onClick={toggleOpenTicketCancel}
                  disabled={!isSendCancelOrder}
                >
                  Yêu cầu hủy đơn
                </ButtonV2>
              </Grid>
            )}
          </Grid>
          <NewCustomModal
            visible={modalBtnWaitMore}
            onClose={toggleBtnWaitMore}
            title="Xin xác nhận"
            content={`Đơn hàng sẽ cộng thêm thời gian xử lý là ${holdOrderProcessingTime} tiếng, bạn có chắc muốn chờ thêm?`}
            btnOk="Xác nhận"
            btnOnClose="Quay lại"
            className={styles.modalWaitMore}
            onClickOk={handleWaitMore}
          />
          <NewCustomModal
            visible={modalBtnOrderSend}
            onClose={toggleBtnOrderSend}
            title="Xin xác nhận"
            content="Bạn có chắc muốn đi đơn luôn?"
            btnOk="Xác nhận"
            btnOnClose="Quay lại"
            onClickOk={handleSendOrder}
          />
          {openTicketCancel && (
            <TicketFormModal
              visible={openTicketCancel}
              onClose={toggleOpenTicketCancel}
              ticketType="ORDER"
              status={status}
              orderId={orderId}
              bankInfo={bankInfo}
              handleCancelRequestOrder={handleCancelRequestOrder}
              optionSelected={REASON_CANCEL_ORDER}
            />
          )}
        </Grid>
      </Grid>
      {(status === 'DELIVERED' || status === 'COMPLETED') && checkReturnProducts ? (
        <TableContainer component={Paper} className={styles.table} elevation={4}>
          <p className={styles.title_list}>Danh sách sản phẩm trả hàng</p>
          <Table className={styles.table}>
            <TableHead>
              <TableRow className={styles.table_title}>
                <TableCell>STT</TableCell>
                <TableCell align="left">Sản phẩm</TableCell>
                <TableCell align="left">Lô/ HSD</TableCell>
                <TableCell align="right">Số lượng trả</TableCell>
                <TableCell align="right">Giá (đ)</TableCell>
                <TableCell align="right">Tổng cộng (đ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsReturn.map((product) => {
                const { price: salePrice, returnInfos = [], returnedQuantity, index, productPrice } = product;
                const { name = '', slug } = product?.productInfo || {};

                return (
                  <Fragment key={uuidV4()}>
                    {returnedQuantity > 0 && (
                      <>
                        <TableRow className={styles.table_row_text}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="left">
                            <LinkComp className={styles.hover_green} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
                              {name}
                            </LinkComp>
                          </TableCell>
                          <TableCell align="left">
                            {returnInfos.length === 1 ? `${returnInfos[0]?.lot || ''}/ ${returnInfos[0]?.expDate || ''}` : '-'}
                          </TableCell>
                          <TableCell align="right">{formatNumber(returnedQuantity)}</TableCell>
                          <TableCell align="right">{formatNumber(salePrice)}</TableCell>
                          <TableCell align="right">{formatNumber(productPrice)}</TableCell>
                        </TableRow>
                        {returnInfos.length > 1 &&
                          returnInfos.map((returnInfo) => (
                            <TableRow key={uuidV4()} className={clsx(styles.table_row_text, styles.bg_gray_1)}>
                              <TableCell />
                              <TableCell align="left">
                                <LinkComp variant="h5" className={styles.hover_green} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
                                  {name}
                                </LinkComp>
                              </TableCell>
                              <TableCell align="left">{`${returnInfo?.lot || ''}/ ${returnInfo?.expDate || ''}`}</TableCell>
                              <TableCell align="right">{formatNumber(returnInfo.quantity)}</TableCell>
                              <TableCell align="right" />
                              <TableCell align="right" />
                            </TableRow>
                          ))}
                      </>
                    )}
                  </Fragment>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right" className={styles.text_total_style}>
                  <b>Tổng Cộng</b>
                </TableCell>
                <TableCell align="right" className={styles.text_total_style}>
                  <b>{formatCurrency(totalReturnedPrice)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetailProductV2;
