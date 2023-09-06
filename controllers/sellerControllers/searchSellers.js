const { Sellers } = require('../../models/index');

const allSellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        let sellers = await Sellers.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where:{
                [Op.or]: [
                    {
                        seller_id: {
                            [Op.iLike]: `${req.query.seller_id}%`, // Case-insensitive, initial match for product ID
                        },
                    },
                    {
                        seller_name: {
                            [Op.iLike]: `${req.query.seller_name}%`, // Case-insensitive, initial match for product name
                        },
                    },
                    {
                        business_name: {
                            [Op.iLike]: `${req.query.business_name}%`, // Case-insensitive, initial match for product name
                        },
                    },
                    {
                        business_email: {
                            [Op.iLike]: `${req.query.business_email}%`, // Case-insensitive, initial match for product name
                        },
                    }
                ],      
            },
        });
        if(!sellers) return res.status(400).json({ msg: 'No sellers found' });
        res.status(200).json({ sellers });
    } catch (err) {
        // res.status(500).json({ msg: 'Internal Server Error' });
        return res.status(500).json(err.message);
    }
}
module.exports = allSellers;