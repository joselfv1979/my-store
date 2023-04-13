import { Product } from "../types/Product";

export const castProductToFormData = (product: Product) => {
  const { id, name, category, price, description, image, imagePath } = product;
  const formData = new FormData();

  if (id) formData.append("id", String(id));
  formData.append("name", name);
  formData.append("category", category);
  formData.append("price", price.toString());
  formData.append("description", description.toString());
  formData.append("image", image ? image : imagePath);

  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }

  return formData;
};
