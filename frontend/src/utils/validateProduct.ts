import { type Result } from "../types/Result";

export const validateProduct = (product: FormData): Result<FormData, string> => {
  
  const data = Object.fromEntries(product.entries());
  const { name, description, price } = data;  

  if (name.length < 4) {
    return { success: false, message: "Name must contains 3 characters at least" };
  } else if (description.length < 3) {
    return { success: false, message: "Description must contains 4 characters at least" };
  } else if (isNaN(Number(price))){
    return { success: false, message: "Number type is required" };
  }
  return { success: true, value: product };
};
