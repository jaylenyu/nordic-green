export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string | null;
  categoryId: number;
  contents: string | null;
  price: number;
  createdAt: string | Date;
  category?: Category;
}
