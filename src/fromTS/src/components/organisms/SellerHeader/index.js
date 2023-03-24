import { Box, Chip, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { BRAND_NAME, FLAGSHIP_LABEL, THUOCSI_LABEL } from 'constants/Enums';
import { PRODUCT_ICON } from 'constants/Images';
import { useSetting } from 'context';
import { ImageFallbackStatic, ImageFallbackStoreImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

const SellerHeader = ({ sellerInfo, isFlagship = false }) => {
  const { name = '', imageStoreUrls = [], numberProductDisplay = 0, years = 0 } = sellerInfo;
  const { getNameSeller } = useSetting();

  const { isStore, isVip } = getNameSeller({ seller: { code: sellerInfo.sellerCode } });

  return (
    <Grid container className={clsx(styles.sellerInfo, isFlagship && styles.flagshipInfo)} spacing={isFlagship ? 2 : 0}>
      <Grid item xs={2} className={styles.imgWrapFlagship}>
        <Box style={{ position: 'relative' }}>
          {(isStore || isFlagship) && (
            <Chip
              label={isFlagship || isVip ? FLAGSHIP_LABEL : THUOCSI_LABEL}
              className={clsx(styles.chip, isFlagship ? styles.flagship : styles.store)}
            />
          )}
          <ImageFallbackStoreImage
            src={imageStoreUrls?.length > 0 && imageStoreUrls[0]}
            width="185"
            height="185"
            alt={name}
            className={clsx(styles.img, isFlagship && styles.fullImg)}
            quality={100}
          />
        </Box>
      </Grid>
      <Grid container item xs={7} md={10} className={styles.info}>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12} md={6} className={!isFlagship ? styles.content : ''}>
            <Typography className={styles.name}>{name}</Typography>
            {numberProductDisplay > 0 && (
              <div className={styles.statistic}>
                {isFlagship && (
                  <div className={styles.icon_label}>
                    <ImageFallbackStatic src={PRODUCT_ICON} width="18" height="18" alt="icon" />
                    <Typography className={styles.label}>
                      Sản phẩm: <b>{numberProductDisplay}</b>
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </Grid>
          {years > 0 && (
            <Grid item xs={12} md={6}>
              <Box className={styles.cooperator}>
                <Box className={styles.years}>
                  <Typography style={{ fontWeight: 'bold' }}>{years}+</Typography>
                  <Typography style={{ lineHeight: 0.8, fontSize: 14 }}>năm</Typography>
                </Box>
                <Typography>Hợp tác cùng {BRAND_NAME}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SellerHeader;
