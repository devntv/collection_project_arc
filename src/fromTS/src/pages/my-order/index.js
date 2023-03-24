import { Container, Grid } from '@material-ui/core';
import { CustomerClient, getData, TicketClient } from 'clients';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { doWithServerSide } from 'services';
// import OrderInfoTabsV2 from '../OrderInforTabV2';
import OrderInforTabV2 from 'components-v2/mocules/OrderInforTabV2';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Đơn hàng của bạn');

export async function getServerSideProps(ctx) {
  const {
    status = ENUM_ORDER_STATUS.ALL,
    // offset = OFFSET_DEFAULT,
    // limit = LIMIT_DEFAULT,
    // q = status !== ENUM_ORDER_STATUS.ALL ? JSON.stringify({ status }) : null,
  } = ctx.query;
  if (status !== ENUM_ORDER_STATUS.ALL) ctx.query.q = JSON.stringify({ status });
  return doWithServerSide(
    ctx,
    async () => {
      const [bankData, reasonsRes, invoiceInfoRes] = await Promise.all([
        // OrderService.getOrders({ status, ctx, offset, limit, q }),
        CustomerClient.getBankAccount(ctx),
        TicketClient.getListReasons(ctx),
        CustomerClient.getListInvoiceInfo({ ctx }),
      ]);

      const bankInfo = bankData[0] || null;

      const reasonsList = getData(reasonsRes);

      return {
        props: {
          status,
          bankInfo,
          reasonsList,
          listInvoiceInfo: getData(invoiceInfoRes),
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

const MyOrder = ({ user, isMobile, status, bankInfo, reasonsList, listInvoiceInfo }) => (
  <Template isMobile={isMobile} pageTitle="Đơn hàng của tôi">
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <InfoContainer isMobile={isMobile} value={3} title="" subTitle="Đơn hàng của tôi" name={user?.name}>
          <>
            {/* <OrderTop /> */}
            <Grid item container spacing={3}>
              <Grid item xs={12} key="order-info-2">
                <OrderInforTabV2
                  user={user}
                  status={status}
                  bankInfo={bankInfo}
                  reasonsList={reasonsList}
                  listInvoiceInfo={listInvoiceInfo}
                  isMobile={isMobile}
                />
              </Grid>
            </Grid>
          </>
        </InfoContainer>
      </Container>
    </div>
  </Template>
);
export default withLogin(MyOrder);
