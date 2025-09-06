import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/PostList';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';

const POSTS_PER_PAGE = 6;

type Props = {
  posts: PostForPostList[];
  page: number;
  totalPages: number;
};

const RippleBackground = dynamic(() => import('@/components/Water'), { ssr: false });
const RippleBackground2 = dynamic(() => import('@/components/Water2'), { ssr: false });

const Page: NextPage<Props> = ({ posts, page, totalPages }) => {
  const { t } = useTranslation(['indexPage', 'common']);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <LayoutPerPage>
      {mounted && theme === 'dark' && <RippleBackground />}
      {mounted && theme !== 'dark' && <RippleBackground2 />}
      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('latest-posts')}</h2>
        </div>
        <PostList posts={posts} />
      </div>
      {/* 分頁按鈕 */}
      <div className="flex justify-center my-8 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <a
            key={idx}
            href={idx === 0 ? '/' : `/page/${idx + 1}`}
            className={`px-4 py-2 rounded border font-medium transition ${page === idx + 1 ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            {idx + 1}
          </a>
        ))}
      </div>
    </LayoutPerPage>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(allPostsNewToOld.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }).map((_, idx) => ({
    params: { page: (idx + 1).toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = parseInt(context.params?.page as string, 10) || 1;
  const locale = context.locale!;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const posts = allPostsNewToOld.slice(start, end).map(post => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
    image: post.image || '',
  }));
  const totalPages = Math.ceil(allPostsNewToOld.length / POSTS_PER_PAGE);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      page,
      totalPages,
    },
  };
};

export default Page;
