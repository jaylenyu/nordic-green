'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Carousel = dynamic(() => import('nuka-carousel').then((m) => m.default as any), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as React.ComponentType<any>;

interface CarouselSlide {
  title: string;
  contents: string;
  image: string;
}

export default function HomeCarousel({ carousel }: { carousel: CarouselSlide[] }) {
  return (
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
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-foreground backdrop-blur-sm"
              >
                <Link href="/products">제품 보기</Link>
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
