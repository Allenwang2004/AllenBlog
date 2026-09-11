import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import CustomLink from '@/components/CustomLink';
import { headerConfigs } from '@/configs/headerConfigs';

const MobileNav = () => {
  const { t } = useTranslation(['common']);
  const [navShow, setNavShow] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = navShow ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [navShow]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-900/[0.05] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-50/[0.06] dark:hover:text-gray-50"
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={() => setNavShow((shown) => !shown)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5.5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 14.5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {/* Positioned against the sticky header rather than `fixed`: the
          header's backdrop-filter makes it the containing block for fixed
          descendants, which collapsed this panel to a 1px strip. Closed, it
          drops a few px up behind the header and fades — a slide off to the
          right kept widening the document so phones could pan sideways. */}
      <div
        aria-hidden={!navShow}
        className={`absolute inset-x-0 top-full z-20 h-[calc(100vh-4.5rem)] border-t border-gray-200 bg-paper transition-[transform,opacity,visibility] duration-200 ease-out supports-[height:100dvh]:h-[calc(100dvh-4.5rem)] dark:border-gray-800 dark:bg-gray-900 ${
          navShow
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav className="px-5 py-4">
          {headerConfigs.navLinks.map((link) => (
            <CustomLink
              href={link.href}
              key={link.title}
              className="display-tight block border-b border-gray-200 py-5 text-2xl font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:border-gray-800 dark:text-gray-50 dark:hover:text-primary-400"
              onClick={() => setNavShow(false)}
            >
              {t(link.title)}
            </CustomLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
