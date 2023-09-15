const { Products, Sellers, ProductSpecifications } = require('../../models/index');
const uploadImage = require('../../reusable_module/uploadFile')
const addProduct = async (req, res) => {
    try {
        //validation
        const seller_id = req.body.seller_id;
        const seller = await Sellers.findOne({ where: { seller_id } });
        if (!seller) return res.status(400).json({ msg: "No seller found" });
        //JSON.stringify(jsonArray) in the client side
        const specifications = JSON.parse(req.body.specifications);
        const images = req.files;
        const imageUrls = [];
        const tags = JSON.parse(req.body.tags);
        for (const image of images) {
            const imageUrl = await uploadImage(image.buffer, image.originalname);
            imageUrls.push(imageUrl);
        }
    
        //create product
        const product = await Products.create({
            name: req.body.name,
            tags: {tags},
            code: req.body.code,
            description: req.body.description,
            min_order: req.body.min_order,
            max_order: req.body.max_order,
            subcategory_id: req.body.subcategory_id,//foreign key
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
            images: { imageUrls },
            seller_id: req.body.seller_id,
            is_featured: req.body.is_featured,
        });
     
        //create product specifications
        for (const specification of specifications) {
            console.log(specification.price)
            await ProductSpecifications.create({
                product_id: product.product_id,
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

            });
        };

        return res.status(201).json({ msg: "Product added successfully" })
    } catch (err) {
        return res.status(500).json({ err:err.message});
    }
};


module.exports = addProduct;