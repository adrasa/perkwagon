const { Categories } = require('../../models/index');
const uploadImage=require('../../reusable_module/uploadFile');
const addCategory = async (req, res) => {
    try {
        let category = await Categories.findOne({ where: { category_name: req.body.category_name } });
        if (!category) {
            const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
            const newCategory = {
                category_name: req.body.category_name,
                category_image: imageUrl,
            }
            category = await Categories.create(newCategory);
            return res.status(200).json({ msg: 'Category added successfully' });
        }else{
            return res.status(400).json({ msg: 'Category already exists' });
        }
        
    } catch (err) {
        return res.status(500).json({ msg: err.message});
    }
};

module.exports = addCategory;