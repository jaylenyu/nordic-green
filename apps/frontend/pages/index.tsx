import ProductCard from "@components/product/ProductCard";
import axios from "axios";
import { MainCarousel, SectionBackground } from "constants/homeData";
import Image from "next/image";
import Link from "next/link";
import Carousel from "nuka-carousel";
import { Button } from "@components/ui/button";
import { HomeProps } from "types/type";
import API_PATHS from "api";

export async function getStaticProps() {
  try {
    const response = await axios.get(API_PATHS.MAIN.GET);
    const responseProducts = response.data.items;
    const responseCarousel = MainCarousel;
    const responseSection = SectionBackground;
    return {
      props: {
        product: responseProducts,
        carousel: responseCarousel,
        sectionImage: responseSection,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function Home({ product, carousel, sectionImage }: HomeProps) {
  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <section className="w-full">
        <Carousel autoplay speed={500} withoutControls wrapAround pauseOnHover={false}>
          {carousel?.map(({ title, contents, image }, idx) => (
            <div key={idx} className="w-full relative">
              <Image
                src={image}
                alt={title}
                width={5870}
                height={3000}
                priority
                unoptimized
                className="w-full h-[60vh] lg:h-[80vh] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-6 px-4 text-white">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center tracking-tight">
                  {title}
                </h1>
                <p className="hidden sm:block text-sm lg:text-lg text-center text-white/80 max-w-lg">
                  {contents}
                </p>
                <Button asChild variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-foreground backdrop-blur-sm">
                  <Link href="/products">제품 보기</Link>
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          특별한 상품을 만나보세요
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {product?.map((item, idx) => (
            <ProductCard key={idx} products={item} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section
        className="relative w-full h-[50vh] lg:h-[60vh] bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${sectionImage})` }}
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
