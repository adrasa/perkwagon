const { SubCategories } = require('../../models/index');
const uploadImage=require('../../reusable_module/uploadFile');
const addSubCategory = async (req, res) => {
    try {

        let subcategory = await SubCategories.findOne({ where: { 
                category_id: req.body.category_id,
                subcategory_name: req.body.subcategory_name ,
                
            } });
        if (!subcategory) {
            const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
            const newSubCategory = {
                subcategory_name: req.body.subcategory_name,
                category_id:req.body.category_id,
                subcategory_image:imageUrl
            }
            subcategory = await SubCategories.create(newSubCategory);
            return res.status(200).json({ msg: 'SubCategory added successfully' });
        }else{
            return res.status(400).json({ msg: 'SubCategory already exists' });
        }
   
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = addSubCategory;