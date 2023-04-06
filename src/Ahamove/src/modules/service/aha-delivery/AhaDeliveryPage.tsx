import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { DemandService } from '@/api/cms/services/type';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import DownloadApp from '@/components/DownloadApp';
import Container from '@/components/layouts/Container';
import BenefitsContent from '@/modules/service/BenefitsContent';
import DemandServiceContent from '@/modules/service/DemandServiceContent';
import InstructionContent from '@/modules/service/InstructionContent';
import ServiceBanner from '@/modules/service/ServiceBanner';
import { serviceConfig } from '../serviceConfig';
import {
  ahaDeliveryBenefitsData,
  ahaDeliveryInstructionData,
} from './ahaDeliveryData';

type Props = {
  // Declare AhaDeliveryPage props
  services: DefaultCmsDataResponse<DemandService>[];
};

export const AhaDeliveryPage: FC<Props> = ({ services }) => {
  const { t } = useTranslation(serviceConfig.i18nNamespaces);

  return (
    <Container title={t('service:aha-delivery.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <ServiceBanner
          title="Dịch vụ của Ahamove"
          desc="Ứng dụng giao hàng tức thời, đáp ứng mọi nhu cầu của bạn với nền tảng công nghệ hiện đại."
          urlImageDesktop="/static/images/service/banner-delivery-desktop.webp"
          urlImageMobile="/static/images/service/banner-mobile.webp"
          type="secondary"
        >
          <DownloadApp hasQR={false} type="responsive" />
        </ServiceBanner>
        <BenefitsContent
          title="Lợi ích khi sử dụng dịch vụ giao hàng"
          desc="Chúng tôi luôn muốn đem đến những trải nghiệm dịch vụ đỉnh cao dành cho khách hàng và đối tác của Ahamove"
          items={ahaDeliveryBenefitsData}
          type="benefit"
          className="bg-white"
        />
        <InstructionContent items={ahaDeliveryInstructionData} delivery />
        {services.length > 0 && (
          <DemandServiceContent
            services={services}
            href="/service/aha-delivery/price"
          />
        )}
      </main>
    </Container>
  );
};
