import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import ChinhSachBaoMat from 'components/mocules/chinh-sach-bao-mat';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Chính sách bảo mật');

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      SEO_CONFIG: {
        title,
      },
    },
  }));
}

const ChinhSachBaoMatPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <ChinhSachBaoMat />
      </Container>
    </div>
  </Template>
);
export default React.memo(ChinhSachBaoMatPage);
