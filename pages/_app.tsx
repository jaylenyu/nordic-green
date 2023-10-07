import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { ConfigProvider } from "antd";
import Head from "next/head";

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
          <Head>
            <title>Nordic Green | Online Plant and Potting Boutique</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="description"
              content="Nordic Green offers a curated selection of plants, and gardening tools. Bring nature indoors with our premium range of products."
            />
            <meta
              name="keywords"
              content="plants, gardening, tools, Nordic Green, boutique"
            />
            <meta
              property="og:title"
              content="Nordic Green | Online Plant and Potting Boutique"
            />
            <meta
              property="og:description"
              content="Discover a premium selection of indoor plants and potting equipment. Elevate your indoor spaces with Nordic Green."
            />
            <meta property="og:image" content="/Logo.png" />
            <meta
              property="og:url"
              content="https://nordic-green.vercel.app/"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
