import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: How long data is considered fresh
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Garbage collection time: How long inactive data stays in cache
            gcTime: 10 * 60 * 1000, // 10 minutes
            // Retry failed requests
            retry: (failureCount, error: any) => {
              // Don't retry on 404s
              if (error?.status === 404) return false;
              // Don't retry on authentication errors
              if (error?.status === 401 || error?.status === 403) return false;
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Refetch on window focus in production
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
          },
          mutations: {
            // Don't retry mutations by default
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};