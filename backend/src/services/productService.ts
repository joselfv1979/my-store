import { RowDataPacket } from "mysql2";
import { IProduct } from "../models/Product";
import { ProductQuery } from "../models/ProductQuery";
import { execute } from "../utils/database";
import { buildProductQuery } from "../utils/queryBuilder";

export const getAllProducts = async () => {
  const sql = "select * from products";

  return execute(sql, []);
};

export const getFilteredProducts = async (parameters: ProductQuery) => {
  const { sql, filters } = buildProductQuery(parameters);

  return execute(sql, filters);
};

export const getProduct = async (id: string) => {
  const sql = "select * from products where id = ?";

  return execute(sql, [id]);
};

export const addProduct = async (product: IProduct) => {
  const { name, category, description, price, rating, image } = product;
  console.log("product", product);

  const sql =
    "insert into products (name, description, category, price, rating, image) values (?, ?, ?, ?, ?, ?)";

  const result = await execute(sql, [
    name,
    description,
    category,
    price,
    rating,
    image,
  ]);
  return result;
};

export const updateProduct = async (id: string, product: IProduct) => {
  const { name, description, category, price, image } = product;

  const sql =
    "update products set name = ?, description = ?, category = ?, price = ?, image = ? where id = ?";

  const result = await execute(sql, [
    name,
    description,
    category,
    price,
    image,
    id,
  ]);
  return result;
};

export const deleteProduct = async (id: string) => {
  const sql = "delete from products where id = ?";

  const result = await execute(sql, [id]);
  return result;
};
