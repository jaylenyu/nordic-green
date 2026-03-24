import type { Product } from './product.types';
import type { Comment } from './comment.types';

export const ORDER_STATUS_MAP: Record<number, string> = {
  0: '주문 완료',
  1: '결제 확인',
  2: '배송 준비',
  3: '배송 중',
  4: '배송 완료',
  5: '주문 취소',
};

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  amount: number;
  product?: Product;
  comment?: Comment | null;
}

export interface Order {
  id: number;
  userId: string;
  receiver: string | null;
  address: string | null;
  phoneNumber: string | null;
  createdAt: string | Date;
  status: number;
  orderItems: OrderItem[];
}

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
  price: number;
  amount: number;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
  receiver?: string;
  address?: string;
  phoneNumber?: string;
}

export interface UpdateOrderStatusDto {
  orderId: number;
  status: number;
}
