import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IProduct } from "../models/Product";
import { ProductQuery } from "../models/ProductQuery";
import { pool } from "../utils/database";
import { buildProductQuery } from "../utils/queryBuilder";
import { CustomError } from "../models/CustomError";

export const getAllProducts = async () => {
  const sql = "select * from products";
  const [rows] = await pool.query<RowDataPacket[]>(sql);
  const result: IProduct[] = JSON.parse(JSON.stringify(rows));

  return result;
};

export const getFilteredProducts = async (parameters: ProductQuery) => {
  try {
    const { sql, filters } = buildProductQuery(parameters);
    const [rows] = await pool.query<RowDataPacket[]>(sql, filters);
    
    const result: IProduct[] = JSON.parse(JSON.stringify(rows));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
    const sql = "select * from products where id = ?";

    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
    if(rows.length !== 1) throw new CustomError(404, 'Product not found');
    
    const product: IProduct = JSON.parse(JSON.stringify(rows[0]));
    return product;
};

export const addProduct = async (product: IProduct) => {
  const { name, category, description, price, rating, imagePath } = product;

  const sql =
    "insert into products (name, description, category, price, rating, imagePath) values (?, ?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query<ResultSetHeader>(sql, [
    name,
    description,
    category,
    price,
    rating,
    imagePath,
  ]);
  return { ...product, id: insertId };
};

export const updateProduct = async (id: string, product: IProduct) => {
  const { name, description, category, price, rating, imagePath } = product;

  const sql =
    "update products set name = ?, description = ?, category = ?, price = ?, rating = ?, imagePath = ? where id = ?";

  const [{ affectedRows }] = await pool.query<ResultSetHeader>(sql, [
    name,
    description,
    category,
    price,
    rating,
    imagePath,
    id,
  ]);

  if (affectedRows === 1) return { ...product, id };
  return null;
};

export const deleteProduct = async (id: string) => {
  const sql = "delete from products where id = ?";

  const [{ affectedRows }] = await pool.query<ResultSetHeader>(sql, [
    id,
  ]);
  return affectedRows;
};

export const deleteAllProducts = async () => {
  const sql = "delete from products";
  const [{ affectedRows }] = await pool.query<ResultSetHeader>(sql);
  return affectedRows;
};
