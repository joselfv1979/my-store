import { describe, test, afterAll } from "@jest/globals";
import supertest from "supertest";
import { server, app } from "../src/server";
import { pool } from "../src/utils/database";

const api = supertest(app);
const FAKE_ROUTE = "/fakeRoute";

describe("Server routes", () => {
  test("GET, should return error 404 if the route doesn't exist", async () => {
    await api
      .get(`${FAKE_ROUTE}/`)
      .expect(404)
      .expect((res) => {
        res.text = "Path not found";
      })
  });
});

afterAll(() => {
  pool.end();
  server.close();
});

