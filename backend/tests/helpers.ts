import request from "supertest";
import server from "../src/server";
import { IProduct } from "../src/models/Product";

const LOGIN_ROUTE = "/users/sign-in";
const PRODUCTS_ROUTE = "/products";

const product1: IProduct = {
  name: "Banana",
  description: "Spanish banana",
  category: "food",
  price: 1.50,
  rating: 2,
  imagePath: "static/images/1b811cc0-3180-4de2-8361-7a5c88649075red_apple.jpg",
};

export const newProduct: IProduct = {
  name: "Beer",
  description: "Toast beer",
  category: "drink",
  price: 2.50,
  rating: 4,
  imagePath: "static/images/1b811cc0-3180-4de2-8361-7a5c88649075red_apple.jpg",
};
export const products = [product1];

const credentials = {
  username: process.env.TEST_USER,
  password: process.env.TEST_PWD,
};

const api = request(server);

export const getToken = async () => {
    const res = await api.post(`${LOGIN_ROUTE}`).send(credentials);    
    return `bearer ${res.body.token}`;
}

export const getProductId = async () => {
    const res = await api.get(`${PRODUCTS_ROUTE}/`);
    return res.body[0].id;
}