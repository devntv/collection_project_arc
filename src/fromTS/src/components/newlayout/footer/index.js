import { Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import Copyright from 'components/mocules/Copyright';
import { Dialog } from 'components/organisms';
import { BRAND_NAME } from 'constants/Enums';
import { LINK_APPLESTORE, LINK_GOOGLEPLAY, LOGO_APPSTORE_NEW, LOGO_FACEBOOK_NEW, LOGO_GOOGLEPLAY_NEW, NEW_LOGO } from 'constants/Images';
import { useModal } from 'hooks';
import Image from 'next/image';
import { useState } from 'react';
import { THUOCSI_DOMAIN } from 'sysconfig';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const useStyles = makeStyles({
  link: {
    display: 'inline-block',
    '& .MuiTypography-colorPrimary': {
      color: '#586189',
    },
    '& .MuiTypography-colorPrimary:hover': {
      color: '#00b46e',
    },
  },
});
const Footer = () => {
  const [open, toggleOpen] = useModal();
  const [dialogUrl, setDialogUrl] = useState('');
  const handleToggleOpen = (url) => {
    setDialogUrl(url);
    toggleOpen();
  };
  const classes = useStyles();
  return (
    <footer>
      <Container maxWidth="lg">
        <Grid container className={styles.footer_top}>
          <Grid item>
            <div className={styles.logo}>
              <LinkComp href={THUOCSI_DOMAIN}>
                <Image src={NEW_LOGO} width={108} height={20} alt="Thuocsi Logo New" layout="fixed" />
              </LinkComp>
            </div>
            <Typography className={styles.primary_color}>
              <b>{BRAND_NAME}</b> là website thuộc sở hữu của <b>công ty TNHH Buymed.</b>
            </Typography>
          </Grid>
          <Grid className={styles.download_area} item>
            <a href={LINK_APPLESTORE}>
              <ImageFallbackStatic src={LOGO_APPSTORE_NEW} width="108" height="32" layout="fixed" />
            </a>
            <a href={LINK_GOOGLEPLAY}>
              <ImageFallbackStatic src={LOGO_GOOGLEPLAY_NEW} width="108" height="32" layout="fixed" />
            </a>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.footer_info}>
          <Grid md={4} item>
            <b>CÔNG TY TNHH BUYMED</b>
            <Typography>Địa chỉ:</Typography>
            <Typography className={styles.primary_color}>28Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</Typography>
            <Typography>Số Chứng Nhận ĐKKD:</Typography>
            <Typography className={styles.primary_color}>0314758651, Cấp Ngày 29/11/2017,</Typography>
            <Typography className={styles.primary_color}>Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</Typography>
            <Typography>Số Giấy Phép Sàn Thương Mại Điện Tử:</Typography>
            <Typography className={styles.primary_color}>0314758651/KD-0368</Typography>
          </Grid>
          <Grid md={5} item container spacing={2}>
            {/* <Grid item md={12}>
              <b>THÔNG TIN CHUNG</b>
            </Grid> */}

            {/* <div className={styles.policy_wrap}> */}
            <Grid md={6} item>
              <div>
                <b>THÔNG TIN CHUNG</b>
              </div>
              <div className={classes.link}>
                <Link href="/about-us" className={clsx(styles.link)}>
                  <Typography>Giới Thiệu Về {BRAND_NAME}</Typography>
                </Link>
              </div>
              <div className={classes.link}>
                <Link href="/chinh-sach-bao-mat" className={clsx(styles.link)}>
                  <Typography>Chính sách bảo mật</Typography>
                </Link>
              </div>
              <div className={classes.link}>
                <Link href="/faq" className={clsx(styles.link)}>
                  <Typography>Câu Hỏi Thường Gặp</Typography>
                </Link>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('general-policy')} role="button" aria-hidden="true">
                <Typography className={clsx(styles.primary_color, styles.link)}>Chính Sách Quy Định Chung</Typography>
              </div>
              <a href="/career" target="_blank">
                <Typography className={clsx(styles.primary_color, styles.link)}>Tuyển Dụng | Recruiment</Typography>
              </a>
            </Grid>
            <Grid md={6} item>
              <div className={styles.empty}> </div>
              <div className="foo" onClick={() => handleToggleOpen('conditions-of-use')} role="button" aria-hidden="true">
                <Typography className={clsx(styles.primary_color, styles.link)}>Điều Khoản Sử Dụng</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('dispute-resolution')} role="button" aria-hidden="true">
                <Typography className={clsx(styles.primary_color, styles.link)}>Cơ Chế Giải Quyết Tranh Chấp</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('terms-and-condition')} role="button" aria-hidden="true">
                <Typography className={clsx(styles.primary_color, styles.link)}>Thỏa Thuận Về Dịch Vụ TMDT</Typography>
              </div>
              <div className="foo" role="button" aria-hidden="true">
                <Typography className={clsx(styles.primary_color, styles.link)}>Quy Chế Hoạt Động</Typography>
              </div>
              <a className={styles.alink} href="/register-with-us" target="_blank">
                <Typography className={clsx(styles.primary_color, styles.link)}>Đăng ký bán hàng cùng {BRAND_NAME}</Typography>
              </a>
            </Grid>
            {/* </div> */}
          </Grid>
          <Grid md={3} item>
            <b>LIÊN HỆ</b>
            <Typography className={styles.primary_color}>hotro@thuocsi.vn</Typography>
            <Typography className={styles.primary_color}>028 7300 8840</Typography>
            <Typography className={styles.primary_color}>(Từ T2 đến T7:8:00 - 18:00)</Typography>
            <div className={classes.link}>
              <Link href="https://www.facebook.com/thuocsivn/" className={clsx(styles.facebook, styles.link)}>
                <Image src={LOGO_FACEBOOK_NEW} width="10px" height="16px" layout="fixed" />
                <Typography className={clsx(styles.primary_color, styles.fb_text, styles.link)}>Facebook</Typography>
              </Link>
            </div>
          </Grid>
        </Grid>
        {open && <Dialog open={open} handleClose={toggleOpen} url={dialogUrl} maxWidth="md" />}
        <hr className={styles.hr} />
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
