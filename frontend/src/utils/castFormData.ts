import { Product } from "../types/Product";

// Function to convert a Product object into FormData object
export const castProductToFormData = (product: Product) => {
  const { id, name, category, price, description, rating, image, imagePath } = product;
  const formData = new FormData();  

  if (id) formData.append("id", String(id));
  formData.append("rating", String(rating));
  formData.append("name", name);
  formData.append("category", category);
  formData.append("price", String(price));
  formData.append("description", description);
  formData.append("image", image ?? imagePath);

  return formData;
};
