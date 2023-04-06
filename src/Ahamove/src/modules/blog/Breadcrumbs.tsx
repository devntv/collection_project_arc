import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { blogConfig } from './blogConfig';

type Props = {
  className?: string;
  title?: string;
};

export default function Breadcrumbs({ className, title }: Props) {
  const { t } = useTranslation(blogConfig.i18nNamespaces);
  const { locale, asPath } = useRouter();
  const breadcrumbsItems = asPath.split('/');
  breadcrumbsItems.shift();
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-4">
        <li>
          <div className="flex flex-row flex-wrap items-center">
            <Link href="/" passHref locale={locale}>
              <a
                title="Trang chủ"
                className="text-neutral-60 desktop:hover:text-neutral-70 text-body14 font-medium"
              >
                Trang chủ
              </a>
            </Link>
          </div>
        </li>
        {breadcrumbsItems && title ? (
          <>
            <li>
              <div className="flex items-center">
                <div className="relative h-4 w-4 shrink-0 bg-transparent">
                  <Image
                    src="/static/icons/ChevronRight.svg"
                    alt=""
                    layout="fill"
                  />
                </div>
                <div className="ml-4">
                  <Link href="/blog" passHref locale={locale}>
                    <a
                      title={title}
                      className="text-neutral-60 desktop:hover:text-neutral-70 text-body14 font-medium"
                    >
                      {t(`blog:blog.title`)}
                    </a>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className="relative h-4 w-4 shrink-0 bg-transparent">
                  <Image
                    src="/static/icons/ChevronRight.svg"
                    alt=""
                    layout="fill"
                  />
                </div>
                <p className="text-neutral-60 desktop:hover:text-neutral-70 text-body14 ml-4 cursor-default font-medium">
                  {title}
                </p>
              </div>
            </li>
          </>
        ) : (
          breadcrumbsItems.map((item, idx) => (
            <li key={idx}>
              <div className="flex items-center">
                <div className="relative h-4 w-4 shrink-0 bg-transparent">
                  <Image
                    src="/static/icons/ChevronRight.svg"
                    alt=""
                    layout="fill"
                  />
                </div>
                {idx === breadcrumbsItems.length - 1 ? (
                  <p className="text-neutral-60 desktop:hover:text-neutral-70 text-body14 ml-4 cursor-default font-medium">
                    {t(`blog:${item}.title`)}
                  </p>
                ) : (
                  <div className="ml-4">
                    <Link href="/blog" passHref locale={locale}>
                      <a
                        title={item}
                        className="text-neutral-60 desktop:hover:text-neutral-70 text-body14 font-medium"
                      >
                        {t(`blog:${item}.title`)}
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ol>
    </nav>
  );
}
