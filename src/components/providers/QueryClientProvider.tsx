'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}