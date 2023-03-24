import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import TermAndCondition from 'components/mocules/terms-and-condition';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Điều khoản sử dụng');

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
const TermAndConditionPage = ({ isMobile }) => (
  <Template isMobile={isMobile}>
    <div style={{ padding: '50px' }}>
      <Container maxWidth="lg">
        <TermAndCondition />
      </Container>
    </div>
  </Template>
);
export default React.memo(TermAndConditionPage);
