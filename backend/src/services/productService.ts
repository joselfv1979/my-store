import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IProduct } from "../models/Product";
import { ProductQuery } from "../models/ProductQuery";
import { promisePool } from "../utils/database";
import { buildProductQuery } from "../utils/queryBuilder";

export const getAllProducts = async () => {
  const sql = "select * from products";
  const [rows] = await promisePool.query<RowDataPacket[]>(sql);
  return rows;
};

export const getFilteredProducts = async (parameters: ProductQuery) => {
  try {
    const { sql, filters } = buildProductQuery(parameters);
    const [rows] = await promisePool.query<RowDataPacket[]>(sql, filters);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
  const sql = "select * from products where id = ?";
  const [rows] = await promisePool.query<RowDataPacket[]>(sql, [id]);
  return rows[0];
};

export const addProduct = async (product: IProduct) => {
  const { name, category, description, price, rating, image } = product;

  const sql =
    "insert into products (name, description, category, price, rating, image) values (?, ?, ?, ?, ?, ?)";

  const [{ affectedRows }] = await promisePool.query<ResultSetHeader>(sql, [
    name,
    description,
    category,
    price,
    rating,
    image,
  ]);
  return affectedRows;
};

export const updateProduct = async (id: string, product: IProduct) => {
  const { name, description, category, price, image } = product;

  const sql =
    "update products set name = ?, description = ?, category = ?, price = ?, image = ? where id = ?";

  const [{ affectedRows }] = await promisePool.query<ResultSetHeader>(sql, [
    name,
    description,
    category,
    price,
    image,
    id,
  ]);
  return affectedRows;
};

export const deleteProduct = async (id: string) => {
  const sql = "delete from products where id = ?";

  const [{ affectedRows }] = await promisePool.query<ResultSetHeader>(sql, [
    id,
  ]);
  return affectedRows;
};
