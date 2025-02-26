import axios from "axios";
import { Product } from "../types/product";

const BASE_URL = "https://runthatsteez.vercel.app";

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(`${BASE_URL}/product`);
  return response.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await axios.get(`${BASE_URL}/product/${id}`);
  return response.data;
}

export async function createProduct(
  product: Omit<Product, "_id">,
): Promise<Product> {
  const response = await axios.post(`${BASE_URL}/product/`, product);
  return response.data;
}

export async function getAllProducts(): Promise<Product[]> {
  return await fetchProducts();
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await axios.delete(`${BASE_URL}/product/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete product:", error);
    return false;
  }
}

export async function updateProduct(
  id: string,
  product: Partial<Product>,
): Promise<Product> {
  const response = await axios.put(`${BASE_URL}/product/${id}`, product);
  return response.data;
}
