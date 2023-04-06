import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import type { FC } from 'react';

import type { FormatPolicy } from '@/api/cms/policy/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import TabsContent from '../../components/TabsContent';
import InformationBanner from '../service/InformationBanner';
import { policyConfig } from './policyConfig';

type Props = {
  // Declare PolicyPage props
  policies: DefaultCmsDataResponse<FormatPolicy> | null;
};

export const PolicyPage: FC<Props> = ({ policies }) => {
  const { t } = useTranslation(policyConfig.i18nNamespaces);
  return (
    <Container title={t('policy:page.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <InformationBanner title="Chính sách và điều khoản" />
        {policies ? (
          <TabsContent type="policy" policyCategories={policies} />
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
