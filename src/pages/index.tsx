import { useEffect, useState } from 'react';
import Link from 'next/link';
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
import WorkExperienceSection from '@/components/WorkExperienceSection';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';

const GalaxyBackground = dynamic(() => import('@/components/GalaxyBackground'), {
  ssr: false,
});

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
});

const RippleBackground = dynamic(() => import('@/components/Water'), {
  ssr: false,
});

const RippleBackground2 = dynamic(() => import('@/components/Water2'), {
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
    description: (locale === 'en' && post.descriptionEn) || post.description,
    path: post.path,
    image: post.image || '', // add image field for PostList
    language: post.language,
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

const POSTS_PER_PAGE = 6 ;

const Home: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.classList.add('home-scroll-snap');
    return () => document.documentElement.classList.remove('home-scroll-snap');
  }, []);

  useCommandPalettePostActions(commandPalettePosts);

  // 只顯示前 6 篇
  const pagedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <LayoutPerPage>
      {mounted && theme === 'dark' && <RippleBackground />}
      {mounted && theme !== 'dark' && <RippleBackground2 />}

      <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />

      {/* Screen 1: Intro */}
      <section className="snap-section">
        <HeroSection />
      </section>

      {/* Screen 2: Work experience */}
      <section className="snap-section flex min-h-screen flex-col justify-center py-10">
        <WorkExperienceSection />
      </section>

      {/* Screen 3: Latest posts — snaps into view, then scrolls normally so the
          full grid, pagination, and footer below it stay reachable. */}
      <section className="snap-section flex min-h-screen flex-col py-10">
        <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
          <div className="prose prose-lg my-8 dark:prose-dark">
            <h2>{t('latest-posts')}</h2>
          </div>

          <PostList posts={pagedPosts} />
        </div>
        {/* 分頁按鈕 */}
        {posts.length > POSTS_PER_PAGE && (
          <div className="flex justify-center items-center my-12 gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Link
                key={idx}
                href={idx === 0 ? '/' : `/page/${idx + 1}`}
                scroll={false}
              >
                <a
                  className={`inline-flex items-center justify-center min-w-10 h-10 rounded-full font-bold text-base transition-all duration-300 transform ${
                    idx === 0
                      ? 'bg-black text-white shadow-lg shadow-black/20 scale-105 ring-2 ring-gray-600/30 dark:ring-gray-700/40'
                      : 'text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-black hover:text-white hover:scale-105 hover:shadow-md dark:hover:bg-black'
                  }`}
                >
                  {idx + 1}
                </a>
              </Link>
            ))}
          </div>
        )}
        {/* <div className="prose prose-lg my-16 mx-auto text-center dark:prose-dark max-w-3xl">
          <a
            href="/resume"
            className="inline-block mt-4 px-6 py-3 font-medium rounded text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition"
          >
            Experience
          </a>
        </div> */}
      </section>
      {/*<EmailSubscribeForm />*/}
    </LayoutPerPage>
  );
};

export default Home;
