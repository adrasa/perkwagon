const {Products} = require('../../models/index');
const allProductsOfSpecifiedSeller = async (req, res) => {
    try {
        const seller_id = req.params.seller_id;
        const products = await Products.findAll({ where: { seller_id } });
        if (!products) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = allProductsOfSpecifiedSeller;