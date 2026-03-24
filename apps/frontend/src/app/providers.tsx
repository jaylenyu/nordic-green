'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: Infinity },
        },
      }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#158041',
              colorBgContainer: '#fff',
              colorLink: '#45a96f',
            },
            components: {
              Button: { textHoverBg: 'none' },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
