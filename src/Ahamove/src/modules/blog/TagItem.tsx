import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormatPostTag } from 'types.d/post-format';

type Props = {
  postTag: FormatPostTag;
  className?: string;
};

export default function TagItem({ postTag, className }: Props) {
  const { locale } = useRouter();
  return (
    <Link
      href={{
        pathname: '/blog',
        query: { tag: postTag.slug },
      }}
      passHref
      locale={locale}
    >
      <a
        title={postTag.slug}
        className={cn(
          'rounded-2lg bg-neutral-10 flex h-10 items-center justify-center px-4 py-2 text-black',
          className
        )}
      >
        {postTag.name}
      </a>
    </Link>
  );
}
