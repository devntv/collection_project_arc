import { dehydrate } from '@tanstack/react-query';
import { BadRequest } from '@tsed/exceptions';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { Category, PostTag } from '@/api/cms/posts/types';
import { getCategoriesFn } from '@/api/cms/posts/useGetCategories';
import type { GetPostsParams } from '@/api/cms/posts/useGetPosts';
import { getInfinitePostsCategoriesFn } from '@/api/cms/posts/useGetPostsCategories';
import { getTagsFn } from '@/api/cms/posts/useGetTags';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import apiRoutes from '@/lib/apiRoutes';
import { PAGE_INDEX, PAGE_SIZE } from '@/lib/constants';
import { queryClient } from '@/lib/queryClient';
import { blogConfig } from '@/modules/blog/blogConfig';
import { BlogPage } from '@/modules/blog/BlogPage';
import type { FormatCategory, FormatPostTag } from 'types.d/post-format';

type Props = {
  // Declare News props
  categories: FormatCategory[];
  tags: FormatPostTag[];
};

export default function News(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <BlogPage categories={_props.categories} tags={_props.tags} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { locale } = context;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = blogConfig;
  let categoriesRes;
  const categoriesData: FormatCategory[] = [];
  await getCategoriesFn()
    .then((res) => {
      categoriesRes = res.data;
      categoriesRes.map((item: DefaultCmsDataResponse<Category>) => {
        categoriesData.push({
          id: item.id,
          name: item.attributes.name,
          slug: item.attributes.slug,
        });
      });
    })
    .catch(() => (categoriesRes = null));

  let postTagsRes: DefaultCmsDataResponse<PostTag>[] = [];
  const postTagsData: FormatPostTag[] = [];

  await getTagsFn()
    .then((res) => {
      postTagsRes = res.data;
      postTagsRes.map((item: DefaultCmsDataResponse<PostTag>) => {
        postTagsData.push({
          id: item.id,
          name: item.attributes.name,
          slug: item.attributes.slug,
        });
      });
    })
    .catch((error) => console.log(error));

  const queryInfinitePosts: Partial<GetPostsParams> = {
    'pagination[pageSize]': PAGE_SIZE,
    'pagination[page]': PAGE_INDEX,
  };

  await queryClient.prefetchInfiniteQuery(
    [process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.listCategories],
    () => getInfinitePostsCategoriesFn(queryInfinitePosts)
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
      categories: categoriesData,
      tags: postTagsData,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
