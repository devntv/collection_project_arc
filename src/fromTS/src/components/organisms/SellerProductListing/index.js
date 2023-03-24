/* eslint-disable camelcase */
import { Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import ListProductSeller from 'components/mocules/ListProductSeller';
import { PAGE_SIZE_30 } from 'constants/data';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ProductServiceV2 } from 'services';
import { v4 as uuidv4 } from 'uuid';
import GridSkeletonProductHorizontal from '../Skeleton/GirdSkeleton';
import styles from './style.module.css';

export default function SellerProductListing({
  products: productList = [],
  currentTab = '',
  page,
  sort = '',
  catName = '',
  name = '',
  total: totalProduct,
  isAuthenticated = false,
  isMobile,
  searchText,
  isFlagship,
  type,
  section,
  isMobileV2 = false,
  queryUrl,
  // keywords = '',
}) {
  const [isloading, setIsLoading] = useState(true);
  const [listPrdSection, setListPrdSection] = useState({});

  const products = section ? listPrdSection.data : productList;
  const total = section ? listPrdSection.totalPrd : totalProduct;

  const pages = Math.ceil(total / PAGE_SIZE_30);
  const router = useRouter();
  const pathName = `/${catName}`;
  const mainRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, [page, sort, currentTab]);

  const loadDataSection = async () => {
    if (section) {
      const listProductRes = await ProductServiceV2.loadProductWithFilter({
        offset: (page - 1) * PAGE_SIZE_30,
        filter: { sectionStore: queryUrl?.section },
      });
      const { total: totalPrd = 0, data = [] } = listProductRes;
      setListPrdSection({ totalPrd, data });
    }
  };
  useEffect(() => {
    loadDataSection();
  }, [page, section]);

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

  // const EMPTY_MESSAGE = `Nhà bán hàng này không có sản phẩm với từ khóa "${keywords}" mà bạn đang tìm kiếm `;
  return (
    <div className={styles.wrapper}>
      <div ref={mainRef} className={styles.product_main}>
        <div>
          {name && !isFlagship && (
            <Typography className="product_title" variant="h4" component="h1" style={{ marginTop: 10 }}>
              {name}
            </Typography>
          )}
          {/* {isloading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <SearchResultText total={total} page={page} pages={pages} limit={products?.length} />
          )} */}
        </div>
        <main className={clsx(styles.product_listing, isMobileV2 && styles.product_listing_mv2)} key={uuidv4()}>
          {isloading ? (
            <GridSkeletonProductHorizontal counts={isMobileV2 ? 10 : 30} hasPagingTop hasPagingBottom />
          ) : (
            <>
              {products?.length > 0 ? (
                <>
                  <ListProductSeller isMobileV2={isMobileV2} products={products} />
                  {pages > 1 && (
                    <div className={styles.pagging}>
                      <Pagination
                        count={pages}
                        defaultPage={page}
                        boundaryCount={isMobile ? 1 : 2}
                        siblingCount={isMobile ? 0 : 2}
                        onChange={handleChangePage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {!isAuthenticated ? (
                    <Alert severity="error">Vui lòng đăng nhập để xem thông tin sản phẩm</Alert>
                  ) : (
                    <Typography variant="body1" className={clsx(styles.empty, isMobileV2 && styles.empty_center)}>
                      {isMobileV2 ? 'Không có sản phẩm' : `Nhà bán hàng này chưa có sản phẩm nào bán tại khu vực của bạn.`}
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
