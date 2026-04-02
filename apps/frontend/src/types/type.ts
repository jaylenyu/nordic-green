// Re-export all shared types from the monorepo shared-types package.
// App-specific types that don't belong in shared-types are defined here.

export type {
  Product,
  Category,
  CartItem,
  AddCartDto,
  UpdateCartDto,
  Order,
  OrderItem,
  CreateOrderDto,
  CreateOrderItemDto,
  UpdateOrderStatusDto,
  Wishlist,
  WishlistIds,
  Comment,
  UpsertCommentDto,
  ORDER_STATUS_MAP,
} from '@nordic-green/shared-types';

// WishlistItem with joined product fields (returned by GET /wishlist/items)
export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  category_id: number;
}

import { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// App-specific composite types returned by NestJS API
export interface CartItemWithProduct {
  id: number;
  productId: number;
  quantity: number;
  amount: number;
  name: string;
  price: number;
  image_url: string;
}

export interface OrderItemDetail {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  amount: number;
  name: string;
  image_url: string;
}

export interface OrderDetail {
  id: number;
  status: number;
  createAt: string;
  userId: string;
  orderItems: OrderItemDetail[];
}

export interface CommentsItemType {
  id: number;
  userId: string;
  orderItemIds: number;
  rate: number;
  contents: string | null;
  images: string | null;
  updatedAt: string;
  quantity: number;
  productId: number;
}

export type CustomEditorProps = {
  editorState: EditorState | undefined;
  readOnly?: boolean;
  onSave?: () => void;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
};

export type CustomUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id: string;
};

export type Block = {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: unknown[];
  entityRanges: unknown[];
  data: object;
};

export interface CarouselData {
  title: string;
  contents: string;
  image: string;
}
