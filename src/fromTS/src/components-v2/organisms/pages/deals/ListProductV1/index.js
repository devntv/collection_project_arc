import { Pagination } from '@material-ui/lab';
import { GridSkeletonProductHorizontal } from 'components/organisms';
import NewPromotionProduct from 'components/organisms/NewPromotionProduct';
import { PAGE_SIZE_30 } from 'constants/data';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import productsWithPriority from '../productsWithPriority';
import styles from '../styles.module.css';

const ListProductV1 = ({ products, total, page, mainRef, pages, pathName, isMobile }) => {
  const [isloading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;
    setIsLoading(true);
    window.scrollTo({
      top: mainRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
    const query = { page };
    query.page = value;
    router.push({
      pathname: pathName,
      query,
    });
  };

  const productsPriority = productsWithPriority(products);

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const dataSku = [];
    products?.forEach((item) => dataSku.push(item?.sku));
    const controller = new AbortController();
    const { signal } = controller;

    getPromoLists({ skus: [...dataSku], getVoucherInfo: false, signal });

    return () => controller.abort();
  }, [products]);

  return (
    <>
      {isloading ? (
        <div className={styles.skeContainer}>
          <GridSkeletonProductHorizontal pages={isMobile ? 4 : pages} counts={PAGE_SIZE_30} hasPagingTop hasPagingBottom />
        </div>
      ) : (
        <>
          <NewPromotionProduct isHalfProgress total={total} products={productsPriority} catName="products" />
          {pages > 1 && (
            <div className={styles.pagging}>
              <Pagination count={pages} page={page} boundaryCount={isMobile ? 1 : 2} siblingCount={isMobile ? 0 : 2} onChange={handleChangePage} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ListProductV1;
