import cn from 'classnames';
import { Fragment } from 'react';
import type { Post } from '@/api/cms/posts/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import MoreInfo from '@/components/MoreInfo';
import BlogItem from './BlogItem';

type Props = {
  posts: DefaultCmsDataResponse<Post>[] | null;
  title?: string;
  embed?: boolean;
  isFeatured?: boolean;
  direction?: 'row' | 'column';
};

export default function BlogContent({
  posts,
  title,
  embed = false,
  isFeatured = false,
  direction = 'row',
}: Props) {
  if (!posts) return <Fragment />;

  return (
    <section className={cn({ 'desktop:py-16 bg-white py-8': title })}>
      <div className={cn({ 'max-w-8xl desktop:px-8 mx-auto px-4': title })}>
        {title && (
          <div
            className={cn(
              'desktop:flex desktop:items-center desktop:justify-between justify-center pb-10'
            )}
          >
            {title && (
              <h3 className="text-title32 text-neutral-90 desktop:text-title42 text-left font-bold">
                {title}
              </h3>
            )}
            <MoreInfo
              title="Xem tất cả"
              type="primary"
              className={cn({
                'desktop:flex hidden h-7': embed,
                hidden: !embed,
              })}
              href="/blog"
            />
          </div>
        )}
        <div
          className={cn('grid grid-cols-1', {
            'desktop:grid-cols-2 desktop:gap-x-8': isFeatured,
          })}
        >
          <BlogItem
            post={posts[0]}
            type="big"
            className={cn({ 'col-span-1': isFeatured, hidden: !isFeatured })}
          />
          <hr
            className={cn({
              'text-neutral-15 desktop:hidden my-4 h-2': isFeatured,
              hidden: !isFeatured,
            })}
          />
          <div className="col-span-1">
            <div
              className={cn('grid grid-cols-1 gap-x-6 gap-y-6', {
                'desktop:grid-cols-3 gap-y-12': direction === 'row',
              })}
            >
              {posts !== null
                ? isFeatured
                  ? posts
                      .slice(1)
                      .map((post) => (
                        <BlogItem
                          post={post}
                          key={post.id}
                          type="small"
                          column={direction === 'row'}
                        />
                      ))
                  : posts.map((post) => (
                      <BlogItem
                        post={post}
                        key={post.id}
                        type="small"
                        column={direction === 'row'}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>

        <MoreInfo
          title="Xem tất cả"
          type="primary"
          className={cn({
            'desktop:hidden mt-8 justify-center': embed,
            hidden: !embed,
          })}
          href="/blog"
        />
      </div>
    </section>
  );
}
