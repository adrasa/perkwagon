const { Products } = require('../../models/index');
const removeImage = require('../../reusable_module/removeFile');
const deleteProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ msg: 'No product found' });
        const imageUrls = product.images.imageUrls;
        imageUrls.forEach(imageUrl => {
            removeImage(imageUrl);
        });
        await Products.destroy({ where: { product_id } });

        return res.status(200).json({ msg: 'Product deleted successfully' });

    } catch (err) {
        return res.status(500).json({ msg: err.message});
    }
}
module.exports = deleteProduct;