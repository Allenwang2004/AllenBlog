import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@/components/CustomLink';
import formatDate from '@/lib/formatDate';

export interface PostForPostList {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
  image: string;
  /** Intrinsic size, so each cover sets its own box instead of being fitted. */
  imageSize?: { width: number; height: number } | null;
  language?: string;
}

type Props = {
  posts: PostForPostList[];
  /** Give the newest post the lead slot, as a publication front page would. */
  lead?: boolean;
};

function Cover({
  post,
  sizes,
  className,
}: {
  post: PostForPostList;
  sizes: string;
  className?: string;
}) {
  const shell = `overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/[0.07] dark:bg-gray-800 dark:ring-gray-50/10 ${
    className ?? ''
  }`;

  if (!post.image) {
    return <div className={`drafting-grid aspect-[16/10] ${shell}`} />;
  }

  // No intrinsic size means no aspect ratio to honour, so fall back to the
  // plain element rather than guessing a box.
  if (!post.imageSize) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={post.image} alt="" className={`w-full ${shell}`} />;
  }

  return (
    <div className={shell}>
      <Image
        src={post.image}
        alt=""
        width={post.imageSize.width}
        height={post.imageSize.height}
        layout="responsive"
        sizes={sizes}
      />
    </div>
  );
}

function LanguageTag({ language }: { language?: string }) {
  const { t } = useTranslation(['common']);
  if (!language) return null;

  return (
    <span className="shrink-0 text-sm text-gray-400 dark:text-gray-500">
      {language === 'en' ? t('english') : t('chinese')}
    </span>
  );
}

export default function PostList({ posts = [], lead = false }: Props) {
  const { locale } = useRouter();

  if (!posts.length) {
    return (
      <p className="py-16 text-center font-serif text-gray-500 dark:text-gray-400">
        Nothing published here yet.
      </p>
    );
  }

  const [first, ...rest] = posts;
  const leadPost = lead ? first : null;
  const indexPosts = lead ? rest : posts;

  return (
    <div>
      {leadPost && (
        <CustomLink
          href={leadPost.path}
          className="group grid gap-x-10 gap-y-6 pb-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <Cover post={leadPost} sizes="(min-width: 1024px) 40rem, 100vw" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="flex items-center gap-3">
              <time
                dateTime={leadPost.date}
                className="font-mono text-sm text-gray-500 dark:text-gray-400"
              >
                {formatDate(leadPost.date, locale)}
              </time>
              <LanguageTag language={leadPost.language} />
            </div>

            <h3 className="display-tight mt-3 text-2xl font-bold text-gray-900 decoration-primary-500 decoration-1 underline-offset-[6px] group-hover:underline dark:text-gray-50 sm:text-3xl">
              {leadPost.title}
            </h3>

            <p className="mt-3 max-w-measure font-serif leading-relaxed text-gray-600 dark:text-gray-300">
              {leadPost.description}
            </p>
          </div>
        </CustomLink>
      )}

      <ul
        className={`border-t border-gray-200 dark:border-gray-800 ${
          leadPost ? '' : 'border-t-0'
        }`}
      >
        {indexPosts.map((post) => (
          <li
            key={post.slug}
            className="border-b border-gray-200 dark:border-gray-800"
          >
            <CustomLink
              href={post.path}
              className="group grid items-start gap-x-8 gap-y-3 py-7 sm:grid-cols-[6.5rem_1fr_11rem] sm:items-center lg:grid-cols-[7rem_1fr_13rem]"
            >
              <div className="flex items-center gap-3 sm:block">
                <time
                  dateTime={post.date}
                  className="block font-mono text-sm text-gray-500 dark:text-gray-400"
                >
                  {formatDate(post.date, locale)}
                </time>
                <span className="sm:mt-1 sm:block">
                  <LanguageTag language={post.language} />
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-snug text-gray-800 decoration-primary-500 decoration-1 underline-offset-4 group-hover:underline dark:text-gray-100">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 max-w-measure font-serif text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {post.description}
                </p>
              </div>

              <Cover post={post} sizes="13rem" className="hidden sm:block" />
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
