import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutPerPage from '@/components/LayoutPerPage';
import Pagination from '@/components/Pagination';
import PostList, { PostForPostList } from '@/components/PostList';
import SectionHeading from '@/components/SectionHeading';
import { LOCALES } from '@/configs/i18nConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import { getImageSize } from '@/lib/getImageSize';

const POSTS_PER_PAGE = 6;

type Props = {
  posts: PostForPostList[];
  page: number;
  totalPages: number;
};

const Page: NextPage<Props> = ({ posts, page, totalPages }) => {
  const { t } = useTranslation(['indexPage', 'common']);

  return (
    <LayoutPerPage>
      <section className="py-16">
        <SectionHeading
          title={t('latest-posts')}
          description={t('latest-posts-desc')}
          action={
            <p className="tabular font-mono text-xs text-gray-500 dark:text-gray-400">
              {`${t('page', { ns: 'common' })} ${page} / ${totalPages}`}
            </p>
          }
        />

        <div className="mt-12">
          <PostList posts={posts} />
        </div>

        <Pagination currentPage={page} totalPages={totalPages} />
      </section>
    </LayoutPerPage>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(allPostsNewToOld.length / POSTS_PER_PAGE);
  const paths = LOCALES.flatMap((locale) =>
    Array.from({ length: totalPages }).map((_, idx) => ({
      params: { page: (idx + 1).toString() },
      locale,
    }))
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = parseInt(context.params?.page as string, 10) || 1;
  const locale = context.locale!;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const posts = allPostsNewToOld.slice(start, end).map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: (locale === 'en' && post.descriptionEn) || post.description,
    path: post.path,
    image: post.image || '',
    imageSize: getImageSize(post.image),
    language: post.language,
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
