import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import CustomerSupportContainer from 'components/organisms/CustomerSupportContainer';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Hỗ trợ khách hàng');

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
const CustomerSupport = () => (
  <Template>
    <div style={{ backgroundColor: '#f4f7fc' }}>
      <Container maxWidth="lg">
        <CustomerSupportContainer />
      </Container>
    </div>
  </Template>
);

export default CustomerSupport;
