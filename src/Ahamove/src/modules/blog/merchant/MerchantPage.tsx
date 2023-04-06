import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import Button from '@/components/Button';
import Container from '@/components/layouts/Container';
import { ahaDeliveryInstructionData } from '@/modules/service/aha-delivery/ahaDeliveryData';
import BenefitsContent from '@/modules/service/BenefitsContent';
import InstructionContent from '@/modules/service/InstructionContent';
import ServiceBanner from '@/modules/service/ServiceBanner';
import { customerConfig } from '../customerConfig';
import { merchantBenefitsData } from '../customerData';
import HelpFormContent from '../HelpFormContent';
import CustomerForm from './CustomerForm';
import MerchantDemandServices from './MerchantDemandServices';
import MerchantMoreUtilities from './MerchantMoreUltilities';

type Props = {
  // Declare MerchantPage props
};

export const MerchantPage: FC<Props> = () => {
  const { t } = useTranslation(customerConfig.i18nNamespaces);

  return (
    <Container title={t('customer:merchant.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <ServiceBanner
          title="Ứng dụng giao hàng dành cho bạn"
          desc="Giao hàng siêu tốc và tiện lợi, đồng hành cùng bạn mọi lúc mọi nơi, trong công việc lẫn cuộc sống."
          urlImageDesktop="/static/images/customer/banner-merchant-desktop.webp"
          urlImageMobile="/static/images/service/banner-mobile.webp"
          type="primary"
        >
          <Button
            title="Nhận tư vấn riêng"
            type="link"
            href="/customer/merchant/#registation-form"
          >
            Nhận tư vấn riêng
          </Button>
        </ServiceBanner>
        <BenefitsContent
          title="Lợi ích khi sử dụng dịch vụ Ahamove"
          desc="Chúng tôi luôn mong muốn mang lại những trải nghiệm tốt nhất và trở thành người đồng hành của bạn mọi lúc mọi nơi."
          items={merchantBenefitsData}
          className="bg-white"
        />
        <MerchantMoreUtilities />
        <InstructionContent
          items={ahaDeliveryInstructionData}
          delivery={true}
        />
        <MerchantDemandServices />
        <HelpFormContent form={<CustomerForm />} id="registation-form" />
      </main>
    </Container>
  );
};
