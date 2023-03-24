/* eslint-disable react/no-array-index-key */
import { Button, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { isValidWithoutData, LIMIT_DEFAULT, WishlistClient } from 'clients';
import clsx from 'clsx';
import ProductCardHorizontalV2 from 'components-v2/mocules/ProductCardHorizontalV2';
import NewPaginationV2 from 'components-v2/organisms/NewPaginationV2';
import { SEARCHV2ACTIVE_ICON } from 'constants/Images';
import { PRODUCTS_LOADING_URL, WISHLIST } from 'constants/Paths';
import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useState } from 'react';
import { NotifyUtils, StringUtils } from 'utils';
import getLinkTagDeal from 'utils/getLinkTagDeal';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const SearchInput = ({ isMobile = false, isFocus = false, value, onChange, handleFocus, onBlur, ...restProps }) => (
  <TextField
    className={clsx(styles.root_input_search, isFocus && styles.border_focus)}
    value={value}
    {...restProps}
    classes={{
      root: clsx(isMobile ? styles.root_input_mobile : styles.root_input),
    }}
    onChange={onChange}
    inputProps={{
      maxLength: 250,
    }}
    // eslint-disable-next-line react/jsx-no-duplicate-props
    InputProps={{
      startAdornment: (
        <InputAdornment position="start" className={styles.search_ic}>
          <ImageFallbackStatic src={SEARCHV2ACTIVE_ICON} height="20px" width="20px" />
        </InputAdornment>
      ),
      placeholder: 'Tìm kiếm tên thuốc trong danh sách sản phẩm quan tâm ...',
      autoComplete: 'off',
      type: 'search',
    }}
    onFocus={handleFocus}
    onBlur={onBlur}
  />
);

const WishlistV2 = ({ isMobile = false, data, pageSize, allData }) => {
  const router = useRouter();
  const { offset = 0 } = router?.query || {};
  const limit = LIMIT_DEFAULT;
  const currentPage = Number((+offset + limit) / limit);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const [currentSearchPage, setCurrentSearchPage] = useState(1);

  const handleChangePage = (_, page) => {
    const offsetByPage = (page - 1) * limit;
    router.push({
      pathname: router.pathname,
      query: {
        offset: offsetByPage,
        limit,
      },
    });
  };

  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const handleDeleteProductWishlist = async (index) => {
    const res = await WishlistClient.deleteItemWishlist(listData[index]?.sku);
    if (isValidWithoutData(res)) {
      NotifyUtils.success(`Đã xóa ${listData[index]?.name} khỏi danh sách yêu thích`);
      // còn 1 sp trong wishlist
      if (listData?.length === 1) {
        router.push(WISHLIST);
      } else {
        router.reload();
      }
    } else {
      NotifyUtils.error(`Xóa sản phẩm ${listData[index]?.name} yêu thích thất bại`);
    }
  };

  // search wishlist products
  const wishlistSearchUnsignedKeys = useMemo(
    () =>
      allData?.map((item) => {
        const newName = StringUtils.changeAlias(item?.name)?.toLowerCase();
        return { ...item, unsignedKey: newName };
      }),
    [allData],
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleSearchWishlist = (val) => {
    const newVal = val?.trim() || '';
    setSearchKeyword(val);
    if (newVal === '') {
      setListData(data);
      setCurrentSearchPage(1);
    } else {
      const newSearchData = wishlistSearchUnsignedKeys?.filter((item) => item?.unsignedKey?.includes(StringUtils.changeAlias(newVal)?.toLowerCase()));
      setDataSearch(newSearchData);
      // pagination
      if (newSearchData?.length > limit) {
        const firstPageSearch = newSearchData?.slice(0, limit);
        setListData(firstPageSearch);
      } else {
        setListData(newSearchData);
      }
    }
  };

  const handleChangeSearchPage = (_, page) => {
    setCurrentSearchPage(page);
    const offsetByPage = (page - 1) * limit;
    const newData = dataSearch?.slice(offsetByPage, offsetByPage + limit) || [];
    setListData(newData);
  };

  if (isMobile) {
    return (
      <div>
        <div className={clsx(styles.search_container, styles.search_mobile, isMobileV2 && styles.search_container_mv2)}>
          <SearchInput
            value={searchKeyword}
            onChange={(e) => handleSearchWishlist(e.target.value)}
            handleFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            isFocus={isFocus}
            isMobile={isMobile}
          />
        </div>
        {listData && listData?.length > 0 ? (
          <>
            <div className={styles.wishlist_products_container}>
              {listData.map(
                (item, index) =>
                  item && (
                    <ProductCardHorizontalV2
                      key={item?.sku}
                      product={item}
                      isMobile={isMobile}
                      type="quick-order"
                      index={index}
                      wishlist
                      handleDelete={() => handleDeleteProductWishlist(index)}
                      link={getLinkTagDeal(item)}
                    />
                  ),
              )}
            </div>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                {searchKeyword ? (
                  <NewPaginationV2
                    key={uuidv4()}
                    totalPage={Math.ceil(dataSearch?.length / LIMIT_DEFAULT)}
                    curPage={currentSearchPage}
                    handleChange={handleChangeSearchPage}
                    isMobile={isMobile}
                  />
                ) : (
                  <NewPaginationV2 key={uuidv4()} totalPage={pageSize} curPage={currentPage} handleChange={handleChangePage} isMobile={isMobile} />
                )}
              </div>
            </Grid>
          </>
        ) : (
          <div className={styles.not_found_wrapper}>
            <Typography className={styles.not_found_text}>Không tìm thấy sản phẩm</Typography>
            <Button className={styles.btn_back_products} onClick={() => router.push(PRODUCTS_LOADING_URL)}>
              quay lại danh sách sản phẩm
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wishlist_container}>
      <div className={styles.wishlist_title_container}>
        <Typography className={styles.wishlist_title}>Danh sách sản phẩm bạn quan tâm</Typography>
      </div>
      <div className={styles.search_container}>
        <SearchInput
          value={searchKeyword}
          onChange={(e) => handleSearchWishlist(e.target.value)}
          handleFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          isFocus={isFocus}
        />
      </div>
      {listData && listData?.length > 0 ? (
        <>
          {listData.map((item, index) => (
            <ProductCardHorizontalV2
              key={`prd-wish-list${item?.sku}${index}`}
              product={item}
              type="quick-order"
              index={index}
              wishlist
              handleDelete={() => handleDeleteProductWishlist(index)}
              link={getLinkTagDeal(item)}
            />
          ))}
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              {searchKeyword ? (
                <NewPaginationV2
                  key={uuidv4()}
                  totalPage={Math.ceil(dataSearch?.length / LIMIT_DEFAULT)}
                  curPage={currentSearchPage}
                  handleChange={handleChangeSearchPage}
                />
              ) : (
                <NewPaginationV2 key={uuidv4()} totalPage={pageSize} curPage={currentPage} handleChange={handleChangePage} />
              )}
            </div>
          </Grid>
        </>
      ) : (
        <div className={styles.not_found_wrapper}>
          <Typography className={styles.not_found_text}>Không tìm thấy sản phẩm</Typography>
          <Button className={styles.btn_back_products} onClick={() => router.push(PRODUCTS_LOADING_URL)}>
            quay lại danh sách sản phẩm
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(WishlistV2);
