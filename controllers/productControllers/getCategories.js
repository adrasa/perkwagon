const {Categories, SubCategories}=require('../../models/index');
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: {
                model: SubCategories,
                attributes: ['subcategory_id', 'subcategory_name'],
            },
            attributes: ['category_id', 'category_name'],
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = getCategories;