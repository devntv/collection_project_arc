import { dehydrate } from '@tanstack/react-query';
import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetPostsParams } from '@/api/cms/posts/useGetPosts';
import { getInfinitePostsFn } from '@/api/cms/posts/useGetPosts';
import apiRoutes from '@/lib/apiRoutes';
import { PAGE_INDEX, PAGE_SIZE } from '@/lib/constants';
import { queryClient } from '@/lib/queryClient';
import { blogConfig } from '@/modules/blog/blogConfig';
import { BlogPage } from '@/modules/blog/BlogPage';

export default function AhamoverStory(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <BlogPage blog={false} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = blogConfig;

  const queryInfinitePosts: GetPostsParams = {
    'pagination[pageSize]': PAGE_SIZE,
    'pagination[page]': PAGE_INDEX + 1,
    'filters[categories][id][$eq]': 152,
  };
  await queryClient.prefetchInfiniteQuery(
    [process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.list],
    () => getInfinitePostsFn(queryInfinitePosts)
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
