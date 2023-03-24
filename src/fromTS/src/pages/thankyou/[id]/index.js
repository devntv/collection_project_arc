import { Container } from '@material-ui/core';
import { getFirst } from 'clients';
import AccountingClient from 'clients/AccountingClient';
import { LoadingScreen } from 'components';
import Template from 'components/layout/Template';
import ThankYouContainer from 'components/organisms/ThankYouContainer';
import { PAYMENT_METHOD } from 'constants/Enums';
import { CART_URL } from 'constants/Paths';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { doWithServerSide, OrderService } from 'services';
import { NotifyUtils } from 'utils';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Cảm ơn bạn đã đặt hàng tại thuocsi.vn!');

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const [orderRes] = await Promise.all([
        OrderService.getOrderDetail({ orderId: Number(id), ctx, getCombo: false, locationCode: user?.provinceCode, customerLevel: user?.level }),
      ]);

      const order = getFirst(orderRes);

      if (order?.paymentMethod === PAYMENT_METHOD.CREDIT) {
        const { orderId } = order;
        const debtOrderRes = await AccountingClient.getListTransactions({ orderId, ctx, actionType: 'BUY', status: 'SUCCESS' });
        order.transaction = getFirst(debtOrderRes);
      }

      return {
        props: {
          order,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const ThankYou = ({ user, order = {}, isMobile }) => {
  const { companyName, name } = user;
  const router = useRouter();
  if (!order) {
    NotifyUtils.error('Không tìm thấy đơn hàng cần tìm.');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  const { orderId, deliveryDate, orderCode, canEdit, totalPrice, redeemCode, paymentMethod, transaction } = order;
  // // TODO: insider
  // Insider.confirmation();

  return (
    <Template isMobile={isMobile} pageTitle="Đặt hàng thành công" overrideMV2Options={{ title: 'Đặt hàng thành công' }}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer
            orderId={orderId}
            orderCode={orderCode}
            deliveryDate={deliveryDate}
            canEdit={canEdit}
            totalPrice={totalPrice}
            redeemCode={redeemCode}
            paymentMethod={paymentMethod}
            isMobile={isMobile}
            companyName={companyName}
            name={name}
            transaction={transaction}
            {...order}
          />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ThankYou);
