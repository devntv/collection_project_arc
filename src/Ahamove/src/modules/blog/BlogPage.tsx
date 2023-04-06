import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { GetPostsParams } from '@/api/cms/posts/useGetPosts';
import { useGetInfinitePostsCategories } from '@/api/cms/posts/useGetPostsCategories';
import EmptyState from '@/components/EmptyState';
import Container from '@/components/layouts/Container';
import { PAGE_SIZE } from '@/lib/constants';
import useMediaQuery from '@/lib/useMediaQuery';
import type { FormatCategory, FormatPostTag } from 'types.d/post-format';
import { blogConfig } from './blogConfig';
import BlogContent from './BlogContent';
import BlogContentSkeleton from './BlogContentSkeleton';
import { titleBlogData } from './blogData';
import BlogItem from './BlogItem';
import BlogSkeleton from './BlogSkeleton';
import Breadcrumbs from './Breadcrumbs';
import CategoryItem from './CategoryItem';

type Props = {
  // Declare NewsPage props
  blog?: boolean;
  categories?: FormatCategory[];
  tags?: FormatPostTag[];
};

export const BlogPage: FC<Props> = ({ blog = true, categories }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { t } = useTranslation(blogConfig.i18nNamespaces);
  const router = useRouter();
  const { slug } = router.query;
  const categoriesFormat = ['khach-hang', 'tai-xe', 'ahamovers'];

  const queryInfinitePosts: Partial<GetPostsParams> = {
    'pagination[pageSize]': PAGE_SIZE,
  };

  if (blog) {
    if (slug) {
      if (slug.toString() === 'khach-hang')
        queryInfinitePosts['filters[categories][id][$eq]'] = 2;
      else if (slug.toString() === 'tai-xe')
        queryInfinitePosts['filters[categories][id][$eq]'] = 5;
      else if (slug.toString() === 'ahamovers')
        queryInfinitePosts['filters[categories][id][$eq]'] = 152;
    }
  } else queryInfinitePosts['filters[categories][id][$eq]'] = 152;

  const {
    data: postsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetInfinitePostsCategories(queryInfinitePosts);

  return (
    <Container title={t('blog:blog.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content max-w-8xl desktop:px-8 mx-auto flex w-full grow flex-col px-4 pb-20 pt-12">
        <Breadcrumbs className={cn({ hidden: !blog })} />
        <h1 className="desktop:text-title42 text-title32 desktop:mt-12 mt-8 font-bold text-black">
          {!blog
            ? titleBlogData.find((item) => item.value === 'ahamovers')?.title
            : slug
            ? titleBlogData.find((item) => item.value === slug)?.title
            : titleBlogData.find((item) => item.value === '')?.title}
        </h1>

        <p className="text-subtitle18 desktop:max-w-2xl mt-2 mb-4 font-medium text-black">
          {!blog
            ? titleBlogData.find((item) => item.value === 'ahamovers')?.title
            : slug
            ? titleBlogData.find((item) => item.value === slug)?.desc
            : titleBlogData.find((item) => item.value === '')?.desc}
        </p>
        <nav
          className={cn(
            'text-body16 group flex flex-wrap items-center font-medium',
            { hidden: !blog }
          )}
        >
          <CategoryItem
            all
            className={cn('mb-3', { 'mr-4': isDesktop, 'mr-3': !isDesktop })}
          />
          {categoriesFormat.map((item, idx) => {
            const temp = categories?.find((item1) => item1.slug === item);
            if (temp)
              return (
                <CategoryItem
                  category={temp}
                  className={cn('mb-3', {
                    'mr-4': isDesktop,
                    'mr-3': !isDesktop,
                  })}
                  key={idx}
                />
              );
          })}
        </nav>
        <InfiniteScroll
          className="desktop:grid-cols-3 desktop:gap-y-12 grid grid-cols-1 gap-6 py-9"
          next={() => fetchNextPage()}
          hasMore={hasNextPage ? hasNextPage : false}
          loader={
            <Fragment>
              {isFetchingNextPage &&
                Array.from(Array(3).keys()).map((item) => (
                  <div key={item} className="col-span-1">
                    <BlogSkeleton />
                  </div>
                ))}
            </Fragment>
          }
          dataLength={postsData?.pages ? postsData.pages.length : PAGE_SIZE}
        >
          {isFetching && !isFetchingNextPage ? (
            <div className="desktop:col-span-3 col-span-1">
              <BlogContentSkeleton />
            </div>
          ) : postsData && postsData.pages ? (
            postsData.pages.map((page, idx) => {
              if (idx === 0) {
                return (
                  <Fragment key={page.nextPage - 1}>
                    <div
                      className="desktop:col-span-3 col-span-1"
                      key={page.nextPage - 1}
                    >
                      <BlogContent
                        posts={page.data.slice(0, 3)}
                        direction="column"
                        isFeatured
                      />
                    </div>
                    {page.data.slice(3).map((p) => (
                      <div key={p.id} className="col-span-1">
                        <BlogItem post={p} type="small" />
                      </div>
                    ))}
                  </Fragment>
                );
              }
              return page.data
                .slice(3)
                .map((p) => <BlogItem key={p.id} post={p} type="small" />);
            })
          ) : isFetching ? (
            <div className="desktop:col-span-3 col-span-1">
              <BlogContentSkeleton />
            </div>
          ) : (
            <div className="desktop:col-span-3 col-span-1 py-8">
              <EmptyState type="blog" />
            </div>
          )}
        </InfiniteScroll>
      </main>
    </Container>
  );
};
