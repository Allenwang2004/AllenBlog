/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const isEnglish = router.locale === 'en';
  const nextLocale = isEnglish ? 'zh-TW' : 'en';

  return (
    <Link locale={nextLocale} href={{ pathname, query }}>
      <a
        aria-label="Toggle Language"
        className="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-900/[0.05] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-50/[0.06] dark:hover:text-gray-50"
      >
        {isEnglish ? '中文' : 'EN'}
      </a>
    </Link>
  );
};

export default LanguageSwitch;
