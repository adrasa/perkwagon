const {Categories, SubCategories}=require('../../models/index');
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: {
                model: SubCategories,  
            },
      
        });
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = getCategories;