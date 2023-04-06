import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormatCategory } from 'types.d/post-format';

type Props = {
  category?: FormatCategory;
  all?: boolean;
  className?: string;
};

export default function CategoryItem({
  category,
  className,
  all = false,
}: Props) {
  const { locale, query } = useRouter();
  const tagName = all ? 'Tất cả tin tức' : category?.name;
  return (
    <Link
      href={
        all
          ? {
              pathname: '/blog',
            }
          : {
              pathname: '/blog/[slug]',
              query: { slug: category?.slug },
            }
      }
      passHref
      shallow
      locale={locale}
    >
      <a
        title={category ? category.slug : 'all'}
        className={cn(
          'rounded-2lg bg-neutral-15 flex h-10 items-center justify-center px-4 py-2 text-black',
          className,
          {
            'text-neutral-10 bg-blue-70':
              category?.slug === query.slug || (!query.slug && all),
          }
        )}
      >
        <span>{tagName}</span>
      </a>
    </Link>
  );
}
