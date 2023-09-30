import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#158041",
              colorBgContainer: "#fff",
            },
          }}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
