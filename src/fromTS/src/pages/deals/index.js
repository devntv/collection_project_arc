/* eslint-disable no-lonely-if */
import { Breadcrumbs } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getData } from 'clients';
import clsx from 'clsx';
import ListProductMV2 from 'components-v2/organisms/pages/deals/ListProductMV2';
import ListProductV1 from 'components-v2/organisms/pages/deals/ListProductV1';
import Template from 'components/layout/Template';
import TitleComponent from 'components/mocules/TitleComponent';
import { PAGE_SIZE_30 } from 'constants/data';
import { MEGA_SALE_ICON } from 'constants/Images';
import { withLogin } from 'HOC';
import Link from 'next/link';
import { useRef } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const title = getTitle('Khuyến mãi hằng ngày');

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [dealRes] = await Promise.all([ProductServiceV2.getDeals({ ctx })]);
    const { total = 0 } = dealRes || {};
    const page = Number(ctx.query.page) || 1;
    // const products = getData(dealRes)?.filter((item) => {
    //   if (item?.isDeal) return { ...item };
    //   return null;
    // });
    // const total = products?.length || 0;

    return {
      props: {
        products: getData(dealRes),
        total,
        page,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}

const DealsPage = ({ products = [], isMobile, total, page }) => {
  const name = 'deals';

  const pages = Math.ceil(total / PAGE_SIZE_30);
  const pathName = '/deals';
  const mainRef = useRef(null);
  const margin = { margin: '30px 0' };
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const handleClick = (event) => {
    event.preventDefault();
  };

  const BreadcrumbV1 = () => (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link href="/" prefetch={false} onClick={handleClick}>
        Trang Chủ
      </Link>
      <Link href="/khuyenmai" prefetch={false} onClick={handleClick}>
        Khuyến Mãi
      </Link>
      <Link href={pathName} prefetch={false} onClick={handleClick} aria-current="page">
        Khuyến Mãi Hằng Ngày
      </Link>
    </Breadcrumbs>
  );

  return (
    <Template pageTitle="Khuyến mãi hằng ngày" isMobile={isMobile} pageName={name} overrideMV2Options={{ title: 'Khuyến mãi hằng ngày' }}>
      <div
        ref={mainRef}
        className={clsx(styles.container, {
          [styles.container_mv2]: isMobileV2,
        })}
      >
        <div className={styles.wrapper_breadcrums}>{!isMobileV2 && <BreadcrumbV1 />}</div>

        <div id="insider-minibanner" />

        <div
          className={clsx(styles.title_container, {
            [styles.title_container_mv2]: isMobileV2,
          })}
        >
          <TitleComponent
            title="Khuyến Mãi Hằng Ngày"
            icon={<ImageFallbackStatic src={MEGA_SALE_ICON} alt="icon" height="40" width="40" className={styles.icon_img} />}
            margin={margin}
          />
        </div>
        {isMobileV2 ? (
          <ListProductMV2 />
        ) : (
          <ListProductV1 products={products} page={page} total={total} mainRef={mainRef} pages={pages} pathName={pathName} isMobile={isMobile} />
        )}
      </div>
    </Template>
  );
};
export default withLogin(DealsPage);
