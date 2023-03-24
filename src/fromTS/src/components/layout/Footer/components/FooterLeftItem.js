import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import PrivacyModal from 'components/mocules/PrivacyModal';
import { Dialog } from 'components/organisms';
import { BRAND_NAME } from 'constants/Enums';
import {
  LINK_REGISTER,
  LOGO_AHAMOVE,
  LOGO_FOOTER_REGISTER,
  LOGO_FOOTER_SVG,
  LOGO_GHN,
  LOGO_GHTK,
  LOGO_GRAB,
  LOGO_LOZA,
  LOGO_NINJA,
} from 'constants/Images';
import { useModal } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DOMAIN_SELLER_CENTER, LINK_LICENSE } from 'sysconfig';
import styles from '../styles.module.css';

const FooterLeftItem = () => {
  const router = useRouter();
  const [openPrivacy, toggleOpenPrivacy] = useState(false);
  const [open, toggleOpen] = useModal();
  const [dialogUrl, setDialogUrl] = useState('');
  const handleToggleOpen = (url) => {
    setDialogUrl(url);
    toggleOpen();
  };
  return (
    <Grid item xs={6}>
      <div>
        <LinkComp href="/">
          <Image src={LOGO_FOOTER_SVG} width="164" height="40" />
        </LinkComp>
      </div>
      <div>
        <Typography className={styles.mb1}>
          <b>
            <span className={styles.primary_color}>
              <Link href="/" prefetch={false}>
                thuocsi.vn&nbsp;
              </Link>
            </span>
            là website thuộc sở hữu của công ty TNHH Buymed.
          </b>
        </Typography>
      </div>
      <div className={clsx(styles.info_wrap, styles.mb3)}>
        <b>Công Ty TNHH Buymed</b>
        <span>
          Địa Chỉ: <b>28Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</b>
        </span>
        <span>
          Số Chứng Nhận Đăng Ký Kinh Doanh: <b>0314758651, Cấp Ngày 29/11/2017</b>,
        </span>
        <span>Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</span>
        <span>
          Số Giấy Phép Sàn Thương Mại Điện Tử:
          <Link href={LINK_LICENSE} prefetch={false}>
            <span className={styles.link}> 0314758651/KD-0368</span>
          </Link>
        </span>
        <a href={LINK_REGISTER}>
          <div className={styles.mt2}>
            <Image src={LOGO_FOOTER_REGISTER} width="117" height="44" />
          </div>
        </a>
      </div>
      <div className={styles.mb3}>
        <p className={styles.footer_header}>THÔNG TIN CHUNG</p>
        <Grid container>
          <Grid sm={6} item>
            <Link href="/about-us" prefetch={false}>
              <Typography className={router.pathname === '/about-us' ? clsx(styles.active, styles.link) : styles.link}>
                Giới thiệu về thuocsi.vn
              </Typography>
            </Link>
            <Link href="/how-to-order" prefetch={false}>
              <Typography className={styles.link}>Hướng dẫn đặt hàng</Typography>
            </Link>
            <div className="foo" onClick={toggleOpenPrivacy} role="button" aria-hidden="true">
              <Typography className={styles.link}>Chính sách bảo mật</Typography>
            </div>
            <Link href="https://thuocsihotro.helpwise.help/" prefetch={false}>
              <Typography className={styles.link}>Câu hỏi Nhà thuốc</Typography>
            </Link>
            <Link href="https://thuocsisellercenter.helpwise.help/" prefetch={false}>
              <Typography className={styles.link}>Câu hỏi Nhà bán hàng</Typography>
            </Link>
            <div className="foo" onClick={() => handleToggleOpen('general-policy')} role="button" aria-hidden="true">
              <Typography className={styles.link}>Chính sách quy định chung</Typography>
            </div>
            <a className={styles.alink} href="/career" target="_blank">
              <Typography className={styles.link}>Tuyển dụng | Recruitment</Typography>
            </a>
          </Grid>
          <Grid sm={6} item>
            <>
              <div className="foo" onClick={() => handleToggleOpen('conditions-of-use')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Điều khoản sử dụng</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('dispute-resolution')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Cơ chế giải quyết tranh chấp</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('terms-and-condition')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Thỏa thuận về dịch vụ TMDT</Typography>
              </div>
              <div className="foo" role="button" aria-hidden="true">
                <Typography className={styles.link}>Quy chế hoạt động</Typography>
              </div>
              <Link className={styles.alink} href={DOMAIN_SELLER_CENTER} target="_blank" prefetch={false}>
                <Typography className={styles.link}>Đăng ký bán hàng cùng {BRAND_NAME}</Typography>
              </Link>
            </>
          </Grid>
        </Grid>
      </div>
      <div>
        <p className={styles.footer_header}>DỊCH VỤ GIAO HÀNG</p>
        <div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GHTK} width="128" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_AHAMOVE} width="107" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GRAB} width="79" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GHN} width="46" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_LOZA} width="46" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_NINJA} width="79" height="32" className={styles.footer_delivery} />
          </div>
        </div>
      </div>
      {open && <Dialog open={open} handleClose={toggleOpen} url={dialogUrl} maxWidth="md" />}
      {openPrivacy && <PrivacyModal />}
    </Grid>
  );
};

export default React.memo(FooterLeftItem);
