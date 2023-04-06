import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowNarrowRight from '@/components/icons/ArrowNarrowRightIcon';
type Props = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  items: string[];
  className?: string;
};

export default function DriverHandbookItem({
  icon,
  title,
  desc,
  href,
  items,
  className,
}: Props) {
  const { locale } = useRouter();
  return (
    <article
      className={cn(
        'shadow-shadow-special desktop:p-8 group rounded-lg bg-white p-6',
        className
      )}
    >
      <Link href={href} passHref locale={locale}>
        <a
          title={href}
          className="flex h-full flex-col items-start justify-between space-y-2"
        >
          <div className="relative h-36 w-56 shrink-0 bg-transparent">
            <Image src={icon} alt="" layout="fill" />
          </div>

          <h3 className="text-subtitle20 group-hover:text-primary-50 text-neutral-90 desktop:min-h-[84px] pt-6 font-bold">
            {title}
          </h3>
          <p className="desktop:min-h-text text-body16 text-neutral-90 my-2 flex-1 font-normal">
            {desc}
          </p>
          <ul className="text-neutral-90 text-body16 desktop:min-h-[156px] mb-4 list-inside list-disc space-y-1 font-normal">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="group flex flex-row flex-nowrap items-center space-x-3">
            <p
              className={cn(
                'text-subtitle18 text-primary-50 inline-block text-left font-semibold group-hover:underline'
              )}
            >
              Xem tất cả
            </p>
            <div className="inline-block h-5 w-5">
              <ArrowNarrowRight className="fill-primary-50" />
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}
