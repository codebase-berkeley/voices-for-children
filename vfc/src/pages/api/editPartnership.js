
const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function editPartnership(req, res) {
  if (req.method === "PUT") {
    try {
      const {
        id,
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
      const query = await pool.query(
        `UPDATE communityPartnerships 
                 SET name = $1, location = $2, citystate = $3, gifttype = $4, date = $5, 
                     email = $6, poc = $7, phone = $8, link = $9, image = $10 
                 WHERE id = $11;`,
        [
          name,
          location,
          citystate,
          gifttype,
          date,
          email,
          poc,
          phone,
          link,
          imageData,
          id,
        ]
      );
      res.send(query.rows);
    } catch (error) {
      console.error("error executing query", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).end();
  }
}
