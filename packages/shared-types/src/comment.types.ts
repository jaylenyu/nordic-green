export interface Comment {
  id: number;
  userId: string;
  orderItemId: number;
  rate: number;
  contents: string | null;
  images: string | null;
  updatedAt: string | Date;
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface UpsertCommentDto {
  orderItemId: number;
  rate: number;
  contents?: string;
  images?: string;
}
