const { Products,Categories } = require('../../models/index');

const allProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;


        const products = await Products.findAll({
            include: [
                {
                    model: Categories,
                },
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ products });

    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = allProducts;