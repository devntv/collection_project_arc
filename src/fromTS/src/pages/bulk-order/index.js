import { Container } from '@material-ui/core';
import BulkOrderContainer from 'components-v2/organisms/BulkOrderContainer';
import BulkOrderProducts from 'components-v2/organisms/BulkOrderProducts';
import Template from 'components/layout/Template';
import { DEFAULT_BULK_ORDER_TITLE } from 'constants/data';
import { withLogin } from 'HOC';
import { doWithServerSide } from 'services';
// pass zustand store to page props
export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(
      ctx,
      async () =>
        // if (![COLOR_CUSTOMER.BLUE, COLOR_CUSTOMER.PURPLE].includes(user?.color)) {
        //   return {
        //     redirect: {
        //       destination: '/',
        //     },
        //   };
        // }
        ({
          props: {},
        }),
      {
        namespaces: ['common'],
      },
    );
  } catch (error) {
    return {
      props: {},
    };
  }
}

const BulkOrderPage = ({ isMobile = false, ...restProps }) => {
  const { initialZustandState = {} } = restProps;
  const { user = {} } = initialZustandState;

  return (
    <Template title={DEFAULT_BULK_ORDER_TITLE} isMobile={isMobile} pageTitle={DEFAULT_BULK_ORDER_TITLE}>
      <Container style={{ maxWidth: '1352px', padding: '10px 22px 20px 22px' }}>
        <BulkOrderContainer isMobile={isMobile} user={user}>
          <BulkOrderProducts />
        </BulkOrderContainer>
      </Container>
    </Template>
  );
};

export default withLogin(BulkOrderPage);
