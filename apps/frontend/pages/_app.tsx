import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import Head from "next/head";
import { Toaster } from "sonner";

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
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
