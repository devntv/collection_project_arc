/* eslint-disable no-nested-ternary */
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { isValid } from 'clients';
import clsx from 'clsx';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import { LinkComp } from 'components/atoms';
import TagComponent from 'components/mocules/TagComponent';
import { ARR_REMOVE_PRODUCT, SELLER_GROUP } from 'constants/Enums';
import { MISSING_IMAGE, STORE_IMAGE_DEFAULT } from 'constants/Images';
import { LOGO_MEDX } from 'constants/Images/default';
import { BULK_ORDER, BULK_ORDER_CART } from 'constants/Paths';
import { useCart, useProduct, useSetting } from 'context';
import * as FileSaver from 'file-saver';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';
import { NotifyUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStoreImage } from 'utils/ImageFallback';
import * as XLSX from 'xlsx';
import useBulkOrderProducts from 'zustand-lib/useBulkOrderProducts';
import styles from './styles.module.css';

const DynamicCustomModal = dynamic(() => import('components/mocules/CustomModal'), {
  ssr: false,
});

const IS_NOTIFY = false;
const IS_ALLOW_EXPORT_INVOICE_TAG = true;

const RowItem = memo(({ product = {}, isExportInvoice = false }) => {
  const { realQuantity = 0, quantity = 0, displayPriceFormated = 0, itemRate = 0 } = product;
  // check tag cận date
  const isNearExpiration = product?.lotDates?.find((item) => item?.isNearExpired === true) || false;

  return (
    <>
      <Divider className={styles.divider} />
      <Grid
        container
        alignItems="center"
        className={clsx(styles.item_container, (product?.errorCode || product?.errorMessageProduct) && styles.err_products)}
      >
        <Grid item xs={5} container alignItems="center">
          <Grid item xs={2} className={styles.avatar_seller}>
            <ImageFallbackProductImage
              fallbackSrc={MISSING_IMAGE}
              src={(product?.imagesProxy && `${product?.imagesProxy[0]}`) || MISSING_IMAGE}
              alt="product-img"
              width={52}
              height={52}
              quality={100}
              title={product?.name}
              className={styles.product_image}
            />
          </Grid>
          <Grid item xs={9} style={{ marginLeft: '10px' }} container direction="column">
            <LinkComp href={`/product/${product?.slug || ''}/loading`} prefetch={false} className={styles.p_tb5}>
              <Typography className={styles.text_product_name}>{product?.name || '(Không có)'}</Typography>
            </LinkComp>
            <div className={styles.tags_container}>
              <TagComponent product={{ ...product, expiredDate: isNearExpiration?.expiredDate || product?.expiredDate || '' }} />
            </div>
            {realQuantity > 0 && quantity > realQuantity && isExportInvoice && (
              <Typography className={styles.text_err_limit}>Chỉ mua được tối đa {realQuantity} sản phẩm</Typography>
            )}
          </Grid>
        </Grid>
        {product?.errorCode || product?.errorMessageProduct ? (
          <Grid item xs={7} container justifyContent="flex-end">
            <Typography align="right" className={styles.text_err_message}>
              {product?.errorMessage || product?.errorMessageProduct || ''}
            </Typography>
          </Grid>
        ) : !isExportInvoice ? (
          <Grid item xs={7} container justifyContent="flex-end">
            <Typography align="right" className={styles.text_err_message}>
              Sản phẩm không xuất được hoá đơn
            </Typography>
          </Grid>
        ) : realQuantity === 0 ? (
          <Grid item xs={7} container justifyContent="flex-end">
            <Typography align="right" className={styles.text_err_message}>
              Sản phẩm hết lượt mua trong ngày
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item xs={2}>
              <Typography align="right">
                {realQuantity} / {quantity || '(Không có)'}
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ paddingRight: '10px' }}>
              <Typography align="right">
                {displayPriceFormated} / {formatCurrency(itemRate) || '(Không có)'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography align="right" className={styles.pr_39}>
                {formatCurrency(realQuantity * product?.displayPrice) || '(Không có)'}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
});

const SellerItems = memo(({ data = {} }) => {
  const isExportInvoice = IS_ALLOW_EXPORT_INVOICE_TAG || ![SELLER_GROUP.DOITAC, SELLER_GROUP.HANGMUAHO].includes(data.sellerGroupCode);
  const isHiddenSeller = !isExportInvoice;
  const { listProduct = [] } = data;
  const sortListProduct = [...listProduct];
  sortListProduct.sort((a, b) => {
    if (a?.errorMessageProduct || a?.errorCode) {
      return 1;
    }
    if (b?.errorMessageProduct || b?.errorCode) {
      return -1;
    }
    return 0;
  });

  return (
    <div className={clsx(styles.seller_items_container, !isExportInvoice && styles.err_seller)}>
      <Grid container alignItems="center" className={clsx(styles.seller_items_title)}>
        <Grid item xs={4} className={styles.avatar_seller}>
          {isExportInvoice ? (
            <LinkComp href={data?.sellerSlug && data?.isActiveSeller ? data?.sellerData?.linkStore : data?.sellerData?.linkSeller || ''}>
              <div className={styles.sellerAvatar}>
                {data?.sellerName === 'Dược Phẩm MEDX' ? (
                  <ImageFallbackStoreImage src={`${LOGO_MEDX}?size=origin`} className={styles.sellerIcon} width={68} height={23} alt="" />
                ) : (
                  <ImageFallbackStoreImage src={data?.sellerData?.avatar[0]} width={52} height={52} quality={100} />
                )}
                <Typography className={styles.text_seller_name}>{data?.sellerName}</Typography>
              </div>
            </LinkComp>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {!isHiddenSeller && (
                <>
                  <div className={styles.sellerAvatar}>
                    <ImageFallbackStoreImage src={data?.sellerData?.avatar[0]} width={52} height={52} quality={100} />
                  </div>
                  <Typography className={styles.text_seller_name}>{data?.sellerName}</Typography>
                </>
              )}
            </div>
          )}
        </Grid>
        <Grid item xs={3} container direction="column" justifyContent="flex-end">
          <Typography align="right">SL (sản phẩm)</Typography>
          <Typography align="right">Thực tế / Trong file</Typography>
        </Grid>
        <Grid item xs={3} container direction="column" justifyContent="flex-end" style={{ paddingRight: '10px' }}>
          <Typography align="right">Đơn giá (đ)</Typography>
          <Typography align="right">Thực tế / Trong file</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="right" className={styles.pr_39}>
            Thành tiền (đ)
          </Typography>
        </Grid>
      </Grid>
      {sortListProduct.length > 0 &&
        sortListProduct.map((product) => <RowItem key={`${product.sku}`} product={product} isExportInvoice={isExportInvoice} />)}
    </div>
  );
});

const InfoRow = ({ title = '', data = '' }) => (
  <div className={styles.info_row}>
    <span className={styles.info_title}> {title}</span>
    <span className={styles.info_result}>{data}</span>
  </div>
);

function BulkOrderProducts() {
  const router = useRouter();
  const { products = [] } = useBulkOrderProducts((state) => state);
  const { mapSeller = new Map(), mapStoreActives = new Map(), getNameSeller } = useSetting();
  const groupSeller = {};
  const defaultEstCartObj = {
    totalQuantity: 0,
    realQuantity: 0,
    estPrice: 0,
    productsAddToCart: [],
    errorProducts: [],
    overLimitQuantityOrderProducts: [],
  };

  // todo: @tien đẩy logic ra ngoài
  // convert data
  const estimateCart = products?.reduce((acc, val) => {
    // cal est cart
    const { totalQuantity, realQuantity, estPrice, productsAddToCart } = acc;
    let newRealQuantity = realQuantity;
    let newEstPrice = estPrice;
    let newTotalQuantity = totalQuantity;
    const newProductsAddToCart = productsAddToCart;

    // get seller info
    const { sellerCode, tags = [] } = val || {};
    const sellerInfo = mapSeller?.get(sellerCode) || null;
    // todo: @tien dùng tag enum
    const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;

    let sellerGroupCode = '';
    let sellerName = '';
    let sellerGroupCodeType;

    // todo: @tien improve remove logic  seller name
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
    } else {
      sellerName = 'Đối Tác Của Thuocsi';
      sellerGroupCode = SELLER_GROUP.DOITAC;
      sellerGroupCodeType = SELLER_GROUP.DOITAC;
    }
    let sellerData = groupSeller[sellerGroupCode];
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
        productTags: tags || [],
      };
      groupSeller[sellerGroupCode] = sellerData;
    }
    // map data
    // todo: @tien dùng tag enum
    const isHaveVat = tags?.indexOf('HOADONNHANH') >= 0 || false;
    if (isHaveVat) {
      sellerData.listProduct.unshift(val);
    } else {
      sellerData.listProduct.push(val);
    }
    sellerData.isSelectedAll = false;
    groupSeller[sellerGroupCode] = sellerData;

    // add sp có thể xuất hoá đơn
    if (!IS_ALLOW_EXPORT_INVOICE_TAG) {
      if (![SELLER_GROUP.HANGMUAHO, SELLER_GROUP.DOITAC].includes(sellerGroupCode) && !val?.errorMessageProduct && !val?.errorCode) {
        const totalPrice = val?.displayPrice * val?.realQuantity;
        newTotalQuantity += val?.quantity;
        newEstPrice += totalPrice;
        newRealQuantity += val?.realQuantity;
        newProductsAddToCart.push(val);
      }
    } else if (!val?.errorMessageProduct && !val?.errorCode) {
      const totalPrice = val?.displayPrice * val?.realQuantity;
      newTotalQuantity += val?.quantity;
      newEstPrice += totalPrice;
      newRealQuantity += val?.realQuantity;
      newProductsAddToCart.push(val);
    }

    return {
      totalQuantity: Number(newTotalQuantity),
      realQuantity: Number(newRealQuantity),
      estPrice: newEstPrice,
      productsAddToCart: newProductsAddToCart,
    };
  }, defaultEstCartObj);
  const [isLoading, setIsLoading] = useState(false);

  // group data by seller
  const groupsMapOrder = Object.keys(groupSeller).map((key) => groupSeller[key]);
  groupsMapOrder.sort((a, b) => {
    if (a.sellerGroupCode === SELLER_GROUP.MEDX) return -1;
    if (b.sellerGroupCode === SELLER_GROUP.MEDX) return 1;

    if (a.sellerGroupCode === SELLER_GROUP.HANGMUAHO) return 1;
    if (b.key === SELLER_GROUP.HANGMUAHO) return -1;

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
  const transformProducts = groupsMapOrder.map((item) => {
    const { sellerCode = '' } = item;
    const seller = { code: sellerCode };
    const sellerInfo = getNameSeller({ seller });
    const { linkStore = '', linkSeller = '', avatar = [] } = sellerInfo;
    const sellerData = { linkStore, linkSeller, avatar };

    return { ...item, sellerData };
  });

  // modal confirm
  const [openConfirm, toggleConfirm] = useModal();

  // handle cart
  const { cartItems = [], removeAllCartItems, updateCartItem } = useCart();

  const clearCurrentCart = async () => {
    // if (cartItems?.length > 0) {
    //   await Promise.all(cartItems?.map((item) => removeCartItem(item, false)));
    //   NotifyUtils.success('Xoá giỏ hàng thành công');
    // }
    if (cartItems?.length > 0) {
      await removeAllCartItems(true);
    }
  };

  const addProductsToCart = async (items = []) => {
    if (items?.length === 0) return false;
    if (items?.length === 1) {
      const [product] = items;
      const itemRes = await updateCartItem(
        {
          product,
          q: parseFloat(product.realQuantity),
        },
        false,
        false,
        IS_NOTIFY,
      );

      if (!isValid(itemRes)) return false;
      return true;
    }
    // add first item to create cart
    // if first item create cart failed => continue with next item
    const [firstItem, ...restItems] = items;
    let first = firstItem;
    let others = restItems;
    let isContinue = true;

    while (isContinue) {
      // eslint-disable-next-line no-await-in-loop
      const firstItemRes = await updateCartItem(
        {
          product: first,
          q: parseFloat(first.realQuantity),
        },
        false,
        false,
        IS_NOTIFY,
      );

      if (!isValid(firstItemRes)) {
        if (others?.length === 1) {
          const [next] = others;
          first = next;
          others = [];
        } else if (others?.length === 0) {
          return false;
        } else {
          const [next, ...restNext] = others;
          first = next;
          others = restNext;
        }
      } else {
        isContinue = false;
      }
    }
    // add other items to cart
    if (others?.length > 0) {
      await Promise.all(
        others.map((item) => {
          const body = {
            product: item,
            q: parseFloat(item?.realQuantity),
          };
          return updateCartItem(body, false, false, IS_NOTIFY);
        }),
      );
    }

    return true;
  };

  const { getProductBySkus } = useProduct();
  const revalidateProducts = async (data) => {
    if (!data || data.length === 0) return [false, []];
    const revalidateSkus = data.map((item) => item?.sku);
    const mapProduct = await getProductBySkus({ skus: revalidateSkus, getPrice: true });
    // const listProduct = Array.from(mapProduct.values())
    const validProducts = [];
    data.forEach((val) => {
      const updateProduct = { ...val };
      const findProduct = mapProduct?.get(val?.sku) || null;
      if (findProduct) {
        const {
          isDeal = false,
          availableProducts = 0,
          isCampaign = false,
          tags = [],
          lotDates = [],
          deal = null,
          maxQuantity: productMaxQuantity,
          maxQuantityPerDay,
          quantityPurchasedToday,
          statusData = null,
        } = findProduct;
        const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;
        const listMaxQuantity = [productMaxQuantity];
        // nếu có số theo ngày thì mới tính
        if (maxQuantityPerDay > 0) {
          listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
        }
        // limit theo ngày ( tìm min ) , nếu < 0 thì set lại về 0
        let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);

        if (maxQuantityProduct < 0) {
          maxQuantityProduct = 0;
        }

        const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
        if (isNearExpiration && statusData) {
          maxQuantityProduct = statusData?.quantity;
        }
        // check quantity order
        if (maxQuantityProduct > 0 && updateProduct?.realQuantity > maxQuantityProduct) {
          updateProduct.realQuantity = maxQuantityProduct;
        }
        if (maxQuantityProduct === 0) {
          updateProduct.realQuantity = 0;
        }
        // check if has export ivoice => add to cart
        if (!IS_ALLOW_EXPORT_INVOICE_TAG) {
          const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;
          if (isVAT && maxQuantityProduct > 0) {
            validProducts.push(updateProduct);
          }
        } else if (maxQuantityProduct > 0) {
          validProducts.push(updateProduct);
        }
      }
    });

    if (mapProduct?.size === 0) return [false, []];

    return [true, validProducts];
  };

  const handleSubmitAddToCart = async () => {
    toggleConfirm();
    setIsLoading(true);
    const [isHaveProducts, validProducts] = await revalidateProducts(estimateCart.productsAddToCart);
    if (!isHaveProducts) {
      NotifyUtils.error('Tạo giỏ hàng thất bại');
      setIsLoading(false);
      return;
    }
    await clearCurrentCart();
    debounceFunc500(async () => {
      const isSuccess = await addProductsToCart(validProducts);

      if (!isSuccess) {
        NotifyUtils.error('Tạo giỏ hàng thất bại');
        setIsLoading(false);
      } else {
        NotifyUtils.success('Tạo giỏ hàng thành công');
        router.push(BULK_ORDER_CART);
      }
    });
  };

  const numberProductsNotAddToCart = products?.length - estimateCart.productsAddToCart?.length || 0;

  const handleExportFile = useCallback(() => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `Products`;
      const sheetName = `products`;
      const mapListData = [];
      transformProducts.forEach((item) => {
        const { sellerName, listProduct, sellerGroupCode } = item;
        const mapProducts = listProduct.map((prd) => {
          const {
            sellerCode: sellerCodeItem = '',
            name = '',
            quantity = 0,
            sku = '',
            displayPrice = 0,
            slug = '',
            errorMessageProduct = '',
            errorMessage = '',
          } = prd;
          if ([SELLER_GROUP.DOITAC, SELLER_GROUP.HANGMUAHO].includes(sellerGroupCode)) {
            return {
              A: '',
              B: slug,
              C: sku,
              D: '',
              E: name,
              F: sellerCodeItem,
              G: '',
              H: 'Sản phẩm không xuất được hoá đơn',
              I: displayPrice,
              K: displayPrice * quantity,
            };
          }
          if (errorMessageProduct || errorMessage) {
            return {
              A: '',
              B: slug,
              C: sku,
              D: '',
              E: name,
              F: sellerCodeItem,
              G: sellerName,
              H: errorMessageProduct || errorMessage || 'Sản phẩm lỗi',
              I: '',
              K: '',
            };
          }
          return {
            A: '',
            B: slug,
            C: sku,
            D: '',
            E: name,
            F: sellerCodeItem,
            G: sellerName,
            H: quantity,
            I: displayPrice,
            K: displayPrice * quantity,
          };
        });
        mapListData.push(...mapProducts);
      });
      const wb = XLSX.utils.book_new();
      wb.SheetNames.push(sheetName);
      const ws = XLSX.utils.aoa_to_sheet([]);
      XLSX.utils.sheet_add_json(
        ws,
        [
          {
            A: 'Tạo bởi',
            B: 'Slug',
            C: 'SKU (*)',
            D: 'Mã sản phẩm',
            E: 'Tên sản phẩm',
            F: 'Mã Nhà Cung Cấp',
            G: 'Tên Nhà Cung Cấp',
            H: 'Số lượng (*)',
            I: 'Đơn giá (vnđ)',
            K: 'Tổng giá trị',
          },
        ],
        {
          skipHeader: true,
          origin: 'A1',
        },
      );
      XLSX.utils.sheet_add_json(ws, mapListData, {
        skipHeader: true,
        origin: 'A2',
      });
      wb.Sheets[sheetName] = ws;
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch {
      NotifyUtils.error('Xuất file không thành công');
    }
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <LoadingBM />
          {/* <Button className={styles.btn_upload} onClick={() => setIsLoading(false)}>
            Thử lại
          </Button> */}
        </Grid>
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className={styles.container}>
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
          <Typography className={styles.text_cart_empty}>Không có sản phẩm</Typography>
          <div className={styles.btn_back_container}>
            <Button className={styles.btn_back} onClick={() => router.push(BULK_ORDER)}>
              Về trang import sản phẩm
            </Button>
          </div>
        </Grid>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.left_content}>
        <Grid container direction="column" style={{ rowGap: '15px' }}>
          <Grid item container alignItems="center" style={{ columnGap: '15px' }}>
            <Button className={styles.btn_export_cart} onClick={handleExportFile}>
              Xuất file
            </Button>
            {numberProductsNotAddToCart > 0 && (
              <Typography style={{ fontFamily: 'ggsr', fontSize: '16px', color: '#ff4842' }}>
                Có tổng cộng {numberProductsNotAddToCart} sản phẩm lỗi
              </Typography>
            )}
          </Grid>
          {transformProducts?.length > 0 && transformProducts.map((item) => <SellerItems key={item?.sellerName} data={item} />)}
        </Grid>
      </div>
      <div className={styles.right_content}>
        <div style={{ position: 'sticky', width: '100%', top: '55px' }}>
          <Grid container className={styles.info_cart}>
            <Typography className={styles.title_text}>Giỏ Hàng</Typography>
            <InfoRow title="Tổng số lượng" data={`${estimateCart.realQuantity} / ${estimateCart.totalQuantity}`} />
            <Divider className={styles.divider} />
            <div className={styles.info_row}>
              <span className={styles.info_title}>Tổng cộng</span>
              <span className={styles.total_text}>{formatCurrency(Math.max(estimateCart.estPrice, 0))}</span>
            </div>
            <Divider className={styles.divider} />
            <Button disabled={estimateCart.realQuantity === 0} className={styles.btn_add_to_cart} onClick={toggleConfirm}>
              Cho vào giỏ hàng
            </Button>
          </Grid>
          <Typography className={styles.btn_text_back} onClick={() => router.push(BULK_ORDER)}>{`< Quay lại`}</Typography>
        </div>
      </div>
      {openConfirm && (
        <DynamicCustomModal
          visible={openConfirm}
          onClose={toggleConfirm}
          title="Xác nhận thay đổi giỏ hàng"
          btnOk="Xác nhận"
          onClickOk={handleSubmitAddToCart}
          btnOnClose="Không"
        >
          <Grid container direction="column" alignItems="center" style={{ rowGap: '5px' }}>
            <Typography className={styles.title_text}>Thao tác này sẽ xoá giỏ hàng hiện có và thay thế bằng các sản phẩm mà bạn xác nhận.</Typography>
            <Typography className={styles.title_text}>Bạn có chắc muốn tiếp tục ?</Typography>
          </Grid>
        </DynamicCustomModal>
      )}
    </div>
  );
}

export default BulkOrderProducts;
