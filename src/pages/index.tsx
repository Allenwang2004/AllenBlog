import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd } from 'next-seo';
import { useEffect } from 'react';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import HeroSection from '@/components/HeroSection';
import LayoutPerPage from '@/components/LayoutPerPage';
import Pagination from '@/components/Pagination';
import PostList, { PostForPostList } from '@/components/PostList';
import SectionHeading from '@/components/SectionHeading';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';
import { getImageSize } from '@/lib/getImageSize';

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
    image: post.image || '',
    imageSize: getImageSize(post.image),
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

const POSTS_PER_PAGE = 6;

const Home: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const { t } = useTranslation(['indexPage', 'common']);

  useEffect(() => {
    document.documentElement.classList.add('home-scroll-snap');
    return () => document.documentElement.classList.remove('home-scroll-snap');
  }, []);

  useCommandPalettePostActions(commandPalettePosts);

  const pagedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <LayoutPerPage>
      <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />

      <section className="snap-section">
        <HeroSection />
      </section>

      <div className="snap-section">
        <WorkExperienceSection />
      </div>

      <section id="writing" className="scroll-mt-24 py-16">
        <SectionHeading
          title={t('latest-posts')}
          description={t('latest-posts-desc')}
        />

        <div className="mt-12">
          <PostList posts={pagedPosts} lead />
        </div>

        <Pagination currentPage={1} totalPages={totalPages} />
      </section>
    </LayoutPerPage>
  );
};

export default Home;
