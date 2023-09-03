const { Products} = require('../../models/index');
const uploadImage= require('../../reusable_module/uploadImage')
const addProduct = async (req, res) => {
    try {
        //validation
       const seller_id=req.body.seller_id;
       const seller=await Sellers.findOne({where:{seller_id}});
         if(!seller) return res.status(400).json({msg:"No seller found"});
        const specification = req.body.specification;
        const images = req.files;
        const imageUrls = [];

        for (const image of images) {
            const imageUrl = await uploadImage(image.buffer, image.originalname);
            imageUrls.push(imageUrl);
        }

        //create product
        const product = await Products.create({
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
            images: {imageUrls},
            specification: {specification},
            seller_id:req.body.seller_id,
        });

        res.status(201).json({ msg: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


module.exports = addProduct;