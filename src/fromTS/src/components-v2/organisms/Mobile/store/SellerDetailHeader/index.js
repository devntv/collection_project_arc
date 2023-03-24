import { Box, Chip, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { BRAND_NAME, MOBILE_FLAGSHIP_LABEL, THUOCSI_LABEL } from 'constants/Enums';
import { useSetting } from 'context';
import { ImageFallbackStoreImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

const ReviewInfoCard = ({ data = '', text = '' }) => (
  <Grid container direction="column" alignItems="center" justifyContent="center">
    <Typography className={styles.data_text_styles}>{data}</Typography>
    <Typography className={styles.title_text_styles}>{text}</Typography>
  </Grid>
);

const SellerDetailHeader = ({ sellerInfo, isFlagship = false }) => {
  const { name = '', imageStoreUrls = [], numberProductDisplay = 0, years = 0 } = sellerInfo;
  const { getNameSeller } = useSetting();

  const { isStore, isVip } = getNameSeller({ seller: { code: sellerInfo.sellerCode } });

  return (
    <Grid item xs={12} className={styles.imgWrapFlagship}>
      {/* logo, name & years */}
      <Box style={{ position: 'relative' }}>
        {(isStore || isFlagship) && (
          <Chip
            label={isFlagship || isVip ? MOBILE_FLAGSHIP_LABEL : THUOCSI_LABEL}
            className={clsx(styles.chip, isFlagship ? styles.flagship : styles.store)}
          />
        )}
        <Grid container className={clsx(styles.sellerInfo)} direction="row">
          <Grid item xs={2}>
            <div className={styles.store_logo}>
              <ImageFallbackStoreImage
                className={styles.mobileImageLogo}
                src={imageStoreUrls?.length > 0 && imageStoreUrls[0]}
                width="52"
                height="52"
                alt={name}
              />
            </div>
          </Grid>
          <Grid item xs={10} container direction="row" style={{ paddingLeft: '9px' }}>
            <Grid item xs={12} md={6} className={styles.content}>
              <Typography className={styles.name}>{name}</Typography>
            </Grid>
            {years > 0 && (
              <Grid item xs={12} md={6}>
                <Box className={styles.cooperator}>
                  <Box className={styles.years}>
                    <Typography className={styles.years_text}>{years}+</Typography>
                    <Typography>năm</Typography>
                  </Box>
                  <Typography className={styles.cooperate_text}>Hợp tác cùng {BRAND_NAME}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      {/* sp, review, follower, viewer */}
      <Grid container direction="row" justifyContent="flex-start" className={styles.review_store_container}>
        <Grid item xs={3}>
          <ReviewInfoCard data={numberProductDisplay} text="Sản phẩm" />
        </Grid>
        {/* <Divider orientation="vertical" flexItem style={{ height: '30px', width: 0.5 }} />
        <Grid item xs={3}>
          <ReviewInfoCard data="5.0" text="Đánh giá" />
        </Grid> */}
        {/* <Grid item xs={3}>
          <ReviewInfoCard data={0} text="Người theo dõi" />
        </Grid>
        <Grid item xs={3}>
          <ReviewInfoCard data={0} text="Lượt xem shop" />
        </Grid> */}
        {/* <Divider orientation="vertical" flexItem style={{ height: '30px', width: 0.5 }} /> */}
      </Grid>
    </Grid>
  );
};
export default SellerDetailHeader;
