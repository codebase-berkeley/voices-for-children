// import nextConnect from "next-connect";
// import multer from "multer";
// import { Pool } from "pg";

// const pool = new Pool({ database: "vfc" });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const handler = nextConnect();

// handler.use(upload.single("image"));

// handler.post(async (req, res) => {
//   const { companyName, location, cityState, giftType, date, email, poc, phone, link } = req.body;
//   const file = req.file; // The image file

//   try {
//     const base64Image = file ? `data:image/${file.mimetype.split('/')[1]};base64,${file.buffer.toString('base64')}` : null;

//     const query = await pool.query(
//       `INSERT INTO communityPartnerships (name, location, citystate, gifttype, date, email, poc, phone, link, image)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
//       [companyName, location, cityState, giftType, date, email, poc, phone, link, file ? file.buffer : null]
//     );

//     const id = query.rows[0].id;
//     res.status(201).json({ id: id, image: base64Image });
//   } catch (error) {
//     console.error("error executing query", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing; multer will handle it
//   },
// };

// export default handler;

// const { Pool } = require("pg");
// const pool = new Pool({ database: "vfc" });
import fs from "fs";

export default async function postPartnership(req, res) {
  try {
    var body = req.body;
    const newEntry = {
      key: Date.now(),
      name: body.companyName,
      location: body.location,
      citystate: body.cityState,
      gifttype: body.giftType,
      date: body.date,
      email: body.email,
      poc: body.poc,
      phone: body.phone,
      link: body.link,
      image: "",
    };

    let jsonData = JSON.parse(
      fs.readFileSync("src/pages/api/communitydata.json", "utf-8")
    );

    // Add the new entry to the data
    jsonData.push(newEntry);

    // // Write the updated data back to the file synchronously
    fs.writeFileSync(
      "src/pages/api/communitydata.json",
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );

    res.status(200).json({
      success: true,
      message: "partnership added successfully.",
      json: jsonData,
    });
  } catch (error) {
    console.error("Error processing request", error);
    res.status(500).json({
      success: false,
      message: "Error adding partnership.",
      error: error.message,
    });
  }
}
