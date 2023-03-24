/* eslint-disable no-lonely-if */
import { Box, Breadcrumbs } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Pagination } from '@material-ui/lab';
import { getData } from 'clients';
import Template from 'components/layout/Template';
import TitleComponent from 'components/mocules/TitleComponent';
import { ProductSliderBlock } from 'components/organisms';
import GridSliderSkeleton from 'components/organisms/Skeleton/GridSliderSkeleton';
import { FLASH_SALE_ICON } from 'constants/Images';
import { withLogin } from 'HOC';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ProductServiceV2 } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [dealRes] = await Promise.all([ProductServiceV2.getDeals({ ctx })]);
  const { total = 0 } = dealRes || {};
  const page = Number(ctx.query.page) || 1;
  return {
    props: {
      products: getData(dealRes),
      total,
      page,
    },
  };
}

const FlashSale = ({ products = [], isMobile, total, page }) => {
  const title = 'Khuyến mãi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const name = 'flashsale';
  const pages = Math.ceil(total / 5);
  const [isloading, setIsLoading] = useState(true);
  const router = useRouter();
  const mainRef = useRef(null);
  const pathName = `/khuyenmai/flash-sale-info`;

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;
    setIsLoading(true);

    window.scrollTo({
      top: mainRef?.current?.offsetTop - 100,
      behavior: 'smooth',
    });

    const query = { page };
    query.page = value;
    router.push({
      pathname: pathName,
      query,
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  return (
    <Template title={title} isMobile={isMobile} pageName={name}>
      <Box className={styles.container}>
        <div className={styles.wrapper_breadcrums}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link href="/" prefetch={false} onClick={handleClick}>
              Trang Chủ
            </Link>
            <Link href="/" prefetch={false} onClick={handleClick}>
              Mã Giảm Giá
            </Link>
            <Link href="/flash-sale-info" prefetch={false} onClick={handleClick} aria-current="page">
              Flash Sale
            </Link>
          </Breadcrumbs>
        </div>
        <div>
          <TitleComponent
            title="Flash Sale"
            icon={<ImageFallbackStatic src={FLASH_SALE_ICON} alt="icon mega sale" height="40" width="40" className={styles.icon_img} />}
            time
          />
        </div>
        {isloading ? (
          <div className={styles.skeleton_wrapper}>
            <GridSliderSkeleton pages={isMobile ? 4 : pages} counts={isMobile ? 1 : 5} hasPagingBottom />
          </div>
        ) : (
          <>
            <div>
              <ProductSliderBlock date time sellerName="MedX" sellerAvatar="co" products={products} link="/khuyenmai/flashsale" />
            </div>
            {pages > 0 && (
              <div className={styles.pagging}>
                <Pagination count={pages} page={page} boundaryCount={isMobile ? 1 : 2} siblingCount={isMobile ? 0 : 2} onChange={handleChangePage} />
              </div>
            )}
          </>
        )}
      </Box>
    </Template>
  );
};
export default withLogin(FlashSale, false);
