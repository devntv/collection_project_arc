import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import HowToUploadProducts from 'components/mocules/huong-dan-dang-tai-san-pham';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Hướng dẫn đăng tải sản phẩm');

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
const HowToUploadProductsPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <HowToUploadProducts />
      </Container>
    </div>
  </Template>
);
export default React.memo(HowToUploadProductsPage);
