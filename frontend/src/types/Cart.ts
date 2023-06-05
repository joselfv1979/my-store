import { Product } from "./Product";

export interface CartState {
    items: CartItem[],
    item?: CartItem,
    totalPrice: number,
    message?: string,
    error?: string,
    loading: boolean
}

export interface CartItem extends Product { 
    quantity: number
}; 

export interface Cart {
    items: CartItem[],
    totalPrice: number
}

export const initialCart: Cart = {
    items: [],
    totalPrice: 0
}