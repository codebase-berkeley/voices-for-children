const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function deletePartnership(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const query = await pool.query(
        `DELETE FROM communityPartnerships
                WHERE id = $1;`,
        [id]
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
