import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd, NextSeo } from 'next-seo';

import LayoutPerPage from '@/components/LayoutPerPage';
import ResumeContent from '@/components/ResumeContent';
import { siteConfigs } from '@/configs/siteConfigs';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh-TW', ['common'])),
    },
  };
};

const ResumePage: NextPage = () => {
  const url = `${siteConfigs.fqdn}/resume`;
  const title = 'Allen Wang 的履歷';
  const description = '歡迎查看 Allen Wang 的履歷內容與專業背景。';

  return (
    <LayoutPerPage>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
          type: 'profile',
          images: [{ url: siteConfigs.bannerUrl }],
        }}
      />

      <ArticleJsonLd
        url={url}
        title={title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={description}
      />

      <ResumeContent />
    </LayoutPerPage>
  );
};

export default ResumePage;