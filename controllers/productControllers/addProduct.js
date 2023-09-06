const { Products, Sellers, ProductSpecifications } = require('../../models/index');
const uploadImage= require('../../reusable_module/uploadImage')
const addProduct = async (req, res) => {
    try {
        //validation
       const seller_id=req.body.seller_id;
       const seller=await Sellers.findOne({where:{seller_id}});
         if(!seller) return res.status(400).json({msg:"No seller found"});
        const specifications = req.body.specifications;
        const images = req.files;
        const imageUrls = [];
        const tags = req.body.tags;
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
            specification: req.body.specification,
            price: req.body.price,
            discount_for_user: req.body.discount_for_user,
            price_for_user: Math.round(req.body.price* (1 - req.body.discount_for_user/100)),
            discount_for_member: req.body.discount_for_member,
            price_for_member: Math.round(req.body.price* (1 - req.body.discount_for_member/100)),
            min_order: req.body.min_order,
            max_order: req.body.max_order,
            subcategory_id: req.subcategory.subcategory_id,//foreign key
            warranty_information: req.body.warranty_information,
            refundable: req.body.refundable,
            return_period: req.body.return_period,
            return_policy: req.body.return_policy,
            safety_information: req.body.safety_information,
            manufacturer: req.body.manufacturer,
            payment_method: req.body.payment_method,
            used_material: req.body.used_material,
            images: {imageUrls},
            seller_id:req.body.seller_id,
            is_featured: req.body.is_featured,
        });

        //create product specifications
        specifications.forEach(async (specification) => {
            await ProductSpecifications.create({
                product_id: product.product_id,
                size: specification.size,
                stock: specification.stock,
                weight: specification.weight,
                height: specification.height,
                width: specification.width,
                breadth: specification.breadth,
                depth: specification.depth,
                
            });
        });

        return res.status(201).json({ msg: "Product added successfully" })
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};


module.exports = addProduct;