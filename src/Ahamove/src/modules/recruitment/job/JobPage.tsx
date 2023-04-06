import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import type { FormatJobType, JobCategory } from '@/api/cms/jobs/types';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import { recruitmentConfig } from '../recruitmentConfig';
import JobBanner from './JobBanner';
import JobOpportunityContentPageRender from './JobOpportunityContentPageRender';

type Props = {
  // Declare JobPage props
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
};

export const JobPage: FC<Props> = ({ jobCategories, jobTypes, locations }) => {
  const { t } = useTranslation(recruitmentConfig.i18nNamespaces);

  return (
    <Container title={t('recruitment:recruitment.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <JobBanner />
        <JobOpportunityContentPageRender
          preIntro="Cơ hội nghề nghiệp"
          title="Ahamovers - Những chiến binh không ngừng chuyển động!"
          desc="Hãy chuyển động cùng Ahamove để chinh phục những đỉnh cao mới!"
          jobCategories={jobCategories}
          jobTypes={jobTypes}
          locations={locations}
        />
      </main>
    </Container>
  );
};