const { SubCategories } = require('../../models/index');

const addSubCategories = async (req, res, next) => {
    try {

        let subcategory = await SubCategories.findOne({ where: { 
                subcategory_name: req.body.subcategory_name ,
                category_id:req.category.category_id
            } });
        if (!subcategory) {
            const newSubCategory = {
                subcategory_name: req.body.subcategory_name,
                category_id:req.category.category_id
            }
            subcategory = await SubCategories.create(newSubCategory);
        }

        req.subcategory = subcategory;
        next();
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server error' });
    }
};

module.exports = addSubCategories;