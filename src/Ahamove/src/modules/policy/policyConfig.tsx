import type { I18nActiveNamespaces } from '@/lib/i18n';

export type PolicyConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'policy'>;
};

export const policyConfig: PolicyConfig = {
  i18nNamespaces: ['common', 'policy'],
};