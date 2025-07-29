import {
  MutationCache,
  QueryCache,
  QueryClient,
  type QueryClientConfig,
} from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      console.error("Query error:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.error("Mutation error:", error);
    },
  }),
};

export const queryClient = new QueryClient(queryClientConfig);
