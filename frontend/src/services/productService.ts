import axios from "axios";
import { Product } from "../types/Product";
import { Result } from "../types/Result";
import { getHeaders } from "../utils/authHeader";
import { castFormDataToProduct } from "../utils/castFormData";
import { handleError } from "../utils/handleError";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PRODUCTS,
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
  console.log('id', id);
  
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
    const response = await api.post(`/product-add/`, product);
    console.log({response});
    
    const newProduct = castFormDataToProduct(product);
    return { success: true, value: newProduct };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const removeProduct = async (
  id: string
): Promise<Result<string, string>> => {
  try {
    const { data } = await api.delete(`/${id}`);
    console.log({data});
    
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
    await api.put(`/product-edit/${id}`, product);
    const updatedProduct = castFormDataToProduct(product);
    return { success: true, value: updatedProduct };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
