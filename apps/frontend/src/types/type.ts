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
  WishlistItem,
  WishlistIds,
  Comment,
  UpsertCommentDto,
  ORDER_STATUS_MAP,
} from '@nordic-green/shared-types';

import { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
