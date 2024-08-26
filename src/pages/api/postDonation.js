// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });
import fs from "fs";
import json from "./data.json";
import path from "path";
const dataFilePath = path.join(process.cwd(), "data.json");

export default async function postDonation(req, res) {
  try {
    const body = req.body;
    // const query = await pool.query(`INSERT INTO inkindDonations (donor, item_donated, item_type, amount, date, thanked, stock)
    // VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    // [
    //     body.donor,
    //     body.name,
    //     body.type,
    //     body.amt,
    //     body.date,
    //     body.desc,
    //     body.stock,
    // ]
    // );
    const newEntry = {
      key: Date.now(),
      donor: body.donor,
      item_donated: body.name,
      item_type: body.type,
      amount: body.amt,
      date: body.date,
      thanked: body.desc,
      stock: body.stock,
    };
    // fs.readFileSync(dataFilePath, "utf-8", (err, data) => {
    //   if (err) {
    //     console.error("Error reading file", err);
    //     return res.status(500).json({ error: "Error reading data from file" });
    //   }
    //   // var jsonData = JSON.parse(data);
    //   // jsonData.push(newEntry);
    //   // fs.writeFileSync(
    //   //   dataFilePath,
    //   //   JSON.stringify(jsonData, null, 2),
    //   //   "utf-8"
    //   // );
    // });

    let jsonData = JSON.parse(
      fs.readFileSync("src/pages/api/data.json", "utf-8")
    );

    // Add the new entry to the data
    jsonData.push(newEntry);

    // // Write the updated data back to the file synchronously
    fs.writeFileSync(
      "src/pages/api/data.json",
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );

    // var jsonData = JSON.parse(data);

    // jsonData.push(newEntry);

    // fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    res.status(200).json({
      success: true,
      message: "Donation added successfully.",
    });
  } catch (error) {
    console.error("Error processing request", error);
    res.status(500).json({
      success: false,
      message: "Error adding donation.",
      error: error.message,
    });
  }
}
