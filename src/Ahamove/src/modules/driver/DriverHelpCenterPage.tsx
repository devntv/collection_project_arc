import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import type { FC } from 'react';

import type { FormatHelpCenter } from '@/api/cms/help-center/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import TabsContent from '../../components/TabsContent';
import InformationBanner from '../service/InformationBanner';
import { driverConfig } from './driverConfig';

type Props = {
  // Declare DriverHelpCenterPage props
  helpCenter: DefaultCmsDataResponse<FormatHelpCenter>[];
};

export const DriverHelpCenterPage: FC<Props> = ({ helpCenter }) => {
  const { t } = useTranslation(driverConfig.i18nNamespaces);

  return (
    <Container title={t('driver:help-center.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <InformationBanner title="Trung tâm hỗ trợ tài xế" />
        {helpCenter.length > 0 ? (
          <TabsContent type="faq" faqCategories={helpCenter} />
        ) : (
          <div className="min-h-content desktop:py-20 py-12">
            <div className="relative mx-auto aspect-video w-full max-w-[431px]">
              <Image
                src="/static/icons/FileBrokenOrNotFound.svg"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        )}
      </main>
    </Container>
  );
};
