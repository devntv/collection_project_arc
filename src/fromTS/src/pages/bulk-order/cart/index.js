import { Container } from '@material-ui/core';
import BulkOrderCartContent from 'components-v2/mocules/BulkOrderCartContent';
import BulkOrderContainer from 'components-v2/organisms/BulkOrderContainer';
import Template from 'components/layout/Template';
import { LoadingScreen } from 'components/organisms';
import { DEFAULT_BULK_ORDER_TITLE } from 'constants/data';
import { CART_URL } from 'constants/Paths';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { doWithServerSide } from 'services';
import { NotifyUtils } from 'utils';

// pass zustand store to page props
export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(
      ctx,
      async () =>
        // callback, user
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

const BulkOrderCartPage = ({ isMobile = false, ...restProps }) => {
  const router = useRouter();
  const { initialZustandState = {} } = restProps;
  const { user = {} } = initialZustandState;

  // validate user isActive
  if (!user?.isActive) {
    NotifyUtils.info('Tài khoản chưa được kích hoạt');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  if (user?.isQuest) {
    NotifyUtils.info('Bạn đang sử dụng tài khoản dùng thử, vui lòng tạo tài khoản để có thể thanh toán đơn hàng.');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  return (
    <Template title={DEFAULT_BULK_ORDER_TITLE} isMobile={isMobile} pageTitle={DEFAULT_BULK_ORDER_TITLE}>
      <Container style={{ maxWidth: '1352px', padding: '10px 22px 20px 22px' }}>
        <BulkOrderContainer>
          <BulkOrderCartContent user={user} />
        </BulkOrderContainer>
      </Container>
    </Template>
  );
};

export default withLogin(BulkOrderCartPage);
