import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import LayoutPerPage from '@/components/LayoutPerPage';
import { workExperiences } from '@/configs/workExperienceConfigs';
import { siteConfigs } from '@/configs/siteConfigs';

type Props = {
  company: string;
  role: string;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = (locales ?? ['zh-TW']).flatMap((locale) =>
    workExperiences.map((exp) => ({ params: { id: exp.id }, locale }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  locale,
}) => {
  const exp = workExperiences.find((item) => item.id === params?.id);

  if (!exp) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh-TW', ['common'])),
      company: exp.company,
      role: exp.role,
    },
  };
};

const ExperienceDetailPage: NextPage<Props> = ({ company, role }) => {
  const title = `${role} @ ${company}`;

  return (
    <LayoutPerPage>
      <NextSeo
        title={title}
        noindex
        canonical={`${siteConfigs.fqdn}/experience`}
      />

      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
          {company}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {role}
        </h1>
        <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
          Working on...
        </p>
      </div>
    </LayoutPerPage>
  );
};

export default ExperienceDetailPage;
