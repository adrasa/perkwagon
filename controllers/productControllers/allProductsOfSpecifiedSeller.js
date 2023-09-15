const {Products, Categories, SubCategories, ProductSpecifications} = require('../../models/index');
const allProductsOfSpecifiedSeller = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const seller_id = req.params.seller_id;
        const productCount= await Products.count({where: {seller_id}});
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
            where: { seller_id } });
        if (!products || products.length === 0) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ data:{products , productCount }});
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = allProductsOfSpecifiedSeller;