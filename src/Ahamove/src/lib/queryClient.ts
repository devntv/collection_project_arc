import { QueryClient } from '@tanstack/react-query';
import type { DefaultQueryError } from '@/api/types';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        console.error(
          (e as DefaultQueryError).response?.data?.description ||
            (e as DefaultQueryError).response?.data?.title ||
            (e as Error).message
        );
      },
    },
    queries: {
      retry: false, // If set to a number, failed queries will retry until the failed query count reaches that number.
      retryOnMount: false, // If true, the query will re-fetch on mount if the cached data is stale.
      refetchOnWindowFocus: false, // If "always", the query will always re-fetch in the background on window focus.
      refetchOnReconnect: false, // Defaults to true . If true, the query will re-fetch on reconnect if the cached data is stale
      staleTime: 5 * 1000, // The time in milliseconds after data becomes stale.
      onError: (e) => {
        console.error(
          (e as DefaultQueryError).response?.data?.description ||
            (e as DefaultQueryError).response?.data?.title ||
            (e as Error).message
        );
      },
    },
  },
});