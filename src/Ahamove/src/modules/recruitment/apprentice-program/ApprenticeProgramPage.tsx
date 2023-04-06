import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import type { HelpCenter } from '@/api/cms/help-center/types';
import type { FormatJobType, JobCategory } from '@/api/cms/jobs/types';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import FAQContent from '@/components/FAQContent';
import Container from '@/components/layouts/Container';
import BenefitsContent from '@/modules/service/BenefitsContent';
import AboutUsCulture from '../about-us/AboutUsCulture';
import JobOpportunityContentComponentRender from '../job/JobOpportunityContentComponentRender';
import { recruitmentConfig } from '../recruitmentConfig';
import ApprenticeProgramBanner from './ApprenticeProgramBanner';
import {
  internshipBenefitsData,
  joinReasonData,
} from './apprenticeProgramData';
import ApprenticeProgramInternship from './ApprenticeProgramInternship';
import ApprenticeProgramProcess from './ApprenticeProgramProcess';
import ApprenticeProgramTrainee from './ApprenticeProgramTrainee';

type Props = {
  // Declare Apprentice Program Page props
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
  helpCenter: DefaultCmsDataResponse<HelpCenter> | null;
};

export const ApprenticeProgramPage: FC<Props> = ({
  jobCategories,
  jobTypes,
  locations,
  helpCenter,
}) => {
  const { t } = useTranslation(recruitmentConfig.i18nNamespaces);

  return (
    <Container title={t('recruitment:about-us.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <ApprenticeProgramBanner />
        <ApprenticeProgramInternship />
        <ApprenticeProgramProcess />
        <ApprenticeProgramTrainee />
        <BenefitsContent
          items={internshipBenefitsData}
          type="benefit"
          className="bg-secondary-10"
          title="Benefits at Ahamove"
        />
        <JobOpportunityContentComponentRender
          title="Join with us for empowers you to create incredible stories together!"
          level="internship"
          jobCategories={jobCategories}
          jobTypes={jobTypes}
          locations={locations}
        />
        <AboutUsCulture
          title="Why choose Ahamove for your career path?"
          items={joinReasonData}
        />
        {helpCenter ? (
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
};
