const { Products, Categories, SubCategories, ProductSpecifications } = require('../../models/index');
const { Op } = require('sequelize');
const searchProducts= async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const seller_id = req.params.seller_id;
        const products = await Products.findAll({
            include: [
                {
                    model: SubCategories,
                    include: {
                        model: Categories,
                    }
                },
                {
                    model: ProductSpecifications,
                }
            ],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                [Op.or]: [
                    {
                        product_id: {
                            [Op.iLike]: `${req.query.product_id}%`, // Case-insensitive, initial match for product ID
                        },
                    },
                    {
                        name: {
                            [Op.iLike]: `${req.query.name}%`, // Case-insensitive, initial match for product name
                        },
                    },
                ],

            }
        });
        if (!products) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = searchProducts;   