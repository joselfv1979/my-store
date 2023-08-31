import { Product } from "../types/Product";

export const castProductToFormData = (product: Product) => {
  const { id, name, category, price, description, rating, image, imagePath } = product;
  const formData = new FormData();  

  if (id) formData.append("id", String(id));
  if (rating) formData.append("rating", String(rating));
  formData.append("name", name);
  formData.append("category", category);
  formData.append("price", String(price));
  formData.append("description", description);
  formData.append("image", image ?? imagePath);

  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }

  return formData;
};
