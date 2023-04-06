import { dehydrate } from '@tanstack/react-query';
import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { HelpCenter } from '@/api/cms/help-center/types';
import { getHelpCenterFn } from '@/api/cms/help-center/useGetHelpCenter';
import type { FormatJobType, JobCategory, JobType } from '@/api/cms/jobs/types';
import { getJobCategoriesFn } from '@/api/cms/jobs/useGetJobCategories';
import type { GetJobsParams } from '@/api/cms/jobs/useGetJobs';
import { getInfiniteJobsFn } from '@/api/cms/jobs/useGetJobs';
import { getJobTypesFn } from '@/api/cms/jobs/useGetJobTypes';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import { getLocationFn } from '@/api/cms/useGetLocation';
import apiRoutes from '@/lib/apiRoutes';
import { PAGE_INDEX, PAGE_SIZE } from '@/lib/constants';
import { queryClient } from '@/lib/queryClient';
import { recruitmentConfig } from '@/modules/recruitment/recruitmentConfig';
import { RecruitmentPage } from '@/modules/recruitment/RecruitmentPage';

type Props = {
  // Declare Career props
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
  helpCenter: DefaultCmsDataResponse<HelpCenter> | null;
};

export default function Career(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <RecruitmentPage
      jobCategories={_props.jobCategories}
      jobTypes={_props.jobTypes}
      locations={_props.locations}
      helpCenter={_props.helpCenter}
    />
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale, query } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = recruitmentConfig;
  let jobCategoriesRes: DefaultCmsDataResponse<JobCategory>[] = [];
  let jobTypesRes: DefaultCmsDataResponse<JobType>[] = [];
  let locationsRes: DefaultCmsDataResponse<Location>[] = [];
  let helpCenterRes: DefaultCmsDataResponse<HelpCenter>[] = [];
  await getJobCategoriesFn()
    .then((res) => {
      jobCategoriesRes = res.data;
    })
    .catch((error) => console.log(error));

  const jobTypesData: DefaultCmsDataResponse<FormatJobType>[] = [];
  await getJobTypesFn()
    .then((res) => {
      jobTypesRes = res.data;
      jobTypesRes.map((item: DefaultCmsDataResponse<JobType>, idx) => {
        jobTypesData.push({
          id: item.id,
          attributes: {
            value: idx + 1,
            jobs: { ...item.attributes.jobs },
            description: item.attributes.description,
            name: item.attributes.name,
            slug: item.attributes.slug,
            parent: item.attributes.parent,
          },
        });
      });
    })
    .catch((error) => console.log(error));

  await getLocationFn()
    .then((res) => {
      locationsRes = res.data;
    })
    .catch((error) => console.log(error));

  try {
    await getHelpCenterFn({
      type: 'recruitment-page',
    })
      .then((res) => {
        helpCenterRes = res.data;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }

  const queryInfiniteJobs: Partial<GetJobsParams> = {
    'pagination[pageSize]': PAGE_SIZE,
    'pagination[page]': PAGE_INDEX + 1,
  };
  if (query?.category) {
    queryInfiniteJobs['filters[job_categories][slug][$eq]'] =
      query.category.toString();
  }

  if (query?.type) {
    queryInfiniteJobs['filters[job_types][slug][$eq]'] = query.type.toString();
  }

  if (query?.location) {
    queryInfiniteJobs['filters[locations][slug][$eq]'] =
      query.location.toString();
  }

  await queryClient.prefetchInfiniteQuery(
    [process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.job.categories],
    () => getInfiniteJobsFn(queryInfiniteJobs)
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      jobCategories: jobCategoriesRes,
      jobTypes: jobTypesData,
      locations: locationsRes,
      helpCenter: helpCenterRes.length > 0 ? helpCenterRes[0] : null,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
