import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import CooperateCustomers from '@/components/CooperateCustomers';
import Container from '@/components/layouts/Container';
import HelpFormContent from '@/modules/customer/HelpFormContent';
import BenefitsContent from '../BenefitsContent';
import { serviceConfig } from '../serviceConfig';
import {
  cooperateOnWheelData,
  cooperateServiceSupplyData,
} from './cooperateData';
import CooperateFeedback from './CooperateFeedback';
import CooperateServiceBanner from './CooperateServiceBanner';
import CooperateServiceForm from './CooperateServiceForm';

type Props = {
  // Declare CooperateServicePage props
};

export const CooperateServicePage: FC<Props> = () => {
  const { t } = useTranslation(serviceConfig.i18nNamespaces);

  return (
    <Container title={t('service:cooperate.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <CooperateServiceBanner />
        <BenefitsContent
          items={cooperateServiceSupplyData}
          type="cooperate"
          title="Các dịch vụ doanh nghiệp đang cung cấp"
          className="bg-secondary-10"
        />
        <CooperateCustomers
          title="Các đối tác tin tưởng sử dụng"
          cols="3"
          items={cooperateOnWheelData}
        />
        <CooperateFeedback />
        <HelpFormContent
          form={<CooperateServiceForm type="cooperate" />}
          id="registation-form"
        />
      </main>
    </Container>
  );
};
