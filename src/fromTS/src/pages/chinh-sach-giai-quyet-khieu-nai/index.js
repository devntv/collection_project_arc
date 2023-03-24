import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import ChinhSachGiaiQuyetKhieuNai from 'components/mocules/chinh-sach-giai-quyet-khieu-nai';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Chính sách giải quyết khiếu nại');

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
const ChinhSachGiaiQuyetKhieuNaiPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <ChinhSachGiaiQuyetKhieuNai />
      </Container>
    </div>
  </Template>
);
export default React.memo(ChinhSachGiaiQuyetKhieuNaiPage);
