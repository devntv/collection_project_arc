import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import Container from '@/components/layouts/Container';
import BenefitsContent from '@/modules/service/BenefitsContent';
import { recruitmentConfig } from '../recruitmentConfig';
import AboutUsBanner from './AboutUsBanner';
import AboutUsCeo from './AboutUsCeo';
import AboutUsContent from './AboutUsContent';
import AboutUsCulture from './AboutUsCulture';
import {
  ahamoveBenefitsDesktopData,
  ahamoveBenefitsMobileData,
  ahamoveCultureDesktopData,
} from './aboutUsData';
import AboutUsJourney from './AboutUsJourney';
import AboutUsTopActivities from './AboutUsTopActivities';

type Props = {
  // Declare AboutUsPage props
};

export const AboutUsPage: FC<Props> = () => {
  const { t } = useTranslation(recruitmentConfig.i18nNamespaces);

  return (
    <Container title={t('recruitment:about-us.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <AboutUsBanner />
        <AboutUsContent />
        <AboutUsCeo />
        <BenefitsContent
          items={ahamoveBenefitsDesktopData}
          title="Giá trị cốt lõi"
          className="desktop:block hidden"
        />
        <BenefitsContent
          items={ahamoveBenefitsMobileData}
          title="Giá trị cốt lõi"
          className="desktop:hidden block"
        />
        <AboutUsJourney />
        <AboutUsCulture
          title="Văn hóa tại Ahamove"
          desc="Always Moving - Không ngừng chuyển động!"
          items={ahamoveCultureDesktopData}
        />
        <AboutUsTopActivities />
      </main>
    </Container>
  );
};
