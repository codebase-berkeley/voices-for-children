import nextConnect from "next-connect";
import multer from "multer";
import { Pool } from "pg";

const pool = new Pool({ database: "vfc" });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handler = nextConnect();

handler.use(upload.single("image"));

handler.put(async (req, res) => {
  const { id, companyName, location, cityState, giftType, date, email, poc, phone, link } = req.body;
  const file = req.file; // The image file

  try {
    let base64Image = null;

    if (file) {
      base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    } else {
      // Retrieve the existing image from the database if no new image is uploaded
      const result = await pool.query(
        'SELECT image FROM communityPartnerships WHERE id = $1',
        [id]
      );
      if (result.rows.length > 0) {
        base64Image = result.rows[0].image;
      }
    }

    const query = await pool.query(
      `UPDATE communityPartnerships 
       SET name = $1, location = $2, citystate = $3, gifttype = $4, date = $5, 
           email = $6, poc = $7, phone = $8, link = $9, image = $10 
       WHERE id = $11;`,
      [companyName, location, cityState, giftType, date, email, poc, phone, link, base64Image, id]
    );

    if (query.rowCount === 0) {
      res.status(404).send("Partnership not found");
    } else {
      res.status(200).json({ id: id, image: base64Image });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing; multer will handle it
  },
};

export default handler;
