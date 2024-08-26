const { Pool } = require("pg");
const pool = new Pool({ database: "vfc" });
import fs from "fs";

export default async function getInventory(req, res) {
  try {
    // const query = await pool.query(
    //   // "select * from inkindDonations;"
    //   "SELECT item_donated, item_type, SUM(amount) AS total_amount FROM inkindDonations GROUP BY item_donated, item_type;"

    // );
    // res.send(query.rows);

    let jsonData = JSON.parse(
      fs.readFileSync("src/pages/api/data.json", "utf-8")
    );
    const groupedData = jsonData.reduce((acc, item) => {
      const amount = parseInt(item.amount, 10);
      const key = `${item.item_donated}-${item.item_type}`;
      if (!acc[key]) {
        acc[key] = {
          item_donated: item.item_donated,
          item_type: item.item_type,
          total_amount: 0,
        };
      }
      acc[key].total_amount += amount;
      return acc;
    }, {});
    const result = Object.values(groupedData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting inventory",
      error: error.message,
    });
  }
}
