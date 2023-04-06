import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type {
    UseInfiniteQueryOptions,
    UseQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
  
  import type {
    DefaultCmsDataResponse,
    DefaultCmsError,
    DefaultCmsResponse,
} from '../types';
import type { Post } from './types';
import type { GetInfinitePostResponse, GetPostsParams } from './useGetPosts';
  
  export const getPostsFn = async (params?: Partial<GetPostsParams>) => {
    const response = await httpClient.get<
      DefaultCmsResponse<DefaultCmsDataResponse<Post>[]>
    >(process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.listCategories, {
      params: { ...params, sort: 'publishedAt:DESC' },
    });
    return response.data;
  };
  
  export const useGetPostsCategories = (
    params?: Partial<GetPostsParams>,
    opts?: UseQueryOptions<
      DefaultCmsResponse<DefaultCmsDataResponse<Post>[]>,
      DefaultCmsError
    >
  ) =>
    useQuery<DefaultCmsResponse<DefaultCmsDataResponse<Post>[]>, DefaultCmsError>(
      [
        process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.listCategories,
        params,
      ],
      () => getPostsFn(params),
      opts
    );
  
  export const getInfinitePostsCategoriesFn = async (
    params: Partial<GetPostsParams>
  ): Promise<GetInfinitePostResponse> => {
    const response = await httpClient.get<
      DefaultCmsResponse<DefaultCmsDataResponse<Post>[]>
    >(process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.listCategories, {
      params: { ...params, sort: 'publishedAt:DESC' },
    });
  
    return {
      data: response.data.data,
      nextPage: (params['pagination[page]'] || 0) + 1,
      totalPages: response.data.meta.pagination.pageCount,
    };
  };
  
  export const useGetInfinitePostsCategories = (
    params: Partial<GetPostsParams>,
    opts?: UseInfiniteQueryOptions<GetInfinitePostResponse, DefaultCmsError>
  ) =>
    useInfiniteQuery<GetInfinitePostResponse, DefaultCmsError>(
      [
        process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.post.listCategories,
        params,
      ],
      ({ pageParam = 1 }) =>
        getInfinitePostsCategoriesFn({
          'pagination[page]': pageParam,
          ...params,
        }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
          return undefined;
        },
        ...opts,
      }
    );
  