

const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });

export default async function deleteInventory(req, res) {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "DELETE") {
    try {
      const itemId = req.body.itemId;
      console.log("Deleting item with ID:", itemId);

      const query = await pool.query(
        `DELETE FROM inkindDonations WHERE id = $1;`,
        [itemId]
      );

      console.log("Deletion result:", query.rows);
      res.status(200).json(query.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    console.log("Invalid request method");
    res.status(405).send("Method Not Allowed");
  console.log("inside endpoint", req.body);
  
  if (req.method === "DELETE") {
    try {
      const itemId = req.body.itemId; // Correctly access itemId from req.body
      console.log("itemId", itemId);

      const query = await pool.query(
        `DELETE FROM inkindDonations
         WHERE key = $1;`, // Assuming key is the primary key column
        [itemId]
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

