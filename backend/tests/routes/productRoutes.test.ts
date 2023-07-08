import supertest from "supertest";
import server from "../../src/server";
import { addProduct, deleteAllProducts } from "../../src/services/productService";
import { getProductId, getToken, newProduct, products } from "../helpers";
import { pool } from "../../src/utils/database";

const api = supertest(server);
const PRODUCTS_ROUTE = "/products";
let token = "";

beforeAll(async() => { 
  token = await getToken();
  await deleteAllProducts();
  await addProduct(products[0]);
});

describe("Product routes", () => {

  test("should return status 200 and all products", async () => {
    const res = await api
      .get(`${PRODUCTS_ROUTE}/`)
      .expect("Content-Type", /application\/json/);
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(products.length);
  });

  test("should return one product", async () => {
    const id = await getProductId();
    const res = await api.get(`${PRODUCTS_ROUTE}/${id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Banana");
  });

  test("should return error if product doesn't exist", async () => {
    const fakeId = '1';
    const res = await api.get(`${PRODUCTS_ROUTE}/${fakeId}`);
    
    expect(res.status).toBe(404);
    expect(res.text).toBe("\"Product not found\"");
  });

  test("should create a new product", async () => {
    const res = await api
      .post(`${PRODUCTS_ROUTE}/product-add`)
      .set("authorization", token)
      .send(newProduct);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("name");
  });

  test("should update one product", async () => {
    const id = await getProductId();
    
    const res = await api
      .put(`${PRODUCTS_ROUTE}/product-edit/${id}`)
      .set("authorization", token)
      .send({...newProduct, price: 2.20});
    expect(res.status).toEqual(201);
    expect(res.body.price).toBe(2.20);
  });

  test("should te delete product", async () => {
    const id = await getProductId();
    
    const res = await api
      .delete(`${PRODUCTS_ROUTE}/${id}`)
      .set("authorization", token)
    expect(res.status).toEqual(204);
  });
});

afterAll(() => {
  pool.end();
  server.close();
});
