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
import type { Job } from './types';
  
  export type GetJobsParams = {
    'pagination[page]': number;
    'pagination[pageSize]': number;
    'filters[job_categories][id][$eq]': number;
    'filters[job_types][id][$eq]': number;
    'filters[locations][id][$eq]': number;
    fields?: string;
  } & Record<string, number | string>;
  
  export type GetInfiniteJobResponse = {
    data: DefaultCmsDataResponse<Job>[];
    nextPage: number;
    totalPages: number;
    totalSize: number;
  };
  
  export const getJobsFn = async (params?: Partial<GetJobsParams>) => {
    const response = await httpClient.get<
      DefaultCmsResponse<DefaultCmsDataResponse<Job>[]>
    >(process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.job.list, {
      params: { ...params, sort: 'publishedAt:DESC' },
    });
    return response.data;
  };
  
  export const useGetJobs = (
    params?: Partial<GetJobsParams>,
    opts?: UseQueryOptions<
      DefaultCmsResponse<DefaultCmsDataResponse<Job>[]>,
      DefaultCmsError
    >
  ) =>
    useQuery<DefaultCmsResponse<DefaultCmsDataResponse<Job>[]>, DefaultCmsError>(
      [process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.job.list, params],
      () => getJobsFn(params),
      opts
    );
  
  export const getInfiniteJobsFn = async (
    params: Partial<GetJobsParams>
  ): Promise<GetInfiniteJobResponse> => {
    const response = await httpClient.get<
      DefaultCmsResponse<DefaultCmsDataResponse<Job>[]>
    >(process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.job.list, {
      params: { ...params, sort: 'publishedAt:DESC' },
    });
  
    return {
      data: response.data.data,
      nextPage: (params['pagination[page]'] || 0) + 1,
      totalPages: response.data.meta.pagination.pageCount,
      totalSize: response.data.meta.pagination.total,
    };
  };
  
  export const useGetInfiniteJobs = (
    params: Partial<GetJobsParams>,
    opts?: UseInfiniteQueryOptions<GetInfiniteJobResponse, DefaultCmsError>
  ) =>
    useInfiniteQuery<GetInfiniteJobResponse, DefaultCmsError>(
      [process.env.NEXT_PUBLIC_CMS_API_URI + apiRoutes.cms.job.list, params],
      ({ pageParam = 1 }) =>
        getInfiniteJobsFn({ 'pagination[page]': pageParam, ...params }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
          return undefined;
        },
        ...opts,
      }
    );
  