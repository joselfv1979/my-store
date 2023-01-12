import { createPool, FieldPacket, OkPacket, Pool, ResultSetHeader, RowDataPacket} from 'mysql2';

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {    
    pool = createPool({
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};

/** 
* executes SQL queries in MySQL db 
* 
* @param {string} query - provide a valid SQL query
* @param {string[] | Object} params - provide the parameterized values used
* in the query 
*/
export const execute = async(query: string, params: string[] | Object) => {
 try {
   if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

   const promisePool = pool.promise();
   const rows = await promisePool.query(query, params);
   return rows[0];

  //  return new Promise<T>((resolve, reject) => {
  //    pool.query(query, params, (error, results) => {
  //      if (error) reject(error);
  //      else resolve(results);
  //    });
  //  });

 } catch (error) {
   console.error('[mysql.connector][execute][Error]: ', error);
   throw new Error('failed to execute MySQL query');
 }
}
