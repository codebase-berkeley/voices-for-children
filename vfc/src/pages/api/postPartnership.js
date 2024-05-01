const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function getPartnership(req, res) {
  if (req.method === "POST") {
    try {
      const {
        name,
        location,
        citystate,
        gifttype,
        date,
        email,
        poc,
        phone,
        link,
        image,
      } = req.body;

      const imageData = image || "";

      //name - $1 corresponding
      //query sends information using pool(connection pool) to the vfc database
      const query = await pool.query(
        `INSERT INTO communityPartnerships (name, location, citystate, gifttype, date, email, poc, phone, link, image) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
        [name, location, citystate, gifttype, date, email, poc, phone, link, imageData]
      );

      const id = query.rows[0].id;

      res.send({ id: id });
    //   res.send({id: _____});
    //   res.send([{id: 0}, {id: 1, ...}, {id: 2, ...}])
    //   res.send([_, _, _ where tf is the id?])
    //   response[0].id
    } catch (error) {
      console.error("error executing query", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
