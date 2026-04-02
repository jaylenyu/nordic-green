import ProductCard from '@/components/product/ProductCard';
import { MainCarousel, SectionBackground } from 'constants/homeData';
import Link from 'next/link';
import { API_PATHS } from '@/lib/api-paths';
import { Button } from '@/components/ui/button';
import HomeCarousel from './_components/HomeCarousel';

async function getProducts() {
  try {
    const res = await fetch(`${API_PATHS.PRODUCTS.LIST}?skip=0&take=8`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <HomeCarousel carousel={MainCarousel} />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          특별한 상품을 만나보세요
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {products?.map((item: any, idx: number) => (
            <ProductCard key={idx} products={item} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section
        className="relative w-full h-[50vh] lg:h-[60vh] bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${SectionBackground})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 bg-white p-8 sm:p-12 max-w-sm w-full mx-4 flex flex-col items-center gap-5 text-center shadow-2xl">
          <p className="text-lg font-bold">무료배송 이벤트</p>
          <p className="text-5xl font-bold text-primary">0 ₩</p>
          <p className="text-sm text-muted-foreground">쉽고 빠르게 배송받으세요.</p>
          <Button asChild className="w-full">
            <Link href="/products">제품 보기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
