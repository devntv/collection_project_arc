import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import HowToReturnRefund from 'components/mocules/chinh-sach-doi-tra';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Chính sách đổi trả');

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
const HowToReturnRefundPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <HowToReturnRefund />
      </Container>
    </div>
  </Template>
);
export default React.memo(HowToReturnRefundPage);
