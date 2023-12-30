import { Product } from "./Product";

/* The `CartState` interface is defining the structure of the state object for a shopping cart. It has
the following properties: */
export interface CartState {
    items: CartItem[],
    item?: CartItem,
    totalPrice: number,
    message?: string,
}

/* The code `export interface CartItem extends Product { quantity: number }` is defining an interface
called `CartItem` that extends the `Product` interface. */
export interface CartItem extends Product { 
    quantity: number
}; 