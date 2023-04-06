import type { I18nActiveNamespaces } from '@/lib/i18n';

export type CustomerConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'customer'>;
};

export const customerConfig: CustomerConfig = {
  i18nNamespaces: ['common', 'customer'],
};