import type { I18nActiveNamespaces } from '@/lib/i18n';

export type ServiceConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'service'>;
};

export const serviceConfig: ServiceConfig = {
  i18nNamespaces: ['common', 'service'],
};
