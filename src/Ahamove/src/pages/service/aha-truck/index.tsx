import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { DemandService } from '@/api/cms/services/type';
import { getDemandServicesFn } from '@/api/cms/services/useGetDemandService';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import { AhaTruckPage } from '@/modules/service/aha-truck/AhaTruckPage';
import { serviceConfig } from '@/modules/service/serviceConfig';

type Props = {
  // Declare AhaDelivery props
  services: DefaultCmsDataResponse<DemandService>[] | null;
};

export default function AhaTruck(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!_props.services) return;
  return <AhaTruckPage services={_props.services} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = serviceConfig;

  let serviceRes: DefaultCmsDataResponse<DemandService>[] = [];
  await getDemandServicesFn({
    type: 'truck',
  })
    .then((res) => (serviceRes = res.data))
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      services: serviceRes,
    },
  };
};
