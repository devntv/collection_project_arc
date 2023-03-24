import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import ChinhSachDangTaiSanPham from 'components/mocules/chinh-sach-dang-tai-san-pham';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Chính sách đăng tải sản phẩm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      SEO_CONFIG: {
        title,
      },
    },
  }));
}

// TODO: translate
const ChinhSachDangTaiSanPhamPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <ChinhSachDangTaiSanPham />
      </Container>
    </div>
  </Template>
);
export default React.memo(ChinhSachDangTaiSanPhamPage);
