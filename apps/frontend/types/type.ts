import { Cart, Comment, OrderItem, Orders, products } from "@prisma/client";
import { EditorState } from "draft-js";
import { Dispatch, SetStateAction } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

export interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}

export interface CartItem extends Cart {
  name: string;
  price: number;
  image_url: string;
}

export interface CommentsItemType extends Comment, OrderItem {}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  category_id: number;
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
  inlineStyleRanges: any[];
  entityRanges: any[];
  data: object;
};

export interface CarouselData {
  title: string;
  contents: string;
  image: string;
}

export type HomeProps = {
  product: products[];
  carousel: CarouselData[];
  sectionImage: string;
};

export interface UpdateOrderStatusInput {
  id: number;
  status: number;
  userId: number;
}
