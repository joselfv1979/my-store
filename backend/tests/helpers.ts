import request from "supertest";
import { app } from "../src/server";
import { IProduct } from "../src/models/Product";
import { IUser } from "../src/models/User";

export const LOGIN_ROUTE = "/users/sign-in";
export const PRODUCTS_ROUTE = "/products";
export const USERS_ROUTE = "/users";

export const product1: IProduct = {
  name: "Banana",
  description: "Spanish banana",
  category: "food",
  price: 1.5,
  rating: 2,
  imagePath: "static/images/1b811cc0-3180-4de2-8361-7a5c88649075red_apple.jpg",
};

export const newProduct: IProduct = {
  name: "Beer",
  description: "Toast beer",
  category: "drink",
  price: 2.5,
  rating: 4,
  imagePath: "static/images/1b811cc0-3180-4de2-8361-7a5c88649075red_apple.jpg",
};

export const initialProducts = [product1];

export const user1: IUser = {
  fullname: "Mary Silva",
  username: "mary",
  password: "marypwd",
  email: "mary@gmail.com",
  roles: ["user"],
  image: "",
};

export const newUser: IUser = {
  fullname: "Juan Gómez",
  username: "juan",
  password: "juanpwd",
  email: "juan@gmail.com",
  roles: ["user"],
  image: "",
};

const admin: IUser = {
  fullname: "",
  username: "admin",
  password: "renaido",
  email: "admin@gmail.com",
  roles: ["admin"],
  image: "",
};

export const initialUsers = [user1, admin];

const credentials = {
  username: process.env.TEST_USER,
  password: process.env.TEST_PWD,
};

let token = "";

const api = request(app);

export const getToken = async () => {  
  const res = await api.post(`${LOGIN_ROUTE}`).send(credentials);
  token = `bearer ${res.body.token}`
  return token;
};

export const getProductId = async () => {
  const res = await api.get(`${PRODUCTS_ROUTE}/`);
  return res.body[0].id;
};

export const getUserId = async () => {
  const res = await api.get(`${USERS_ROUTE}/`).set("authorization", token);
  
  const users = res.body.filter((item: IUser) => 
    item.username === 'mary'
  );

  return users[0].id
};

