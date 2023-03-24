/* eslint-disable prefer-spread */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-newline */
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { CouponCardV2 } from 'components/mocules';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { CART_URL, LOYALTY_PAGE, PRODUCTS_LOADING_URL, PRODUCTS_URL, PROMO_CODES, QUICK_ORDER, REFERRALS_PAGE } from 'constants/Paths';
import { useAuth } from 'context';
import { useScrollTrackingViewport } from 'hooks';
import Link from 'next/link';
import { useEffect } from 'react';
import { Tracking } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const Loading = ({ length = 3 }) => (
  <Grid container spacing={3}>
    {Array.apply(null, Array(length)).map(() => (
      <Grid item md={4} key={uuidv4()}>
        <Skeleton variant="rect" height={140} style={{ borderRadius: '5px' }} />
      </Grid>
    ))}
  </Grid>
);

const PromoCodesContainer = ({ isMobile, myDataVoucher = [], ortherDataVoucher = [], loading = false }) => {
  const {
    user: { accountID = '', customerID = '' },
  } = useAuth();
  const currentPage = window.location.href;
  const [inviewPort, refViewport] = useScrollTrackingViewport({ root: null, rootMargin: '0px', ...(isMobile ? null : { threshold: 1.0 }) });

  const maxWidth3Card = useMediaQuery('(max-width:992px)');

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // const [loading, setLoading] = useState(true);

  // const loadVoucher = async () => {
  //   const [otherVoucherRes] = await Promise.all([OrderClient.getVouchers({ scope: 'other' })]);
  //   if (isValid(otherVoucherRes)) {
  //     setOtherVouchers(getData(otherVoucherRes));
  //   }
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   loadVoucher();
  // }, []);

  useEffect(() => {
    function trackingWithScroll() {
      if (inviewPort) {
        Tracking.trackingFunc(ENUM_TRACKING_ACTION.SCROLL_DOWN_FIRST_ON_PROMO_CODES_PAGE, {
          page: PROMO_CODES,
          accountId: accountID,
          customerID,
          currentPage,
          isMobile,
        });
      }
    }
    trackingWithScroll();
  }, [inviewPort]);

  const VoucherList = () =>
    myDataVoucher.length !== 0 ? (
      <Grid container spacing={2}>
        {myDataVoucher.map((promo) => (
          <Grid key={uuidv4()} item xs={maxWidth3Card ? 12 : 6} lg={4} sm={6}>
            <CouponCardV2 {...promo} isMobile={isMobile} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <p className={styles.promo_not_yet}>Chưa có mã</p>
    );
  return (
    <div className={clsx(styles.root, isMobileV2 && styles.root_mv2)}>
      <Container maxWidth="lg" className={styles.container}>
        <Typography variant="h4" style={{ fontWeight: '500' }}>
          Mã giảm giá
        </Typography>
        <p> Hướng dẫn sử dụng:</p>
        <ol>
          <li>
            <strong>Đặt hàng </strong>: Vào trang&nbsp;
            <button
              onClick={() =>
                Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_GO_TO_QUICK_ORDER, {
                  page: QUICK_ORDER,
                  accountId: accountID,
                  customerID,
                  currentPage,
                  // ...(isMobile && { source: 'thuocsi-mobile' }),
                  isMobile,
                })
              }
              className={styles.transparentBtn}
            >
              <Link prefetch={false} href={QUICK_ORDER}>
                Đặt hàng nhanh
              </Link>
            </button>
            &nbsp;hoặc&nbsp;
            <button
              onClick={() =>
                Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_GO_TO_PRODUCTS, {
                  page: PRODUCTS_URL,
                  accountId: accountID,
                  customerID,
                  currentPage,
                  // ...(isMobile && { source: 'thuocsi-mobile' }),
                  isMobile,
                })
              }
              className={styles.transparentBtn}
            >
              <Link prefetch={false} href={PRODUCTS_LOADING_URL}>
                Sản phẩm
              </Link>
            </button>
            &nbsp;để đặt hàng
          </li>
          <li>
            <strong>Vào giỏ hàng</strong>: Vào trang&nbsp;
            <button
              onClick={() =>
                Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_GO_TO_CART, {
                  page: CART_URL,
                  accountId: accountID,
                  customerID,
                  currentPage,
                  // ...(isMobile && { source: 'thuocsi-mobile' }),
                  isMobile,
                })
              }
              className={styles.transparentBtn}
            >
              <Link prefetch={false} href={CART_URL}>
                Giỏ hàng
              </Link>
            </button>
            . Nhấn vào chữ "Dùng mã giảm giá"
          </li>
          <li>
            <strong>Dùng mã</strong>: Nhập mã muốn dùng vào ô tìm kiếm, hoặc, chọn trong danh sách mã. Rồi nhấn vào nút "Dùng ngay"
          </li>
        </ol>

        <div className={styles.title}>
          <Typography variant="h4" style={{ fontWeight: '500' }}>
            Dành riêng cho bạn
          </Typography>
          <p className={styles.description}>
            Tham gia chương trình&nbsp;
            <button
              onClick={() =>
                Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_GO_TO_USERS_REFERRALS, {
                  page: REFERRALS_PAGE,
                  accountId: accountID,
                  customerID,
                  currentPage,
                  // ...(isMobile && { source: 'thuocsi-mobile' }),
                  isMobile,
                })
              }
              className={styles.transparentBtn}
            >
              <Link prefetch={false} href="/users/referrals">
                Giới thiệu bạn bè
              </Link>
            </button>
            ,&nbsp;
            <button
              onClick={() =>
                Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_GO_TO_USERS_LOYALTY_POINTS, {
                  page: LOYALTY_PAGE,
                  accountId: accountID,
                  customerID,
                  currentPage,
                  // ...(isMobile && { source: 'thuocsi-mobile' }),
                  isMobile,
                })
              }
              className={styles.transparentBtn}
            >
              <Link prefetch={false} href="/users/loyalty_points">
                Đổi điểm tích luỹ
              </Link>
            </button>
            &nbsp;để nhận được code riêng
          </p>
          <div style={{ marginTop: '50px' }} ref={refViewport}>
            {loading ? <Loading length={6} /> : <VoucherList />}
          </div>
        </div>
      </Container>
      <div className={styles.promo_special}>
        <h1> Mã giảm giá đặc biệt </h1>
        <div> Chưa có mã</div>
      </div>
      <Container maxWidth="lg" className={styles.container}>
        <h1 className={clsx(styles.title, styles.other)}> Các mã khác </h1>
        <div ref={refViewport}>
          {loading ? (
            <Loading length={6} />
          ) : ortherDataVoucher?.length !== 0 ? (
            <Grid container spacing={2}>
              {ortherDataVoucher.map((voucher) => (
                <Grid key={uuidv4()} item xs={maxWidth3Card ? 12 : 6} lg={4} sm={6}>
                  <CouponCardV2 {...voucher} m isMobile={isMobile} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p className={styles.promo_not_yet}>Chưa có mã</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PromoCodesContainer;
