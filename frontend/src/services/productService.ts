import axios from "axios";
import { Product } from "../types/Product";
import { Result } from "../types/Result";
import { handleError } from "../utils/handleError";

const api = axios.create({
  baseURL: "/products",
});

export const getProducts = async (): Promise<Result<Product[], string>> => {
  try {
    const { data } = await api.get("/");
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const getProduct = async (
  id: string
): Promise<Result<Product, string>> => {
  try {
    const { data } = await api.get(`/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const addNewProduct = async (
  product: Product
): Promise<Result<Product, string>> => {
  try {
    const { data } = await api.post(`/product-add/`, product);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const removeProduct = async (
  id: string
): Promise<Result<string, string>> => {
  try {
    const { data } = await api.delete(`/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const updateProduct = async (
  product: Product
): Promise<Result<Product, string>> => {
  try {
    const { data } = await api.put(`/product-edit/${product.id}`, product);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
