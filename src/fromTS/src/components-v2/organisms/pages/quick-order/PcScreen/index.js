/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { isValid } from 'clients';
import { SearchOrder } from 'components/mocules';
import CardInfo from 'components/mocules/CardInfo';
import QuickOrderList from 'components/organisms/QuickOrderList';
import { PAGE_SIZE_30 } from 'constants/data';
import { useCart, useProduct } from 'context';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductServiceV2 } from 'services';
import { gtag, screenOrientation } from 'utils';
import { debounceFunc200 } from 'utils/debounce';
import styles from './style.module.css';

const QuickOderListPcScreen = ({ products = [], isMobile = false, page = '', total = 0, text = '' }) => {
  const { mapDataProduct } = useCart();
  const router = useRouter();
  const curText = router.query?.text || '';
  const curPage = router.query?.page || 1;
  const [MAP_CACHE] = useState(new Map());
  const didMountRef = useRef(false);
  const { getSkuHistoryPerDay, getListViewed } = useProduct();
  const skus = getListViewed();
  const [mobile, setMobile] = useState(isMobile);
  const [keyword, setKeyword] = useState(text);

  const [dataProduct, setDataProduct] = useState({
    totalPage: Math.ceil(total / PAGE_SIZE_30) || 1,
    searchProduct: products,
    numPage: page || 1,
  });

  const changeRouter = useCallback(
    (keywords, num) => {
      const q = keywords && keywords?.length > 2 ? keywords : null;
      router.push(
        {
          pathname: '/quick-order',
          query: { ...router.query, text: keywords || '', page: num, q },
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        },
      );
    },
    [router],
  );

  const updateDataProduct = (props) => {
    const updateProps = { ...dataProduct, ...props };
    setDataProduct(updateProps);
  };

  const updateDataSearch = (res, num) => {
    // cho hiển thị liền  anh nam kêu 02Jun2022
    const { data, total: totalRes } = res || {};
    updateDataProduct({ searchProduct: mapDataProduct(data), totalPage: Math.ceil(totalRes / PAGE_SIZE_30) || 1, numPage: num });
  };

  const fetchData = useCallback(async (keywords, num) => {
    let res = {};
    const key = `${keywords}-${num}`;
    const dataCache = MAP_CACHE[key];
    if (dataCache) {
      updateDataSearch(dataCache, num);
      // scroll to top
      window.scrollTo({
        top: isMobile ? 0 : 100,
        left: 0,
        behavior: 'smooth',
      });

      return;
    }
    // setLoading(true);

    if (!keywords || keywords.length === 0) {
      res = await ProductServiceV2.loadDataQuickOrder({ page: num });
    } else {
      res = await ProductServiceV2.searchProductsQuickOrder(keywords, num);
      // map quanity
    }

    if (isValid(res)) {
      MAP_CACHE[key] = res;
      updateDataSearch(res, num, keywords);
    } else {
      updateDataSearch(null, num, keywords);
    }
    // scroll to top
    window.scrollTo({
      top: isMobile ? 0 : 100,
      left: 0,
      behavior: 'smooth',
    });

    // Tracking GA search product in Quick order page
    gtag.searchInQuickOrder(keywords);
  }, []);

  const handleSearchbox = useCallback((e) => {
    const { value } = e.target;
    debounceFunc200(() => {
      changeRouter(value, 1);
    });
    setKeyword(value);
  }, []);

  const handleChangePage = (event, value) => {
    changeRouter(keyword, value);
  };

  useEffect(() => {
    if (!didMountRef.current) {
      const loadData = () => {
        getSkuHistoryPerDay({ skus });
      };
      loadData();
      const landscape = screenOrientation(window);
      if (landscape) {
        setMobile(false);
      }
      didMountRef.current = true;
    } else {
      setKeyword(curText);
      fetchData(curText, +curPage);
    }
  }, [curText, curPage]);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  return (
    <Container className={styles.wrapper} maxWidth="lg">
      {!mobile && (
        <div style={{ marginBottom: '12px' }}>
          <Typography className={styles.cart_title} variant="h5" component="h3" data-test="title-quick-order-page">
            Đặt hàng nhanh
          </Typography>
        </div>
      )}
      <Grid container spacing={3}>
        <Grid md={8} item className={styles.quick_order_wrapper}>
          <div className={styles.search_input}>
            <SearchOrder onSearch={handleSearchbox} text={keyword} isMobile={mobile} />
          </div>
          {/* san pham  */}
          <QuickOrderList isMobile={mobile} {...dataProduct} keyword={keyword} />
          <div className={styles.pagging}>
            <Pagination count={dataProduct?.totalPage} defaultPage={1} page={dataProduct?.numPage} boundaryCount={2} onChange={handleChangePage} />
          </div>
        </Grid>
        {!mobile && (
          <Grid md={4} item className={styles.mini_cart_rightside_wrapper}>
            {/* gio hang */}
            <CardInfo className={styles.card_info} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default QuickOderListPcScreen;
