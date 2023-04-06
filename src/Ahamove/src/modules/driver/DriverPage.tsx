import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import type { HelpCenter } from '@/api/cms/help-center/types';
import type { FormatOffice } from '@/api/cms/office/types';
import { useGetPosts } from '@/api/cms/posts/useGetPosts';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import FAQContent from '@/components/FAQContent';
import Container from '@/components/layouts/Container';
import BlogContent from '../blog/BlogContent';
import BlogSkeleton from '../blog/BlogSkeleton';
import BenefitsContent from '../service/BenefitsContent';
import DriverAhamoveOffice from './DriverAhamoveOffice';
import DriverBanner from './DriverBanner';
import { driverConfig } from './driverConfig';
import { driverBenefitsData } from './driverData';
import DriverJoinCommunity from './DriverJoinCommunity';
import DriverPartner from './DriverPartner';

type Props = {
  // Declare DriverPage props
  helpCenter: DefaultCmsDataResponse<HelpCenter> | null;
  office: DefaultCmsDataResponse<FormatOffice>[];
};

export const DriverPage: FC<Props> = ({ helpCenter, office }) => {
  const { t } = useTranslation(driverConfig.i18nNamespaces);
  const { isLoading, data: postsData } = useGetPosts({
    'pagination[page]': 1,
    'pagination[pageSize]': 4,
  });

  return (
    <Container title={t('driver:driver.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <DriverBanner />
        {office.length > 0 ? <DriverAhamoveOffice office={office} /> : null}
        <section className="desktop:py-14 pb-28">
          <Link href="https://ahadriver.onelink.me/ymGo/install" passHref>
            <a className="max-w-content desktop:px-8 desktop:block relative mx-auto hidden aspect-[23/10] h-auto w-full bg-transparent px-4">
              <Image
                src="/static/images/driver/driver-download-app-desktop.webp"
                alt=""
                layout="fill"
              />
            </a>
          </Link>
          <Link href="https://ahadriver.onelink.me/ymGo/install" passHref>
            <a className="desktop:hidden relative block aspect-[13/20] h-auto w-full bg-transparent">
              <Image
                src="/static/images/driver/driver-download-app-mobile.webp"
                alt=""
                layout="fill"
              />
            </a>
          </Link>
        </section>

        <BenefitsContent
          title="Vì sao chọn Ahamove"
          desc="Chúng tôi luôn muốn đem đến những trải nghiệm dịch vụ đỉnh cao dành cho khách hàng và đối tác của Ahamove"
          items={driverBenefitsData}
          className="bg-secondary-10"
        />
        <DriverPartner />
        <DriverJoinCommunity />
        {isLoading ? (
          <div className="desktop:grid-cols-3 desktop:gap-y-12 max-w-8xl desktop:px-8 mx-auto grid grid-cols-1 gap-6 px-4">
            {Array.from(Array(3).keys()).map((item) => (
              <div key={item} className="col-span-1">
                <BlogSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <BlogContent
            posts={postsData?.data ? postsData.data : null}
            title="Tin tức mới nhất"
            embed={true}
            direction="row"
          />
        )}
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
};
