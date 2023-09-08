const { Products ,Sellers, ProductSpecifications} = require('../../models/index');
const editProduct = async (req, res) => {
    try {
        const  product_id  = req.params.product_id;
        const seller_id=req.body.seller_id;
        const specifications = req.body.specifications;
        const seller=await Sellers.findOne({where:{seller_id}});
        if(!seller) return res.status(400).json({msg:"No seller found"});
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ msg: 'No product found' });
        const updatedProduct = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
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
            seller_id: seller_id,
            is_featured:req.body.is_featured,
        };

        await Products.update(updatedProduct, { where: { product_id } });

        specifications.forEach(async (specification) => {
            await ProductSpecifications.update({
                size: specification.size,
                stock: specification.stock,
                price: req.body.price,
                discount_for_user: req.body.discount_for_user,
                price_for_user: Math.round(req.body.price * (1 - req.body.discount_for_user / 100)),
                discount_for_member: req.body.discount_for_member,
                price_for_member: Math.round(req.body.price * (1 - req.body.discount_for_member / 100)),
                weight: specification.weight,
                height: specification.height,
                width: specification.width,
                breadth: specification.breadth,
                depth: specification.depth,
            }, { where: { specification_id:specification.specification_id } });
        });
        return res.status(200).json({ msg: 'Product updated successfully' });

    } catch (err) {

        return res.status(500).json({ msg: 'Internal Server Error' });

    }
}
module.exports = editProduct;