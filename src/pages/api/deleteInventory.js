const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });
import fs from "fs";

export default async function deleteInventory(req, res) {
  if (req.method === "DELETE") {
    try {
      const itemId = req.body.itemId; // Correctly access itemId from req.body
      console.log("itemId", itemId);

      // const query = await pool.query(
      //   `DELETE FROM inkindDonations
      //    WHERE key = $1;`, // Assuming key is the primary key column
      //   [itemId]
      // );

      let jsonData = JSON.parse(
        fs.readFileSync("src/pages/api/data.json", "utf-8")
      );
      jsonData = jsonData.filter((item) => item.key !== itemId);
      fs.writeFileSync(
        "src/pages/api/data.json",
        JSON.stringify(jsonData, null, 2),
        "utf-8"
      );

      res.status(200).json({
        success: true,
        message: "Donation deleted successfully.",
      });
    } catch (error) {
      console.error("error executing query", error);
      res.status(500).json({
        success: false,
        message: "Error deleting donation.",
        error: error.message,
      });
    }
  }
}

// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });

// export default async function deleteInventory(req, res) {
//   console.log("inside endpoint", req.body);
//   if (req.body === "DELETE") {
//     console.log("HELLO ???")
//   }
//   // if (req.method === "DELETE") {
//   //   try {
//   //     const body = req.body;
//   //     console.log("body id", id);

//   //     const query = await pool.query(
//   //       `DELETE FROM inkindDonations
//   //               WHERE id = $1;`,
//   //       [body.itemId]
//   //     );

//   //     res.send(query.rows);
//   //   } catch (error) {
//   //     console.error("error executing query", error);
//   //     res.status(500).send("Internal Server Error");
//   //   }
//   // } else {
//   //   res.status(405).end();
//   // }
// }
