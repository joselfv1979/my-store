import { ProductQuery } from "../models/ProductQuery";

// Builds filtered queries
export const buildProductQuery = (parameters: ProductQuery) => {
  const { name, category, price, rating } = parameters;
  let sql = "select * from products";
  let count = 0;
  let filters: string[] = [];

  console.log('category', category);
  
  if (name) {
    sql += " where name = ?";
    filters.push(name);
    count++;
  }

  if (category) {
    if (count === 0) sql += " where category = ?";
    else sql += " and category = ?";
    filters.push(category);
    count++;
  }

  if (price) {
    if (count === 0) sql += " where price <= ?";
    else sql += " and price <= ?";
    filters.push(price);
    count++;
  }

  if (rating) {
    if (count === 0) sql += " where rating >= ?";
    else sql += " and rating >= ?";
    filters.push(rating);
    count++;
  }
  
  return { sql, filters };
};
