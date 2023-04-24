// import { reduxCart } from "../store/cart/cartSlice";
// import { CartItem } from "../types/Cart";

// const storedCart = localStorage.getItem('cart');

// export const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

// export const initiateCart = () => { 
//     localStorage.setItem('cart', JSON.stringify(cart));
// };   

// export const getCart = (): CartItem[] => { return cart; };

// export const updateCart = (): void => {
//     localStorage.setItem('cart', JSON.stringify(reduxCart));
// }

export const clearCart = (): void => {
    localStorage.removeItem('cart');
}