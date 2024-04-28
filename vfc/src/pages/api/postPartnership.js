const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function getPartnership(req, res) {
  try { 
    const query = await pool.query(`INSERT INTO communityPartnerships (name, location, citystate, gifttype, date, email, poc, phone, link) 
                                    Values($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [
        request.body.name,
        request.body.location,
        request.body.citystate,
        request.body.gifttype,
        request.body.date,
        request.body.email,
        request.body.poc,
        request.body.phone,
        request.body.link
    ]
    );
    res.send(query.rows);
  } catch(error) {
    console.error("error excuting query", error);
  }
}  
