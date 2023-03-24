/* eslint-disable no-nested-ternary */
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { getFirst, isValid } from 'clients';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import { ICON_WISHLIST_DEL_V2 } from 'constants/Icons';
import { ADD_FILE_ICON } from 'constants/Images';
import { useProduct } from 'context';
import * as FileSaver from 'file-saver';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { NotifyUtils, ValidateUtils } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getSlugFromUrl } from 'utils/StringUtils';
import * as XLSX from 'xlsx';
import useBulkOrderProducts from 'zustand-lib/useBulkOrderProducts';
import styles from './styles.module.css';

const DynamicCustomModal = dynamic(() => import('components/mocules/CustomModal'), {
  ssr: false,
});

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const SIZE_LITMIT_FILE = 5; // 5mb
// const ALL_FIELDS = ['sku', 'tên sản phẩm', 'số lượng', 'đơn giá (vnđ)', 'tạo bởi', 'slug', 'mã sản phẩm', 'mã nhà cung cấp', 'tên nhà cung cấp', 'số lượng']
const REQUIRED_FIELDS = ['sku', 'số lượng'];
const mapFields = {
  'tạo bởi': 'createdBy',
  slug: 'slug',
  sku: 'sku',
  'mã sản phẩm': 'itemCode',
  'tên sản phẩm': 'itemName',
  'mã nhà cung cấp': 'vendorCode',
  'tên nhà cung cấp': 'vendorName',
  'số lượng': 'quantity',
  'đơn giá (vnđ)': 'itemRate',
  'tổng giá trị': 'orderAmount',
};

