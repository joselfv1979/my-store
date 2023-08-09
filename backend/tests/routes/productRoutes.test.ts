import { expect, describe, test, afterAll, beforeEach } from "@jest/globals";
import supertest from "supertest";
import { server, app } from "../../src/server";
import { pool } from "../../src/utils/database";
import { addProduct, deleteAllProducts } from "../../src/services/productService";
import { PRODUCTS_ROUTE, getProductId, getToken, newProduct, initialProducts, product1 } from "../helpers";

const api = supertest(app);

let token = "";
let id = "";

beforeEach(async () => {
  await deleteAllProducts();
  await addProduct(product1);
  token = await getToken();
  id = await getProductId();
});

describe("GET ALL, fetching all products", () => {
  test("should return products as json", async () => {
    await api
      .get(`${PRODUCTS_ROUTE}/`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return status 200 and all products", async () => {
    const res = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(initialProducts.length);
  });
})

describe("GET, checking a specific product", () => {
  test("should return one product", async () => {
    const res = await api.get(`${PRODUCTS_ROUTE}/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("Banana");
  });

  test("should fail with statuscode 404 if product doesn't exist", async () => {
    const fakeId = "1";
    const res = await api.get(`${PRODUCTS_ROUTE}/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.text).toBe('"Product not found"');
  });
});

describe("POST, creating a new product", () => {
  test("should create a new product", async () => {
    const res = await api
      .post(`${PRODUCTS_ROUTE}/product-add`)
      .set("authorization", token)
      .send(newProduct);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("Beer");

    const productsAtEnd = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(productsAtEnd.body).toHaveLength(initialProducts.length + 1)
  });

  test("POST, should fail with statuscode 400 if price is not added", async () => {
    const res = await api
      .post(`${PRODUCTS_ROUTE}/product-add`)
      .set("authorization", token)
      .send({ name: "apple", category: "food" });
    
    expect(res.status).toEqual(400);
    expect(res.text).toBe('"Bad request"');

    const productsAtEnd = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(productsAtEnd.body).toHaveLength(initialProducts.length);
  });
});

describe("PUT, updating a product", () => {
  test("PUT, should update one product", async () => {
    const res = await api
      .put(`${PRODUCTS_ROUTE}/product-edit/${id}`)
      .set("authorization", token)
      .send({ ...newProduct, price: 2.2 });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("price");
    expect(res.body.price).toBe(2.2);
  });

  test("PUT, should fail with statuscode 404 if product doesn't exist", async () => {
    const fakeId = "1";
    const res = await api
      .put(`${PRODUCTS_ROUTE}/product-edit/${fakeId}`)
      .set("authorization", token)
      .send({ ...newProduct, price: 2.2 });

    expect(res.status).toBe(404);
    expect(res.text).toBe('"Product not found"');
  });

  test("PUT, should fail with statuscode 400 if a required property is not added", async () => {
    const res = await api
      .put(`${PRODUCTS_ROUTE}/product-edit/${id}`)
      .set("authorization", token)
      .send({ name: "apple", price: 2.4 });
    expect(res.status).toEqual(400);
    expect(res.text).toBe('"Bad request"');

    const product = await api.get(`${PRODUCTS_ROUTE}/${id}`);
    expect(Number(product.body.price)).toBe(initialProducts[0].price);
  });
});

describe("DELETE, deleting a product", () => {
  test("DELETE, should delete one product", async () => {
    const res = await api
      .delete(`${PRODUCTS_ROUTE}/${id}`)
      .set("authorization", token);
    
    expect(res.status).toEqual(204);

    const productsAtEnd = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(productsAtEnd.body).toHaveLength(initialProducts.length -1);
  });

  test("DELETE, should fail with statuscode 404 if product doesn't exist", async () => {
    const badId = "1";
    
    const res = await api
      .delete(`${PRODUCTS_ROUTE}/${badId}`)
      .set("authorization", token);

    expect(res.status).toEqual(404);
    expect(res.text).toBe('"Product not found"');

    const productsAtEnd = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(productsAtEnd.body).toHaveLength(initialProducts.length);
  });

  test("DELETE, should fail with statuscode 500 if the parameter type is wrong", async () => {
    const badId = true;
    const res = await api
      .delete(`${PRODUCTS_ROUTE}/${badId}`)
      .set("authorization", token);
    expect(res.status).toEqual(500);
    expect(res.text).toBe('"Couldn\'t delete product"');

    const productsAtEnd = await api.get(`${PRODUCTS_ROUTE}/`);

    expect(productsAtEnd.body).toHaveLength(initialProducts.length);
  });
});

afterAll(() => {
  pool.end();
  server.close();
});
