const { Products ,Sellers, ProductSpecifications} = require('../../models/index');
const editProduct = async (req, res) => {
    try {
        const  product_id  = req.params.product_id;
        const seller_id=req.body.seller_id;
        const specifications = JSON.parse(req.body.specifications);
        const tags = JSON.parse(req.body.tags);
        const seller=await Sellers.findOne({where:{seller_id}});
        if(!seller) return res.status(400).json({msg:"No seller found"});
        const product = await Products.findOne({ where: { product_id } });
        if (!product) return res.status(400).json({ msg: 'No product found' });
        const updatedProduct = {
            name: req.body.name,
            tags: { tags },
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
            manufacturer_name: req.body.manufacturer_name,
            manufacturer_email: req.body.manufacturer_email,
            manufacturer_contact_number: req.body.manufacturer_contact_number,
            customer_support_number: req.body.customer_support_number,
            payment_method: req.body.payment_method,
            used_material: req.body.used_material,
            seller_id: seller_id,
            is_featured:req.body.is_featured,
        };

        await Products.update(updatedProduct, { where: { product_id } });
       console.log(product_id)
        for(const specification of specifications){
            
            await ProductSpecifications.update({
                size: specification.size,
                stock: specification.stock,
                price: specification.price,
                discount_for_user: specification.discount_for_user,
                price_for_user: Math.round(specification.price * (1 - specification.discount_for_user / 100)),
                discount_for_member: specification.discount_for_member,
                price_for_member: Math.round(specification.price * (1 - specification.discount_for_member / 100)),
                weight: specification.weight,
                height: specification.height,
                width: specification.width,
                breadth: specification.breadth,
                depth: specification.depth,
            }, { where: { specification_id:specification.specification_id } });
        };
        return res.status(200).json({ msg: 'Product updated successfully' });

    } catch (err) {

        return res.status(500).json({ msg: err.message });

    }
}
module.exports = editProduct;