import CustomLink from '@/components/CustomLink';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center gap-1.5">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        const isCurrent = page === currentPage;

        return (
          <CustomLink
            key={page}
            href={page === 1 ? '/' : `/page/${page}`}
            aria-current={isCurrent ? 'page' : undefined}
            className={`tabular inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 font-mono text-sm transition-colors ${
              isCurrent
                ? 'bg-gray-900 text-paper dark:bg-gray-50 dark:text-gray-900'
                : 'text-gray-500 hover:bg-gray-900/[0.06] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-50/[0.07] dark:hover:text-gray-50'
            }`}
          >
            {page}
          </CustomLink>
        );
      })}
    </nav>
  );
}
