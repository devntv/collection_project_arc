/* eslint-disable react/jsx-indent */
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CartCouponCardV2 from 'components-v2/mocules/CartCouponCardV2';
import CartCouponMobile from 'components-v2/mocules/CartCouponCardV2Mobile';
import { LOYALTY_BTN_VIEW_MORE } from 'constants/Icons';
import { CART_URL, EXCHANGE_LOYALTY } from 'constants/Paths';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HistoryVoucher from './HistoryVoucher';
import styles from './styles.module.css';
// import TabPromoBar from './TabPromoBar';

function MyPromoListV2({ promos: promoLists = [], isMobile }) {
  const router = useRouter();

  const handleGoToExchange = () => {
    router.push(EXCHANGE_LOYALTY);
  };
  const [seeMore, setSeeMore] = useState(false);
  const handleChangeViewMore = () => {
    setSeeMore(!seeMore);
  };

  const handleChangePromo = () => router.push(CART_URL);

  return (
    <Grid container className={styles.promoCtn}>
      <Grid container xs={12} className={styles.promoContent_wrap} item style={{ padding: isMobile && '10px 8px' }}>
        <Grid className={styles.promoTitle}>
          <Typography>Danh sách mã giảm giá </Typography>
        </Grid>
        <Grid
          container
          style={{ display: 'flex', width: '100%', marginTop: '10px', marginRight: !isMobile ? '4px' : '0px' }}
          alignItems="center"
          className={styles.wrapVoucher}
        >
          {/* <TabPromoBar /> */}
          {promoLists?.length !== 0 ? (
            <>
              <Grid
                container
                spacing={1}
                style={{ overflowX: isMobile ? 'scroll' : '' }}
                className={clsx(!isMobile ? styles.wrapListVoucher : styles.wrapListVoucherMobile)}
              >
                {seeMore
                  ? promoLists?.map(({ voucher = {}, userPromotion = {}, isUnlimited = false, availableQuantity = 0, customerUsageTotal = 0 }) => (
                      <Grid className={!isMobile ? styles.coupon_card_grid : styles.coupon_card_gridMobile} item key={uuidv4()} md={6} xs={12}>
                        {!isMobile ? (
                          <CartCouponCardV2
                            isUnlimited={isUnlimited}
                            availableQuantity={availableQuantity}
                            customerUsageTotal={customerUsageTotal}
                            checkValidate
                            isShowInfo
                            {...voucher}
                            {...userPromotion}
                          />
                        ) : (
                          <CartCouponMobile
                            isUnlimited={isUnlimited}
                            availableQuantity={availableQuantity}
                            customerUsageTotal={customerUsageTotal}
                            circleBoxBg="#fff"
                            checkValidate
                            isShowInfo
                            handleChangePromo={handleChangePromo}
                            {...voucher}
                            {...userPromotion}
                          />
                        )}
                      </Grid>
                    ))
                  : promoLists
                      ?.slice(0, 4)
                      .map(({ voucher = {}, userPromotion = {}, isUnlimited = false, availableQuantity = 0, customerUsageTotal = 0 }) => (
                        <Grid className={!isMobile ? styles.coupon_card_grid : styles.coupon_card_gridMobile} item key={uuidv4()} md={6} xs={12}>
                          {!isMobile ? (
                            <CartCouponCardV2
                              isUnlimited={isUnlimited}
                              availableQuantity={availableQuantity}
                              customerUsageTotal={customerUsageTotal}
                              checkValidate
                              isShowInfo
                              {...voucher}
                              {...userPromotion}
                            />
                          ) : (
                            <CartCouponMobile
                              isUnlimited={isUnlimited}
                              availableQuantity={availableQuantity}
                              customerUsageTotal={customerUsageTotal}
                              circleBoxBg="#fff"
                              checkValidate
                              isShowInfo
                              handleChangePromo={handleChangePromo}
                              {...voucher}
                              {...userPromotion}
                            />
                          )}
                        </Grid>
                      ))}
              </Grid>
              <Grid
                container
                className={clsx(styles.wrapViewMore, promoLists?.length <= 4 && styles.hiddenSeeMore)}
                alignItems="center"
                justifyContent="center"
              >
                <Grid className={clsx(styles.viewMoreContent, seeMore && styles.rotateIcon)} onClick={handleChangeViewMore}>
                  <Typography className={styles.viewMore}>{seeMore ? 'Ẩn' : 'Xem thêm'}</Typography>
                  <LOYALTY_BTN_VIEW_MORE />
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid item container xs={12} alignItems="center" justifyContent="center">
              <Typography style={{ fontFamily: 'ggsm', padding: '10px' }}>
                Bạn chưa có mã giảm giá nào,{' '}
                <span style={{ color: '#0CBA69', cursor: 'pointer' }} onClick={handleGoToExchange} role="presentation">
                  đổi mã ngay.
                </span>{' '}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <HistoryVoucher isMobile={isMobile} promoLists={promoLists} />
    </Grid>
  );
}

export default MyPromoListV2;
