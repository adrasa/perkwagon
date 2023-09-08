const { Products } = require('../../models/index');
const removeImage = require('../../reusable_module/removeFile');
const deleteImages = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const imageUrl = req.body.imageUrl;
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ type: 'noProduct', msg: 'No product found' });
        if (!imageUrl) return res.status(400).json({ type: 'noImage', msg: 'No image' });
        await removeImage(imageUrl);
        const imageUrls = product.images.imageUrls.filter((image) => image !== imageUrl);
        await Products.update({ images: { imageUrls } }, { where: { product_id } });
        return res.status(200).json({ msg: 'Images deleted successfully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = deleteImages;