/* eslint-disable camelcase */
import { faFilter, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, FormControl, Grid, NativeSelect, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import NewPaginationV2 from 'components-v2/organisms/NewPaginationV2';
import { Button, CheckBox } from 'components/atoms';
import { AlertRequestLogin, SearchResultText } from 'components/mocules';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import CategoryFilterProduct from 'components/mocules/CategoryFilterProduct';
import ProductCardNew from 'components/mocules/ProductCardNew';
import TabComponents from 'components/mocules/TabComponents';
import FilterProductOnMobile from 'components/organisms/FilterProductOnMobile';
import { EXTRA_CATEGORY } from 'constants/Category';
import { palette } from 'constants/Colors';
import { ENUMS_FILTER_CATEGORY_TYPE } from 'constants/Enums';
import { PAGE_SIZE_30, SORT_PRODUCT, SORT_PRODUCT_NOT_LOGIN } from 'constants/data';
import { useSetting } from 'context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getLinkTagDeal } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import styles from './style.module.css';

const ERR_STATUS = ['SUSPENDED', 'STOP_PRODUCING', 'OUT_OF_STOCK', 'STOP_SELLING'];

export default function ProductListing({
  products = [],
  currentTab = '',
  page,
  sort = '',
  slug = '',
  catName = '',
  name = '',
  total,
  isAuthenticated = false,
  isMobile = false,
  text,
  isAvailable,
  isRedirectTab = false,
}) {
  const getTagBySlug = useStore((state) => state.getTagBySlug);
  const pages = Math.ceil(total / PAGE_SIZE_30);
  const router = useRouter();
  const pathName = isRedirectTab ? '/products' : `/${catName}/${slug}`;
  const [open, toggleOpenFilter] = useModal();
  const mainRef = useRef(null);
  const [breadscrumbs, setBreadscrumbs] = useState([]);
  /*
  Sort theo giá cao -> thấp or thấp -> cao
  */
  if (sort === 'PRICE_DESC' || sort === 'PRICE_ASC') {
    // eslint-disable-next-line no-param-reassign
    products = products?.sort((a, b) => {
      // sẽ move những product ko hiện giá => cuối array
      if (ERR_STATUS.includes(a?.status) || a?.errorMessageProduct) {
        return 1;
      }
      if (ERR_STATUS.includes(b?.status) || b?.errorMessageProduct) {
        return -1;
      }
      return sort === 'PRICE_DESC' ? b?.displayPrice - a?.displayPrice : a?.displayPrice - b?.displayPrice;
    });
  }

  /*
  khi search SP
  Nếu có sản phẩm hết hàng - thì kiểm tra xem nếu có SP khác có hàng thì ẩn SP hết hàng đi ( cùng productId )
  còn nếu ko có SP còn hàng thì hiện
  Anh Hoàng Yêu cầu - 17Jun20222
  */
  if (text) {
    // eslint-disable-next-line no-param-reassign
    products = products.filter((item) => {
      if (item.status === 'OUT_OF_STOCK') {
        if (products.find((prd) => item.productId === prd.productId && prd.status !== 'OUT_OF_STOCK')) {
          return false;
        }
      }
      return true;
    });
  }

  // lấy state chung từ context
  const { categories, topManufacturers, mapCategories } = useSetting();

  const tabs = useStore((state) => state.tabs);

  const SORT_LIST = isAuthenticated ? SORT_PRODUCT : SORT_PRODUCT_NOT_LOGIN;

  const getQueryObject = () => {
    const query = {};
    if (currentTab) {
      query.currentTab = currentTab;
    }
    if (sort) {
      query.sort = sort;
    }
    if (text) {
      query.q = text;
    }
    if (isAvailable) {
      query.isAvailable = isAvailable;
    }
    return query;
  };

  const getTabQuery = (tab) => {
    const query = getQueryObject();
    if (!tab) {
      delete query.currentTab;
    }
    if (!sort) {
      delete query.sort;
    }

    return query;
  };
  const handleChangePage = (event, value) => {
    if (page === value) return;
    router.push({
      query: {
        ...router.query,
        page: value,
      },
    });
  };
  const handleChangeSort = (event) => {
    router.push({
      ...router,
      query: {
        ...router.query,
        sort: event.target.value || undefined,
      },
    });
  };

  const SelectedTagMobile = () => {
    const tabName = tabs?.filter((item) => item.slug === currentTab);
    const tabNameValue = tabName?.length > 0 ? tabName[0]?.name : 'Tất cả sản phẩm';
    return (
      <div className={styles.tagsMobile}>
        <div className={styles.badgeGray}>
          <FontAwesomeIcon icon={faTag} /> {tabNameValue}
        </div>
        {name !== tabNameValue && <div className={styles.badgeGray}>{name}</div>}
      </div>
    );
  };

  useEffect(() => {
    const defaultBreadscrumbs = [
      { name: 'Trang chủ', url: '/' },
      { name: 'Sản phẩm', url: `/products` },
    ];
    if (Object.keys(router.query).length > 0) {
      const { query, asPath, pathname } = router;
      if (query.currentTab) {
        const tabName = tabs?.filter((item) => item.slug === currentTab) || [];
        const tabNameValue = tabName?.length > 0 ? tabName[0]?.name : 'Tất cả sản phẩm';
        const item = { name: tabNameValue, url: `/products?currentTab=${query.currentTab}` };
        defaultBreadscrumbs.push(item);
      }
      if (query.slug) {
        const slugUrl = `${router.pathname}`.replace('[slug]', query.slug);
        const tagDetail = getTagBySlug(query.slug);

        if (tagDetail?.name) {
          const item = { name: tagDetail.name, url: `/${slugUrl}` };
          defaultBreadscrumbs.push(item);
        } else if (slugUrl && name) {
          let slugName = name;
          if (pathname?.includes('manufacturers')) {
            const manufacture = topManufacturers.find((item) => item.slug === query.slug);
            slugName += manufacture?.shortName ? ` - (${manufacture.shortName})` : '';
          }
          const item = { name: slugName, url: `/${slugUrl}` };
          defaultBreadscrumbs.push(item);
        }
      }
      if (query.tag) {
        const valueNameExtraCategoryTag = EXTRA_CATEGORY?.find((item) => item.code === query.tag);
        if (valueNameExtraCategoryTag) {
          const { name: nameTag, link } = valueNameExtraCategoryTag;
          const item = { name: nameTag, url: link };
          defaultBreadscrumbs.push(item);
        }
      }
      if (query.filter) {
        let categoryFilters = [];
        try {
          categoryFilters = JSON.parse(query.filter || '{}').categoryFilters || [];
        } catch (e) {
          categoryFilters = [];
        }

        const normalCategory = categoryFilters.filter((item) => !item.isCombined);
        const combinedCategory = categoryFilters.filter((item) => item.isCombined);

        const categoryNames = normalCategory
          ?.filter((item) => !item.isCombined)
          ?.map((category) => mapCategories.get(category.code)?.name)
          ?.sort((a, b) => a.localeCompare(b))
          ?.join(' | ');

        const newCategoryFilters = categoryFilters
          ?.filter((item) => !item.isCombined)
          ?.map((cat) => ({
            ...cat,
            efficacyCodes: [],
          }));

        if (categoryNames)
          defaultBreadscrumbs.push({
            name: categoryNames,
            url: `/products?filter=${JSON.stringify({ categoryFilters: newCategoryFilters })}`,
          });

        const efficacyMap = {};
        mapCategories.forEach((value) =>
          value.subEfficacies?.forEach((subEff) => {
            efficacyMap[subEff.code] = subEff;
          }),
        );

        const normalEfficacyNames = normalCategory
          ?.filter((item) => !item.isCombined)
          ?.reduce((acc, c) => [...acc, ...(c?.efficacyCodes || [])], [])
          ?.map((code) => efficacyMap[code]?.name);

        const combinedEfficacyNames = combinedCategory?.map((item) => efficacyMap[item.code]?.name);

        const efficacyNames = [...normalEfficacyNames, ...combinedEfficacyNames]?.sort((a, b) => a.localeCompare(b))?.join(' | ');

        if (efficacyNames) defaultBreadscrumbs.push({ name: efficacyNames, url: `/products${asPath}` });
      }
      if (query.text || query.q) {
        const item = { name: `Tìm kiếm: ${query.text || query.q}`, url: `/products${asPath}` };
        defaultBreadscrumbs.push(item);
      }
    }
    setBreadscrumbs(defaultBreadscrumbs);
  }, [router.query]);
  const handleClickHiddenOutOfStock = () => {
    router.push({
      ...router,
      query: {
        ...router.query,
        page: 1,
        isAvailable: !isAvailable,
      },
    });
  };

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.filterMobile}>
          <div className={styles.filterMobileBox}>
            <div className={styles.fRow}>
              <Button onClick={toggleOpenFilter} backgroundColor="#f9b514" className={styles.filterBtn}>
                <FontAwesomeIcon icon={faFilter} />
                <span className={styles.btnText}>Lọc</span>
              </Button>
            </div>
            <div className={styles.fRow}>
              <SelectedTagMobile />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.sidebar}>
          <div className={styles.group}>
            {/* Extra category  */}
            {/* <CategoryFilterProduct categories={EXTRA_CATEGORY} name="Thiết yếu mùa Tết" type={ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY} /> */}
            {/* <hr className={styles.hr} /> */}
            {/* Category : category Drugs  */}
            <CategoryFilterProduct categories={categories} name="Nhóm thuốc" type={ENUMS_FILTER_CATEGORY_TYPE.CATEGORY} />
            <hr className={styles.hr} />
            {/* Category : Manufacturer  */}
            <CategoryFilterProduct categories={topManufacturers} name="Nhà sản xuất" type={ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER} />
          </div>
        </div>
      )}
      <FilterProductOnMobile
        open={open}
        handleClose={toggleOpenFilter}
        maxWidth="md"
        slug={slug}
        pathName={pathName}
        currentTab={currentTab}
        sort={sort}
        text={text}
        tabs={tabs}
        categories={categories}
        manufacturers={topManufacturers}
      />
      <div ref={mainRef} className={clsx(styles.product_main)}>
        <div>
          {name && <Breadcrumbs breadcrumbs={breadscrumbs} />}
          <SearchResultText total={total} page={page} pages={pages} limit={products?.length} />
          {`/${catName}` === `/products` && total > 3 ? (
            <Grid container item xs={12}>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <CheckBox name="filter-out-of-stock" label="Ẩn Sản Phẩm Hết Hàng" onChange={handleClickHiddenOutOfStock} isChecked={isAvailable} />
                <>
                  {isAvailable && (
                    <>
                      <strong>(Đã Ẩn Sản Phẩm Hết Hàng)</strong>
                    </>
                  )}
                </>
              </Box>
            </Grid>
          ) : null}
        </div>
        {!isMobile && <TabComponents query={getTabQuery()} currentTab={currentTab} pathName={pathName} tabs={tabs} />}
        <main className={clsx(styles.product_listing)} key={uuidv4()}>
          <>
            {products && products.length > 0 ? (
              <div className={styles.product_grid_wrapper}>
                {isMobile ? (
                  <>
                    <div className={styles.pagging}>
                      <NewPaginationV2 totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
                    </div>
                    <div className={styles.selectMoblie}>
                      <span className={styles.headSort}>Sắp xếp</span>
                      <FormControl className={styles.formControlMobile}>
                        <NativeSelect
                          className={styles.selectInput}
                          inputProps={{
                            name: 'sort',
                            id: 'sort-product',
                            placeholder: 'sắp xếp',
                            classes: { icon: styles.selectAfter },
                          }}
                          IconComponent={ExpandMoreIcon}
                          onChange={handleChangeSort}
                          value={SORT_LIST?.find((item) => item.value === sort)?.value || SORT_LIST[0]?.value}
                        >
                          {SORT_LIST?.map((item) => (
                            <option key={uuidv4()} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <div className={styles.sort}>
                    <div className={styles.topPagging}>
                      <NewPaginationV2 totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
                    </div>
                    <div className={styles.select}>
                      <span className={styles.headSort}>Sắp xếp</span>
                      <FormControl className={styles.formControl}>
                        <NativeSelect
                          className={styles.selectInput}
                          inputProps={{
                            name: 'sort',
                            id: 'sort-product',
                            placeholder: 'sắp xếp',
                            classes: { icon: styles.selectAfter },
                          }}
                          disabled={text || router?.query?.q || router?.query?.text}
                          IconComponent={ExpandMoreIcon}
                          onChange={handleChangeSort}
                          value={SORT_LIST?.find((item) => item.value === sort)?.value || SORT_LIST[0]?.value}
                          data-test="select-product-filters"
                        >
                          {SORT_LIST?.map((item) => (
                            <option key={uuidv4()} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                )}
                <Grid container>
                  {products.map((item, index) => (
                    <Grid item className={styles.customGrid} xs={6} md={4} key={`product-card-listing-${item.slug}`}>
                      <ProductCardNew
                        product={item}
                        key={`item-product-${item.slug}`}
                        index={index}
                        value={item.quantity || 0}
                        tag
                        category
                        isMobile={isMobile}
                        isHalfProgress
                        link={getLinkTagDeal(item)}
                        isLinkTagDeal
                      />
                    </Grid>
                  ))}
                </Grid>
                <div className={styles.bottomPagging}>
                  <NewPaginationV2 totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
                </div>
              </div>
            ) : (
              <>
                {!isAuthenticated ? (
                  <AlertRequestLogin bgColor={palette.error.lighter} />
                ) : (
                  <Typography variant="body1" className={clsx(styles.empty)}>
                    Không có sản phẩm
                  </Typography>
                )}
              </>
            )}
          </>
        </main>
      </div>
    </div>
  );
}
