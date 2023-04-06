import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CooperateServicePage } from '@/modules/service/cooperate/CooperateServicePage';
import { serviceConfig } from '@/modules/service/serviceConfig';

type Props = {
  // Declare Cooperate Service props
};

export default function CooperateService(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <CooperateServicePage />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = serviceConfig;
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
};
