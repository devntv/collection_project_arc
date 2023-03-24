/* eslint-disable camelcase */
import { Container } from '@material-ui/core';
import { getData, getFirst, IngredientCLient, isValid } from 'clients';
import Template from 'components/layout/Template';
import IngredientDetailContainer from 'components/organisms/IngredientDetailContainer';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { PAGE_SIZE_30 } from 'constants/data';
import { INGREDIENT } from 'constants/Paths';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Router from 'next/router';
import { ProductServiceV2 } from 'services';
import { doWithServerSide } from 'services/SsrService';
import { NotifyUtils } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  return doWithServerSide(
    ctx,
    async () => {
      const [ingredientRes] = await Promise.all([IngredientCLient.getIngredientBySlug(ctx, slug)]);
      const ingredient = getFirst(ingredientRes);
      if (!ingredient) {
        return {
          props: {
            SEO_CONFIG: {
              title: getTitle('Tất cả hoạt chất'),
            },
          },
        };
      }
      const page = Number(ctx.query.page) || 1;
      const productRes = await IngredientCLient.getProductsBySlug(ctx, ingredient?.code, {
        limit: PAGE_SIZE_30,
        getTotal: true,
        offset: (page - 1) * PAGE_SIZE_30,
      });

      const listProductMapRes = await ProductServiceV2.mapDataProduct({ ctx, result: productRes });
      return {
        props: {
          ingredientRes,
          page,
          total: productRes?.total || 0,
          products: getData(listProductMapRes),
          SEO_CONFIG: {
            title: getTitle(ingredient?.name),
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

const Ingredient = ({ ingredientRes = {}, products = [], isMobile, page, total }) => {
  if (!isValid(ingredientRes)) {
    NotifyUtils.error('Không tìm thấy hoạt chất. Hãy liên hệ chúng tôi để hỏi thêm về hoạt chất này.');
    Router.push(INGREDIENT);
    return <LoadingScreen />;
  }
  const ingredient = ingredientRes.data[0];
  return (
    <Template isMobile={isMobile} pageTitle={ingredient.name}>
      <div className={styles.wapper} style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container className={styles.lg} maxWidth="lg">
          <IngredientDetailContainer ingredient={ingredient} products={products} page={page} total={total} isMobile={isMobile} />
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Ingredient, false, { url: '/ingredients' });
