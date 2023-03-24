import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import SearchInputSeller from 'components/mocules/SearchInputSeller';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import { DOMAIN_FLAGSHIP_STORE } from 'sysconfig';
import styles from './styles.module.css';

const SellerTabs = ({ slug, isFlagship }) => {
  const router = useRouter();
  const { user } = useAuth();

  const { asPath } = router;
  const isProductList = asPath?.includes('list-product');
  const isRewards = asPath?.includes('rewards');

  const isFlagShipStorePage = asPath.includes('flagship-store');

  let linkHomePage = `/seller/${slug}`;
  let linkListProduct = '/list-product';
  let linkRewards = '/rewards';
  if (isFlagship) {
    if (isFlagShipStorePage) {
      linkHomePage = `/flagship-store/${slug}`;
      linkListProduct = `/flagship-store/${slug}/list-product`;
      linkRewards = `/flagship-store/${slug}/flagship-rewards`;
    } else {
      linkHomePage = DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug);
    }
  }

  return (
    <div className={clsx(styles.tabs, isFlagship && styles.flagshipTabs)}>
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <Box className={styles.groupLink}>
            <a className={styles.link} href={linkHomePage}>
              <Typography className={!isProductList && !isRewards ? clsx(styles.active, styles.linkTitle) : styles.linkTitle}>Trang chủ</Typography>
            </a>
            {user && isFlagship && (
              <LinkComp className={styles.link} href={linkListProduct}>
                <Typography className={isProductList ? clsx(styles.active, styles.linkTitle) : styles.linkTitle}>Danh sách sản phẩm</Typography>
              </LinkComp>
            )}
            {!isFlagship && (
              <LinkComp className={styles.link} href={`/seller/${slug}/list-product`}>
                <Typography className={isProductList ? clsx(styles.active, styles.linkTitle) : styles.linkTitle}>Danh sách sản phẩm</Typography>
              </LinkComp>
            )}
            {user && (
              <LinkComp className={styles.link} href={!isFlagship ? `/seller/${slug}/rewards` : linkRewards}>
                <Typography className={isRewards ? clsx(styles.active, styles.linkTitle) : styles.linkTitle}>Chương trình trả thưởng</Typography>
              </LinkComp>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className={isFlagship ? styles.searchWrap : styles.searchWrapSeller}>
            <SearchInputSeller slug={slug} isFlagship={isFlagship} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SellerTabs;
