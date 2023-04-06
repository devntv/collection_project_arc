import type { I18nActiveNamespaces } from '@/lib/i18n';

export type BlogConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'system' | 'blog'>;
};

export const blogConfig: BlogConfig = {
  i18nNamespaces: ['common', 'system', 'blog'],
};
