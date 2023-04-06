import type { I18nActiveNamespaces } from '@/lib/i18n';

export type RecruitmentConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'system' | 'recruitment'>;
};

export const recruitmentConfig: RecruitmentConfig = {
  i18nNamespaces: ['common', 'system', 'recruitment'],
};
