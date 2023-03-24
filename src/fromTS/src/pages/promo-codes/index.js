/* eslint-disable camelcase */
import { getData, OrderClient, PromoClient } from 'clients';
import Template from 'components/layout/Template';
import PromoCodesContainer from 'components/organisms/PromoCodesContainer';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services/SsrService';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Mã giảm giá');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        myVouchers: getData(await OrderClient.getVouchers({ ctx, scope: 'me' })),
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const PromoCodes = ({ isMobile }) => {
  const pageTitle = 'Mã giảm giá';
  const name = 'promo-codes';
  const [loading, setLoading] = useState(false);
  const [dataMyVoucher, setDataMyVoucher] = useState([]);
  const [dataOtherVoucher, setDataOrtherVoucher] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function getDataVoucher() {
      // getData(await PromoClient.getDataVoucherClient({ signal }));
      setLoading(true);
      const [myVoucher, otherVoucher] = await Promise.all([
        PromoClient.getDataVoucherClient({ signal, scope: 'me' }),
        PromoClient.getDataVoucherClient({ signal, scope: 'other' }),
      ]);
      setDataMyVoucher(getData(myVoucher));
      setDataOrtherVoucher(getData(otherVoucher));
      setLoading(false);
    }

    getDataVoucher();
    return controller.abort();
  }, []);

  return (
    <Template isMobile={isMobile} pageTitle={pageTitle} pageName={name} showTopSearchMV2>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh' }}>
        <PromoCodesContainer isMobile={isMobile} myDataVoucher={dataMyVoucher} ortherDataVoucher={dataOtherVoucher} loading={loading} />
      </div>
    </Template>
  );
};

export default withLogin(PromoCodes);
