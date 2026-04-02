import type { Metadata } from 'next';
import '../../styles/globals.css';
import { Providers } from './providers';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'Nordic Green | Online Plant and Potting Boutique',
  description:
    'Nordic Green offers a curated selection of plants, and gardening tools. Bring nature indoors with our premium range of products.',
  keywords: 'plants, gardening, tools, Nordic Green, boutique',
  openGraph: {
    title: 'Nordic Green | Online Plant and Potting Boutique',
    description:
      'Discover a premium selection of indoor plants and potting equipment. Elevate your indoor spaces with Nordic Green.',
    images: ['/Logo.png'],
    url: 'https://nordic-green.vercel.app/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
