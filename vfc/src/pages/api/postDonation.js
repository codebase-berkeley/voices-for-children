const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function postDonation(req, res) {
  try { 
    const body = req.body;
    const query = await pool.query(`INSERT INTO inkindDonations (donor, item_donated, item_type, amount, date, thanked, stock) 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [
        body.donor,
        body.name,
        body.type,
        body.amt,
        body.date,
        body.desc,
        body.instock,
    ]
    );

    res.status(200).json({ success: true, message: 'Donation added successfully.' });
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ success: false, message: 'Error adding donation.', error: error.message });
  }
}

