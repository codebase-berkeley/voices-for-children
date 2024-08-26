// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });
import json from "./communitydata.json";

export default async function getPartnership(req, res) {
  try {
    let json = JSON.parse(
      fs.readFileSync("src/pages/api/communitydata.json", "utf-8")
    );
    res.send(json);
  } catch (error) {
    console.error("error excuting query", error);
  }
}
