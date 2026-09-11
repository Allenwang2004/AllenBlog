import Link from 'next/link';

import ExternalLinkIcon from './external-link.svg';

type Props = React.ComponentPropsWithoutRef<'a'>;

const CustomLink = ({ href, children, ...rest }: Props) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    // Next's default: route changes go to the top of the new page, and a hash
    // scrolls to its target. Suppressing that stranded readers mid-article.
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      {typeof children === 'string' && (
        <ExternalLinkIcon className="ml-1 inline-block size-4" />
      )}
    </a>
  );
};

export default CustomLink;
