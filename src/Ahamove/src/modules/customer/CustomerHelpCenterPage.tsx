import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import type { FormatHelpCenter } from '@/api/cms/help-center/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import TabsContent from '../../components/TabsContent';
import InformationBanner from '../service/InformationBanner';
import { customerConfig } from './customerConfig';

type Props = {
  // Declare CustomerHelpCenterPage props
  helpCenter: DefaultCmsDataResponse<FormatHelpCenter>[];
};

export const CustomerHelpCenterPage: FC<Props> = ({ helpCenter }) => {
  const { t } = useTranslation(customerConfig.i18nNamespaces);

  return (
    <Container title={t('customer:help-center.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <InformationBanner title="Liên hệ với chúng tôi" />
        {/* {helpCenter.length > 0 ? (
          <TabsContent type="faq" faqCategories={helpCenter} />
        ) : (
          <div className="min-h-content desktop:py-20 py-12">
            <div className="relative mx-auto aspect-video w-full max-w-[192px] bg-transparent">
              <Image
                src="/static/icons/FileBrokenOrNotFound.svg"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        )} */}
        <div className="min-h-content desktop:py-20 py-12">
          <div className="desktop:px-8 mx-auto flex flex-col items-center justify-center space-y-4 px-4">
            <p className="text-subtitle20">
              <span className="font-bold">Email:</span>{' '}
              <Link href="mailto:support@ahamove.com">
                <a className="hover:text-neutral-70" title="">
                  support@ahamove.com
                </a>
              </Link>
            </p>
            <p className="text-subtitle20">
              <span className="font-bold">Phone:</span>{' '}
              <Link href="tel:1900545411">
                <a className="hover:text-neutral-70" title="">
                  1900545411
                </a>
              </Link>
            </p>
            <p className="text-subtitle20">
              <span className="font-bold">Thời gian hoạt động:</span> 8:00 -
              21:30{' '}
            </p>
          </div>
        </div>
      </main>
    </Container>
  );
};
