import axiosInstance from "./axios.config";
import { Category, CategoryResponse } from "@/types/category.type";

export class CategoryService {
  async getCategories(): Promise<CategoryResponse> {
    try {
      const response = await axiosInstance.get("categories");
      return {
        categories: response.data,
        total: response.data.length,
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
  async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await axiosInstance.get(`categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching categories with ID ${id}:`, error);
      throw error;
    }
  }
  async createCategory(data: Partial<Category>): Promise<Category> {
    try {
      const response = await axiosInstance.post("categories", data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    try {
      const response = await axiosInstance.put(`categories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  }
  async deleteCategory(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  }
}
