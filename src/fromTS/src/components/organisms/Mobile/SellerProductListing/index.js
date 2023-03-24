/* eslint-disable camelcase */
import { Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import ListProductSeller from 'components/mocules/ListProductSeller';
import GridSkeletonProductHorizontal from 'components/organisms/Skeleton/GirdSkeleton';
import { PAGE_SIZE_30 } from 'constants/data';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export default function MV2SellerProductListing({
  products = [],
  currentTab = '',
  page,
  sort = '',
  catName = '',
  name = '',
  total,
  isAuthenticated = false,
  isMobile,
  searchText,
  isFlagship,
  type,
  section,
  isHideTitle = false,
  isMobileV2 = false,
  keywords = '',
}) {
  const [isloading, setIsLoading] = useState(true);
  const pages = Math.ceil(total / PAGE_SIZE_30);
  const router = useRouter();
  const pathName = `/${catName}`;
  const mainRef = useRef(null);
  useEffect(() => {
    setIsLoading(false);
  }, [page, sort, currentTab]);

  const getQueryObject = () => {
    const query = {};
    if (currentTab) {
      query.currentTab = currentTab;
    }
    if (sort) {
      query.sort = sort;
    }
    if (searchText) {
      query.search = searchText;
    }
    if (type) {
      query.type = type;
    }
    if (section) {
      query.section = section;
    }
    return query;
  };

  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;
    setIsLoading(true);
    window.scrollTo({
      top: mainRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
    const query = getQueryObject();
    query.page = value;
    router.push({
      pathname: pathName,
      query,
    });
  };

  const END_MESSAGE = 'Bạn đã xem hết sản phẩm';
  return (
    <div className={styles.wrapper}>
      <div ref={mainRef} className={styles.product_main}>
        <div>
          {name && !isFlagship && (
            <Typography className="product_title" variant="h4" component="h1" style={{ marginTop: 10 }}>
              {name}
            </Typography>
          )}
        </div>
        <main className={clsx(styles.product_listing)}>
          {!isHideTitle && <div style={{ fontFamily: 'ggsm', fontSize: '18px', marginBottom: '10px' }}>Tất cả sản phẩm</div>}
          {isloading ? (
            <GridSkeletonProductHorizontal counts={10} hasPagingTop hasPagingBottom />
          ) : (
            <>
              {products?.length > 0 ? (
                <>
                  <ListProductSeller isMobileV2={isMobileV2} products={products} />
                  {/* MV2: will have paging in case have more than 1 page of product */}
                  {pages > 1 ? (
                    <div className={styles.pagging}>
                      <Pagination
                        count={pages}
                        defaultPage={page}
                        boundaryCount={isMobile ? 1 : 2}
                        siblingCount={isMobile ? 0 : 2}
                        onChange={handleChangePage}
                      />
                    </div>
                  ) : (
                    <Typography className={styles.messageContainer} component="span">
                      {END_MESSAGE}
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  {!isAuthenticated ? (
                    <Alert severity="error">Vui lòng đăng nhập để xem thông tin sản phẩm</Alert>
                  ) : (
                    <Typography variant="body1" className={clsx(styles.empty, styles.empty_center)}>
                      {keywords !== '' ? (
                        <Typography component="span">
                          Nhà bán hàng này không có sản phẩm với từ khóa <b>"{keywords}"</b> mà bạn đang tìm kiếm
                        </Typography>
                      ) : (
                        <Typography>Đang tải...</Typography>
                      )}
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
