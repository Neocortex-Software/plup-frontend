import { i18n } from 'src/boot/i18n';

function t(key: string): string {
  return i18n.global.t(key);
}

export const RULES = {
  required: (val: string | number) => !!val || t('rules.fieldIsRequired'),
  minLength: (length: number) => (val: string) =>
    val.length >= length ||
    `${t('rules.minLengthIs')} ${length} ${t('rules.characters')}`,
  maxLength: (length: number) => (val: string) =>
    val.length <= length ||
    `${t('rules.maxLengthIs')} ${length} ${t('rules.characters')}`,
  email: (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || t('rules.invalidEmailAddress'),
  emailOptional: (val: string) =>
    val === '' ||
    val === null ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
    t('rules.invalidEmailAddress'),
  sameAs: (comparison: string) => (val: string) =>
    val === comparison || t('rules.passwordsMustMatch'),
  numeric: (val: string) => /^\d+$/.test(val) || t('rules.onlyNumbersAllowed'),
};
