// This file is kept for backward compatibility but is no longer used.
// The QueryClientProvider has been moved to src/components/providers/QueryClientProvider.tsx
// and is now only used in components that need React Query.

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

// This component is deprecated and should not be used.
// Use src/components/providers/QueryClientProvider.tsx instead.
export function QueryProvider({ children }: QueryProviderProps) {
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

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
