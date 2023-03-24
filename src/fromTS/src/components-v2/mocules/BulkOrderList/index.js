import { Button, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import { ARR_REMOVE_PRODUCT, SELLER_GROUP } from 'constants/Enums';
import { STORE_IMAGE_DEFAULT } from 'constants/Images';
import { BULK_ORDER } from 'constants/Paths';
import { useSetting } from 'context';
import * as FileSaver from 'file-saver';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { NotifyUtils } from 'utils';
import * as XLSX from 'xlsx';
import SellerEditItems from '../SellerEditItems';
import styles from './styles.module.css';

function BulkOrderList(props) {
  const {
    isMobile = false,
    cartItems = [],
    totalItemSelected = 0,
    totalItem = 0,
    isSelectedAll = true,
    selectAllCartItem,
    unselectAllCartItem,
    removeCartItem,
    updateCart,
    selectCartItem,
    updateCartItem,
    cartNo,
    isItemInArrayRemove = false,
    handleDeleteErrorItems,
  } = props;
  const router = useRouter();
  const { mapSeller = new Map(), mapStoreActives = new Map(), getNameSeller } = useSetting();
  const groupSeller = {};

  // transfer data
  // get seller info
  cartItems?.forEach((productItem) => {
    const { sellerCode, isVAT, total: totalPrice, productTags, isSelected } = productItem || {};
    const sellerInfo = mapSeller?.get(sellerCode) || null;

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
    } else {
      sellerName = 'Đối Tác Của Thuocsi';
      sellerGroupCode = SELLER_GROUP.DOITAC;
      sellerGroupCodeType = SELLER_GROUP.DOITAC;
    }
    let sellerData = groupSeller[sellerGroupCode];
    // conver data
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
        productTags: productTags || [],
      };
      groupSeller[sellerGroupCode] = sellerData;
    }
    // map data
    const isHaveVat = productTags?.indexOf('HOADONNHANH') >= 0 || false;
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
    groupSeller[sellerGroupCode] = sellerData;
  });

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

  const cartData = groupsMapOrder.map((item) => {
    const { sellerCode = '', productTags = [] } = item;
    const seller = { code: sellerCode, tags: productTags };
    const sellerInfo = getNameSeller({ seller });

    const { linkStore = '', linkSeller = '', avatar = [] } = sellerInfo;
    const sellerData = { linkStore, linkSeller, avatar };
    return { ...item, sellerData };
  });

  const handleExportCartFile = useCallback(() => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `Cart-${cartNo}`;
      const sheetName = `cart1`;
      // map data to file
      const mapListData = [];
      cartData.forEach((mapSellers) => {
        const { sellerGroupCode = '', sellerName = '', listProduct = [] } = mapSellers;
        listProduct.forEach((product) => {
          const { slug = '', sku = '', productCode = '', name = '', quantity = 0, salePrice = 0, total = 0 } = product;
          const mapProduct = {
            A: '',
            B: slug,
            C: sku,
            D: productCode,
            E: name,
            F: sellerGroupCode,
            G: sellerName,
            H: quantity,
            I: salePrice,
            K: total,
          };
          mapListData.push(mapProduct);
        });
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
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  }, []);

  if (cartData?.length === 0) {
    return (
      <div className={styles.container}>
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
          <Typography className={styles.text_cart_empty}>Giỏ hàng của bạn trống</Typography>
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
      {isItemInArrayRemove && (
        <>
          <div>
            <Alert severity="error" style={{ marginBottom: '1rem', fontFamily: 'ggsr' }}>
              Trong giỏ hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán. Xin vui lòng kiểm tra lại thông tin giỏ hàng hoặc{' '}
              <Typography className={styles.text_btn_del} role="button" onClick={handleDeleteErrorItems} component="span">
                <DeleteIcon fontSize="small" style={{ marginTop: '5px' }} /> nhấn vào đây
              </Typography>{' '}
              để xoá tất cả sản phẩm lỗi.
            </Alert>
          </div>
        </>
      )}
      <SellerEditItems
        isMobile={isMobile}
        data={cartData}
        rawProducts={cartItems}
        totalItemSelected={totalItemSelected}
        totalItem={totalItem}
        isSelectedAll={isSelectedAll}
        selectAllCartItem={selectAllCartItem}
        unselectAllCartItem={unselectAllCartItem}
        removeCartItem={removeCartItem}
        updateCart={updateCart}
        selectCartItem={selectCartItem}
        updateCartItem={updateCartItem}
        groupSeller={groupSeller}
        cartNo={cartNo}
        handleExportCart={handleExportCartFile}
      />
    </div>
  );
}

export default memo(BulkOrderList);
