const { Categories } = require('../../models/index');

const addCategories = async (req, res, next) => {
    try {
       
        
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