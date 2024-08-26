// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });
import json from "./communitydata.json";

export default async function getPartnership(req, res) {
  try {
    res.send(json);
  } catch (error) {
    console.error("error excuting query", error);
  }
}
