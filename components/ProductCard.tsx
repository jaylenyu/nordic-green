import { products } from "@prisma/client";
import { Card } from "antd";
import { CATEGORY_MAP } from "constants/products";
import { useScreenWidth } from "hooks/useScreenWidth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function ProductCard({ products }: { products: products }) {
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const { id, name, image_url, category_id, price } = products;

  return (
    <Card
      className="w-full"
      key={id}
      onClick={() => router.push(`/products/${id}`)}
      hoverable
      bordered={false}
      cover={
        <Image
          alt={name}
          src={image_url ?? ""}
          width={1000}
          height={1000}
          priority
          unoptimized
          objectFit="cover"
        />
      }
    >
      <div className="flex flex-col justify-between">
        <div className="w-full text-lg font-bold lg:text-base md:text-sm sm:text-sm sx:text-xs">
          {name}
        </div>
        <div>
          {screenWidth >= 1024 && (
            <div className="text-zinc-500">{CATEGORY_MAP[category_id - 1]}</div>
          )}
          <div className="md:text-xs sm:text-xs xs:text-xs">
            {price.toLocaleString()} ₩
          </div>
        </div>
      </div>
    </Card>
  );
}
