import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryService } from "@/services/api/category.service";
import { Category, CategoryState } from "@/types/category.type";

const categoryService = new CategoryService();

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: true,
  error: null,
  total: 0,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await categoryService.getCategories();
    return response;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (id: number) => {
    const response = await categoryService.getCategoryById(id);
    return response;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: Partial<Category>) => {
    const category = categoryService.createCategory(data);
    return category;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }: { id: number; data: Partial<Category> }) => {
    const category = await categoryService.updateCategory(id, data);
    return category;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await categoryService.deleteCategory(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = true;
        state.categories = action.payload.categories;
        state.total = action.payload.total;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message || "Failed to fetch categories ";
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Category";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.total += 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create Category";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update category";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
        state.total -= 1;
        if (state.selectedCategory?.id === action.payload) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete category";
      });
  },
});

export const { setSelectedCategory, clearErrors } = categorySlice.actions;
export default categorySlice.reducer;
