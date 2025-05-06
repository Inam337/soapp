import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "@/services/api/product.service";
import { Product, ProductsState } from "@/types/product.type";

// Create an instance of the ProductService
const productService = new ProductService();

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await productService.getProducts();
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const product = await productService.getProductById(id);
    return product;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data: Partial<Product>) => {
    const product = await productService.createProduct(data);
    return product;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    const product = await productService.updateProduct(id, data);
    return product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await productService.deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Fetch product by id cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      // Create product cases
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.total += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })
      // Update product cases
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      // Delete product cases
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.total -= 1;
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export const { setSelectedProduct, clearErrors } = productsSlice.actions;
export default productsSlice.reducer;
