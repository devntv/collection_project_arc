import cn from 'classnames';
import dayjs from 'dayjs';
import { decode } from 'html-entities';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Post } from '@/api/cms/posts/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import MoreInfo from '@/components/MoreInfo';
import { formatPostTags } from '@/lib/common';
import TagItem from './TagItem';

type Props = {
  post: DefaultCmsDataResponse<Post>;
  className?: string;
  type: 'small' | 'big' | 'home';
  column?: boolean;
};

export default function BlogItem({
  post,
  className,
  type = 'small',
  column = true,
}: Props) {
  const { locale } = useRouter();
  let altImg = 'Ahamove - Giải pháp hoàn hảo cho mọi nhu cầu của bạn';
  let srcImg = '/static/images/blog/not-found-post.webp';
  if (post) {
    if (
      post.attributes?.images &&
      post.attributes?.images.data &&
      post.attributes?.images.data.length > 0 &&
      post.attributes?.images.data[0].attributes
    ) {
      altImg = post.attributes?.images.data[0].attributes.alternativeText;
    }

    if (
      post.attributes?.images &&
      post.attributes?.images.data &&
      post.attributes?.images.data.length > 0 &&
      post.attributes?.images.data[0].attributes
    ) {
      srcImg = post.attributes?.images.data[0].attributes.url;
    }
  }
  return (
    <div
      className={cn('group flex flex-col items-start', className, {
        'desktop:flex-row': !column,
      })}
    >
      <Link
        href={{
          pathname: '/[slug]',
          query: { slug: post?.attributes?.slug },
        }}
        as={'/' + post?.attributes?.slug}
        passHref
        locale={locale}
      >
        <a
          title={post?.attributes?.title}
          className={cn('flex-none', {
            'w-full': column,
            'desktop:w-1/2 w-full': !column,
          })}
        >
          <div className="relative aspect-[17/10] w-full overflow-hidden rounded-lg bg-transparent">
            <Image
              src={srcImg}
              alt={altImg}
              layout="fill"
              className="transition duration-200 ease-out group-hover:scale-105"
              priority
            />
          </div>
        </a>
      </Link>
      <div className="grow">
        <Link
          href={{
            pathname: '/[slug]',
            query: { slug: post?.attributes?.slug },
          }}
          as={'/' + post?.attributes?.slug}
          passHref
          locale={locale}
        >
          <a title={post?.attributes?.title} className="block">
            <div
              className={cn('flex, flex-start', {
                'pt-6': column,
                'desktop:pl-6 pt-6': !column,
              })}
            >
              <time
                className={cn(
                  'text-neutral-90 desktop:text-neutral-70 text-left text-sm font-normal',
                  { 'mt-6': column }
                )}
              >
                {dayjs(post?.attributes?.publishedAt).format('DD/MM/YYYY')}
              </time>
              <h3
                className={cn(
                  'text-neutral-90 group-hover:text-primary-50 desktop:mt-2 line-clamp-3 mt-1 text-left text-lg font-semibold',
                  {
                    'desktop:text-subtitle18 text-body16': type === 'small',
                    'desktop:text-subtitle20 desktop:font-bold':
                      type === 'home',
                    'desktop:text-title24 text-subtitle18 font-bold':
                      type === 'big',
                  }
                )}
              >
                {decode(post?.attributes?.title)}
              </h3>
              <div
                className="text-body14 text-neutral-70 line-clamp-2 text-left font-normal"
                dangerouslySetInnerHTML={{
                  __html: post?.attributes?.summary,
                }}
              ></div>
            </div>
          </a>
        </Link>

        <div className={cn('mt-4 mb-4', { hidden: type === 'small' })}>
          <MoreInfo
            title="Đọc tiếp"
            type="primary"
            href={`/${post?.attributes?.slug}`}
          />
        </div>

        <nav
          className={cn(
            'text-body16 group mt-2 flex flex-wrap items-center font-medium',
            { 'ml-6': !column }
          )}
        >
          {formatPostTags(post?.attributes?.tags.data).map((item, idx) => (
            <TagItem postTag={item} key={idx} className="mr-2 mb-2" />
          ))}
        </nav>
      </div>
    </div>
  );
}
