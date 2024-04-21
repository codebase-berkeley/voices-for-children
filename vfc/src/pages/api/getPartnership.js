export default async function getPartnership (req, res)  {
    try {
        await pool.query(
            `
            SELECT poc, 
                    email,
                    phone, 
                    dateJoined,
                    giftType,
                    companyAddress,
                    cityState,
                    loglink
            FROM communityPartnerships;
            `
        );
        res.send(query.rows);
    } catch (error) {
        res.status(500).send(error.stack)
    }
}

