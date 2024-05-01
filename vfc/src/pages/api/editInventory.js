const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function editInventory(req, res) {
  try {
    const body = JSON.parse(req.body); 

    const query = await pool.query(
      `UPDATE your_table_name
       SET donor = $1, 
           name = $2, 
           type = $3, 
           amt = $4, 
           date = $5, 
           desc = $6, 
           instock = $7
       WHERE id = $8`, // Assuming there's an 'id' column for identifying the record
      [
        body.donor,
        body.name,
        body.type,
        body.amt,
        body.date,
        body.desc,
        body.instock,
        body.id // Assuming 'id' is provided in the request body
      ]
    );

    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
