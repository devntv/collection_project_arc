import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Intergration from '@/modules/intergration';
import { recruitmentConfig } from '@/modules/recruitment/recruitmentConfig';
type Props = {
  // Declare About Us props
};

export default function IntergrationAccount(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <Intergration />;
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
