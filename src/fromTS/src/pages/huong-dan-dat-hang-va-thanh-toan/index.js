import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import HowToOrderAndPayment from 'components/mocules/huong-dan-dat-hang-va-thanh-toan';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Hướng dẫn đặt hàng và thanh toán');

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
const HowToOrderAndPaymentPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <HowToOrderAndPayment />
      </Container>
    </div>
  </Template>
);
export default React.memo(HowToOrderAndPaymentPage);
