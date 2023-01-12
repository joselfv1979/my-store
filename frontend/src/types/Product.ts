export type Product = {
    id?: string,
    name: string,
    category: string,
    description: string,
    price: number,
    image?: string
    rating?: number
}

export const initialProduct: Product = {
    name: "",
    description: "",
    category: "",
    price: 0
}