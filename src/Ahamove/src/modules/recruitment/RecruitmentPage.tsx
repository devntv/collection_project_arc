import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import type { HelpCenter } from '@/api/cms/help-center/types';
import type { FormatJobType, JobCategory } from '@/api/cms/jobs/types';
import { useGetPosts } from '@/api/cms/posts/useGetPosts';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import FAQContent from '@/components/FAQContent';
import Container from '@/components/layouts/Container';
import BlogContent from '../blog/BlogContent';
import JobOpportunityContentComponentRender from './job/JobOpportunityContentComponentRender';
import RecruitmentAboutUs from './RecruitmentAboutUs';
import RecruitmentBanner from './RecruitmentBanner';
import RecruitmentCareerPath from './RecruitmentCareerPath';
import { recruitmentConfig } from './recruitmentConfig';
import RecruitmentConnect from './RecruitmentConnect';
import RecruitmentProcess from './RecruitmentProcess';
import WeAreAhamovers from './WeAreAhamovers';

type Props = {
  // Declare RecruitmentPage props
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
  helpCenter: DefaultCmsDataResponse<HelpCenter> | null;
};

export const RecruitmentPage: FC<Props> = ({
  jobCategories,
  jobTypes,
  locations,
  helpCenter,
}) => {
  const { t } = useTranslation(recruitmentConfig.i18nNamespaces);
  const { data: postsData } = useGetPosts({
    'pagination[page]': 1,
    'pagination[pageSize]': 4,
  });

  return (
    <Container title={t('recruitment:recruitment.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <RecruitmentBanner />
        <RecruitmentAboutUs />
        <JobOpportunityContentComponentRender
          preIntro="Cơ hội nghề nghiệp"
          title="Ahamovers - Những chiến binh không ngừng chuyển động!"
          desc="Hãy chuyển động cùng Ahamove để chinh phục những đỉnh cao mới!"
          jobCategories={jobCategories}
          jobTypes={jobTypes}
          locations={locations}
        />
        <RecruitmentCareerPath />
        <WeAreAhamovers />
        <RecruitmentConnect />
        <RecruitmentProcess />
        <BlogContent
          posts={postsData?.data ? postsData.data : null}
          title="Tin tức mới nhất"
          embed={true}
          direction="row"
        />
        {helpCenter && helpCenter.attributes?.items ? (
          <div className="desktop:mx-auto desktop:px-8 max-w-4xl py-14 px-4">
            <h2 className="desktop:text-title42 text-title32 mb-16 text-center font-bold text-black">
              Những câu hỏi thường gặp
            </h2>
            {helpCenter.attributes?.items &&
              helpCenter.attributes?.items.length > 0 && (
                <FAQContent faq={helpCenter.attributes.items[0]} />
              )}
          </div>
        ) : null}
      </main>
    </Container>
  );