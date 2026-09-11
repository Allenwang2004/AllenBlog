import { useTranslation } from 'next-i18next';

import CustomLink from '@/components/CustomLink';
import LinkageMark from '@/components/LinkageMark';
import SectionContainer from '@/components/SectionContainer';
import SocialIcon from '@/components/SocialIcon';
import { footerConfigs } from '@/configs/footerConfigs';
import { headerConfigs } from '@/configs/headerConfigs';
import { siteConfigs } from '@/configs/siteConfigs';

export default function Footer() {
  const { t } = useTranslation(['common']);

  return (
    <footer className="mt-24 border-t border-gray-200 transition-colors dark:border-gray-800">
      <SectionContainer>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <LinkageMark className="size-5 text-primary-600 dark:text-primary-400" />
              <span className="display-tight text-xl font-semibold text-gray-900 dark:text-gray-50">
                {headerConfigs.title}
              </span>
            </div>
            <p className="mt-4 max-w-sm font-serif text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {siteConfigs.description}
            </p>
          </div>

          <nav className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t('navigate')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {headerConfigs.navLinks.map((link) => (
                <li key={link.title}>
                  <CustomLink
                    href={link.href}
                    className="text-base text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {t(link.title)}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t('elsewhere')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <SocialIcon
                kind="mail"
                href={`mailto:${footerConfigs.socialLinks.email}`}
              />
              <SocialIcon
                kind="github"
                href={footerConfigs.socialLinks.github}
              />
              <SocialIcon
                kind="linkedin"
                href={footerConfigs.socialLinks.linkedin}
              />
              <SocialIcon
                kind="facebook"
                href={footerConfigs.socialLinks.facebook}
              />
              <SocialIcon kind="ig" href={footerConfigs.socialLinks.ig} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 py-6 transition-colors dark:border-gray-800">
          <p className="tabular font-mono text-sm text-gray-400 dark:text-gray-500">
            {`© 2015–${new Date().getFullYear()} ${footerConfigs.credit}`}
          </p>
          <p className="font-mono text-sm text-gray-400 dark:text-gray-500">
            Built with Next.js
          </p>
        </div>
      </SectionContainer>
    </footer>
  );
}
