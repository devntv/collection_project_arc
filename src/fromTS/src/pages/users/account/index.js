import ListContentAccountV2 from 'components-v2/organisms/ListContentAccountV2';
import Template from 'components/layout/Template';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Cập nhật hồ sơ');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
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

const Account = ({ user, isMobile }) => {
  const name = 'Tài Khoản';
  return (
    <Template showTopSearchMV2={false} isMobile={isMobile} pageTitle={name}>
      <div style={{ backgroundColor: 'red' }}>
        <ListContentAccountV2 user={user} />
      </div>
    </Template>
  );
};
export default Account;
