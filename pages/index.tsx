import ProductCard from "@components/ProductCard";
import axios from "axios";
import { mainCarousel, mainSectionBackground } from "constants/mainCarousel";
import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel";
import React from "react";
import { CustomButton, CustomWhiteButton } from "styles/common.styled";
import { HomeProps } from "types/type";
import styled from "@emotion/styled";

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products?skip=1&take=8&category=&orderBy=&contains=`
    );
    const responseProducts = response.data.items;
    const MainCarousel = mainCarousel;
    const SectionBackground = mainSectionBackground;

    return {
      props: {
        product: responseProducts,
        carousel: MainCarousel,
        sectionImage: SectionBackground,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function Home({ product, carousel, sectionImage }: HomeProps) {
  const router = useRouter();

  return (
    <div className="pt-20">
      <section className="w-full">
        <Carousel autoplay={true} speed={500} withoutControls wrapAround>
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
                  <div className="absolute grid gap-10 justify-items-center text-gray-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-5xl font-bold">{title}</div>
                    <div className="text-lg">{contents}</div>
                    <div className="w-1/2">
                      <CustomWhiteButton
                        onClick={() => router.push("/products")}
                      >
                        제품 보러 가기
                      </CustomWhiteButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      </section>
      <section className="px-20 py-40">
        <div className="flex text-4xl font-bold justify-center pb-40">
          특별한 상품을 만나보세요 !
        </div>
        <div className="grid grid-cols-4 gap-10 justify-items-center">
          {product &&
            product?.map((item, idx) => (
              <ProductCard key={idx} products={item} />
            ))}
        </div>
      </section>
      <Section bgImage={sectionImage}>
        <div className="p-10 w-1/4 h-1/2 absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col w-full h-full border justify-between items-center p-10">
            <div className="text-3xl font-bold">무료배송 이벤트</div>
            <div className="text-5xl text-green-700 font-bold">0 ₩</div>
            <div className="text-md">쉽고 빠르게 배송받으세요.</div>
            <CustomButton onClick={() => router.push("/products")}>
              제품보기
            </CustomButton>
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
