/* eslint-disable camelcase */
import { Box, Container, Fab } from '@material-ui/core';
import clsx from 'clsx';
import Template from 'components/layout/Template';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { useSetting } from 'context';
import { useIsMobile } from 'hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import { changeAlias } from 'utils/StringUtils';
import styles from './styles.module.css';

const title = getTitle('Tất cả hoạt chất');

// const ONE_HOUR_SECONDS =

// export async function getStaticProps(ctx) {
//   const [ingredients] = await Promise.all([IngredientCLient.loadDataIngredient(ctx)]);
//   const convertIngredients = (ingre = []) =>
//     ingre
//       ?.sort((a, b) => a?.name.localeCompare(b?.name))
//       ?.map(({ name, slug, isMedicine = false }) => ({
//         unsignedKey: changeAlias(name),
//         name,
//         slug,
//         isMedicine,
//       }));
//   const ingredientsList = convertIngredients(ingredients);
//   const ingredientsIsMedicine = ingredientsList?.filter((ingreMedicine) => ingreMedicine && ingreMedicine?.isMedicine === true);
//   const ingredientIsNotMedicine = ingredientsList?.filter((ingreMedicine) => ingreMedicine && ingreMedicine?.isMedicine === false);
//   return {
//     props: {
//       ingredients: ingredientsList || [],
//       medicine: ingredientsIsMedicine || [],
//       notMedicine: ingredientIsNotMedicine || [],
//     },
//     revalidate: 300,
//   };
// }
// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    () => ({
      props: {
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
      inititalZustand: ['hashtagTopSearch', 'countdownBars', 'menuBar', 'insiderSetting', 'thumbnails'],
    },
  );
}

const Ingredients = () => {
  const { ingredients = [] } = useSetting();

  const convertIngredients = (ingre = []) =>
    ingre &&
    ingre
      ?.sort((a, b) => a?.name.localeCompare(b?.name))
      ?.map(({ name, slug, isMedicine = false }) => ({
        unsignedKey: changeAlias(name),
        name,
        slug,
        isMedicine,
      }));
  const ingredientsList = convertIngredients(ingredients);
  const medicine = ingredientsList?.filter((ingreMedicine) => ingreMedicine && ingreMedicine?.isMedicine === true);
  const notMedicine = ingredientsList?.filter((ingreMedicine) => ingreMedicine && ingreMedicine?.isMedicine === false);
  const pageName = 'ingredients';
  const router = useRouter();
  const [activeBtn, setActiveBtn] = React.useState(false);
  // bắt tab là medince hay nomedicine
  const { tab = 'medicine' } = router?.query || {};
  const { isMobile } = useIsMobile();

  // hàm đổi path
  const handleChangeTab = (value) => {
    router.push(`${router.pathname}?tab=${value}`);
    if (value === 'medicine') {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  };

  return (
    <Template isMobile={isMobile()} showTopSearchMV2 pageName={pageName}>
      <div className={styles.ingredients}>
        <Container maxWidth="lg">
          <Box className={styles.tabIngredient}>
            {/* ()=> handleChangeTab("xxxx") */}
            <Fab
              variant="extended"
              aria-label="all"
              onClick={() => handleChangeTab('medicine')}
              className={clsx(styles.BtnMedicine, !activeBtn && styles.BtnActive)}
            >
              Thuốc
            </Fab>
            <Fab
              variant="extended"
              aria-label="all"
              onClick={() => handleChangeTab('notmedicine')}
              className={clsx(styles.BtnMedicine, activeBtn && styles.BtnActive)}
            >
              Không phải thuốc
            </Fab>
          </Box>
          <IngredientContainer ingredients={tab === 'medicine' ? medicine : notMedicine} tab={tab} />
        </Container>
      </div>
    </Template>
  );
};

export default Ingredients;
