import { useTranslation } from 'next-i18next';

import CommandPaletteToggle from '@/components/CommandPaletteToggle';
import CustomLink from '@/components/CustomLink';
import LanguageSwitch from '@/components/LanguageSwitch';
import LinkageMark from '@/components/LinkageMark';
import MobileNav from '@/components/MobileNav';
import SectionContainer from '@/components/SectionContainer';
import ThemeSwitch from '@/components/ThemeSwitch';
import { headerConfigs } from '@/configs/headerConfigs';

export default function Header() {
  const { t } = useTranslation(['common']);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-900/[0.08] bg-paper/85 backdrop-blur-md transition-colors dark:border-gray-50/[0.08] dark:bg-gray-900/85">
      <SectionContainer>
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          <CustomLink
            href="/"
            aria-label={headerConfigs.title}
            className="group flex items-center gap-2.5"
          >
            <LinkageMark className="size-5 text-primary-600 transition-transform duration-300 group-hover:-rotate-12 dark:text-primary-400" />
            <span className="display-tight text-xl font-semibold text-gray-900 dark:text-gray-50">
              {headerConfigs.title}
            </span>
          </CustomLink>

          <div className="flex items-center gap-1">
            <nav className="mr-1 hidden items-center sm:flex">
              {headerConfigs.navLinks.map((link) => (
                <CustomLink
                  key={link.title}
                  href={link.href}
                  className="rounded-md px-3.5 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-900/[0.05] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-50/[0.06] dark:hover:text-gray-50"
                >
                  {t(link.title)}
                </CustomLink>
              ))}
            </nav>

            <span className="mr-1 hidden h-5 w-px bg-gray-900/10 dark:bg-gray-50/10 sm:block" />

            <LanguageSwitch />
            <ThemeSwitch />
            <CommandPaletteToggle />
            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}
