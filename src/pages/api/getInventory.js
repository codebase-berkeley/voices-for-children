const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function getInventory(req, res) {
  try { 
    const query = await pool.query(
      // "select * from inkindDonations;"
      "SELECT item_donated, item_type, SUM(amount) AS total_amount FROM inkindDonations GROUP BY item_donated, item_type;"
      
    );
    res.send(query.rows);
  } catch(error) {
    console.error("error excuting query", error);
  }
}
