import { expect, describe, test, beforeAll, afterAll } from '@jest/globals';
import { connect, pool } from "../../src/utils/database";

beforeAll(async () => {
  await connect();
})

describe("Database connection", () => {
  test("should successfully establish a connection", async () => {
    const connection = await pool.getConnection();
    expect(connection).toBeDefined();
  });
});

afterAll(async () => {
  await pool.end();
});
