import { BadRequest } from '@tsed/exceptions';
import type { AxiosError } from 'axios';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { Post } from '@/api/cms/posts/types';
import { getPostBySlugFn } from '@/api/cms/posts/useGetPostBySlug';
import { getPostsFn } from '@/api/cms/posts/useGetPosts';
import type {
  DefaultCmsDataResponse,
  DefaultCmsResponse,
} from '@/api/cms/types';
import { logger } from '@/lib/common';
import {
  instapageMappingData,
  pageWithoutPagesMappingData,
  postSlugMappingData,
} from '@/lib/configRoutes';
import { PAGE_SIZE } from '@/lib/constants';
import { blogConfig } from '@/modules/blog/blogConfig';
import { BlogDetailPage } from '@/modules/blog/BlogDetailPage';

type Props = {
  // Declare News props
  post: DefaultCmsDataResponse<Post> | null;
  previewMode: boolean;
  type: 'post' | 'page' | 'instapage';
};

export default function NewsDetail({
  type,
  post,
  previewMode = false,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // if (!post) {
  //   return <NotFoundPage />;
  // } else
  return <BlogDetailPage post={post} previewMode={previewMode} type={type} />;
}

export const getStaticPaths = async () => {
  let pageCurrent = 1;
  const pageSize = PAGE_SIZE;
  let postsRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Post>[]>;
  await getPostsFn({
    'pagination[page]': pageCurrent,
    'pagination[pageSize]': pageSize,
    fields: 'slug',
  })
    .then((res) => (postsRes = res))
    .catch((error) => console.log(error));

  let paths: {
    params: {
      slug: string;
    };
  }[] = [];
  if (postsRes.data && postsRes.data.length > 0) {
    postsRes.data.map((item) => ({
      params: { slug: item.attributes.slug },
    }));
    if (postsRes.meta.pagination.total > pageCurrent * pageSize) {
      while (pageCurrent * pageSize < 1000) {
        pageCurrent++;
        try {
          await getPostsFn({
            'pagination[page]': pageCurrent,
            'pagination[pageSize]': pageSize,
            fields: 'slug',
          })
            .then((res) => {
              postsRes = res;
              paths = paths.concat(
                postsRes.data.map((item) => ({
                  params: { slug: item.attributes.slug },
                }))
              );
            })
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale, params } = context;
  const previewMode = !!context.preview;
  if (locale == undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = blogConfig;

  if (params?.slug) {
    if (
      Object.prototype.hasOwnProperty.call(
        instapageMappingData,
        params?.slug.toString()
      )
    ) {
      return {
        props: {
          ...(await serverSideTranslations(locale, i18nNamespaces)),
          post: null,
          type: 'instapage',
          previewMode: false,
          fallback: 'blocking',
        },
        revalidate: 30,
      };
    } else {
      let postRes = {} as DefaultCmsResponse<DefaultCmsDataResponse<Post>>;
      try {
        if (
          Object.prototype.hasOwnProperty.call(
            pageWithoutPagesMappingData,
            params?.slug.toString()
          )
        ) {
          if (previewMode) {
            await getPostBySlugFn(
              pageWithoutPagesMappingData[params.slug.toString()],
              {
                params: { publicationState: 'preview' },
              }
            )
              .then((res) => (postRes = res))
              .catch((error) => {
                logger(error as AxiosError);
                return {
                  notFound: true,
                };
              });
          } else {
            await getPostBySlugFn(
              pageWithoutPagesMappingData[params.slug.toString()]
            )
              .then((res) => (postRes = res))
              .catch((error) => {
                logger(error as AxiosError);
                return {
                  notFound: true,
                };
              });
          }
        } else if (
          Object.prototype.hasOwnProperty.call(
            postSlugMappingData,
            params?.slug.toString()
          )
        ) {
          if (previewMode) {
            await getPostBySlugFn(postSlugMappingData[params.slug.toString()], {
              params: { publicationState: 'preview' },
            })
              .then((res) => (postRes = res))
              .catch((error) => {
                logger(error as AxiosError);
                return {
                  notFound: true,
                };
              });
          } else {
            await getPostBySlugFn(postSlugMappingData[params.slug.toString()])
              .then((res) => (postRes = res))
              .catch((error) => {
                logger(error as AxiosError);
                return {
                  notFound: true,
                };
              });
          }
        } else if (previewMode) {
          await getPostBySlugFn(params.slug.toString(), {
            params: { publicationState: 'preview' },
          })
            .then((res) => (postRes = res))
            .catch((error) => {
              logger(error as AxiosError);
              return {
                notFound: true,
              };
            });
        } else {
          await getPostBySlugFn(params.slug.toString())
            .then((res) => (postRes = res))
            .catch((error) => {
              logger(error as AxiosError);
              return {
                notFound: true,
              };
            });
        }
      } catch (error) {
        logger(error as AxiosError);
        return { notFound: true };
      }

      if (
        Object.prototype.hasOwnProperty.call(
          pageWithoutPagesMappingData,
          params?.slug.toString()
        ) ||
        Object.values(pageWithoutPagesMappingData).indexOf(
          params?.slug.toString()
        ) > -1
      )
        if (postRes.data)
          return {
            props: {
              ...(await serverSideTranslations(locale, i18nNamespaces)),
              post: postRes.data,
              previewMode,
              type: 'page',
              fallback: 'blocking',
            },
            revalidate: 30,
          };
        else
          return {
            notFound: true,
          };
      if (postRes.data) {
        return {
          props: {
            ...(await serverSideTranslations(locale, i18nNamespaces)),
            post: postRes.data ? postRes.data : null,
            previewMode,
            type: 'post',
            fallback: 'blocking',
          },
          revalidate: 30,
        };
      } else
        return {
          notFound: true,
        };
    }
  }

  return {
    notFound: true,
  };
};
