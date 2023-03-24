/* eslint-disable camelcase */
import { Container } from '@material-ui/core';
import { ProductClient } from 'clients';
import Template from 'components/layout/Template';
import ManufacturerContainer from 'components/organisms/ManufacturerContainer';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services/SsrService';
import { getTitle } from 'utils/SEOUtils';
import { changeAlias } from 'utils/StringUtils';

const title = getTitle('Tất cả nhà sản xuất');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [manufacturers] = await Promise.all([ProductClient.loadDataManufacturer(ctx)]);
      const convertManufacturers = (manu = []) =>
        manu
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, slug }) => ({
            unsignedKey: changeAlias(name),
            name,
            slug,
          }));
      return {
        props: {
          manufacturers: convertManufacturers(manufacturers),
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

const Manufacturers = ({ manufacturers = [], isMobile }) => {
  const pageName = 'manufacturers';
  return (
    <Template isMobile={isMobile} pageName={pageName}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <ManufacturerContainer manufacturers={manufacturers} />
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Manufacturers, false);
