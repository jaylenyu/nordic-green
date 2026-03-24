import type { Product } from './product.types';

export interface Wishlist {
  id: number;
  userId: string;
  items: WishlistItem[];
}

export interface WishlistItem {
  id: number;
  wishlistId: number;
  productId: number;
  product?: Product;
}

export interface WishlistIds {
  productIds: number[];
}
