import { Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { Modal } from 'components/atoms';
import NewBreadcrumbs from 'components/mocules/Breadcrumbs';
import { BULK_ORDER, BULK_ORDER_LIST } from 'constants/Paths';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import { memo } from 'react';
import useBulkOrderProducts from 'zustand-lib/useBulkOrderProducts';
import styles from './styles.module.css';

const BREADCRUMBS = [
  { name: 'Trang chủ', url: '/' },
  { name: 'Đặt Hàng Số Lượng Lớn', url: `${BULK_ORDER}` },
];

const ErrorProductsModal = memo(({ onClose, visible, products = [] }) => (
  <Modal open={visible} onClose={onClose}>
    <Grid container direction="row" justifyContent="center" alignItems="center" className={styles.modal_wrapper}>
      <IconButton onClick={onClose} className={styles.close_ic}>
        <CloseIcon />
      </IconButton>
      <Typography className={styles.modal_title}>Danh sách sản phẩm không thêm vào giỏ hàng ({products?.length} sản phẩm)</Typography>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        style={{ marginTop: '10px' }}
        className={clsx(products?.length > 15 && styles.modal_large)}
      >
        <ul>
          {products.length > 0 &&
            products.map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={idx}>
                <Typography className={styles.text_err_prd}>
                  {idx + 1} : {item?.name || item?.itemName || '(Không có)'} - {item?.sku || item?.errsku || ''}
                </Typography>
              </li>
            ))}
        </ul>
      </Grid>
    </Grid>
  </Modal>
));

const ErrorProductContent = memo(({ toggle }) => (
  <Grid container alignItems="center" style={{ columnGap: '10px', marginLeft: '8px', marginTop: '12px' }}>
    {/* <Typography className={styles.text_err}>Có {errProducts.length} sản phẩm bị lỗi không thể thêm vào giỏ hàng</Typography> */}
    <Typography className={styles.text_view_err_list} onClick={toggle}>
      Danh sách sản phẩm lỗi trong file
    </Typography>
  </Grid>
));

const BulkOrderContainer = ({ children }) => {
  const router = useRouter();
  const { errorBuklOrderProducts } = useBulkOrderProducts((state) => state);

  const isShowErrText = errorBuklOrderProducts?.length > 0 && router.pathname === BULK_ORDER_LIST;
  // const isShowOverLimitModal = overLimitQuantityOrderProducts?.length > 0 && router.pathname === BULK_ORDER_LIST;

  const [openErrPrds, toggleErrPrds] = useModal(false);
  // const [openOverLimit, toggleOverLitmit] = useModal(isShowOverLimitModal);

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <NewBreadcrumbs breadcrumbs={BREADCRUMBS} />
      </div>
      {isShowErrText && <ErrorProductContent toggle={toggleErrPrds} />}
      {openErrPrds && <ErrorProductsModal onClose={toggleErrPrds} visible={openErrPrds} products={errorBuklOrderProducts} />}
      {/* {openOverLimit && <OverLimitProductsModal onClose={toggleOverLitmit} visible={openOverLimit} products={overLimitQuantityOrderProducts} />} */}
      <div className={styles.content_container}>{children}</div>
    </div>
  );
};

export default memo(BulkOrderContainer);
