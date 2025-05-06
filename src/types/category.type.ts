export interface Category {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  categories: Category[];
  total: number;
  page?: number;
  limit?: number;
}
export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
  total: number;
}
