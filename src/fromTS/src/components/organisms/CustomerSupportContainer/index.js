import { Divider, Grid, Paper } from '@material-ui/core';
import { BRAND_NAME } from 'constants/Enums';
import {
  ABOUT_US_URL,
  CAREER,
  CHINH_SACH_BAO_MAT_URL,
  CONDITIONS_OF_USE_URL,
  DISPUTE_RESOLUTION_URL,
  GENERAL_POLICY_URL,
  LEGAL_IMAGE,
  LICENSE_PDF,
  ORDER_GUIDE,
  QNA,
  REGULATIONS_URL,
  TERMS_URL,
} from 'constants/Paths';
import Link from 'next/link';
import styles from './styles.module.css';

const CustomerSupportContainer = () => (
  <Grid container className={styles.container}>
    <Grid item xs={12}>
      <h2>Hỗ trợ khách hàng </h2>
    </Grid>
    <Grid item xs={12}>
      <Paper style={{ padding: '16px' }} className={styles.paper}>
        <div>
          <Link href={ABOUT_US_URL} prefetch={false}>
            Giới thiệu về {BRAND_NAME}
          </Link>
        </div>
        <div>
          <Link href={CAREER} prefetch={false}>
            Tuyển dụng | Recruitment
          </Link>
        </div>
        <div>
          <Link href="/" prefetch={false}>
            Đăng ký bán hàng cùng {BRAND_NAME}
          </Link>
        </div>
        <Divider />
        <div>
          <Link href={CHINH_SACH_BAO_MAT_URL} prefetch={false}>
            Chính sách bảo mật
          </Link>
        </div>
        <div>
          <Link href={QNA} prefetch={false}>
            Câu hỏi thường gặp (Q&A)
          </Link>
        </div>
        <div>
          <Link href="https://thuocsihotro.helpwise.help/" prefetch={false}>
            Câu hỏi Nhà thuốc
          </Link>
        </div>
        <div>
          <Link href="https://thuocsisellercenter.helpwise.help/" prefetch={false}>
            Câu hỏi Nhà bán hàng
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={GENERAL_POLICY_URL}>
            Chính sách quy định chung
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={CONDITIONS_OF_USE_URL}>
            Điều khoản sử dụng
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={DISPUTE_RESOLUTION_URL}>
            Cơ chế giải quyết tranh chấp
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={TERMS_URL}>
            Thỏa thuận về dịch vụ TMDT
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={ORDER_GUIDE}>
            Hướng dẫn đặt hàng
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={REGULATIONS_URL}>
            Quy chế hoạt động
          </Link>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <h2>Thông tin doanh nghiệp </h2>
    </Grid>
    <Grid item xs={12}>
      <Paper style={{ padding: '16px' }} className={styles.paper}>
        <div>
          <Link prefetch={false} href="/">
            thuocsi.vn
          </Link>
          là website thuộc sở hữu của công ty TNHH Buymed.
        </div>
        <br />
        <div>
          <strong> Công Ty TNHH Buymed </strong>
        </div>
        <div>
          Địa chỉ: <strong>28Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</strong>
        </div>
        <div>
          Số chứng nhận đăng ký kinh doanh: <strong> 0314758651, cấp ngày 29/11/2017, </strong>
        </div>
        <div>tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</div>
        <div>
          Số Giấy phép Sàn thương mại điện tử:
          <Link prefetch={false} href={LICENSE_PDF}>
            0314758651/KD-0368
          </Link>
        </div>
      </Paper>
    </Grid>
    <Grid>
      <img
        className={styles.img_legal}
        alt="Dấu đỏ của Bộ Công Thương"
        data-src={LEGAL_IMAGE}
        src={LEGAL_IMAGE}
        title="Dấu đỏ của Bộ Công Thương"
        data-loaded="true"
      />
    </Grid>
  </Grid>
);

export default CustomerSupportContainer;
