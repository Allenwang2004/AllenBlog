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

// const GalaxyBackground = dynamic(() => import('@/components/GalaxyBackground'), {
//   ssr: false,
// });

import HeroSection from '@/components/HeroSection';

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
    image: post.image || '', // add image field for PostList
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
      {/* {mounted && theme === 'dark' && <GalaxyBackground />} */}
      {/* <HeroSection /> */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Personal Avatar and Introduction */}
        {/* <div className="flex flex-col items-center justify-center my-8">
          <img
            src="/photo.jpg"
            alt="Allen's Avatar"
            className="w-28 h-28 rounded-full shadow-lg border-4 border-white dark:border-gray-800 object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tzu-Yi Wang</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-xl">
            Hi, I'm Allen! I'm a passionate developer, focusing on Web3, AI, and trading systems. Welcome to my blog where I share my projects, insights, and tutorials on technology, and more.
          </p>
        </div> */}
        {/* End Personal Avatar and Introduction */}

        <ArticleJsonLd
          type="Blog"
          url={siteConfigs.fqdn}
          title={siteConfigs.title}
          images={[siteConfigs.bannerUrl]}
          datePublished={siteConfigs.datePublished}
          authorName={siteConfigs.author}
          description={siteConfigs.description}
        />

        {/* <div className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
          <h1 className="text-center sm:text-left">{t('intro-title')}</h1>
          <p>{t('intro-1')}</p>
          <p>{t('intro-2')}</p>
          <p>{t('intro-3')}</p>
        </div> */}

        <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
          <div className="prose prose-lg my-8 dark:prose-dark">
            <h2>{t('latest-posts')}</h2>
          </div>

          <PostList posts={posts} />
        </div>
      <div className="prose prose-lg my-16 mx-auto text-center dark:prose-dark max-w-3xl">
        <a
          href="/resume"
          className="inline-block mt-4 px-6 py-3 font-medium rounded text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition"
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
