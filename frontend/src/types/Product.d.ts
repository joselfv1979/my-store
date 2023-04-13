export type Product = {
    id?: string,
    name: string,
    category: string,
    description: string,
    price: number,
    image?: File;
    imagePath: string;
    rating: number
}

export const initialProduct: Product = {
    name: "",
    category: "",
    description: "",
    price: 0,
    imagePath: "",
    rating: 0
}

export interface ProductState {
    products: Product[];
    product: Product | null;
    message?: string;
    error?: string;
    loading: boolean;
  }