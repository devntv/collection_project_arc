/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* react/self-closing-comp */
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { MISSING_IMAGE } from 'constants/Images';
import { ENUM_TAG_CODES } from 'constants/Tags';
import { useCart } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TAG_HANG_DAT_TRUOC } from 'sysconfig';
import { myLoader } from 'utils';
import { formatCurrency, formatFloatNumber, formatNumber } from 'utils/FormatNumber';
import { isEmpty } from 'utils/ValidateUtils';
import { v4 as uuidV4 } from 'uuid';
import CustomModal from '../CustomModal';
import SellerInfo from '../SellerInfo';
import TagType from '../TagType';
import styles from './styles.module.css';

const STATUS_CHECK_DELIVER = ['WAIT_TO_DELIVER', 'DELIVERING', 'DELIVERED', 'COMPLETED'];

const OrderDetailProduct = ({
  products,
  promoName,
  totalDiscount,
  totalPrice: totalPriceAll,
  paymentMethodFee,
  deliveryMethodFee,
  price,
  extraFee = 0,
  status,
  orderItems,
  point = null,
}) => {
  const [isShowOutBoundInfo, toggle] = useModal();
  const [isShowPopupConfirm, togglePopupConfirm] = useModal();
  let totalReturnedPrice = 0;
  let productsReturn = [];
  let totalUndeliverablePrice = 0;
  let undeliverableProducts = [];
  const { updateCartItem, updateCart, cartItems } = useCart();
  // kiểm tra có có sản phẩm xuất kho chưa
  const checkOutbondProducts = !!products?.find((product) => product?.outboundQuantity >= 0 && product?.outboundInfos);
  const isShowOutboundUndeliverable = !!products.find((product) => product?.outboundQuantity > 0);
  // kiểm tra có sản phẩm nào không giao
  const checkUndeliverableProducts = !!products.find((product) => product?.quantity - (product?.outboundQuantity || 0) > 0);
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
  };

  return (
    <>
      {STATUS_CHECK_DELIVER.indexOf(status) >= 0 && checkUndeliverableProducts && isShowOutboundUndeliverable ? (
        <TableContainer component={Paper} className={styles.table} elevation={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <p className={styles.title_list}>Danh sách sản phẩm không giao</p>
            </Grid>
            <Grid item>
              <Tooltip title="Thêm lại sản phẩm vào giỏ hàng">
                <IconButton size="small" className={styles.btn} onClick={handleReOrder}>
                  <ShoppingCartIcon className={styles.icon} />
                </IconButton>
              </Tooltip>
              {isShowPopupConfirm && (
                <CustomModal
                  icon={false}
                  visible={isShowPopupConfirm}
                  onClose={handleClosePopup}
                  title="Đặt hàng lại"
                  content={`Bạn có muốn thêm ${undeliverableProducts.length} sản phẩm không giao được trong đơn hàng vào giỏ hàng hiện tại?`}
                  btnOk="Thêm vào giỏ hàng"
                  onClickOk={updateUndeliverableProductsCart}
                />
              )}
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
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
                  <React.Fragment key={uuidV4()}>
                    {product?.quantity - (product?.outboundQuantity || 0) > 0 ? (
                      <>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="left">
                            <LinkComp variant="h5" className={styles.product_name} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
                              {name}
                            </LinkComp>
                          </TableCell>
                          <TableCell align="right">{formatNumber(undeliverableQuantity || 0)}</TableCell>
                          <TableCell align="right">{formatNumber(salePrice)}</TableCell>
                          <TableCell align="right">{formatNumber(undeliverablePrice)}</TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right">
                  <b>Tổng Cộng</b>
                </TableCell>
                <TableCell align="right">
                  <b>{formatCurrency(totalUndeliverablePrice)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}

      <TableContainer component={Paper} className={styles.table} elevation={4}>
        <p className={styles.title_list}>Danh sách sản phẩm đã đặt</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {checkOutbondProducts && (
                  <Button onClick={toggle} className={styles.toggle_button}>
                    {isShowOutBoundInfo ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </Button>
                )}
              </TableCell>
              <TableCell />
              <TableCell colSpan={status !== 'COMPLETED' ? '2' : '1'}>Sản phẩm</TableCell>
              <TableCell align="center">Lô/ HSD</TableCell>
              {status === 'COMPLETED' && (
                <Tooltip title="Điểm tích lũy của từng sản phẩm được làm tròn xuống, tính đến số thập phân số 2">
                  <TableCell align="center">
                    Tổng điểm tích lũy
                    <span className={styles.icon_point}>
                      <ErrorRoundedIcon />
                    </span>
                  </TableCell>
                </Tooltip>
              )}
              <TableCell align="center">Số lượng</TableCell>
              {status === 'COMPLETED' && <TableCell align="center">Số lượng thực nhận</TableCell>}
              <TableCell align="center">Giá (đ)</TableCell>
              <TableCell align="right">Tổng cộng (đ)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => {
                const {
                  price: salePrice,
                  totalPrice,
                  quantity,
                  isImportant,
                  comboList = [],
                  outboundInfos,
                  outboundQuantity,
                  type,
                  sku: skuProduct,
                  totalPoint = null,
                } = product;
                const {
                  imagesProxy = [],
                  name = '',
                  slug = '',
                  seller = null,
                  isGift,
                  tags,
                  statusData,
                  requireGPPMessage,
                } = product?.productInfo || {};
                return (
                  <React.Fragment key={uuidV4()}>
                    <TableRow key={uuidV4()} className={clsx(styles.product_row, comboList?.length > 0 ? styles.has_combo : '')}>
                      <TableCell align="center">
                        <StarIcon style={{ color: isImportant ? '#f9b514' : '' }} />
                      </TableCell>
                      <TableCell>
                        <LinkComp href={`/product/${slug || ''}`}>
                          <Image
                            loader={myLoader}
                            src={!isEmpty(imagesProxy) ? `${imagesProxy[0]}` : MISSING_IMAGE}
                            alt={name}
                            width={120}
                            height={80}
                          />
                        </LinkComp>
                      </TableCell>
                      <TableCell align="left" className={styles.product_table_name} colSpan={status !== 'COMPLETED' ? '2' : '1'}>
                        {isGift ? (
                          name
                        ) : (
                          <>
                            <LinkComp variant="h5" href={`/product/${slug || ''}`} className={styles.product_name} padding="0px">
                              {name}
                            </LinkComp>
                            <div className={styles.product_tags}>
                              {/* gom vào tag flash sale và mega sale vào khuyến mãi  */}
                              {(type === 'DEAL' || type === 'CAMPAIGN') && tags.indexOf('CAMPAIGN') === -1 && tags.indexOf('DEAL') === -1 && (
                                <Link href="/deals" prefetch={false}>
                                  <div className={styles.discount_flag}>
                                    <span className={styles.discount_flag_text}>Khuyến mãi</span>
                                  </div>
                                </Link>
                              )}
                              {/* {tags && tags.length > 0 && tags.map((item) => <TagType key={uuidV4()} item={item} exp={statusData?.date || null} />)} */}
                              {(orderItems &&
                                orderItems
                                  ?.find(({ sku }) => sku === skuProduct)
                                  ?.tags?.map((item) => <TagType key={uuidV4()} item={item} exp={statusData?.date || null} />)) ||
                                ''}
                              {/* history deal tag */}
                              <div>
                                {orderItems && orderItems?.find(({ sku }) => sku === skuProduct).type === 'DEAL' && tags.indexOf('DEAL') > -1 && (
                                  <TagType key={uuidV4()} item="DEAL" exp={statusData?.date || null} />
                                )}
                                {/* {orderItems &&
                                  orderItems?.map((item) => {
                                    if (item?.type !== 'DEAL') return null;
                                    return <TagType key={uuidV4()} item={item.type} exp={statusData?.date || null} />;
                                  })} */}
                              </div>
                            </div>
                          </>
                        )}
                        {isGift && (
                          <div className={styles.product_tags}>
                            <div className={styles.gift_flag}>
                              <span className={styles.gift_flag_text}>Quà tặng</span>
                            </div>
                          </div>
                        )}

                        <SellerInfo seller={seller} tags={tags} />
                        <>
                          {/* require GPP */}
                          {requireGPPMessage && <Typography className={styles.text_danger}>{requireGPPMessage}</Typography>}
                        </>
                      </TableCell>
                      <TableCell align="right" />
                      {status === 'COMPLETED' && (
                        <TableCell align="right" className={styles.product_price}>
                          {formatFloatNumber(totalPoint) || 0}
                        </TableCell>
                      )}
                      <TableCell align="right" className={styles.product_price}>
                        {formatNumber(quantity)}
                      </TableCell>
                      {status === 'COMPLETED' && (
                        <TableCell align="right" className={styles.product_price}>
                          {formatNumber(product?.completedQuantity)}
                        </TableCell>
                      )}
                      <TableCell align="right" className={styles.product_price}>
                        {isGift ? '-' : formatNumber(salePrice)}
                      </TableCell>
                      <TableCell align="right">{isGift ? '-' : formatNumber(totalPrice)}</TableCell>
                    </TableRow>
                    {comboList?.length > 0 && (
                      <>
                        <TableRow className={styles.combo_head}>
                          <TableCell align="right" />
                          <TableCell align="right" />
                          <TableCell align="left" colSpan="4">
                            Mua combo bao gồm
                          </TableCell>
                        </TableRow>
                        {comboList?.map((item, key) => {
                          const { name, slug, isGift, price, tags, quantity = 0, totalPrice, productId } = item;
                          return (
                            <TableRow key={productId} className={clsx(styles.combo_row, comboList.length - 1 === key ? styles.last : '')}>
                              <TableCell align="right" />
                              <TableCell align="right" />
                              <TableCell align="left" className={styles.product_table_name}>
                                {isGift ? (
                                  <Typography className={styles.cb_unlink}>{name}</Typography>
                                ) : (
                                  <LinkComp className={styles.cb_link} href={`/product/${slug}`} prefetch={false}>
                                    {name}
                                  </LinkComp>
                                )}
                                <div className={styles.product_tags}>
                                  {tags &&
                                    tags
                                      ?.filter((tag) => tag === ENUM_TAG_CODES.HOADONNHANH || tag === TAG_HANG_DAT_TRUOC)
                                      ?.map((tag) => <TagType key={uuidV4()} item={tag} />)}
                                </div>
                              </TableCell>
                              <TableCell align="right" />
                              <TableCell align="right" />
                              <TableCell align="right" className={styles.product_price}>
                                {formatNumber(quantity)}
                              </TableCell>
                              {status === 'COMPLETED' && <TableCell align="right" />}
                              <TableCell align="right" className={styles.product_price}>
                                {isGift ? '-' : formatNumber(price)}
                              </TableCell>
                              <TableCell align="right">{isGift ? 'Quà Tặng' : formatNumber(totalPrice)}</TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                    {isShowOutBoundInfo && outboundQuantity >= 0 && outboundInfos ? (
                      <>
                        <TableRow className={styles.combo_head} style={{ background: ' rgba(224, 224, 224, 1)' }}>
                          <TableCell align="right" />
                          <TableCell align="left" colSpan="4" style={{ paddingTop: '15px' }}>
                            Danh sách sản phẩm xuất kho
                          </TableCell>
                          <TableCell align="right" />
                          <TableCell align="right" />
                          <TableCell align="right" />
                          <TableCell align="right" />
                          {status === 'COMPLETED' && <TableCell align="right" />}
                        </TableRow>
                        {outboundInfos?.map((info) => (
                          <TableRow key={uuidV4()} style={{ background: ' rgba(246, 246, 247, 1)' }}>
                            <TableCell align="right" />
                            <TableCell align="right" />
                            <TableCell align="left">
                              <LinkComp variant="h5" className={styles.product_name} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
                                {name}h
                              </LinkComp>
                            </TableCell>
                            <TableCell align="center">
                              <Typography className={styles.cb_unlink}>{info?.lot}</Typography>
                              <Typography className={styles.cb_unlink}>{info?.expDate}</Typography>
                            </TableCell>
                            <TableCell align="right" />
                            <TableCell align="right">{info.quantity}</TableCell>
                            <TableCell align="right" />
                            <TableCell align="right" />
                            <TableCell align="right" />

                            {status === 'COMPLETED' && <TableCell align="right" />}
                          </TableRow>
                        ))}
                        {comboList &&
                          comboList?.map((item) =>
                            item?.outboundInfos?.map((info) => (
                              <TableRow key={uuidV4()} style={{ background: ' rgba(246, 246, 247, 1)' }}>
                                <TableCell align="right" />
                                <TableCell align="right" />
                                <TableCell align="left">
                                  <LinkComp
                                    variant="h5"
                                    className={styles.product_name}
                                    href={`/product/${slug || ''}`}
                                    prefetch={false}
                                    padding="0px"
                                  >
                                    {item.name}
                                  </LinkComp>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography className={styles.cb_unlink}>{info?.lot}</Typography>
                                  <Typography className={styles.cb_unlink}>{info?.expDate}</Typography>
                                </TableCell>
                                <TableCell align="right">{info.quantity}</TableCell>
                                <TableCell align="right" />
                                <TableCell align="right" />
                                {status === 'COMPLETED' && <TableCell align="right" />}
                              </TableRow>
                            )),
                          )}
                      </>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              })}
            <TableRow key={uuidV4()} className={styles.product_row}>
              {status === 'COMPLETED' && <TableCell />}
              <TableCell align="right" />
              <TableCell align="right" />
              <TableCell align="right" colSpan="5">
                <div className={styles.total_bottom}>Tạm tính :</div>
                <div className={styles.total_bottom}>Phí theo hình thức thanh toán :</div>
                <div className={styles.total_bottom}>Phí vận chuyển :</div>
                <div className={styles.total_bottom}>Phụ phí:</div>
                {!isEmpty(promoName) && (
                  <div className={styles.total_bottom}>
                    Mã giảm giá <strong>{promoName} :</strong>
                  </div>
                )}
                {status === 'COMPLETED' && (
                  <div className={styles.total_bottom} style={{ fontWeight: 'bold' }}>
                    Tổng điểm tích lũy:
                  </div>
                )}
              </TableCell>
              <TableCell align="right">
                <div className={styles.total_bottom}>{formatNumber(price)}</div>
                <div className={styles.total_bottom}>{formatNumber(paymentMethodFee)}</div>
                <div className={styles.total_bottom}>{formatNumber(deliveryMethodFee)}</div>
                <div className={styles.total_bottom}>{formatNumber(extraFee)}</div>
                {!isEmpty(promoName) && <div className={styles.total_bottom}>{formatNumber(-totalDiscount)}</div>}
                {status === 'COMPLETED' && (
                  <div className={styles.total_bottom} style={{ fontWeight: 'bold' }}>
                    {formatFloatNumber(point)}
                  </div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid className={styles.total_price} container justifyContent="flex-end" style={{ padding: ' 0px 15px 30px 15px' }} spacing={3}>
          <Grid item className={styles.price_label}>
            <b>Tổng cộng</b>
          </Grid>
          <Grid item className={styles.price}>
            {formatCurrency(totalPriceAll)}
          </Grid>
        </Grid>
      </TableContainer>

      {(status === 'DELIVERED' || status === 'COMPLETED') && checkReturnProducts ? (
        <TableContainer component={Paper} className={styles.table} elevation={4}>
          <p className={styles.title_list}>Danh sách sản phẩm trả hàng</p>
          <Table>
            <TableHead>
              <TableRow>
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
                  <React.Fragment key={uuidV4()}>
                    {returnedQuantity > 0 ? (
                      <>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell align="left">
                            <LinkComp variant="h5" className={styles.product_name} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
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
                            <TableRow key={uuidV4()} style={{ background: ' rgba(246, 246, 247, 1)' }}>
                              <TableCell />
                              <TableCell align="left">
                                <LinkComp variant="h5" className={styles.product_name} href={`/product/${slug || ''}`} prefetch={false} padding="0px">
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
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right">
                  <b>Tổng Cộng</b>
                </TableCell>
                <TableCell align="right">
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

export default OrderDetailProduct;
