const { Categories } = require('../../models/index');

const addCategories = async (req, res, next) => {
    try {
       
        
       
        console.log(req.body);
        
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
        return res.status(500).json({ msg: err.message});
    }
};

module.exports = addCategories;