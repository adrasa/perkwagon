const {SubCategories} = require('../../models/index');
const removeImage = require('../../reusable_module/removeFile');
const uploadImage = require('../../reusable_module/uploadFile');
const editSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategories.findOne({ where: { subcategory_id: req.params.subcategory_id } });
        let subcategory_image = subcategory.subcategory_image;
        if (req.file) {
            await removeImage(subcategory_image);
            subcategory_image = await uploadImage(req.file);
        }
        await SubCategories.update({ subcategory_name: req.body.subcategory_name, subcategory_image: subcategory_image }, { where: { subcategory_id: req.params.subcategory_id } });

        return res.status(200).json({ msg: 'Sub Category Updated Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = editSubCategory;