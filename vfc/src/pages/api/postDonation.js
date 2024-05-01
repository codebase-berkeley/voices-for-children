const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function postDonation(req, res) {
  try { 
    const body = JSON.parse(req.body);
    const query = await pool.query(`INSERT INTO inKindDonations (donor, itemsDonated, itemType, amount, dateDonated, thanked, instock) 
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

  } catch(error) {
    console.error("error excuting query", error);
  }
}