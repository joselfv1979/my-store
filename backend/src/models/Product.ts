export interface IProduct {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    imagePath: string;
}

export type ProductWithoutId = Omit<IProduct, "id">