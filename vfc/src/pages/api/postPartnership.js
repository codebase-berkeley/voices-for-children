import nextConnect from "next-connect";
import multer from "multer";
import { Pool } from "pg";

const pool = new Pool({ database: "vfc" });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handler = nextConnect();

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  const { companyName, location, cityState, giftType, date, email, poc, phone, link } = req.body;
  const file = req.file; // The image file

  try {
    const base64Image = file ? `data:image/${file.mimetype.split('/')[1]};base64,${file.buffer.toString('base64')}` : null;

    const query = await pool.query(
      `INSERT INTO communityPartnerships (name, location, citystate, gifttype, date, email, poc, phone, link, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
      [companyName, location, cityState, giftType, date, email, poc, phone, link, file ? file.buffer : null]
    );

    const id = query.rows[0].id;
    res.status(201).json({ id: id, image: base64Image });
  } catch (error) {
    console.error("error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});


export const config = {
  api: {
    bodyParser: false, // Disable body parsing; multer will handle it
  },
};

export default handler;
