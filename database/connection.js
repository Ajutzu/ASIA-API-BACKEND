import mysql from "mysql2/promise"; 
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ROOT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    await db.getConnection(); 
    console.log(colors.green("Connected to the database"));
  } catch (err) {
    console.error(colors.red("Error connecting to the database"), err.message);
  }
})();

export default db;