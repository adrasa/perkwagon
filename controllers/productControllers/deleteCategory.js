const {Categories, SubCategories}=require('../../models/index');
const removeImage=require('../../reusable_module/removeImage');
const deleteCategory=async(req,res)=>{
    try{
        const subcategory=await SubCategories.findAll({where:{category_id:req.params.category_id}});
        if(subcategory.length>0){
            return res.status(400).json({msg:'Delete Sub-Category First'});
        }else{
            const category=await Categories.findOne({where:{category_id:req.params.category_id}});
            await removeImage(category.category_image);
            await Categories.destroy({where:{category_id:req.params.category_id}});
            return res.status(200).json({msg:'Category Deleted Successfully'});
        }
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=deleteCategory;