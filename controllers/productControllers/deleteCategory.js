const { Categories } = require('../../models/index');
const {removeFile}=require('../../reusable_module/removeFile');
const deleteCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const category = await Categories.findOne({ where: { category_id } });
        if (!category) return res.status(400).json({ msg: "No category found" });
        removeFile(category.category_image);
        await Categories.destroy({ where: { category_id } });
        return res.status(200).json({ msg: 'Category deleted successfully' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = deleteCategory;