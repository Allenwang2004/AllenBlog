import { DEFAULT_LOCALE } from '@/configs/i18nConfigs';

const formatDate = (
  date: string,
  locale = DEFAULT_LOCALE,
  month: 'long' | 'short' = 'long'
) => {
  const now = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month,
    day: 'numeric',
  });

  return now;
};

export default formatDate;
