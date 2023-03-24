// eslint-disable-next-line no-shadow
import { Box, CircularProgress, IconButton, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import HeadPage from 'components/atoms/HeadPage';
import { PAGE_SIZE_30 } from 'constants/data';
import { BRAND_NAME } from 'constants/Enums';
import { ICON_MOBILE_ICON_BACK, ICON_MOBILE_ICON_SEARCH_WHITE } from 'constants/Images/mobile/Icons';
import { useCart } from 'context';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductServiceV2 } from 'services';
import { debounceFunc1000 } from 'utils/debounce';
import routerHandler from 'utils/routeHandler';
import ScrollInfiniteProduct from './ScrollInfiniteProduct';
import styles from './styles.module.css';

const NoPaddingIconBtn = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: '#08AC60',
    },
  },
})(IconButton);

const Header = ({ router, handleChangeInput, query }) => (
  <Box className={styles.headerContainer}>
    <IconButton
      classes={{ root: styles.btnBack }}
      onClick={() => {
        router.back();
      }}
    >
      <ICON_MOBILE_ICON_BACK width={20} height={20} />
    </IconButton>
    <TextField
      className={clsx(styles.textField, styles.focus)}
      classes={{
        root: styles.root_input,
      }}
      onChange={handleChangeInput}
      value={query}
      InputProps={{
        placeholder: 'Tìm kiếm...',
        autoComplete: 'off',
        type: 'search',
        classes: { focused: styles.focus },
      }}
    />
    <NoPaddingIconBtn className={styles.searchIcon}>
      <ICON_MOBILE_ICON_SEARCH_WHITE />
    </NoPaddingIconBtn>
  </Box>
);

const ListProductMobileScreen = ({ sellerInfo }) => {
  const router = useRouter();
  const didMountRef = useRef(false);

  const [hasMore, setHasMore] = useState(true);
  const [MAP_PRODUCTS] = useState(new Map());
  const [products, setProducts] = useState({
    data: [],
    total: 0,
  });
  const { mapDataProduct } = useCart();

  const [query, setQuery] = useState(router?.query?.keywords || '');
  const [isFetchingWithQuery, setIsFetchingWithQuery] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async (currentPage = 1, keys = '') => {
    const keyMap = `${currentPage}-${keys}`;

    if (MAP_PRODUCTS[keyMap]) {
      return {
        ...MAP_PRODUCTS[keyMap],
        data: mapDataProduct(MAP_PRODUCTS[keyMap]?.data),
      };
    }

    const { data = [], total } = await ProductServiceV2.getStoreProductClient({
      query: {
        page: currentPage,
      },
      sellerCode: sellerInfo?.sellerCode || '',
      keywords: keys,
      sectionStore: router?.query?.section || '',
    });
    // response trả về tối đa 30 sản phẩm => data.length < 30 => không còn sản phẩn nào ở trang tiếp theo nữa
    setHasMore(data.length >= PAGE_SIZE_30);

    const result = {
      data,
      total,
    };
    MAP_PRODUCTS[keyMap] = result;
    return result;
  }, []);

  const handleFetchMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  const handleChangeInput = (event) => {
    const { value = '' } = event.target;
    setQuery(value);
    routerHandler.changeParameterUrl(
      router,
      {
        ...router.query,
        keywords: value,
        section: '',
      },
      'replace',
    );
    debounceFunc1000(async () => {
      setIsFetchingWithQuery(true);
      const { data, total } = await fetchProducts(1, value);

      setProducts({
        data,
        total,
      });
      setPage(1); // reset page
      setIsFetchingWithQuery(false);
    });
  };

  // fetch data without section
  useEffect(() => {
    (async () => {
      if (didMountRef.current) {
        if (page > 1) {
          const { data } = await fetchProducts(page, query);
          if (data.length > 0) {
            setProducts({
              ...products,
              data: [...products.data, ...data],
            });
          }
        }
      } else {
        const { data = [], total = 0 } = await fetchProducts(1, '');
        setProducts({
          data,
          total,
        });
        didMountRef.current = true;
      }
    })();
  }, [page]);

  return (
    <Box className={styles.leftToRight}>
      <HeadPage title={`${BRAND_NAME} ${sellerInfo?.name}`} />
      <Header router={router} handleChangeInput={handleChangeInput} query={query} />
      <Typography className={styles.storeName} component="div">
        Danh sách sản phẩm của {sellerInfo?.name}
      </Typography>
      {!isFetchingWithQuery && products.data.length !== 0 && (
        <Typography className={styles.totalProduct} component="div">
          Có tất cả <b>{products.total}</b> sản phẩm tìm kiếm
        </Typography>
      )}
      {isFetchingWithQuery && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginLeft: '15px' }}>
          <CircularProgress size={20} />
        </Box>
      )}
      <ScrollInfiniteProduct hasMore={hasMore} page={page} products={products.data} handleFetchMore={handleFetchMore} />
    </Box>
  );
};

export default ListProductMobileScreen;
