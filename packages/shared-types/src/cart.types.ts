import type { Product } from './product.types';

export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  amount: number;
  product?: Product;
}

export interface AddCartDto {
  productId: number;
  quantity: number;
  amount: number;
}

export interface UpdateCartDto {
  quantity: number;
  amount: number;
}
