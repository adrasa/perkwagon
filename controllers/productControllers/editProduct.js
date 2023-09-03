const { Products ,Sellers} = require('../../models/index');
const editProduct = async (req, res) => {
    try {
        const  product_id  = req.params.product_id;
        const seller_id=req.body.seller_id;
        const seller=await Sellers.findOne({where:{seller_id}});
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ msg: 'No product found' });
        const updatedProduct = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            specification: req.body.specification,
            price: req.body.price,
            min_order: req.body.min_order,
            max_order: req.body.max_order,
            category_id: req.category.category_id,//foreign key
            warranty_information: req.body.warranty_information,
            refundable: req.body.refundable,
            return_period: req.body.return_period,
            return_policy: req.body.return_policy,
            safety_information: req.body.safety_information,
            manufacturer: req.body.manufacturer,
            payment_method: req.body.payment_method,
            used_material: req.body.used_material,
            specification: { specification },
            seller_id: req.body.seller_id,
        };
        await Products.update(updatedProduct, { where: { product_id } });

        return res.status(200).json({ msg: 'Product updated successfully' });

    } catch (err) {

        return res.status(500).json({ msg: 'Internal Server Error' });

    }
}
module.exports = editProduct;