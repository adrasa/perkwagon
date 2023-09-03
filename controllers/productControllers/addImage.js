const {Products} = require('../../models/index');

const uploadImage = require('../../reusable_module/uploadImage');

const addImage = async (req, res) => {
    try {
        const product_id  = req.params.product_id;
        const images = req.files;
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ msg: 'No product found' });

        const imageUrls = product.images.imageUrls;
        for (const image of images) {
            const imageUrl = await uploadImage(image.buffer, image.originalname);
            imageUrls.push(imageUrl);
        }

        await Products.update({ images: { imageUrls } }, { where: { product_id } });

        return res.status(200).json({ msg: 'Images added successfully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = addImage;