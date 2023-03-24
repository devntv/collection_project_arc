/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-param-reassign */
import { Container } from '@material-ui/core';
import { CustomerClient, getData, getFirst, isValid, ProductClientV2 } from 'clients';
import TrackingOrderClient from 'clients/TrackingOrderClient';
import OrderDetailV2 from 'components-v2/organisms/OrderDetailV2';
import Template from 'components/layout/Template';
import { InfoContainer } from 'components/organisms';
import { NOT_FOUND_URL } from 'constants/Paths';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide, OrderService } from 'services';
import { getProxyImageList } from 'utils/ImageUtils';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Đơn hàng của bạn');

export async function getServerSideProps(ctx) {
  const { id = '' } = ctx.query;
  const errOrderUrl = `${NOT_FOUND_URL}?errOrder=${id}`;

  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const [orderRes, bankData, invoiceInfoRes, logsResult, invoiceFee] = await Promise.all([
        OrderService.getOrderDetail({ orderId: Number(id), ctx, locationCode: user?.provinceCode, customerLevel: user?.level }),
        CustomerClient.getBankAccount(ctx),
        CustomerClient.getListInvoiceInfo({ ctx }),
        TrackingOrderClient.getLogs({ ctx, id }),
        OrderService.getOrderInvoiceFee({ ctx, orderId: id }),
      ]);

      if (!isValid(orderRes)) {
        return {
          redirect: {
            destination: errOrderUrl,
            permanent: false,
          },
        };
      }

      const order = getFirst(orderRes, {});
      const bankInfo = bankData[0] || null;

      // Map deal into product
      const dealCodes = [];

      order.products.forEach((product) => {
        if (product?.dealCode && product?.type === 'DEAL') {
          dealCodes.push(product.dealCode);
        }
      });

      const dealDetailsRes = await ProductClientV2.getDealsDetail({ ctx, body: { codes: dealCodes }, params: { limit: dealCodes?.length || 100 } });

      const dealDetails = getData(dealDetailsRes);

      const dealMap = {};
      dealDetails.forEach((deal) => {
        dealMap[deal.code] = deal;
      });

      order.products = order.products.map((product) => {
        if (product?.dealCode && product?.type === 'DEAL') {
          product.productInfo.name = dealMap[product.dealCode]?.name || product.productInfo.nameNormal;
          product.productInfo.imagesProxy =
            dealMap[product?.dealCode]?.imageUrls?.length > 0
              ? getProxyImageList(dealMap[product?.dealCode]?.imageUrls)
              : getProxyImageList(product.productInfo.imageUrls) || [];
        } else {
          product.productInfo.name = product.productInfo.nameNormal;
          product.productInfo.imagesProxy = getProxyImageList(product.productInfo.originalImages);
        }
        return product;
      });

      return {
        props: {
          order,
          bankInfo,
          listInvoiceInfo: getData(invoiceInfoRes),
          invoiceFee,
          // logsResult,
          logs: getFirst(logsResult)?.logs || [],
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

const MyOrder = ({ user, order, isMobile, bankInfo, listInvoiceInfo, logs, invoiceFee }) => {
  const { orderId } = order;
  const titleMobile = `Chi tiết đơn hàng #${orderId}`;

  return (
    <Template isMobile={isMobile} pageTitle={titleMobile}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={3} name={user?.name} subTitle="Chi tiết đơn hàng">
            <OrderDetailV2
              isMobile={isMobile}
              order={order}
              user={user}
              bankInfo={bankInfo}
              listInvoiceInfo={listInvoiceInfo}
              logs={logs}
              invoiceFee={invoiceFee}
            />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
