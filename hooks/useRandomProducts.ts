import { products } from "@prisma/client";

export function useRandomProducts(products: products[], count: number) {
  const indices: any[] = [];

  while (indices.length < count && indices.length < products.length) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }

  return indices.map((index) => products[index]);
}
