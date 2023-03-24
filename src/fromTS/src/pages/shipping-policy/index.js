import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import ShippingPolicy from 'components/mocules/shipping-policy';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Chính sách vận chuyển');

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
const ShippingPolicyPage = () => (
  <Template>
    <div className={styles.wrapper}>
      <Container maxWidth="lg">
        <ShippingPolicy />
      </Container>
    </div>
  </Template>
);
export default React.memo(ShippingPolicyPage);
