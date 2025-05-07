import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd } from 'next-seo';
import EmailSubscribeForm from '@/components/EmailSubscribeForm';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/PostList';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';

const GalaxyBackground = dynamic(() => import('@/components/GalaxyBackground'), {
  ssr: false,
});

type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale!;

  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
  })) as PostForIndexPage[];

  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      commandPalettePosts,
    },
  };
};

const Home: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useCommandPalettePostActions(commandPalettePosts);

  return (
    <LayoutPerPage>
      {mounted && theme === 'dark' && <GalaxyBackground />}

      <div style={{ position: 'relative', zIndex: 10 }}>
        <ArticleJsonLd
          type="Blog"
          url={siteConfigs.fqdn}
          title={siteConfigs.title}
          images={[siteConfigs.bannerUrl]}
          datePublished={siteConfigs.datePublished}
          authorName={siteConfigs.author}
          description={siteConfigs.description}
        />

        <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
          <h1 className="text-center sm:text-left">{t('intro-title')}</h1>
          <p>{t('intro-1')}</p>
          <p>{t('intro-2')}</p>
          <p>{t('intro-3')}</p>
        </div>

        <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
          <div className="prose prose-lg my-8 dark:prose-dark">
            <h2>{t('latest-posts')}</h2>
          </div>

          <PostList posts={posts} />
        </div>
      <div className="prose prose-lg my-16 mx-auto text-center dark:prose-dark max-w-3xl">
            <a
              href="/resume"
              className="inline-block mt-4 px-6 py-3 font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-800 transition"
            >
              Experience
            </a>
      </div>
      </div>
      {/*<EmailSubscribeForm />*/}
      
    </LayoutPerPage>
  );
};

export default Home;
