import { InfoContainer, OrderDetailContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';
import { ENUM_ORDER_STATUS } from 'constants/Enums';

export async function getServerSideProps() {
  try {
    const [user, wallet, orders] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      CustomerClient.getOrder({ status: ENUM_ORDER_STATUS.ALL }),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        orders,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {
          name: '',
          phone: '',
          email: '',
        },
        wallet: {
          balance: 0,
          name: '',
        },
        orders: [
          {
            orderID: 197183,
            amount: 7,
            createdAt: '18/12/2020',
            deliveryAt: '23/12/2020',
            status: 'pending',
            total: 3024110,
          },
        ],
      },
    };
  }
}

const TestingAccountForm = ({ wallet }) => (
  <div style={{ backgroundColor: '#f4f7fc' }}>
    <Container>
      <InfoContainer value={2} title="Chi tiết đơn hàng" wallet={wallet}>
        <OrderDetailContainer />
      </InfoContainer>
    </Container>
  </div>
);

export default TestingAccountForm;
