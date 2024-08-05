const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function getPartnership(req, res) {
  try {
    const query = await pool.query("SELECT * FROM communityPartnerships;");
    const partnerships = query.rows.map(partnership => {
      return {
        ...partnership,
        image: partnership.image ? `data:image/jpeg;base64,${Buffer.from(partnership.image).toString('base64')}` : null,
      };
    });
    res.send(partnerships);
  } catch (error) {
    console.error("error executing query", error);
    res.status(500).send("Error fetching data");
  }
}
