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
        // kbar already searches `name` + `subtitle` for every action, so
        // repeating the (often long) description here would duplicate it in
        // the search haystack and — since kbar's fuzzy matcher is an
        // unmemoized recursive subsequence search — roughly double the risk
        // of pathological slowdowns on common multi-word queries.
        perform: () => router.push(post.path),
        section: t('search-posts'),
        parent: 'search-posts',
      })),
    [posts, router, t]
  );

  useRegisterActions(postActions, [postActions]);
};
