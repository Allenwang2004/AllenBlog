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
}

type Props = {
  posts: PostForPostList[];
};

export default function PostList({ posts = [] }: Props) {
  const { locale } = useRouter();

  if (!posts.length) return <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const { slug, date, title, description, path, image } = post;

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
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(date, locale)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          </CustomLink>
        );
      })}
    </div>
  );
}