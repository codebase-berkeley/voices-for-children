// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });
import json from "./data.json";
import path from "path";
import fs from "fs";

export default async function getDonation(req, res) {
  console.log("IN GET DONATION");
  try {
    // const query = await pool.query("select * from inkindDonations;");
    // const data = JSON.parse(json);
    // fs.readFile(dataFilePath, "utf-8", (err, data) => {
    //   if (err) {
    //     console.error("Error reading file", err);
    //     return res.status(500).json({ error: "Error reading data from file" });
    //   }
    //   const jsonData = JSON.parse(data);
    //   res.status(200).json(jsonData);
    // });
    let json = JSON.parse(fs.readFileSync("src/pages/api/data.json", "utf-8"));
    res.send(json);
    // res.send(query.rows);
  } catch (error) {
    console.error("error excuting query", error);
  }
}
