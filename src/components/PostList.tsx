import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import CustomLink from '@/components/CustomLink';
import formatDate from '@/lib/formatDate';

export interface PostForPostList {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
  image: string;
  language?: string;
}

type Props = {
  posts: PostForPostList[];
};

export default function PostList({ posts = [] }: Props) {
  const { locale } = useRouter();
  const { t } = useTranslation(['common']);

  if (!posts.length) return <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const { slug, date, title, description, path, image, language } = post;

        return (
          <CustomLink key={slug} href={path} className="group block rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                  {title}
                </h3>
                {language && (
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {language === 'en' ? t('english') : t('chinese')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(date, locale)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          </CustomLink>
        );
      })}
    </div>
  );
}