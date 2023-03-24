import MV2BusinessInformation from 'components-v2/organisms/Mobile/BusinessInformation';
import { UserProps } from 'components-v2/organisms/Mobile/BusinessInformation/interface';
import Template from 'components/layout/Template';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';

interface Props {
  user: UserProps;
  isMobile: boolean;
}

const title = getTitle('Thông tin doanh nghiệp');

export async function getServerSideProps(ctx: string) {
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

const BusinessInformation = ({ user, isMobile }: Props): JSX.Element => {
  const name = 'Thông tin doanh nghiệp';
  return (
    <Template showTopSearchMV2={false} isMobile={isMobile} pageTitle={name} pageName={name}>
      <MV2BusinessInformation user={user} />
    </Template>
  );
};

export default withLogin(BusinessInformation);
