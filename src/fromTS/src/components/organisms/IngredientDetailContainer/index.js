import { Divider, Grid } from '@material-ui/core';
import clsx from 'clsx';
import NewPaginationV2 from 'components-v2/organisms/NewPaginationV2';
import { ProductDetailTabs } from 'components/mocules';
import ProductCardNew from 'components/mocules/ProductCardNew';
import { PAGE_SIZE_30 } from 'constants/data';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { getLinkTagDeal } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import styles from './styles.module.css';

export const tabsProductData = [
  { id: 1, label: 'Thông tin chung', value: '1', code: 'description' },
  { id: 2, label: 'Chỉ định', value: '2', code: 'indication' },
  { id: 3, label: 'Liều lượng - Cách dùng', value: '3', code: 'dosage' },
  { id: 4, label: 'Chống chỉ định', value: '4', code: 'contraindication' },
  { id: 5, label: 'Tương tác thuốc', value: '5', code: 'drugInteraction' },
  { id: 6, label: 'Bảo quản', value: '6', code: 'storage' },
  { id: 7, label: 'Quá liều', value: '7', code: 'drugOverdose' },
  { id: 8, label: 'Dược lực học', value: '8', code: '' },
  { id: 9, label: 'Dược động học', value: '9', code: '' },
];

const IngredientDetailContainer = ({ ingredient, products, page, total, isMobile }) => {
  const [value, setValue] = React.useState('1');
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const router = useRouter();
  const pages = Math.ceil(total / PAGE_SIZE_30);

  const handleChangePage = (event, pageNumber) => {
    if (page === pageNumber) return;
    router.push({
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ingredientDescription = {};
  tabsProductData.forEach((data) => {
    ingredientDescription[data.code] = ingredient[data.code] || '';
  });
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
    <Grid className={styles.container} container>
      <Grid item xs={12}>
        <h1 className={styles.title} style={{ textAlign: 'center' }}>
          {ingredient.name}
        </h1>
      </Grid>
      <Grid className={clsx(styles.detail_tab, isMobileV2 && styles.mobileDetail_tab)} item style={{ padding: '0 10vw' }}>
        <ProductDetailTabs
          product={{ ...ingredient, description: ingredientDescription }}
          data={tabsProductData}
          value={value}
          handleChange={handleChange}
          isMobileV2={isMobileV2}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginTop: '30px!important' }} />
      </Grid>
      <Grid item xs={12}>
        <div className={styles.title}>
          <h1>Danh sách các thuốc có {ingredient.name}</h1>
        </div>
      </Grid>
      <Grid container spacing={1} justifyContent="center">
        {products && products.length > 0 ? (
          products?.map((item, index) => (
            <Grid key={uuidv4()} item xl={2} lg={3} md={4} xs={6} className={styles.customGrid}>
              <ProductCardNew
                product={item}
                key={`item-product-${item.slug}`}
                tag
                category
                index={index}
                value={item.quantity || 0}
                link={getLinkTagDeal(item)}
                isLinkTagDeal
              />
            </Grid>
          ))
        ) : (
          <p className={styles.noData}>Chưa có thuốc dùng hoạt chất này</p>
        )}
      </Grid>
      {pages > 1 && (
        <div className={styles.paginationWrapper}>
          <NewPaginationV2 totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
        </div>
      )}
    </Grid>
  );
};

export default IngredientDetailContainer;
