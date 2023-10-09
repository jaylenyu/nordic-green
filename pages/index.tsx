import ProductCard from "@components/ProductCard";
import axios from "axios";
import { MainCarousel, SectionBackground } from "constants/homeData";
import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel";
import React from "react";
import { CustomButton, CustomWhiteButton } from "styles/common.styled";
import { HomeProps } from "types/type";
import styled from "@emotion/styled";
import API_PATHS from "api";
import { useScreenWidth } from "hooks/useScreenWidth";

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
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const mobileProducts =
    screenWidth < 640 && product?.length > 4 ? product.slice(2, 6) : product;

  return (
    <div className="pt-20">
      <section className="w-full">
        <Carousel
          autoplay={true}
          speed={500}
          withoutControls
          wrapAround
          pauseOnHover={false}
        >
          {carousel &&
            carousel.map(({ title, contents, image }, idx) => (
              <div key={idx} className="w-full relative">
                <div className="w-screen h-full">
                  <Image
                    className="relative"
                    src={image}
                    alt={title}
                    width={5870}
                    height={3000}
                    priority
                    unoptimized
                  />
                  <div className="sx:w-full absolute grid gap-10 justify-items-center text-gray-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="xl:text-5xl font-bold lg:text-4xl text-2xl">
                      {title}
                    </div>
                    {screenWidth >= 640 && (
                      <div className="xl:text-lg lg:text-base md:text-xs sm:text-xs">
                        {contents}
                      </div>
                    )}
                    <div className="w-1/2">
                      <CustomWhiteButton
                        onClick={() => router.push("/products")}
                      >
                        <span className="sm:text-sm sx:text-xs">제품 보기</span>
                      </CustomWhiteButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      </section>
      <section className="px-20 py-40 md:px-10 md:py-20 sm:px-5 sm:py-10 sx:px-5 sx:py-20">
        <div className="flex text-3xl xl:text-4xl md:text-2xl sm:text-2xl font-bold justify-center pb-40 md:pb-20 sm:pb-10 sx:pb-5 ">
          특별한 상품을 만나보세요 !
        </div>
        <div className="grid gap-10 lg:gap-5 md:grid-cols-2 sm:grid-cols-2 sx:grid-cols-2 md:gap-5 sm:gap-2 sx:gap-2 justify-items-center">
          {mobileProducts &&
            mobileProducts.map((item, idx) => (
              <ProductCard key={idx} products={item} />
            ))}
        </div>
      </section>
      <Section bgImage={sectionImage}>
        <div className="p-10 sm:p-4 sx:p-3 w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/2 sx:w-1/2 h-1/2 md:h-1/2 sm:h-1/3 sx:h-1/3 absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col w-full h-full border justify-between items-center p-10 sm:p-4 sx:p-3">
            <div className="text-xl xl:text-2xl md:text-lg sm:text-base sx:text-sm font-bold ">
              무료배송 이벤트
            </div>
            <div className="text-4xl text-green-700 font-bold">0 ₩</div>
            <>
              <div className="text-md sm:text-sm sx:text-xs">
                쉽고 빠르게 배송받으세요.
              </div>
              <CustomButton onClick={() => router.push("/products")}>
                제품 보기
              </CustomButton>
            </>
          </div>
        </div>
      </Section>
    </div>
  );
}

const Section = styled.section<{ bgImage: string }>`
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;
