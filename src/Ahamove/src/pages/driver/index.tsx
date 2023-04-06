import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { HelpCenter } from '@/api/cms/help-center/types';
import { getHelpCenterFn } from '@/api/cms/help-center/useGetHelpCenter';
import type { FormatOffice, Office } from '@/api/cms/office/types';
import { getOfficeFn } from '@/api/cms/office/useGetOffices';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import { driverConfig } from '@/modules/driver/driverConfig';
import { DriverPage } from '@/modules/driver/DriverPage';

type Props = {
  // Declare Driver props
  helpCenter: DefaultCmsDataResponse<HelpCenter> | null;
  office: DefaultCmsDataResponse<FormatOffice>[];
};

export default function Driver(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <DriverPage helpCenter={_props.helpCenter} office={_props.office} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = driverConfig;

  let helpCenterRes: DefaultCmsDataResponse<HelpCenter>[] = [];

  let officeRes: DefaultCmsDataResponse<Office>[] = [];
  const officeData: DefaultCmsDataResponse<FormatOffice>[] = [];

  try {
    await getHelpCenterFn({
      type: 'driver-page',
    })
      .then((res) => {
        helpCenterRes = res.data;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }

  try {
    await getOfficeFn()
      .then((res) => {
        officeRes = res.data;
        officeRes.map((item: DefaultCmsDataResponse<Office>, idx) => {
          officeData.push({
            id: item.id,
            attributes: {
              ...item.attributes,
              value: idx,
            },
          });
        });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      helpCenter: helpCenterRes.length > 0 ? helpCenterRes[0] : null,
      office: officeData,
    },
  };
};
