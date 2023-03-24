/* eslint-disable camelcase */
import { getData, isValid } from 'clients';
import clsx from 'clsx';
import MInput from 'components-v2/atoms/Mobile/MInput';
import MobileAlert from 'components-v2/atoms/MobileAlert';
import { MOBILE_EXTRA_CATEGORY } from 'components-v2/atoms/MobileAlert/constants';
import MobileBadge from 'components-v2/atoms/MobileBadge';
import { PAGE_SIZE } from 'constants/data';
import {
  MOBILE_ICON_FILTER,
  MOBILE_ICON_SORT_HOT_SALE,
  MOBILE_ICON_SORT_NAME_ASC,
  MOBILE_ICON_SORT_NAME_DESC,
  MOBILE_ICON_SORT_NEWEST,
  MOBILE_ICON_SORT_PRICE_ASC,
  MOBILE_ICON_SORT_PRICE_DESC,
} from 'constants/Images/mobile';
import { SEARCH_ICON } from 'constants/Images/mobile/Icons';
import { useSetting } from 'context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProductServiceV2 } from 'services';
import { debounceFunc100, debounceFunc200, debounceFunc500 } from 'utils/debounce';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import MV2LoadingText from '../LoadingText';
import MV2ProductChildListing from '../ProductChildListing';
import styles from './styles.module.css';

const ERR_STATUS = ['SUSPENDED', 'STOP_PRODUCING', 'OUT_OF_STOCK', 'STOP_SELLING'];
const TEXT_DEFAULT = '';
const PAGE_DEFAULT = 1;

const TYPE_LOADING = {
  PAGING: 'paging',
  SEARCHING: 'searching',
};

