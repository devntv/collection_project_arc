import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { customerConfig } from '@/modules/customer/customerConfig';
import { MerchantPage } from '@/modules/customer/merchant/MerchantPage';

type Props = {
  // Declare Merchant props
};

export default function Merchant(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <MerchantPage />;
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