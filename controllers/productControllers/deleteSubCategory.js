const {SubCategories, Products}=require('../../models/index');
const removeImage=require('../../reusable_module/removeImage');
const deleteSubCategory=async(req,res)=>{
    try{
        const product=await Products.findAll({where:{sub_category_id:req.params.sub_category_id}});
        if(product.length>0){
            return res.status(400).json({msg:'Delete Product First'});
        }else{
            const subcategory=await SubCategories.findOne({where:{sub_category_id:req.params.sub_category_id}});
            await removeImage(subcategory.sub_category_image);
            await SubCategories.destroy({where:{sub_category_id:req.params.sub_category_id}});
            return res.status(200).json({msg:'Sub Category Deleted Successfully'});
        }
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=deleteSubCategory;