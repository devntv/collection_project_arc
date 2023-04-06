import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { DemandService } from '@/api/cms/services/type';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import DownloadApp from '@/components/DownloadApp';
import Container from '@/components/layouts/Container';
import BenefitsContent from '../BenefitsContent';
import DemandServicesContent from '../DemandServiceContent';
import InstructionContent from '../InstructionContent';
import ServiceBanner from '../ServiceBanner';
import { serviceConfig } from '../serviceConfig';
import { ahaTruckBenefitsData, ahaTruckInstructionData } from './ahaTruckData';

type Props = {
  // Declare AhaTruckPage props
  services: DefaultCmsDataResponse<DemandService>[];
};

export const AhaTruckPage: FC<Props> = ({ services }) => {
  const { t } = useTranslation(serviceConfig.i18nNamespaces);

  return (
    <Container title={t('service:aha-truck.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <ServiceBanner
          title="Dịch vụ xe tải"
          desc="Ứng dụng giao hàng tức thời, đáp ứng mọi nhu cầu của bạn với nền tảng công nghệ hiện đại."
          urlImageDesktop="/static/images/service/banner-truck-desktop.webp"
          urlImageMobile="/static/images/service/banner-mobile.webp"
          type="secondary"
        >
          <DownloadApp hasQR={true} />
        </ServiceBanner>
        <BenefitsContent
          title="Lợi ích khi sử dụng dịch vụ giao hàng"
          desc="Chúng tôi luôn muốn đem đến những trải nghiệm dịch vụ đỉnh cao dành cho khách hàng và đối tác của Ahamove"
          items={ahaTruckBenefitsData}
          type="benefit"
          className="bg-white"
        />
        <InstructionContent items={ahaTruckInstructionData} />
        {services.length > 0 && (
          <DemandServicesContent
            services={services}
            href="/service/aha-truck/price"
          />
        )}
      </main>
    </Container>
  );
};
