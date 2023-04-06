import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type {
  FormatPolicy,
  FormatRichDescription,
  Policy,
} from '@/api/cms/policy/types';
import { getPolicyFn } from '@/api/cms/policy/useGetPolicy';
import type {
  DefaultCmsDataResponse,
  DefaultCmsResponse,
} from '@/api/cms/types';
import { policyConfig } from '@/modules/policy/policyConfig';
import { PolicyPage } from '@/modules/policy/PolicyPage';

type Props = {
  // Declare Policies props
  policies: DefaultCmsDataResponse<FormatPolicy> | null;
};

export default function Policies(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <PolicyPage policies={_props.policies} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = policyConfig;

  let policiesRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Policy>>;
  const policiesItems: FormatRichDescription[] = [];
  try {
    const res = await getPolicyFn();
    policiesRes = res;
    policiesRes.data.attributes.items.map((item, idx) =>
      policiesItems.push({
        ...item,
        index: idx,
      })
    );
  } catch (error) {
    console.log('Policy', (error as Error).message);
  }

  const policiesData: DefaultCmsDataResponse<FormatPolicy> = {
    id: policiesRes?.data?.id,
    attributes: {
      items: policiesItems,
    },
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      policies: policiesItems.length > 0 && policiesData ? policiesData : null,
    },
  };
};
