const { Categories } = require('../../models/index');

const addCategories = async (req, res, next) => {
    try {
       
        if (!req.body.name || !req.body.code || !req.body.description || !req.body.specification || !req.body.price || !req.body.min_order || !req.body.max_order || !req.body.warranty_information || !req.body.refundable || !req.body.return_period || !req.body.return_policy || !req.body.safety_information || !req.body.manufacturer || !req.body.payment_method || !req.body.used_material || !req.body.category_name || !req.body.seller_id) {
            return res.status(400).json({ type:"incompleteField",msg: "Please enter all the fields" });
        }else{
            const specification = req.body.specification;
            specification.forEach((spec) => {

                if (!spec.size || !spec.weight || !spec.quantity || !spec.height || !spec.width || !spec.length || !spec.width || !spec.breadth) {
                    return res.status(400).json({type:"incompleteField", msg: "Please enter all the fields" });
                }
            });

        }
        
        if (!req.files) {
            return res.status(400).json({type:"image", msg: "Please upload an image" });
        }
        
        
        let category = await Categories.findOne({ where: { category_name: req.body.category_name } });
        if (!category) {
            const newCategory = {
                category_name: req.body.category_name,
            }
            category = await Categories.create(newCategory);
        }

        req.category = category;
        next();
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server error' });
    }
};

module.exports = addCategories;