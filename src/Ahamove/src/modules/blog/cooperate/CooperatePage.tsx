import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import Container from '@/components/layouts/Container';
import HomeStatistics from '@/modules/home/HomeStatistics';
import BenefitsContent from '@/modules/service/BenefitsContent';
import CooperateService from '@/modules/service/CooperateService';
import CooperateCustomers from '../../../components/CooperateCustomers';
import { customerConfig } from '../customerConfig';
import {
  cooperateBenefitsDesktopData,
  cooperateBenefitsMobileData,
  cooperateCustomersData,
  cooperateDemandsData,
} from '../customerData';
import HelpFormContent from '../HelpFormContent';
import CooperateBanner from './CooperateBanner';
import CooperateForm from './CooperateForm';
import CooperateSaaSBusiness from './CooperateSaaSBusiness';
import MeetAllDemands from './MeetAllDemands';

type Props = {
  // Declare MerchantPage props
};

export const CooperatePage: FC<Props> = () => {
  const { t } = useTranslation(customerConfig.i18nNamespaces);

  return (
    <Container title={t('customer:cooperate.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <CooperateBanner />
        <HomeStatistics className="desktop:hidden" />
        <BenefitsContent
          title="Lợi ích khi sử dụng dịch vụ giao hàng"
          desc="Chúng tôi luôn muốn đem đến những trải nghiệm dịch vụ đỉnh cao dành cho khách hàng và đối tác của Ahamove"
          items={cooperateBenefitsDesktopData}
          type="benefit"
          className="desktop:block hidden"
        />
        <BenefitsContent
          title="Lợi ích khi sử dụng dịch vụ giao hàng"
          desc="Chúng tôi luôn muốn đem đến những trải nghiệm dịch vụ đỉnh cao dành cho khách hàng và đối tác của Ahamove"
          items={cooperateBenefitsMobileData}
          type="benefit"
          className="desktop:hidden"
        />
        <MeetAllDemands
          className="desktop:block hidden"
          title="Đáp ứng mọi nhu cầu"
          desc="Sự ưu việt của sản phẩm đã được kiểm chứng với nhiều mô hình kinh doanh như TMĐT, F&B, xe tải..v..v... trong hơn 5 năm qua."
          items={cooperateDemandsData}
          button="Đăng ký ngay"
          hrefButton="/customer/cooperate/#registation-form"
        />
        <CooperateSaaSBusiness />
        {/* <CooperateROToolSDK /> */}
        <CooperateCustomers
          title="Các khách hàng tin tưởng sử dụng dịch vụ"
          cols="4"
          items={cooperateCustomersData}
        />
        <HelpFormContent form={<CooperateForm />} id="registation-form" />
        <CooperateService
          title="Đăng ký bán hàng trên ứng dụng Ahamove"
          desc="Dễ dàng tiếp cận hàng triệu khách hàng tiềm năng, cùng Ahamove phát triển công việc kinh doanh của bạn."
          type="primary"
          img="/static/images/service/cooperate-mart.webp"
          className="desktop:block hidden"
          href="/service/aha-mart/merchant"
          imageLeft={false}
        />
        <CooperateService
          title="Trở thành Nhà cung cấp dịch của Ahamove"
          desc="Use these products to streamline your organization's workflows, enhance software, and build better experiences for employees and customers."
          type="primary"
          img="/static/images/service/cooperate-mart.webp"
          className="desktop:hidden"
          href="/service/aha-mart/merchant"
        />
      </main>
    </Container>
  );
};
