const { Pool } = require('pg');
const pool = new Pool({ database: 'vfc' });

export default async function getDonation (req, res)  {
    try {
        await pool.query(
            "select score from players;"
            // `
            // SELECT donor, 
            //         itemsDonated,ß
            //         itemType,
            //         amount,
            //         dateDonated,
            //         thanked
            // FROM inkindDonations;
            // `
        );
        res.send(query.rows);
    } catch (error) {
        res.status(500).send(error.stack)
    }
}