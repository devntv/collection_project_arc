import { Grid, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Skeleton } from '@material-ui/lab';
import { VOUCHER_TITLE_TS_DETAIL } from 'constants/Icons';
import { v4 as uuidv4 } from 'uuid';
import ListPromoGift from '../ListPromoGift';
import styles from './styles.module.css';

function PromotionMobile({ loading, promoList = [], handleOpen, isMobile }) {
  if (loading)
    return (
      <span>
        <Skeleton width={260} height={30} />
      </span>
    );
  return (
    <>
      <div className={styles.dividerRoot} />
      <Grid className={styles.wrapPromoMobile} xs={12} container item direction="row" justifyContent="center">
        <Grid className={styles.promoContent}>
          <Grid className={styles.wrapTitlePromo}>
            <VOUCHER_TITLE_TS_DETAIL />
            <Typography>Quà Tặng</Typography>
          </Grid>

          <Grid className={styles.wrapActionPromo} onClick={handleOpen}>
            <Typography>Xem chi tiết</Typography>
            <ArrowForwardIosIcon />
          </Grid>
        </Grid>
        <Grid container style={{ display: 'flex' }} alignItems="center">
          {promoList?.map((item) => (
            <ListPromoGift
              slugProduct={item.slug}
              key={uuidv4()}
              link={`/product/${item?.slug || ''}`}
              srcImagesProxy={item?.imagesProxy}
              width={28}
              height={28}
              isMobile={isMobile}
            />
          ))}
        </Grid>
      </Grid>
      <div className={styles.dividerRoot} />
    </>
  );
}

export default PromotionMobile;
