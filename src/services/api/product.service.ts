import { Product, ProductResponse } from "@/types/product.type";
import axiosInstance from "./axios.config";

export class ProductService {
  async getProducts(): Promise<ProductResponse> {
    try {
      const response = await axiosInstance.get("products");
      return {
        products: response.data,
        total: response.data.length,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await axiosInstance.get(`products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    try {
      const response = await axiosInstance.post("products", data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    try {
      const response = await axiosInstance.put(`products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`products/${id}`);
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

export default ProductService;
