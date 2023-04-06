import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getHomeBannerFn } from '@/api/cms/home-banner/useGetHomeBanner';
import type {
  Banner,
  DefaultCmsDataResponse,
  DefaultCmsResponse,
} from '@/api/cms/types';
import { homeConfig } from '@/modules/home/homeConfig';
import { HomePage } from '@/modules/home/HomePage';

type Props = {
  // Declare Home props
  homeBannerData: DefaultCmsDataResponse<Banner> | null;
};

export default function Home(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <HomePage homeBannerData={_props.homeBannerData} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = homeConfig;

  let homeBannerRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Banner>>;
  try {
    const res = await getHomeBannerFn();
    homeBannerRes = res;
  } catch (error) {
    console.log('HomeBanner', (error as Error).message);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      homeBannerData:
        homeBannerRes && homeBannerRes.data ? homeBannerRes.data : null,
    },
  };
};
