/* eslint-disable no-shadow */
import { CircularProgress } from '@material-ui/core';
import { getData } from 'clients';
import Container from 'components-v2/atoms/Mobile/Container';
import MInput from 'components-v2/atoms/Mobile/MInput';
import MobileV2ProductCardHorizontal from 'components-v2/organisms/Mobile/ProductCardHorizontal';
import { PAGE_SIZE_30 } from 'constants/data';
import { SEARCH_ICON } from 'constants/Images/mobile/Icons';
import { useCart } from 'context';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import Router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductServiceV2 } from 'services';
import { getLinkTagDeal } from 'utils';
import { debounceFunc200, debounceFunc500 } from 'utils/debounce';
import styles from './styles.module.css';

/**
 * August 011 2022
 * Tạo giao diện trang đặt hàng nhanh mobilev2
 * https://buymed.atlassian.net/browse/APO-709
 */

const TEXT_DEFAULT = '';

const QuickOrderListMobileScreen = (props) => {
  const { text = '' } = props;
  const didMountRef = useRef(false);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(text || TEXT_DEFAULT); // query hiện lên UI
  const [queryFetching, setQueryFetching] = useState(text || TEXT_DEFAULT); // query dùng để fetch data (bị deplay)
  const [products, setProducts] = useState([]);
  const [loadingNewKeyWords, setLoadingNewKeyWords] = useState(false);
  const [MAP_CACHE] = useState(new Map());
  const key = `query-${query || 'null'}-page-${page}`;
  const { mapDataProduct } = useCart();
  const cacheMiddleWare = useCallback(async (keyMapCache, fetch) => {
    if (MAP_CACHE[keyMapCache]) {
      return mapDataProduct(MAP_CACHE[keyMapCache]);
    }
    const res = await fetch();
    MAP_CACHE[keyMapCache] = res;
    return res;
  }, []);

  let message = 'Bạn đã xem hết sản phẩm';

  if (products.length <= 0) {
    message = loadingNewKeyWords ? '' : `Không có sản phẩm với từ khóa "${queryFetching}"`;
  }
  const handleClearInput = useCallback(() => {
    setQuery('');
    setQueryFetching('');
  }, []);

  const handleChangeQuery = useCallback((event) => {
    setQuery(event.target.value);
    debounceFunc500(() => {
      // deplay 500ms khi user tìm kiếm
      setQueryFetching(event.target.value);
    });
  });

  const changeRouter = async (keywords) => {
    debounceFunc200(() => {
      Router.replace(
        {
          pathname: '/quick-order',
          query: { ...Router.query, text: keywords || '' },
        },
        undefined,
        { shallow: true },
      );
    });
  };
  useDidUpdateEffect(() => {
    let isStaleValue = false; // variable using for 'Clean Up Async Requests'
    (async () => {
      setLoadingNewKeyWords(true);
      setPage(1);
      const productResponse = await cacheMiddleWare(key, async () => {
        const result = await ProductServiceV2.searchProductsQuickOrder(queryFetching, 1);
        return getData(result);
      });
      if (!isStaleValue) {
        setProducts(productResponse);
        setHasMore(productResponse.length >= PAGE_SIZE_30);
        setLoadingNewKeyWords(false);
        changeRouter(queryFetching);
      }
    })();

    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return () => {
      isStaleValue = true;
    };
  }, [queryFetching]);

  useEffect(() => {
    let isStaleValue = false; // variable using for 'Clean Up Async Requests'
    (async () => {
      let result = [];
      if (didMountRef.current) {
        if (page > 1) {
          const productResponse = await cacheMiddleWare(key, async () => {
            result = await ProductServiceV2.searchProductsQuickOrder(queryFetching, page);
            return getData(result);
          });

          if (!isStaleValue) {
            setProducts([...products, ...productResponse]);
            setHasMore(productResponse.length >= PAGE_SIZE_30);
          }
        }
      } else {
        // TODO: will fetch in first time,
        // if have query.text, will fetch with query.text
        // if not have, will call default list product of QuickOrder
        const productResponse = await cacheMiddleWare(key, async () => {
          result = Router.query.text
            ? await ProductServiceV2.searchProductsQuickOrder(Router.query.text, 1)
            : await ProductServiceV2.loadDataQuickOrder({ page: 1 });
          didMountRef.current = true;
          return getData(result);
        });
        if (!isStaleValue) {
          setProducts(productResponse);
          setHasMore(productResponse.length >= PAGE_SIZE_30);
        }
      }
    })();

    return () => {
      isStaleValue = true;
    };
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const textMess = (
    <p style={{ textAlign: 'center', wordBreak: 'break-word' }}>
      <b>{message}</b>
    </p>
  );
  const renderLoading = (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
      <CircularProgress size="20px" />
    </div>
  );
  return (
    <Container className={styles.container}>
      <div style={{ flex: 1 }}>
        <div
          style={{ position: 'sticky', top: '48px', right: '-1px', paddingBottom: '10px', paddingTop: '5px', backgroundColor: '#f5f5f5', zIndex: 10 }}
        >
          <MInput
            value={query}
            leftIcon={SEARCH_ICON}
            placeholder="Tìm kiếm..."
            onChange={handleChangeQuery}
            onClear={handleClearInput}
            loadingFetch={loadingNewKeyWords}
          />
        </div>
        <InfiniteScroll
          dataLength={products.length}
          endMessage={textMess}
          hasMore={hasMore}
          loader={renderLoading}
          next={fetchMoreData}
          style={{ overflow: 'hidden !important' }}
        >
          {products?.map((product) => (
            <MobileV2ProductCardHorizontal key={`product-cart-horizontal-${product.sku}`} isMobile product={product} link={getLinkTagDeal(product)} />
          ))}
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default QuickOrderListMobileScreen;
