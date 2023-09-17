const {Categories}=require('../../models/index');
const removeImage=require('../../reusable_module/removeFile');
const uploadImage=require('../../reusable_module/uploadFile');
const editCategory=async(req,res)=>{
    try{
        const category = await Categories.findOne({ where: { category_id: req.params.category_id } });
        let category_image=category.category_image;
        if(req.file){
            await removeImage(category_image);
            category_image=await uploadImage(req.file);
        }
        await Categories.update({category_name:req.body.category_name,category_image:category_image},{where:{category_id:req.params.category_id}});
            
        return res.status(200).json({msg:'Category Updated Successfully'});
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=editCategory;