import { Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { ERROR_CART, ERROR_CODE_CART } from 'constants/ErrorCart';
import { memo } from 'react';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

function ErrProductCard({ product = null }) {
  const {
    deal = null,
    isDeal = false,
    defaultImage = null,
    name = '',
    quantity = 0,
    errorCode = null,
    slug = '',
    imagesProxy = [],
    errorMessage = '',
  } = product;
  const errProductMessage =
    errorCode === ERROR_CODE_CART.REQUIRED_CERTIFICATE ? 'Bạn chưa đủ giấy phép để mua SP này' : ERROR_CART[errorCode] || errorMessage;

  return (
    <Grid item container alignItems="center" style={{ width: '100%' }}>
      <Grid item xs={4} style={{ padding: '20px 0px' }}>
        <div className={styles.img_container}>
          <ImageFallbackProductImage
            width={56}
            height={56}
            alt={`product-img-${slug}`}
            fallbackSrc={imagesProxy[0] || defaultImage}
            className={styles.imageMain}
            src={defaultImage}
            quality={100}
          />
        </div>
      </Grid>
      <Grid item xs={8} container justifyContent="flex-start" alignItems="center" style={{ minHeight: '86px' }}>
        <Grid item xs={12}>
          <LinkComp href={`/product/${slug || ''}/loading`} prefetch={false} className={styles.link}>
            <Typography align="left" className={styles.text_product_name}>
              {isDeal && deal ? deal?.name : name || ''}
            </Typography>
          </LinkComp>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right" className={styles.text_product_quantity}>
            x{quantity}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right" className={styles.text_product_err}>
            {errProductMessage}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(ErrProductCard);