const UploadButton = ({ fileName = '', handleUpload, onDrop, handleResetFile }) => (
  <div className={styles.btn_upload_file}>
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ className: styles.file_name })}>
            <input {...getInputProps()} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '43px' }}>
              {fileName ? (
                <div className={styles.drop_zone_file_name}>
                  <Typography style={{ marginLeft: '14px', fontSize: '12px', fontFamily: 'ggsr' }}>
                    {fileName?.length > 21 ? `${fileName?.slice(0, 20)}...` : fileName}
                  </Typography>
                  <IconButton onClick={handleResetFile}>
                    <ICON_WISHLIST_DEL_V2 className={styles.icon} />
                  </IconButton>
                </div>
              ) : (
                <>
                  <ImageFallbackStatic src={ADD_FILE_ICON} width="13px" height="16px" />
                  <Typography style={{ marginLeft: '14px', fontSize: '12px', fontFamily: 'ggsr' }}>Kéo thả file vào đây</Typography>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
    <label htmlFor="contained-button-file">
      <input
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className={styles.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUpload}
      />
      <Button className={styles.btn_choose_file} component="span">
        Chọn file...
      </Button>
    </label>
  </div>
);

const UploadingProducts = ({ fileName = '', handleUpload, handleGetData, onDrop, handleResetFile }) => (
  <div className={styles.uploading_container}>
    <UploadButton fileName={fileName} handleUpload={handleUpload} onDrop={onDrop} handleResetFile={handleResetFile} />
    <Button className={styles.btn_upload} onClick={handleGetData}>
      Đăng tải
    </Button>
  </div>
);

function BulkOrderImport() {
  const router = useRouter();
  const { getProductBySkus, getDataProductBySlug } = useProduct();
  const { setErrorBulkOrderProducts, clearState, setProducts, setOverLimitQuantityOrderProducts } = useBulkOrderProducts((state) => state);
  const [productsFile, setProductsFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateFileBeforeUpload = (files) => {
    if (files?.length > 1) {
      NotifyUtils.error('Chỉ được gửi tối đa 1 file!');
      return false;
    }

    const file = files[0];
    if (!file) {
      NotifyUtils.error('Sai định dạng file!');
      return false;
    }

    const { type = null, size = 0 } = file;
    if (type !== EXCEL_TYPE) {
      NotifyUtils.error('Sai định dạng file!');
      return false;
    }
    // convert to MB
    if (Number(size / 1000000) > SIZE_LITMIT_FILE) {
      NotifyUtils.error('Kích thước file quá lớn!');
      return false;
    }
    return true;
  };

  const handleUploadExcelFile = (e) => {
    if (!validateFileBeforeUpload(e?.target?.files || [])) return;

    const file = e.target.files[0];
    setProductsFile(file);
  };

  const [errorUpload, toggleErrorUpload] = useModal();

  const validateExcelFile = (rows) => {
    const cols = [];
    const [firstRow, ...restRows] = rows;
    // max column is 10
    let reqColCount = 0;
    // check col name in file
    for (let i = 0; i < 10; i += 1) {
      let isReqCol = false;
      const colName = firstRow[i]?.toLowerCase() || '';
      // eslint-disable-next-line no-loop-func
      REQUIRED_FIELDS.forEach((reqCol) => {
        if (colName.includes(reqCol)) {
          isReqCol = true;
          reqColCount += 1;
          cols.push(mapFields[reqCol]);
        }
      });

      if (!isReqCol) {
        cols.push(mapFields[colName] || '');
      }
    }
    if (reqColCount !== REQUIRED_FIELDS.length) {
      return [false, rows, cols];
    }
    // limit 200 sp
    if (restRows?.length > 200) {
      return [false, restRows, cols];
    }

    return [true, restRows, cols];
  };

  const transformProductFromSlug = async (slug) => {
    const productRes = await getDataProductBySlug({ slug });
    // limit sku
    // const listSkusLimited = [productRes?.sku];
    // const responseSkuHistory = await ProductClientV2.getSkusBuyed({ skuCodes: listSkusLimited });

    if (isValid(productRes)) {
      return getFirst(productRes);
    }
    return null;
  };

  const transformProductFromExcelData = async (rows, colsInfo) => {
    clearState();
    const skus = [];
    const products = [];
    const errorProducts = [];
    const slugs = [];
    const rawData = rows;
    // map from file
    const data = rawData?.map((item) => {
      const mapItem = Object.fromEntries(colsInfo.map((_, i) => [colsInfo[i], item[i]]));
      const {
        createdBy = '',
        slug = '',
        sku = '',
        itemCode = '',
        itemName = '',
        vendorCode = '',
        vendorName = '',
        quantity = 0,
        itemRate = 0,
        orderAmount = '',
      } = mapItem;
      let newSlug = slug;
      if (slug) {
        newSlug = getSlugFromUrl({ url: slug });
        slugs.push(newSlug);
      }

      if (!skus.includes(sku) && sku && quantity) {
        skus.push(sku?.trim());
        return {
          createdBy: createdBy ? `${createdBy}`.trim() : '',
          slug: newSlug ? `${newSlug}`.trim() : '',
          sku: `${sku}`.trim(),
          itemCode: itemCode ? `${itemCode}`.trim() : '',
          itemName: `${itemName}`.trim(),
          vendorCode: vendorCode ? `${vendorCode}`.trim() : '',
          vendorName: vendorName ? `${vendorName}`.trim() : '',
          quantity,
          itemRate,
          orderAmount,
        };
      }

      return {
        createdBy: createdBy ? `${createdBy}`.trim() : '',
        slug: newSlug ? `${newSlug}`.trim() : '',
        sku: '',
        itemCode: itemCode ? `${itemCode}`.trim() : '',
        itemName: itemName ? `${itemName}`.trim() : '',
        vendorCode: vendorCode ? `${vendorCode}`.trim() : '',
        vendorName: vendorName ? `${vendorName}`.trim() : '',
        quantity,
        itemRate,
        orderAmount,
        errsku: sku,
      };
    });

    if (skus.length === 0 && slugs.length === 0) {
      NotifyUtils.error('Không có sản phẩm nào trong file có thể thêm vào giỏ hàng, mời bạn kiểm tra lại file!');
      setIsLoading(false);
      return;
    }
    // find product
    const mapProduct = await getProductBySkus({ skus, getPrice: true });
    // find products from slug
    const slugProducts = await Promise.all(slugs.map((slug) => transformProductFromSlug(slug)));

    if (mapProduct?.size === 0 && slugProducts?.length === 0) {
      NotifyUtils.error('Không có sản phẩm nào trong file có thể thêm vào giỏ hàng, mời bạn kiểm tra lại file!');
      setIsLoading(false);
      return;
    }
    const invalidQuantityProducts = [];
    data.forEach((val) => {
      const findProduct = mapProduct?.get(val?.sku) || slugProducts?.find((prd) => prd?.slug === val?.slug) || null;
      if (findProduct) {
        const { quantity: orderQuantity, itemRate, itemName } = val;
        const {
          isDeal = false,
          lotDates = [],
          deal = null,
          maxQuantity: productMaxQuantity,
          statusData,
          quantityPurchasedToday,
          maxQuantityPerDay,
          maxQuantityPerOrder = 0,
          availableProducts,
          isCampaign = false,
        } = findProduct;

        if (ValidateUtils.isNumber(orderQuantity) && ValidateUtils.isNumber(itemRate)) {
          let realQuantity = orderQuantity > maxQuantityPerOrder ? maxQuantityPerOrder : orderQuantity;
          // find quantity can add to cart (min of limit deal, quantity per order/day, inventory)
          const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;
          const listMaxQuantity = [productMaxQuantity];
          if (maxQuantityPerDay > 0) {
            listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
          }
          let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
          const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
          if (isNearExpiration && statusData) {
            maxQuantityProduct = statusData?.quantity;
          }
          if (maxQuantityProduct > 0 && realQuantity > maxQuantityProduct) {
            realQuantity = maxQuantityProduct;
          }
          if (maxQuantityProduct === 0) {
            realQuantity = 0;
          }

          const productVal = {
            ...findProduct,
            quantity: orderQuantity,
            realQuantity,
            itemRate,
            itemName,
          };

          if (orderQuantity !== realQuantity) {
            invalidQuantityProducts.push(productVal);
          }
          products.push(productVal);
        } else {
          errorProducts.push(val);
        }
      } else {
        errorProducts.push(val);
      }
    });
    setProducts(products);
    setOverLimitQuantityOrderProducts(invalidQuantityProducts);
    setErrorBulkOrderProducts(errorProducts);
    NotifyUtils.success('Tải file lên thành công');
    router.push('/bulk-order');
  };

  const readExcelFile = useCallback(async (file) => {
    const reader = new FileReader();
    reader.onload = async (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows = rawData.filter((item) => Array.isArray(item) && item.length > 0);
      const [isValidFile, data, colsInfo] = validateExcelFile(rows);

      if (!isValidFile) {
        NotifyUtils.error('File Excel không đúng định dạng!');
        setIsLoading(false);
        return;
      }
      try {
        await transformProductFromExcelData(data, colsInfo);
      } catch (error) {
        NotifyUtils.error('File Excel không đúng định dạng!');
        setIsLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const handleSubmitUpload = () => {
    if (!productsFile) {
      NotifyUtils.error('Chưa có file. Hãy upload file lên trước khi đăng tải !');
      return;
    }
    setIsLoading(true);
    readExcelFile(productsFile);
  };

  const onDrop = (files) => {
    if (!validateFileBeforeUpload(files)) return;
    setProductsFile(files[0]);
  };

  const handleDownloadSampleFile = useCallback(() => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `SampleFile`;
      const sheetName = `sample1`;
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
      XLSX.utils.sheet_add_json(
        ws,
        [
          {
            A: 'Nu Tu Anh Ton',
            B: 'thuoc-ho',
            C: 'MEDX.ABC',
            D: 'APHPGEQ1',
            E: 'Thuốc ho',
            F: '1',
            G: 'Default Tax Agency VN',
            H: '30',
            I: '30000',
            K: '900000',
          },
        ],
        {
          skipHeader: true,
          origin: 'A2',
        },
      );
      wb.Sheets[sheetName] = ws;
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <LoadingBM />
          {/* <Button className={styles.btn_upload} onClick={() => setIsLoading(false)}>
            Thử lại
          </Button> */}
        </Grid>
      ) : (
        <>
          <Typography className={styles.title_text}>Chọn file từ máy tính của bạn (.xls hoặc xlsx) để thêm sản phẩm hàng loạt</Typography>
          <UploadingProducts
            onDrop={onDrop}
            fileName={productsFile?.name || ''}
            handleUpload={handleUploadExcelFile}
            handleGetData={handleSubmitUpload}
            handleResetFile={(e) => {
              e.stopPropagation();
              setProductsFile(null);
            }}
          />
          <Grid container direction="column" className={styles.note_upload_text}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ width: '85px', cursor: 'pointer' }}
              onClick={handleDownloadSampleFile}
            >
              <Typography className={styles.text_sample_file}>File mẫu</Typography>
              <CloudDownloadIcon style={{ color: '#ABABAB' }} />
            </Grid>

            <Typography style={{ fontFamily: 'ggsr', fontWeight: '500', fontSize: '16px' }}>Chú ý:</Typography>
            <ul>
              <li>Chỉ đăng tải file excel (đuôi .xlsx)</li>
              <li>Dung lượng file tối đa 5mb</li>
              <li>
                Điền đầy đủ <b>SKU, Tên sản phẩm, Số lượng, Đơn giá (vnđ)</b> để tránh trường hợp sản phẩm bị lỗi khi đăng tải
              </li>
            </ul>
          </Grid>
        </>
      )}
      {errorUpload && (
        <DynamicCustomModal
          visible={errorUpload}
          onClose={toggleErrorUpload}
          title="Xác nhận"
          btnOk="Xác nhận"
          onClickOk={() => {
            toggleErrorUpload();
            setIsLoading(false);
          }}
          btnCloseRender={null}
        >
          <Grid container direction="column" alignItems="center" style={{ rowGap: '5px' }}>
            <Typography className={styles.title_text}>Tải lên file thất bại, mời bạn thực hiện lại.</Typography>
          </Grid>
        </DynamicCustomModal>
      )}
    </div>
  );
}

export default BulkOrderImport;
