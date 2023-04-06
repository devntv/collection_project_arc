import type { I18nActiveNamespaces } from '@/lib/i18n';

export type DriverConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'driver'>;
};

export const driverConfig: DriverConfig = {
  i18nNamespaces: ['common', 'driver'],
};
