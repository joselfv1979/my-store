export interface ProductState {
    products: Product[];
    product: Product | null;
    message?: string;
    error?: string;
    status: 'loading' | 'idle' | 'success' | 'fail';
  }

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

export type productCategory = {
  id: number;
  label: string;
  value: string;
  image: string;
};

