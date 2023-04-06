import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AboutUsPage } from '@/modules/recruitment/about-us/AboutUsPage';
import { recruitmentConfig } from '@/modules/recruitment/recruitmentConfig';

type Props = {
  // Declare About Us props
};

export default function AboutUs(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <AboutUsPage />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = recruitmentConfig;
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
};
