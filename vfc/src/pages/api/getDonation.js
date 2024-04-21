export default async function getDonation (req, res)  {
    try {
        await pool.query(
            `
            SELECT donor, 
                    itemsDonated
                    itemType
                    amount
                    dateDonated
                    thanked
            FROM inkindDonations;
            poc VARCHAR(100),
            `
        );
        res.send(query.rows);
    } catch (error) {
        res.status(500).send(error.stack)
    }
}

