import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowNarrowRight from '@/components/icons/ArrowNarrowRightIcon';

type Props = {
  title: string;
  type: 'secondary' | 'primary' | 'white';
  href: string;
  className?: string;
  setLocale?: boolean;
};

export default function MoreInfo({
  title,
  type,
  href,
  className,
  setLocale = true,
}: Props) {
  const { locale } = useRouter();
  return (
    <Link href={href} passHref locale={locale}>
      <a
        className={cn(
          'group flex flex-row flex-nowrap items-center space-x-3 self-center',
          className
        )}
        title={title}
        target={setLocale ? '_self' : '_blank'}
      >
        <p
          className={cn(
            'text-subtitle18 inline-block text-left font-semibold group-hover:underline',
            { 'text-secondary-50': type === 'secondary' },
            { 'text-primary-50': type === 'primary' },
            { 'text-white': type === 'white' }
          )}
        >
          {title}
        </p>
        <div className="inline-block h-7 w-7">
          <ArrowNarrowRight
            className={cn(
              { 'fill-secondary-50': type === 'secondary' },
              { 'fill-primary-50': type === 'primary' },
              { 'fill-white': type === 'white' }
            )}
          />
        </div>
      </a>
    </Link>
  );
}