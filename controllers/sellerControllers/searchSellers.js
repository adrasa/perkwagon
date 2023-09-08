const { Sellers } = require('../../models/index');
const { Op } = require('sequelize');
const allSellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const search=req.query.search;
        let sellers = await Sellers.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                [Op.or]: [
                    {
                        seller_id: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product ID
                        },
                    },
                    {
                        seller_name: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product name
                        },
                    },
                    {
                        business_name: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product name
                        },
                    },
                    {
                        business_email: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product name
                        },
                    }
                ],
            },
            collate: 'utf8mb4_general_ci',// Add the COLLATE clause for case-insensitive matching
        });
        if (!sellers || sellers.length === 0) return res.status(400).json({ msg: 'No sellers found' });
        return res.status(200).json({ sellers });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
       
    }
}
module.exports = allSellers;