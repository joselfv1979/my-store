import { pool } from "../../src/utils/database";

describe("Database connection", () => {
  test("should successfully establish a connection", async () => {
    const connection = await pool.getConnection();
    expect(connection).toBeDefined();
  });
});

afterAll(async () => {
  await pool.end();
});
