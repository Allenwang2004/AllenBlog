import { useRegisterActions } from 'kbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import { PostForCommandPalette } from './getCommandPalettePosts';

export const useCommandPalettePostActions = (
  posts: PostForCommandPalette[]
): void => {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  const postActions = useMemo(
    () =>
      posts.map((post) => ({
        id: post.slug,
        name: post.title,
        subtitle: post.description,
        keywords: `${post.title} ${post.description || ''}`,
        perform: () => router.push(post.path),
        section: t('search-posts'),
        parent: 'search-posts',
      })),
    [posts, router, t]
  );

  useRegisterActions(postActions, [postActions]);
};
