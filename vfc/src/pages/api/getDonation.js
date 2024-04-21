const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function getDonation(req, res) {
  try { 
    const query = await pool.query("select * from inkindDonations;");
    res.send(query.rows);
  } catch(error) {
    console.error("error excuting query", error);
  }
}

