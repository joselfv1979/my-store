/* The `ProductState` interface is defining the shape of the state object for managing products in an
application. */
export interface ProductState {
  products: Product[];
  product: Product | null;
  message?: string;
  error?: string;
  loading: boolean;
}

/* The `export interface Product` is defining the shape of a single product object.*/
export interface Product {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: File;
  imagePath: string;
  rating: number;
}

/**
 * Represents a product category with an id, label, value, and image.
 */
export type ProductCategory = {
  id: number;
  label: string;
  value: string;
  image: string;
};
