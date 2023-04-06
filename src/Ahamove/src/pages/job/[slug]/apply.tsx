import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { Job } from '@/api/cms/jobs/types';
import { getJobBySlugFn } from '@/api/cms/jobs/useGetJobBySlug';
import { getJobsFn } from '@/api/cms/jobs/useGetJobs';
import type {
  DefaultCmsDataResponse,
  DefaultCmsResponse,
} from '@/api/cms/types';
import { PAGE_SIZE } from '@/lib/constants';
import { JDPage } from '@/modules/recruitment/job/JDPage';
import { recruitmentConfig } from '@/modules/recruitment/recruitmentConfig';

type Props = {
  // Declare JD props
  job: DefaultCmsDataResponse<Job> | null;
};

export default function Apply(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <JDPage job={_props.job} apply={true} />;
}

export const getStaticPaths = async () => {
  let pageCurrent = 1;
  const pageSize = PAGE_SIZE;
  let jobsRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Job>[]>;
  await getJobsFn({
    'pagination[page]': pageCurrent,
    'pagination[pageSize]': pageSize,
    fields: 'slug',
  })
    .then((res) => (jobsRes = res))
    .catch((error) => console.log(error));
  let paths: {
    params: {
      slug: string;
    };
  }[] = [];
  if (jobsRes.data && jobsRes.data.length > 0) {
    jobsRes.data.map((item) => ({
      params: { slug: item.attributes.slug + '/apply' },
    }));
    if (jobsRes.meta.pagination.total > pageCurrent * pageSize) {
      const totalSize = jobsRes.meta.pagination.total;
      while (pageCurrent * pageSize < totalSize) {
        pageCurrent++;
        try {
          await getJobsFn({
            'pagination[page]': pageCurrent,
            'pagination[pageSize]': pageSize,
            fields: 'slug',
          })
            .then((res) => {
              jobsRes = res;
              paths = paths.concat(
                jobsRes.data.map((item) => ({
                  params: { slug: item.attributes.slug + '/apply' },
                }))
              );
            })
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale, params } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = recruitmentConfig;
  let jobRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Job>>;
  if (params?.slug) {
    await getJobBySlugFn(params.slug.toString())
      .then((res) => {
        jobRes = res;
      })
      .catch((error) => {
        console.log(error);
      });
    if (jobRes.data) {
      return {
        props: {
          ...(await serverSideTranslations(locale, i18nNamespaces)),
          job: jobRes.data ? jobRes.data : null,
        },
        revalidate: 30,
      };
    }
    return {
      notFound: true,
    };
  }

  return {
    notFound: true,
  };
};
