export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  unit: string; // e.g., pcs, kg, liters
  reorderLevel: number;
  category?: {
    id: number;
    name: string;
  };
  stockEntries?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page?: number;
  limit?: number;
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
}

export interface Category {
  id: number;
  name: string;
}
