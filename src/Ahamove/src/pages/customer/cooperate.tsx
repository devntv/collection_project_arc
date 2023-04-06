import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CooperatePage } from '@/modules/customer/cooperate/CooperatePage';
import { customerConfig } from '@/modules/customer/customerConfig';

type Props = {
  // Declare Merchant props
};

export default function Cooperate(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <CooperatePage />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = customerConfig;
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
};
