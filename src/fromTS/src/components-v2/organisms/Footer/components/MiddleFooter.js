import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { AHAMOVE, FACEBOOK_ICON, GHN, GHTK, GRAB, LINKED_ICON, NINJAVAN, TIKTOK_ICON, VIETTELPOST, ZALO_ICON } from 'constants/Images';
import {
  CHINH_SACH_BAO_MAT_URL,
  CHINH_SACH_DANG_TAI_SAN_PHAM_URL,
  CHINH_SACH_GIAI_QUYET_KHIEU_NAI_URL,
  HOW_TO_ORDER_AND_PAYMENT,
  HOW_TO_RETURN_REFUND,
  HOW_TO_UPLOAD_PRODUCTS,
  PATH_SHIPPING_POLICY,
  PATH_TS_FACEBOOK,
  PATH_TS_LINKED,
  PATH_TS_TIKTOK,
  PATH_TS_ZALO,
  QUY_CHE_HOAT_DONG_URL,
  THUOCSI_SUPPORT,
} from 'constants/Paths';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles.module.css';

const PrivacyModal = dynamic(() => import('components/mocules/PrivacyModal'));
const TermOfUseModal = dynamic(() => import('components/mocules/TermOfUseModal'));

const MiddleFooter = () => {
  const router = useRouter();
  const [openPrivacy, toggleOpenPrivacy] = useState(false);
  const [openTermOfUse, toggleTermOfUse] = useState(false);

  return (
    <Grid className={styles.footerInfo}>
      <Grid container spacing={10} display="flex" justifyContent="flex-start" style={{ width: '100%' }}>
        <Grid item>
          <Typography className={styles.titleItem}>Thông tin chung</Typography>
          <Grid container style={{ marginTop: '8px' }} spacing={1}>
            <Grid sm={12} lg={12} item>
              <LinkComp href="/about-us" prefetch={false} className={styles.linkComp}>
                <Typography
                  className={router.pathname === '/about-us' ? clsx(styles.active, styles.link) : styles.link}
                  style={{ textTransform: 'none' }}
                >
                  Thông Tin Về {BRAND_NAME}
                </Typography>
              </LinkComp>
              <LinkComp href={QUY_CHE_HOAT_DONG_URL} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === QUY_CHE_HOAT_DONG_URL ? clsx(styles.active, styles.link) : styles.link}>
                  Quy chế hoạt động
                </Typography>
              </LinkComp>
              {/* <a className={styles.alink} href="https://career.thuocsi.vn/" target="_blank" rel="noreferrer">
                <Typography className={styles.link}>Tuyển dụng</Typography>
              </a> */}
              {/* <Link href="/how-to-order" prefetch={false}>
              <Typography className={styles.link}>Hướng dẫn đặt hàng</Typography>
            </Link> */}
              <a className={styles.alink} href="/terms-and-condition" target="_blank" rel="noreferrer">
                <Typography className={styles.link}>Điều khoản sử dụng</Typography>
              </a>
              <LinkComp href={CHINH_SACH_BAO_MAT_URL} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === CHINH_SACH_BAO_MAT_URL ? clsx(styles.active, styles.link) : styles.link}>
                  Chính sách bảo mật
                </Typography>
              </LinkComp>
              <LinkComp href={CHINH_SACH_GIAI_QUYET_KHIEU_NAI_URL} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === CHINH_SACH_GIAI_QUYET_KHIEU_NAI_URL ? clsx(styles.active, styles.link) : styles.link}>
                  Chính sách giải quyết khiếu nại
                </Typography>
              </LinkComp>
              <LinkComp href={CHINH_SACH_DANG_TAI_SAN_PHAM_URL} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === CHINH_SACH_DANG_TAI_SAN_PHAM_URL ? clsx(styles.active, styles.link) : styles.link}>
                  Chính sách đăng tải sản phẩm
                </Typography>
              </LinkComp>
              <LinkComp href={HOW_TO_RETURN_REFUND} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === HOW_TO_RETURN_REFUND ? clsx(styles.active, styles.link) : styles.link}>
                  Chính sách đổi trả
                </Typography>
              </LinkComp>
              <LinkComp href={PATH_SHIPPING_POLICY} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === PATH_SHIPPING_POLICY ? clsx(styles.active, styles.link) : styles.link}>
                  Chính sách vận chuyển
                </Typography>
              </LinkComp>
              {/* <Link href="/faq" prefetch={false}>
              <Typography className={styles.link}>Câu hỏi thường gặp (Q&A)</Typography>
            </Link> */}
              {/* <a href={THUOCSI_SUPPORT} target="_blank" rel="noreferrer">
                <Typography className={styles.link}>Các Vấn Đề Liên Quan Đến Nhà Thuốc</Typography>
              </a>
              <a href={THUOCSI_SUPPORT_SELLER} target="_blank" rel="noreferrer">
                <Typography className={styles.link}>Các Vấn Đề Liên Quan Đến Nhà Bán Hàng</Typography>
              </a> */}
              {/* <div onClick={() => handleToggleOpen('general-policy')} role="button" aria-hidden="true">
              <Typography className={styles.link}>Chính sách quy định chung</Typography>
            </div> */}
            </Grid>
            {/* <Grid sm={6} lg={7} item>
            <>
              <div onClick={() => handleToggleOpen('conditions-of-use')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Điều khoản sử dụng</Typography>
              </div>
              <div onClick={() => handleToggleOpen('dispute-resolution')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Cơ chế giải quyết tranh chấp</Typography>
              </div>
              <div onClick={() => handleToggleOpen('terms-and-condition')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Thỏa thuận về dịch vụ TMDT</Typography>
              </div>
              <div role="button" aria-hidden="true">
                <Typography className={styles.link}>Quy chế hoạt động</Typography>
              </div>
              <Link className={styles.alink} href={DOMAIN_SELLER_CENTER} target="_blank" prefetch={false}>
                <Typography className={styles.link}>Đăng ký bán hàng cùng thuocsi</Typography>
              </Link>
            </>
          </Grid> */}
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={styles.titleItem}>Hỗ trợ người sử dụng</Typography>
          <Grid container style={{ marginTop: '8px' }} spacing={1}>
            <Grid sm={12} lg={12} item>
              <LinkComp href={THUOCSI_SUPPORT} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === THUOCSI_SUPPORT ? clsx(styles.active, styles.link) : styles.link}>
                  Câu hỏi thường gặp
                </Typography>
              </LinkComp>
              <LinkComp href={HOW_TO_UPLOAD_PRODUCTS} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === HOW_TO_UPLOAD_PRODUCTS ? clsx(styles.active, styles.link) : styles.link}>
                  Hướng dẫn đăng tải sản phẩm
                </Typography>
              </LinkComp>
              <LinkComp href={HOW_TO_ORDER_AND_PAYMENT} prefetch={false} className={styles.linkComp}>
                <Typography className={router.pathname === HOW_TO_ORDER_AND_PAYMENT ? clsx(styles.active, styles.link) : styles.link}>
                  Hướng dẫn đặt hàng và thanh toán
                </Typography>
              </LinkComp>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Typography className={styles.titleItem} style={{ marginTop: '36px' }}>
          Dịch vụ giao hàng
        </Typography>
        <Grid style={{ marginTop: '9px', flexWrap: 'nowrap' }}>
          <Box className={styles.TitleService}>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={GHTK} width="82" height="25" alt="GHTK" className={styles.border} />
            </Box>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={NINJAVAN} width="57" height="25" alt="NINJAVAN" className={styles.border} />
            </Box>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={VIETTELPOST} width="30" height="25" alt="VIETTELPOST" className={styles.border} />
            </Box>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={GHN} width="24" height="25" alt="GHN" className={styles.border} />
            </Box>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={GRAB} width="51" height="25" alt="GRAB" className={styles.border} />
            </Box>
            <Box className={styles.serviceIcon}>
              <ImageFallbackStatic layout="fixed" src={AHAMOVE} width="73" height="20" alt="ahamove" className={styles.border} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <Typography className={styles.titleItem} style={{ marginTop: '50px' }}>
          Kết Nối Với Chúng Tôi
        </Typography>
        <Box className={styles.TitleConnect}>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_FACEBOOK} passHref>
              <a href={PATH_TS_FACEBOOK} target="_blank" rel="noreferrer">
                <ImageFallbackStatic src={FACEBOOK_ICON} layout="fixed" height="20px" width="20px" alt="facebook-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_ZALO} passHref>
              <a href={PATH_TS_ZALO} target="_blank" rel="noreferrer">
                <ImageFallbackStatic src={ZALO_ICON} layout="fixed" height="20px" width="20px" alt="zalo-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_LINKED} passHref>
              <a href={PATH_TS_LINKED} target="_blank" rel="noreferrer">
                <ImageFallbackStatic src={LINKED_ICON} layout="fixed" height="20px" width="20px" alt="linked-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_TIKTOK} passHref>
              <a href={PATH_TS_TIKTOK} target="_blank" rel="noreferrer">
                <ImageFallbackStatic src={TIKTOK_ICON} layout="fixed" height="20px" width="20px" alt="tiktok-connect" />
              </a>
            </Link>
          </Box>
        </Box>
      </Grid>
      {openPrivacy && (
        <PrivacyModal
          open={openPrivacy}
          handleClose={() => {
            toggleOpenPrivacy();
          }}
          maxWidth="md"
        />
      )}
      {openTermOfUse && (
        <TermOfUseModal
          open={openTermOfUse}
          handleClose={() => {
            toggleTermOfUse();
          }}
          maxWidth="md"
        />
      )}
    </Grid>
  );
};
export default MiddleFooter;
