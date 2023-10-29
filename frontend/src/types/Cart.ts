import { Product } from "./Product";

export interface CartState {
    items: CartItem[],
    item?: CartItem,
    totalPrice: number,
    message?: string,
}

export interface CartItem extends Product { 
    quantity: number
}; 

export const initialCart: CartState = {
    items: [],
    totalPrice: 0
}