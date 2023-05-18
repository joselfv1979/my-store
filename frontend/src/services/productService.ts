import axios from "axios";
import { Product } from "../types/Product";
import { Result } from "../types/Result";
import { getHeaders } from "../utils/authHeader";
import { handleError } from "../utils/handleError";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PRODUCTS,
});

export const getProducts = async (query: string = ''): Promise<Result<Product[], string>> => {
  
  try {
    const { data } = await api.get(`/?category=${query}`);
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
  product: FormData
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
  //, { headers: getHeaders() }
};

export const updateProduct = async (
  product: FormData
): Promise<Result<Product, string>> => {
  const id = product.get("id");
  try {
    const { data } = await api.put(`/product-edit/${id}`, product);    
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
