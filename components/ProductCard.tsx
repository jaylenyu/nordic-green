import { products } from "@prisma/client";
import { Card } from "antd";
import { CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function ProductCard({ products }: { products: products }) {
  const router = useRouter();
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
      <div className="flex flex-col justify-between h-24">
        <div className="w-full text-lg font-bold">{name}</div>
        <div>
          <div className="text-zinc-500">{CATEGORY_MAP[category_id - 1]}</div>
          <div>{price.toLocaleString()} ₩</div>
        </div>
      </div>
    </Card>
  );
}
