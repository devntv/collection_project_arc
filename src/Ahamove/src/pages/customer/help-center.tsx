import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { FormatHelpCenter, HelpCenter } from '@/api/cms/help-center/types';
import { getHelpCenterFn } from '@/api/cms/help-center/useGetHelpCenter';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import { customerConfig } from '@/modules/customer/customerConfig';
import { CustomerHelpCenterPage } from '@/modules/customer/CustomerHelpCenterPage';

type Props = {
  // Declare HelpCenterCustomer props
  helpCenter: DefaultCmsDataResponse<FormatHelpCenter>[];
};

export default function CustomerHelpCenter(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <CustomerHelpCenterPage helpCenter={_props.helpCenter} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = customerConfig;

  let helpCenterRes: DefaultCmsDataResponse<HelpCenter>[] = [];

  const helpCenterData: DefaultCmsDataResponse<FormatHelpCenter>[] = [];
  await getHelpCenterFn({
    type: 'customer',
  })
    .then((res) => {
      helpCenterRes = res.data;
      helpCenterRes.map((item: DefaultCmsDataResponse<HelpCenter>, idx) => {
        helpCenterData.push({
          id: item.id,
          attributes: {
            value: idx,
            ...item.attributes,
          },
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      helpCenter: helpCenterData,
    },
  };
};
