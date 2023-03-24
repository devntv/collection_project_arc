/* eslint-disable camelcase */
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import CategoryFilterProduct from 'components/mocules/CategoryFilterProduct';
import TabComponents from 'components/mocules/TabComponents';
// import { EXTRA_CATEGORY } from 'constants/Category';
import { ENUMS_FILTER_CATEGORY_TYPE } from 'constants/Enums';
import { PAGE_SIZE_30 } from 'constants/data';
import { useSetting } from 'context';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import GridSkeletonProductHorizontal from '../Skeleton/GirdSkeleton';
import styles from './style.module.css';

export default function ProductListing({ currentTab = '', slug = '', catName = '', isMobile = false, isMobileV2 = false, isHideFilter = false }) {
  const router = useRouter();
  const pathName = `/${catName}/${slug}`;
  const { categories, topManufacturers } = useSetting();
  const tabs = useStore((state) => state.tabs);

  // const SelectedTagMobile = () => {
  //   const tabName = tabs?.filter((item) => item.slug === currentTab);
  //   const tabNameValue = tabName?.length > 0 ? tabName[0]?.name : 'Tất cả sản phẩm';
  //   return (
  //     <div className={styles.tagsMobile}>
  //       <div className={styles.badgeGray}>
  //         <FontAwesomeIcon icon={faTag} /> {tabNameValue}
  //       </div>
  //       {name !== tabNameValue && <div className={styles.badgeGray}>{name}</div>}
  //     </div>
  //   );
  // };

  return (
    <div className={isMobileV2 ? styles.mobileWrapper : styles.wrapper}>
      {isMobile ? (
        <div className={isMobileV2 ? styles.mobileFilterContainer : styles.filterMobile}>
          {isMobileV2 ? (
            <div className={styles.mobile_filterBox}>
              <div className={styles.mobile_searchInput}>
                <Skeleton variant="rect" width="100%" height={38} />
              </div>
              <div className={styles.mobile_fRow}>
                {!isHideFilter && <Skeleton variant="circle" width={32} height={32} />}
                <Skeleton variant="circle" width={32} height={32} />
              </div>
            </div>
          ) : (
            <div className={styles.filterMobileBox}>
              <div className={styles.fRow}>
                <Skeleton variant="rect" width={72} height={38} />
              </div>
              <div className={styles.fRow}>
                <Skeleton variant="text" width={120} height={30} />
              </div>
            </div>
          )}
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
      <div className={clsx(styles.product_main, isMobileV2 && styles.mobileProduct_main)}>
        <div className={styles.mb}>
          <Skeleton variant="text" width={350} height={30} />
          <Skeleton variant="text" width={350} height={16} />
          <Skeleton variant="text" width={200} height={24} />
        </div>
        {!isMobile && <TabComponents query={router.query} currentTab={currentTab} pathName={pathName} tabs={tabs} />}
        <main className={styles.product_listing} key={uuidv4()}>
          <div className={styles.product_grid_wrapper}>
            <div>
              <GridSkeletonProductHorizontal pages={isMobile ? 4 : 12} counts={PAGE_SIZE_30} hasPagingTop hasPagingBottom />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
