/* eslint-disable camelcase */
import { Container, Divider, Grid, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';

import styles from './style.module.css';

export default function ProductListing({ isMobile = false, isMobileV2 = false }) {
  return (
    <>
      <Container className={styles.container}>
        {!isMobileV2 && (
          <div style={{ padding: isMobile ? '0px 36px' : '0px' }}>
            <Skeleton variant="text" width="60%" height={30} />
          </div>
        )}
        <Grid container style={{ margin: isMobileV2 ? '0px' : '24px 0', overflowX: 'hidden' }}>
          <Grid container item md={9} className={styles.main}>
            <Grid item md={4}>
              <div className={styles.wrapperLeft}>
                <div className={styles.wrapperContainer}>
                  <div className={styles.wrapperImg}>
                    <Skeleton variant="rect" width="100%" height="100%" />
                  </div>
                  <div className={styles.slider}>
                    <div className={styles.thumbnail}>
                      <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                      <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                      <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                      <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                    </div>
                  </div>
                  <Skeleton variant="text" width="85%" height={18} />
                </div>
              </div>
            </Grid>
            <Grid item md={8} style={{ width: '100%' }}>
              <div className={styles.content}>
                <div className={styles.wrapperNameProduct}>
                  <Skeleton variant="text" width="70%" height={28} />

                  <div className={styles.wishlist}>
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="circle" width={40} height={40} />
                  </div>
                </div>
                <Skeleton variant="text" width={200} height={18} />
                <Skeleton variant="text" width={80} height={18} />
                <Skeleton variant="text" width={100} height={18} />

                <div className={styles.warpperInfo}>
                  <div className={styles.warpperInfoProduct}>
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={80} height={20} />
                  </div>
                </div>
              </div>
              <div className={styles.mt}>
                <Skeleton variant="text" width={400} height={20} />
              </div>
              <div className={styles.warpperPice}>
                <Skeleton variant="text" width="20%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
              </div>
              <div className={styles.mt}>
                <Skeleton variant="text" width="60%" height={18} />
              </div>
              <div className={styles.mt}>
                <Skeleton className={styles.borderBtn} variant="text" width={183} height={35} />
              </div>
            </Grid>
            <Grid item style={{ width: '100%', margin: 24 }}>
              <Divider />
              <div className={styles.sectionInfo}>
                <Skeleton variant="rect" width="100%" height="100%" />
              </div>
            </Grid>
          </Grid>
          <Grid container item md={3} className={styles.rightSide}>
            <div className={clsx(styles.wrapperRight, styles.sellerInfo)}>
              <div className={styles.avatar_name}>
                <Skeleton variant="circle" width={60} height={60} />
                <Skeleton variant="text" width="100%" height={23} />
              </div>

              <Skeleton variant="text" width="50%" height={32} className={styles.btnLinkShop} />
              <Skeleton variant="text" width="100%" height={21} className={styles.mTB} />
              <Divider />
              <div className={styles.mTB}>
                <Skeleton variant="text" width="100%" height={18} />
                <Skeleton variant="text" width="60%" height={18} />
                <Skeleton variant="text" width="100%" height={18} />
                <Skeleton variant="text" width="40%" height={18} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Paper className={styles.sectionProductSeller}>
          <Skeleton variant="text" width="40%" height={36} />
          <div className={styles.sellerImg}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
        </Paper>
        <Paper className={styles.sectionProductSeller}>
          <Skeleton variant="text" width="40%" height={36} />
          <div className={styles.sellerImg}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
        </Paper>
      </Container>
    </>
  );
}
