const {SubCategories} = require('../../models/index');
const removeImage = require('../../reusable_module/removeImage');
const uploadImage = require('../../reusable_module/uploadImage');
const editSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategories.findOne({ where: { sub_category_id: req.params.sub_category_id } });
        let sub_category_image = subcategory.sub_category_image;
        if (req.file) {
            await removeImage(sub_category_image);
            sub_category_image = await uploadImage(req.file);
        }
        await SubCategories.update({ sub_category_name: req.body.sub_category_name, sub_category_image: sub_category_image }, { where: { sub_category_id: req.params.sub_category_id } });

        return res.status(200).json({ msg: 'Sub Category Updated Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = editSubCategory;