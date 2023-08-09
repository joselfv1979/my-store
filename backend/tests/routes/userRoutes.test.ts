import { describe, test, expect, afterAll, beforeEach } from "@jest/globals";
import supertest from "supertest";
import { app, server } from "../../src/server";
import { pool } from "../../src/utils/database";
import { USERS_ROUTE, getToken, getUserId, initialUsers, newUser, user1 } from "../helpers";
import { addUser } from "../../src/services/userService";
import { RowDataPacket } from "mysql2/promise";

const api = supertest(app);

let token = "";
let id = "";
// sql to delete all users but admin (id = 1)
const DELETE_USERS_SQL = "delete from users where id != 1";

beforeEach(async () => {
  await pool.query<RowDataPacket[]>(DELETE_USERS_SQL); 
  await addUser(user1);
  token = await getToken();
  id = await getUserId();  
});

describe("GET ALL, fetching all users", () => {
  test("should return users as json", async () => {        
    await api
      .get(`${USERS_ROUTE}/`)
      .set("authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return status 200 and all users", async () => {
    const res = await api.get(`${USERS_ROUTE}/`)
    .set("authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(initialUsers.length);
  });
});

describe("GET, checking a specific user", () => {
  test("should return one user", async () => {
    const res = await api.get(`${USERS_ROUTE}/${id}`)
    .set("authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username");
    expect(res.body.username).toBe("mary");
  });

  test("should fail with statuscode 404 if user doesn't exist", async () => {
    const fakeId = "0";
    const res = await api.get(`${USERS_ROUTE}/${fakeId}`)
    .set("authorization", token);

    expect(res.status).toBe(404);
    expect(res.text).toBe('"User not found"');
  });
});

describe("POST, creating a new user", () => {
  test("should create a new user", async () => {
    const res = await api
      .post(`${USERS_ROUTE}/sign-up`)
      .send(newUser);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("username");
    expect(res.body.username).toBe("juan");

    const usersAtEnd = await api.get(`${USERS_ROUTE}/`).set("authorization", token);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length + 1)
  });

  test("POST, should fail with statuscode 400 if password is not added", async () => {
    const res = await api
      .post(`${USERS_ROUTE}/sign-up`)
      .send({ fullname: "Tim Robbins", username: "tim" });
    
    expect(res.status).toEqual(400);
    expect(res.text).toBe('"Bad request"');

    const usersAtEnd = await api.get(`${USERS_ROUTE}/`).set("authorization", token);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
  });
});

describe("PUT, updating a user", () => {
  test("PUT, should update one user", async () => {
    const res = await api
      .put(`${USERS_ROUTE}/user-edit/${id}`)
      .set("authorization", token)
      .send({ ...newUser, email: "maryNewMail@gmail.com" });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("email");
    expect(res.body.email).toBe("maryNewMail@gmail.com");
  });

  test("PUT, should fail with statuscode 404 if user doesn't exist", async () => {
    const fakeId = "0";
    const res = await api
      .put(`${USERS_ROUTE}/user-edit/${fakeId}`)
      .set("authorization", token)
      .send({ ...newUser, username: "juan2" });

    expect(res.status).toBe(404);
    expect(res.text).toBe('"User not found"');
  });

  test("PUT, should fail with statuscode 400 if a required property is not added", async () => {
    const res = await api
      .put(`${USERS_ROUTE}/user-edit/${id}`)
      .set("authorization", token)
      .send({ fullname: "Mary Silva", username: "newUsername" });
    expect(res.status).toEqual(400);
    expect(res.text).toBe('"Bad request"');

    const user = await api.get(`${USERS_ROUTE}/${id}`).set("authorization", token);
    expect(user.body.username).toBe(initialUsers[0].username);
  });
});

describe("DELETE, deleting a user", () => {
  test("DELETE, should delete one user", async () => {
    const res = await api
      .delete(`${USERS_ROUTE}/${id}`)
      .set("authorization", token);
    
    expect(res.status).toEqual(204);

    const usersAtEnd = await api.get(`${USERS_ROUTE}/`).set("authorization", token);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length -1);
  });

  test("DELETE, should fail with statuscode 404 if user doesn't exist", async () => {
    const badId = "0";
    
    const res = await api
      .delete(`${USERS_ROUTE}/${badId}`)
      .set("authorization", token);

    expect(res.status).toEqual(404);
    expect(res.text).toBe('"User not found"');

    const usersAtEnd = await api.get(`${USERS_ROUTE}/`).set("authorization", token);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
  });

  test("DELETE, should fail with statuscode 500 if the parameter type is wrong", async () => {
    const badId = true;
    const res = await api
      .delete(`${USERS_ROUTE}/${badId}`)
      .set("authorization", token);
    expect(res.status).toEqual(500);
    expect(res.text).toBe('"Couldn\'t delete user"');

    const usersAtEnd = await api.get(`${USERS_ROUTE}/`).set("authorization", token);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
  });
});

afterAll(() => {
  pool.end();
  server.close();
});