const MV2ProductListing = ({
  currentTab = '',
  catName = '',
  isAuthenticated = false,
  isAvailable,
  tag,
  currentDrugCategory,
  currentManufacturer,
  mobileProducts,
  setMobileProducts,
  isHideFilter = false,
  isInit = false,
}) => {
  const router = useRouter();
  const { query, pathname } = router;
  const [openSort, toggleSort] = useModal();
  const [openFilter, toggleFilter] = useModal();
  const mainRef = useRef(null);
  // new mobile product
  const mobileProductScrolling = useMobileV2((state) => state.mobileProductScrolling);
  const [searchPage, setSearchPage] = useState(PAGE_DEFAULT);
  const [displayQuery, setDisplayQuery] = useState(mobileProducts?.keyword || TEXT_DEFAULT); // query display
  const [searchQuery, setSearchQuery] = useState(mobileProducts?.keyword || TEXT_DEFAULT);
  const [mobileLoading, setMobileLoading] = useState({
    isFetching: false,
    loadingScroll: false,
    isHasMore: true,
    isSearching: false,
  });
  const didMountRef = useRef(false);
  const isMobileFilter =
    (currentTab && currentTab !== '') ||
    (currentDrugCategory && currentDrugCategory !== '') ||
    (currentManufacturer && currentManufacturer !== '') ||
    (tag && tag !== '') ||
    false;
  const [MAP_CACHE] = useState(new Map());

  const SortIconList = {
    '': MOBILE_ICON_SORT_HOT_SALE,
    NEWEST: MOBILE_ICON_SORT_NEWEST,
    PRICE_DESC: MOBILE_ICON_SORT_PRICE_DESC,
    PRICE_ASC: MOBILE_ICON_SORT_PRICE_ASC,
    NAME_ASC: MOBILE_ICON_SORT_NAME_ASC,
    NAME_DESC: MOBILE_ICON_SORT_NAME_DESC,
  };

  /*
  Sort theo giá cao -> thấp or thấp -> cao
  */
  if (query.sort === 'PRICE_DESC' || query.sort === 'PRICE_ASC') {
    // eslint-disable-next-line no-param-reassign
    mobileProducts.searchProduct = mobileProducts?.searchProduct.sort((a, b) => {
      // sẽ move những product ko hiện giá => cuối array
      if (ERR_STATUS.includes(a?.status) || a?.errorMessageProduct) {
        return 1;
      }
      if (ERR_STATUS.includes(b?.status) || b?.errorMessageProduct) {
        return -1;
      }
      return query.sort === 'PRICE_DESC' ? b?.displayPrice - a?.displayPrice : a?.displayPrice - b?.displayPrice;
    });
  }

  const handleScrollTop = () => {
    // TODO: Scroll top for iOS and Android device
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const changeRouter = (keywords, num) => {
    debounceFunc200(() => {
      router.replace(
        {
          pathname,
          query: { ...router.query, text: keywords || '', page: num, sort: query.sort || '' },
        },
        undefined,
        { shallow: true },
      );
      setMobileLoading({ ...mobileLoading, isFetching: false, isSearching: false });
    });
  };

  const updateDataProduct = (props) => {
    const updateProps = { ...mobileProducts, ...props };
    if (props?.totalPage === 1 || props?.searchProduct.length >= props?.totalList || !props?.totalList) {
      setMobileLoading({ ...mobileLoading, isHasMore: true });
    }
    setMobileProducts(updateProps);
  };

  const updateDataSearch = (res, num, keyword) => {
    if (res) {
      const { data = [] } = res || {};
      updateDataProduct({ searchProduct: data, totalPage: Math.ceil(res.total / PAGE_SIZE) || 1, numPage: num, keyword, totalList: res.total });
    } else {
      updateDataProduct({ searchProduct: [], totalPage: 0, numPage: 0, keyword, totalList: 0 });
    }
  };

  const mobileFetchData = async (keywords, num, loadingType) => {
    setMobileLoading({ ...mobileLoading, isHasMore: true });
    if (mobileProductScrolling) {
      handleScrollTop();
      setSearchPage(1);
    }
    let res = {};
    const key = `${keywords}-${num}`;
    const dataCache = MAP_CACHE[key];
    if (dataCache) {
      setMobileLoading({ ...mobileLoading, isFetching: true });
      updateDataSearch(dataCache, num, keywords);
      changeRouter(keywords, num);
      return;
    }
    setMobileLoading({ ...mobileLoading, isFetching: loadingType === TYPE_LOADING.PAGING, isSearching: loadingType === TYPE_LOADING.SEARCHING });
    if (keywords === '' || keywords.length === 0) {
      res = await ProductServiceV2.loadDataProductMobileClient({ page: num, query: router.query, isEmptySearch: true });
    } else {
      if (query.sort) {
        delete query.sort;
      }
      res = await ProductServiceV2.searchProductsMobile(keywords, num, router.query);
    }
    if (isValid(res)) {
      MAP_CACHE[key] = res;
      updateDataSearch(res, num, keywords);
    } else {
      updateDataSearch(null, num, keywords);
    }
    changeRouter(keywords, num);
  };
  const handleChangeSearchBox = useCallback((event) => {
    const { value } = event.target;
    setDisplayQuery(value);
    debounceFunc500(() => {
      setSearchQuery(value);
      mobileFetchData(value, 1, TYPE_LOADING.SEARCHING);
    });
  });

  const handleClearInput = () => {
    setMobileLoading({ ...mobileLoading, isSearching: true });
    setDisplayQuery(TEXT_DEFAULT);
    setSearchQuery(TEXT_DEFAULT);
    mobileFetchData(TEXT_DEFAULT, 1);
  };

  const nextFetch = () => {
    if (
      mobileProducts?.totalPage === 1 ||
      mobileProducts?.searchProduct.length === 0 ||
      mobileProducts?.searchProduct.length >= mobileProducts?.totalList ||
      !mobileProducts?.totalList
    ) {
      setMobileLoading({ ...mobileLoading, isHasMore: false });
    }
    if (!mobileLoading.loadingScroll) setSearchPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (didMountRef.current) {
      (async () => {
        if (mobileProductScrolling && searchPage !== 1) {
          setMobileLoading({ ...mobileLoading, loadingScroll: true });
          const result = await ProductServiceV2.searchProductsMobile(searchQuery, searchPage, router.query);
          if (result.status === 'NOT_FOUND' || !mobileLoading.isHasMore) {
            setMobileLoading({ ...mobileLoading, isHasMore: false, loadingScroll: false });
          } else if (mobileLoading.isHasMore) {
            setMobileProducts((prev) => ({ ...prev, searchProduct: [...prev.searchProduct, ...getData(result)], totalList: result.total }));
            setMobileLoading({ ...mobileLoading, loadingScroll: false });
          }
        }
      })();
    } else {
      didMountRef.current = true;
    }
    return () => {
      setMobileLoading({ isFetching: false, isHasMore: true, loadingScroll: false, isSearching: false });
    };
  }, [searchPage]);

  // lấy state chung từ context
  const { categories, topManufacturers } = useSetting();
  const tabs = useStore((state) => state.tabs);
  const defaultOption = {
    name: '',
    ordinalNumber: '',
    slugTab: '',
    slug: '',
    code: '',
  };
  const [filterWithOption, setFilterWithOption] = useState(tabs?.find((tab) => tab.slug === currentTab) || defaultOption);
  const [drugOption, setDrugOption] = useState(categories?.find((drugCat) => drugCat.code === currentDrugCategory) || defaultOption);
  const [manufacturerOption, setManufacturerOption] = useState(
    topManufacturers?.find((manufacturer) => manufacturer.code === currentManufacturer) || defaultOption,
  );
  const [tagOption, setTagOption] = useState(MOBILE_EXTRA_CATEGORY.find((option) => option.code === tag) || defaultOption);
  const handleChangePage = (event, value) => {
    if (mobileProducts?.numPage === value) return;
    debounceFunc100(() => mobileFetchData(mobileProducts?.keyword, value, TYPE_LOADING.PAGING));
    handleScrollTop();
  };
  const quantityFilter = () => {
    let quantity = 0;
    if (filterWithOption?.ordinalNumber !== '') quantity += 1;
    if (drugOption?.code !== '') quantity += 1;
    if (manufacturerOption?.code !== '') quantity += 1;
    if (tagOption?.code !== '') quantity += 1;
    return quantity;
  };

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.mobileWrapper}>
      <div className={styles.mobileFilterContainer}>
        <div className={styles.mobile_filterBox}>
          <div className={styles.mobile_searchInput}>
            <MInput
              value={displayQuery}
              leftIcon={SEARCH_ICON}
              placeholder="Tìm kiếm..."
              onChange={handleChangeSearchBox}
              loadingFetch={mobileLoading.isSearching}
              onClear={handleClearInput}
            />
          </div>
          <div className={styles.mobile_fRow}>
            <MobileBadge disabled={displayQuery !== ''} className={styles.mobileFilter_icon} handleOnClick={toggleSort} optSort={query.sort}>
              <ImageFallbackStatic src={SortIconList[query.sort] || MOBILE_ICON_SORT_HOT_SALE} width="24px" height="24px" layout="fixed" />
            </MobileBadge>
            {!isHideFilter && (
              <MobileBadge className={styles.mobileFilter_icon} quantity={quantityFilter()} handleOnClick={toggleFilter} isProductPage>
                <ImageFallbackStatic src={MOBILE_ICON_FILTER} width="24px" height="24px" layout="fixed" />
              </MobileBadge>
            )}
          </div>
        </div>
      </div>
      <div ref={mainRef} className={styles.mobileProduct_main}>
        <main className={clsx(styles.product_listing, styles.mobileProduct_listing)}>
          {mobileLoading.isSearching || mobileLoading.isFetching ? (
            <div className={clsx(styles.mobile_loader)}>
              <MV2LoadingText />
            </div>
          ) : (
            <MV2ProductChildListing
              isAuthenticated={isAuthenticated}
              mobileProducts={mobileProducts}
              searchQuery={searchQuery}
              isMobileFilter={isMobileFilter}
              tagOption={tagOption}
              drugOption={drugOption}
              manufacturerOption={manufacturerOption}
              filterWithOption={filterWithOption}
              isHasMore={mobileLoading.isHasMore}
              nextFetch={nextFetch}
              handleChangePage={handleChangePage}
              isHideFilterInfo={isHideFilter ? false : isMobileFilter}
              isInit={isInit}
            />
          )}
        </main>
      </div>
      <MobileAlert isOpen={openSort} handleClose={toggleSort} isSort title="Sắp xếp theo" sort={query.sort} />

      <MobileAlert
        isOpen={openFilter}
        handleClose={toggleFilter}
        isFilter
        title="Lọc"
        isAuthenticated={isAuthenticated}
        filterWithOption={filterWithOption}
        drugOption={drugOption}
        manufacturerOption={manufacturerOption}
        setFilterWithOption={setFilterWithOption}
        setDrugOption={setDrugOption}
        setManufacturerOption={setManufacturerOption}
        tabsCategory={tabs}
        height="85%"
        tagOption={tagOption}
        setTagOption={setTagOption}
        isAvailable={isAvailable}
        isShowHideAll={`/${catName}` === `/products` && mobileProducts?.totalList > 3}
        isMobileFilter={isMobileFilter}
      />
    </div>
  );
};

export default React.memo(MV2ProductListing);
